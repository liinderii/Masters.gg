import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { buttons } from "../../Styles/button";
import { Input } from "../ui/input";
import type { Post } from "../../types/post";
import type { Photo } from "../../types/photo";
import { PhotoActionsDialog } from "./PhotoActionsDialog";
import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Photos state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPhotosLoading, setIsPhotosLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/posts`, {
          credentials: "include",
        });
        if (res.status === 401 || res.status === 403) {
          setError("Unauthorized");
          setPosts([]);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = (await res.json()) as Post[];
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching posts.");
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

        if (res.status === 401 || res.status === 403) {
          // Om posts redan visar Unauthorized kan du välja att inte sätta error här
          setPhotos([]);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch photos");

        const data = (await res.json()) as Photo[];
        setPhotos(data);
      } catch (err) {
        console.error(err);
        // valfritt: setError("An error occurred while fetching photos.");
      } finally {
        setIsPhotosLoading(false);
      }
    }

    fetchPosts();
    fetchPhotos();
  }, []);

  // Visa t.ex. 6 senaste i sidoboxen
  const sidebarPhotos = useMemo(() => photos.slice(0, 6), [photos]);

  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    try {
      setIsSaving(true);
      setError(null);
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost }),
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) throw new Error("Failed to add post");

      const createdPost = (await res.json()) as Post;
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      setNewPost("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while adding the post.");
    } finally {
      setIsSaving(false);
    }
  };

  // Om du vill ha actions (samma som ProfilePhotos) behöver du dessa callbacks:
  const setAsProfile = async (photoId: string) => {
    try {
      const res = await fetch(`${API_BASE}/photos/${photoId}/set-profile`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
    } catch (e) {
      console.error(e);
      setError("Could not set profile photo.");
    }
  };

  const setAsCover = async (photoId: string) => {
    try {
      const res = await fetch(`${API_BASE}/photos/${photoId}/set-cover`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
    } catch (e) {
      console.error(e);
      setError("Could not set cover photo.");
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const res = await fetch(`${API_BASE}/photos/${photoId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      setPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (e) {
      console.error(e);
      setError("Could not delete photo.");
    }
  };

  return (
    <>
      <div className="flex gap-10 mt-16">
        <aside className="w-1/3 space-y-4">
          <Card className="w-full mx-auto max-w-[1600px] overflow-hidden border shadow-none">
            <CardHeader>
              <CardTitle>Intro</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p>Lives in Stockholm</p>
              <p>Big</p>
              <p>Marcus</p>

              <button className={buttons}>Add Bio</button>
              <button className={buttons}>Edit details</button>
              <button className={buttons}>Add Features</button>
            </CardContent>
          </Card>

          {/* PHOTOS BOX */}
          <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 gap-2">
              {isPhotosLoading && (
                <p className="text-sm text-gray-400 col-span-3">Loading…</p>
              )}

              {!isPhotosLoading && sidebarPhotos.length === 0 && (
                <p className="text-sm text-gray-400 col-span-3">
                  No photos yet
                </p>
              )}

              {sidebarPhotos.map((photo) => (
                <div key={photo._id} className="w-full">
                  <PhotoActionsDialog
                    photo={photo}
                    onSetProfile={setAsProfile}
                    onSetCover={setAsCover}
                    onDelete={deletePhoto}
                  />
                </div>
              ))}
            </CardContent>

            <CardFooter />
          </Card>

          <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter></CardFooter>
          </Card>
        </aside>

        <div className="flex-1 space-y-4">
          <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
            <CardHeader>
              <CardTitle>Create Post</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                className="space-y-4 rounded-md"
                placeholder="Whats on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <hr className="mt-4" />
              <div className="flex gap-4 mt-4 justify-center">
                <button className={buttons}>Live video</button>
                <button className={buttons}>Photo/video</button>
                <button className={buttons}>Life update</button>
              </div>
              <button
                className={buttons}
                onClick={handleAddPost}
                disabled={isSaving || !newPost.trim()}
              >
                {isSaving ? "Posting..." : "Post"}
              </button>

              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>

          <Card className="w-full mx-auto max-w-[1600px] overflow-hidden border shadow-none">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading && <p className="text-sm text-gray-400">Loading…</p>}

              {!isLoading && posts.length === 0 && !error && (
                <p className="text-sm text-gray-400">
                  No posts yet. Be the first to share something.
                </p>
              )}

              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border-b border-white/10 last:border-b-0 pb-3"
                >
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <p>{post.content}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
