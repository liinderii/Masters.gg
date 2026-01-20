// frontend/src/components/profile/ProfileTabPosts.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { buttons } from "../../Styles/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

import {
  House,
  MapPin,
  Heart,
  ThumbsUp,
  MessageCircleMore,
  Share,
} from "lucide-react";

import type { Post, PostAttachment } from "../../types/post";
import type { Photo } from "../../types/photo";
import type { Video } from "../../types/video";
import { PhotoActionsDialog } from "./PhotoActionsDialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type ProfileMe = {
  avatarPhotoId: string;
  coverPhotoId: string;
  bio: string;
  intro: {
    livesIn: string;
    from: string;
    relationshipStatus: string;
  };
};

async function getMyProfileMe(): Promise<ProfileMe> {
  const res = await fetch(`${API_BASE}/me/profile`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load profile");
  const data = (await res.json()) as any;

  return {
    avatarPhotoId:
      typeof data.avatarPhotoId === "string" ? data.avatarPhotoId : "",
    coverPhotoId:
      typeof data.coverPhotoId === "string" ? data.coverPhotoId : "",
    bio: typeof data.bio === "string" ? data.bio : "",
    intro: {
      livesIn:
        typeof data.intro?.livesIn === "string" ? data.intro.livesIn : "",
      from: typeof data.intro?.from === "string" ? data.intro.from : "",
      relationshipStatus:
        typeof data.intro?.relationshipStatus === "string"
          ? data.intro.relationshipStatus
          : "",
    },
  };
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function displayNameFromPost(post: Post) {
  return (
    post.userDisplayName?.trim() ||
    (post.userId ? `User ${post.userId.slice(0, 6)}…` : "Unknown user")
  );
}

type CommentItem = {
  id: string;
  text: string;
  createdAt: string;
};

type PostUIState = {
  liked: boolean;
  likeCount: number;
  comments: CommentItem[];
  commentDraft: string;
};

type IntroLine = {
  key: "livesIn" | "from" | "relationshipStatus";
  text: string;
};

export const ProfilePosts = () => {
  const [profileMe, setProfileMe] = useState<ProfileMe | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPhotosLoading, setIsPhotosLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<PostAttachment[]>([]);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const mediaInputRef = useRef<HTMLInputElement | null>(null);
  const [postUI, setPostUI] = useState<Record<string, PostUIState>>({});

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/posts`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = (await res.json()) as Post[];
        setPosts(data);

        setPostUI((prev) => {
          const next = { ...prev };
          for (const p of data) {
            if (!next[p._id]) {
              next[p._id] = {
                liked: false,
                likeCount: 0,
                comments: [],
                commentDraft: "",
              };
            }
          }
          return next;
        });
      } catch (e) {
        console.error(e);
        setError("Could not load posts");
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchPhotos() {
      try {
        setIsPhotosLoading(true);
        const res = await fetch(`${API_BASE}/photos`, {
          credentials: "include",
        });
        if (!res.ok) return;
        setPhotos((await res.json()) as Photo[]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsPhotosLoading(false);
      }
    }

    async function fetchProfileMe() {
      try {
        const p = await getMyProfileMe();
        setProfileMe(p);
      } catch (e) {
        console.error(e);
        setProfileMe(null);
      }
    }

    const onUpdated = (ev: Event) => {
      const detail = (ev as CustomEvent).detail as ProfileMe | undefined;
      if (!detail) return;
      setProfileMe(detail);
    };
    window.addEventListener("profile:updated", onUpdated);

    fetchPosts();
    fetchPhotos();
    fetchProfileMe();

    return () => window.removeEventListener("profile:updated", onUpdated);
  }, []);

  const sidebarPhotos = useMemo(() => photos.slice(0, 6), [photos]);

  const ensurePostUI = (postId: string) => {
    setPostUI((prev) => {
      if (prev[postId]) return prev;
      return {
        ...prev,
        [postId]: {
          liked: false,
          likeCount: 0,
          comments: [],
          commentDraft: "",
        },
      };
    });
  };

  const handlePickMedia = () => mediaInputRef.current?.click();

  const uploadMedia = async (file: File) => {
    try {
      setIsUploadingMedia(true);
      setError(null);

      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) return;

      const form = new FormData();
      form.append("file", file);
      form.append("origin", "post");

      let endpoint = "";
      let kind: PostAttachment["kind"];

      if (isImage) {
        endpoint = `${API_BASE}/photos`;
        kind = "photo";
        form.append("caption", "");
      } else {
        endpoint = `${API_BASE}/videos`;
        kind = "video";
        form.append("title", file.name.replace(/\.[^/.]+$/, ""));
        form.append("game", "");
      }

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      if (!res.ok) throw new Error("Upload failed");

      const created = (await res.json()) as Photo | Video;
      setAttachments((prev) => [
        { kind, refId: (created as any)._id },
        ...prev,
      ]);
    } catch (e) {
      console.error(e);
      setError("Media upload failed");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPost = async () => {
    if (!newPost.trim() && attachments.length === 0) return;

    try {
      setIsSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost, attachments }),
      });

      if (!res.ok) throw new Error("Post failed");

      const created = (await res.json()) as Post;
      setPosts((prev) => [created, ...prev]);
      setNewPost("");
      setAttachments([]);

      setPostUI((prev) => ({
        ...prev,
        [created._id]: {
          liked: false,
          likeCount: 0,
          comments: [],
          commentDraft: "",
        },
      }));
    } catch (e) {
      console.error(e);
      setError("Could not create post");
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setPosts((prev) => prev.filter((p) => p._id !== postId));
      setPostUI((prev) => {
        const next = { ...prev };
        delete next[postId];
        return next;
      });
    } catch (e) {
      console.error(e);
      setError("Could not delete post");
    }
  };

  const toggleLike = (postId: string) => {
    ensurePostUI(postId);
    setPostUI((prev) => {
      const s = prev[postId]!;
      const nextLiked = !s.liked;
      return {
        ...prev,
        [postId]: {
          ...s,
          liked: nextLiked,
          likeCount: Math.max(0, s.likeCount + (nextLiked ? 1 : -1)),
        },
      };
    });
  };

  const setCommentDraft = (postId: string, value: string) => {
    ensurePostUI(postId);
    setPostUI((prev) => {
      const s = prev[postId]!;
      return {
        ...prev,
        [postId]: { ...s, commentDraft: value },
      };
    });
  };

  const addComment = (postId: string) => {
    ensurePostUI(postId);
    setPostUI((prev) => {
      const s = prev[postId]!;
      const text = s.commentDraft.trim();
      if (!text) return prev;

      const c: CommentItem = {
        id: crypto.randomUUID(),
        text,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        [postId]: {
          ...s,
          comments: [c, ...s.comments],
          commentDraft: "",
        },
      };
    });
  };

  const sharePost = async (postId: string) => {
    const url = `${window.location.origin}/profile/posts/${postId}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setError("Link copied!");
        setTimeout(() => setError(null), 1500);
      } else {
        prompt("Copy this link:", url);
      }
    } catch (e) {
      console.error(e);
      prompt("Copy this link:", url);
    }
  };

  const introLines = useMemo((): IntroLine[] => {
    const i = profileMe?.intro;
    if (!i) return [];

    const lines: IntroLine[] = [];

    const livesIn = i.livesIn?.trim();
    const from = i.from?.trim();
    const relationshipStatus = i.relationshipStatus?.trim();

    if (livesIn) lines.push({ key: "livesIn", text: `Lives in ${livesIn}` });
    if (from) lines.push({ key: "from", text: `From ${from}` });
    if (relationshipStatus)
      lines.push({ key: "relationshipStatus", text: relationshipStatus });

    return lines;
  }, [profileMe?.intro]);

  const introIcon = (key: IntroLine["key"]) => {
    const cls = "h-4 w-4 text-black/70";
    if (key === "livesIn") return <MapPin className={cls} />;
    if (key === "from") return <House className={cls} />;
    return <Heart className={cls} />;
  };

  const pageBg = "bg-gray-100";
  const cardBase = "bg-white border border-black/10 shadow-none";
  const subtleBorder = "border border-black/10";

  return (
    <section className={`w-full ${pageBg}`}>
      <div className="mx-auto max-w-[1600px] px-4 py-10">
        {/* ✅ FIX: stack on mobile, row on md+ */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* ✅ FIX: sidebar full width on mobile, sticky only on md+ */}
          <aside className="w-full md:w-[520px] shrink-0 md:sticky md:top-6 self-start space-y-4">
            <Card className={cardBase}>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-black space-y-3">
                <p>Share updates, photos, and videos with your followers.</p>

                {(profileMe?.bio?.trim() || introLines.length > 0) && (
                  <div className={`rounded-xl ${subtleBorder} p-4 space-y-2`}>
                    {profileMe?.bio?.trim() && (
                      <p className="text-sm text-black/70">
                        {profileMe.bio.trim()}
                      </p>
                    )}

                    {introLines.length > 0 && (
                      <ul className="text-sm text-black space-y-2">
                        {introLines.map((l) => (
                          <li
                            key={`${l.key}-${l.text}`}
                            className="flex items-center gap-2"
                          >
                            {introIcon(l.key)}
                            <span>{l.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className={cardBase}>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-3 gap-2">
                {isPhotosLoading && (
                  <p className="col-span-3 text-sm text-black/60">Loading…</p>
                )}

                {!isPhotosLoading && sidebarPhotos.length === 0 && (
                  <p className="col-span-3 text-sm text-black/60">
                    No photos yet
                  </p>
                )}

                {sidebarPhotos.map((photo) => (
                  <PhotoActionsDialog
                    key={photo._id}
                    photo={photo}
                    onSetProfile={async () => {}}
                    onSetCover={async () => {}}
                    onDelete={async () => {}}
                  />
                ))}
              </CardContent>

              <CardFooter />
            </Card>
          </aside>

          {/* ✅ FIX: main full width on mobile */}
          <main className="w-full md:flex-1 space-y-4">
            <Card className={cardBase}>
              <CardHeader>
                <CardTitle>Create Post</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />

                {attachments.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {attachments.map((a, i) => {
                      const src =
                        a.kind === "photo"
                          ? `${API_BASE}/photos/${a.refId}/file`
                          : `${API_BASE}/videos/${a.refId}/file`;

                      return (
                        <button
                          key={`${a.kind}-${a.refId}-${i}`}
                          type="button"
                          onClick={() => removeAttachment(i)}
                          className={`relative overflow-hidden rounded ${subtleBorder}`}
                          title="Remove attachment"
                        >
                          {a.kind === "photo" ? (
                            <img
                              src={src}
                              alt="attachment"
                              className="h-24 w-full object-cover"
                            />
                          ) : (
                            <video
                              src={src}
                              className="h-24 w-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          )}

                          <span className="absolute bottom-0 w-full bg-black/60 p-1 text-xs text-white">
                            Remove
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 flex gap-4">
                  <button
                    className={buttons}
                    type="button"
                    onClick={handlePickMedia}
                    disabled={isUploadingMedia}
                  >
                    {isUploadingMedia ? "Uploading..." : "Photo / Video"}
                  </button>

                  <input
                    ref={mediaInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadMedia(f);
                      e.currentTarget.value = "";
                    }}
                  />

                  <button
                    className={buttons}
                    onClick={handleAddPost}
                    disabled={
                      isSaving || (!newPost.trim() && attachments.length === 0)
                    }
                  >
                    {isSaving ? "Posting..." : "Post"}
                  </button>
                </div>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
              </CardContent>
              <CardFooter />
            </Card>

            <div className="space-y-4">
              {isLoading && <p className="text-sm text-black/60">Loading…</p>}

              {!isLoading && posts.length === 0 && !error && (
                <p className="text-sm text-black/60">No posts yet.</p>
              )}

              {posts.map((post) => {
                const name = displayNameFromPost(post);
                const ui = postUI[post._id] ?? {
                  liked: false,
                  likeCount: 0,
                  comments: [],
                  commentDraft: "",
                };

                return (
                  <Card key={post._id} className={cardBase}>
                    <CardHeader className="flex flex-row items-start justify-between gap-4">
                      <div className="min-w-0">
                        <CardTitle className="text-base font-semibold leading-tight">
                          {name}
                        </CardTitle>
                        <p className="mt-1 text-xs text-black/50">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="text-xs text-red-500 hover:underline shrink-0"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete
                      </button>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col items-center text-center">
                        {post.content && (
                          <p className="max-w-[70ch] text-lg leading-relaxed">
                            {post.content}
                          </p>
                        )}

                        {post.attachments?.length ? (
                          <div className="mt-4 w-full max-w-3xl space-y-3">
                            {post.attachments.map((a, i) => {
                              const src =
                                a.kind === "photo"
                                  ? `${API_BASE}/photos/${a.refId}/file`
                                  : `${API_BASE}/videos/${a.refId}/file`;

                              return a.kind === "photo" ? (
                                <img
                                  key={`${a.kind}-${a.refId}-${i}`}
                                  src={src}
                                  alt="post attachment"
                                  className={`w-full rounded-xl ${subtleBorder} object-contain bg-white`}
                                />
                              ) : (
                                <video
                                  key={`${a.kind}-${a.refId}-${i}`}
                                  src={src}
                                  controls
                                  className={`w-full rounded-xl ${subtleBorder} bg-white`}
                                />
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 border-t border-black/10 pt-3">
                      <div className="flex items-center justify-center gap-6 text-sm text-black/70">
                        <button
                          type="button"
                          onClick={() => toggleLike(post._id)}
                          className={`flex items-center gap-2 hover:text-black transition ${
                            ui.liked ? "text-black" : ""
                          }`}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Like</span>
                          {ui.likeCount > 0 && (
                            <span className="text-xs text-black/50">
                              ({ui.likeCount})
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-2 hover:text-black transition"
                        >
                          <MessageCircleMore className="h-4 w-4" />
                          <span>Comment</span>
                          {ui.comments.length > 0 && (
                            <span className="text-xs text-black/50">
                              ({ui.comments.length})
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => sharePost(post._id)}
                          className="flex items-center gap-2 hover:text-black transition"
                        >
                          <Share className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>

                      <div className="w-full max-w-xl mx-auto">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Write a comment…"
                            value={ui.commentDraft}
                            onChange={(e) =>
                              setCommentDraft(post._id, e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") addComment(post._id);
                            }}
                            className="bg-white border-black/10"
                          />

                          <button
                            type="button"
                            className="px-4 py-2 text-sm rounded-md border border-black/10 hover:bg-black/[0.03] transition"
                            onClick={() => addComment(post._id)}
                          >
                            Send
                          </button>
                        </div>

                        {ui.comments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {ui.comments.map((c) => (
                              <div
                                key={c.id}
                                className={`rounded-lg ${subtleBorder} bg-white px-3 py-2`}
                              >
                                <p className="text-sm">{c.text}</p>
                                <p className="mt-1 text-xs text-black/50">
                                  {formatDate(c.createdAt)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
