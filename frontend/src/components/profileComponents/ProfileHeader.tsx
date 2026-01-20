import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader as DialogHead,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { Photo } from "../../types/photo";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
const photoFileUrl = (id: string) => `${API_BASE}/photos/${id}/file`;

type HeaderState = {
  bio: string;
  intro: {
    livesIn: string;
    from: string;
    relationshipStatus: string;
  };
  avatarPhotoId: string | null;
  coverPhotoId: string | null;
};

export type ProfileMe = {
  avatarPhotoId: string; // Photo._id eller ""
  coverPhotoId: string; // Photo._id eller ""
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

async function updateMyProfileMe(payload: ProfileMe): Promise<ProfileMe> {
  const res = await fetch(`${API_BASE}/me/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to save profile");
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

export const ProfileHeader = () => {
  const [header, setHeader] = useState<HeaderState>({
    bio: "",
    intro: { livesIn: "", from: "", relationshipStatus: "" },
    avatarPhotoId: null,
    coverPhotoId: null,
  });

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  // Draft i modalen
  const [draftBio, setDraftBio] = useState("");
  const [draftLivesIn, setDraftLivesIn] = useState("");
  const [draftFrom, setDraftFrom] = useState("");
  const [draftRelationshipStatus, setDraftRelationshipStatus] = useState("");
  const [draftAvatarPhotoId, setDraftAvatarPhotoId] = useState<string | null>(
    null
  );
  const [draftCoverPhotoId, setDraftCoverPhotoId] = useState<string | null>(
    null
  );

  // 1) Ladda sparad profil från backend
  useEffect(() => {
    (async () => {
      try {
        const me = await getMyProfileMe();

        setHeader({
          bio: me.bio ?? "",
          intro: {
            livesIn: me.intro?.livesIn ?? "",
            from: me.intro?.from ?? "",
            relationshipStatus: me.intro?.relationshipStatus ?? "",
          },
          avatarPhotoId: me.avatarPhotoId ? me.avatarPhotoId : null,
          coverPhotoId: me.coverPhotoId ? me.coverPhotoId : null,
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // 2) Ladda photos
  useEffect(() => {
    (async () => {
      try {
        setLoadingPhotos(true);
        const res = await fetch(`${API_BASE}/photos`, {
          credentials: "include",
        }).catch(() => null);

        if (res?.ok) setPhotos((await res.json()) as Photo[]);
        else setPhotos([]);
      } catch (e) {
        console.error(e);
        setPhotos([]);
      } finally {
        setLoadingPhotos(false);
      }
    })();
  }, []);

  const recentPhotos = useMemo(() => photos.slice(0, 24), [photos]);

  const coverSrc = useMemo(() => {
    return header.coverPhotoId
      ? photoFileUrl(header.coverPhotoId)
      : "/profile.jpg";
  }, [header.coverPhotoId]);

  const avatarSrc = useMemo(() => {
    return header.avatarPhotoId
      ? photoFileUrl(header.avatarPhotoId)
      : "/avatar.jpg";
  }, [header.avatarPhotoId]);

  function startEdit() {
    setDraftBio(header.bio ?? "");
    setDraftLivesIn(header.intro?.livesIn ?? "");
    setDraftFrom(header.intro?.from ?? "");
    setDraftRelationshipStatus(header.intro?.relationshipStatus ?? "");
    setDraftAvatarPhotoId(header.avatarPhotoId);
    setDraftCoverPhotoId(header.coverPhotoId);
  }

  async function saveEdit() {
    // Uppdatera UI direkt
    setHeader((prev) => ({
      ...prev,
      bio: draftBio,
      intro: {
        livesIn: draftLivesIn,
        from: draftFrom,
        relationshipStatus: draftRelationshipStatus,
      },
      avatarPhotoId: draftAvatarPhotoId,
      coverPhotoId: draftCoverPhotoId,
    }));

    try {
      const saved = await updateMyProfileMe({
        avatarPhotoId: (draftAvatarPhotoId ?? "").trim(),
        coverPhotoId: (draftCoverPhotoId ?? "").trim(),
        bio: draftBio.trim(),
        intro: {
          livesIn: draftLivesIn.trim(),
          from: draftFrom.trim(),
          relationshipStatus: draftRelationshipStatus.trim(),
        },
      });

      setHeader({
        bio: saved.bio ?? "",
        intro: {
          livesIn: saved.intro?.livesIn ?? "",
          from: saved.intro?.from ?? "",
          relationshipStatus: saved.intro?.relationshipStatus ?? "",
        },
        avatarPhotoId: saved.avatarPhotoId ? saved.avatarPhotoId : null,
        coverPhotoId: saved.coverPhotoId ? saved.coverPhotoId : null,
      });

      window.dispatchEvent(
        new CustomEvent("profile:updated", { detail: saved })
      );
    } catch (e) {
      console.error(e);
    }
  }

  const modalBase =
    "bg-white text-black border border-black/10 sm:max-w-[920px]";
  const sectionBase =
    "rounded-xl border border-black/10 bg-black/[0.02] p-6 space-y-5";
  const sectionHeaderTitle = "text-sm font-semibold text-black";
  const sectionHeaderActions = "flex items-center gap-2";
  const ghostBtn =
    "px-3 py-2 text-sm rounded-md border border-black/10 hover:bg-black/5 disabled:opacity-50 disabled:hover:bg-transparent";
  const addBtn =
    "rounded px-4 h-10 text-sm font-semibold text-white bg-violet-400 hover:bg-violet-500 disabled:opacity-50";

  return (
    <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border-0 shadow-none">
      <div className="px-2 pb-2 text-sm font-semibold text-white/80">
        Cover photo
      </div>

      <CardHeader className="p-0">
        <img
          src={coverSrc}
          alt="Profile header"
          className="block w-full object-cover rounded-lg h-56 md:h-72 lg:h-100"
        />
      </CardHeader>

      <CardContent className="relative p-0">
        {/* MOBILE/TABLET: kolumn + centrerat | DESKTOP (lg+): exakt som innan */}
        <div className="flex w-full flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          {/* LEFT BLOCK */}
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-4 lg:justify-self-start">
            <img
              src={avatarSrc}
              alt="Profile avatar"
              className="
                rounded-full border-4 border-white object-cover
                -mt-12 md:-mt-14 lg:-mt-16
                h-32 w-32 md:h-36 md:w-36
                lg:h-62 lg:w-62
              "
            />

            <div className="mt-2 lg:mt-[-64px]">
              <h1 className="text-xl font-semibold">Marcus Linder</h1>
              <p className="text-sm text-gray-500">
                This is the profile page content.
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-4 w-full px-4 flex flex-col gap-2 sm:w-auto sm:flex-row sm:justify-center sm:px-0 lg:mt-20 lg:flex-row lg:justify-end">
            {/* Add Story */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded h-12 text-sm font-bold text-white bg-violet-400 hover:bg-violet-500 font-semibold w-full sm:w-auto px-6 lg:px-8 lg:w-50">
                  Add Story
                </button>
              </DialogTrigger>

              <DialogContent className={`${modalBase} max-h-[90vh]`}>
                <DialogHead>
                  <DialogTitle className="text-black">Add Story</DialogTitle>
                  <DialogDescription className="text-black/60">
                    Add a new story to your profile.
                  </DialogDescription>
                </DialogHead>

                <div className="mt-6 max-h-[65vh] overflow-y-auto pr-3 space-y-6">
                  <section className={sectionBase}>
                    <div className="flex items-center justify-between">
                      <h3 className={sectionHeaderTitle}>Story</h3>
                      <div className={sectionHeaderActions}>
                        <button type="button" className={addBtn}>
                          Add
                        </button>
                      </div>
                    </div>

                    <Input
                      className="bg-white text-black border-black/10 placeholder:text-black/40"
                      placeholder="Story title..."
                    />

                    <p className="text-xs text-black/60">
                      (Frontend-only placeholder)
                    </p>
                  </section>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10 flex justify-end gap-3">
                  <DialogClose asChild>
                    <button className={ghostBtn} type="button">
                      Cancel
                    </button>
                  </DialogClose>
                  <DialogClose asChild>
                    <button className={addBtn} type="button">
                      Save
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Profile */}
            <Dialog onOpenChange={(v) => v && startEdit()}>
              <DialogTrigger asChild>
                <button className="rounded h-12 text-sm font-bold text-white bg-violet-400 hover:bg-violet-500 font-semibold w-full sm:w-auto px-6 lg:px-8 lg:w-50">
                  Edit Profile
                </button>
              </DialogTrigger>

              <DialogContent className={`${modalBase} max-h-[90vh]`}>
                {/* --- resten av din modal är oförändrad --- */}
                <DialogHead>
                  <DialogTitle className="text-black">Edit Profile</DialogTitle>
                  <DialogDescription className="text-black/60">
                    Edit your profile information.
                  </DialogDescription>
                </DialogHead>

                <div className="mt-6 max-h-[65vh] overflow-y-auto pr-3 space-y-12">
                  {/* COVER SECTION */}
                  <section className={sectionBase}>
                    <div className="flex items-center justify-between">
                      <h3 className={sectionHeaderTitle}>Cover photo</h3>
                      <div className={sectionHeaderActions}>
                        <button
                          type="button"
                          className={ghostBtn}
                          onClick={() => setDraftCoverPhotoId(null)}
                          disabled={!draftCoverPhotoId}
                        >
                          Clear
                        </button>
                        <button type="button" className={addBtn}>
                          Add cover
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg overflow-hidden border border-black/10">
                      <img
                        src={
                          draftCoverPhotoId
                            ? photoFileUrl(draftCoverPhotoId)
                            : coverSrc
                        }
                        alt="Cover preview"
                        className="h-[190px] w-full object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-6 gap-3">
                      {loadingPhotos ? (
                        <p className="text-sm text-black/60 col-span-6">
                          Loading photos…
                        </p>
                      ) : recentPhotos.length === 0 ? (
                        <p className="text-sm text-black/60 col-span-6">
                          No photos available.
                        </p>
                      ) : (
                        recentPhotos.map((p) => {
                          const active = draftCoverPhotoId === p._id;
                          return (
                            <button
                              key={p._id}
                              type="button"
                              className={`rounded overflow-hidden border transition ${
                                active
                                  ? "border-emerald-600 ring-2 ring-emerald-600/20"
                                  : "border-black/10 hover:border-black/25"
                              }`}
                              onClick={() => setDraftCoverPhotoId(p._id)}
                              title="Set as cover"
                            >
                              <img
                                src={photoFileUrl(p._id)}
                                alt={p.caption || "Photo"}
                                className="h-16 w-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          );
                        })
                      )}
                    </div>

                    <p className="text-xs text-black/60">
                      Tip: Click a photo to set it as your cover.
                    </p>
                  </section>

                  {/* PROFILE PICTURE SECTION */}
                  <section className={sectionBase}>
                    <div className="flex items-center justify-between">
                      <h3 className={sectionHeaderTitle}>Profile picture</h3>
                      <div className={sectionHeaderActions}>
                        <button
                          type="button"
                          className={ghostBtn}
                          onClick={() => setDraftAvatarPhotoId(null)}
                          disabled={!draftAvatarPhotoId}
                        >
                          Clear
                        </button>
                        <button type="button" className={addBtn}>
                          Add picture
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={
                          draftAvatarPhotoId
                            ? photoFileUrl(draftAvatarPhotoId)
                            : avatarSrc
                        }
                        alt="Avatar preview"
                        className="h-20 w-20 rounded-full border border-black/10 object-cover"
                      />
                      <p className="text-sm text-black/60">
                        Choose an existing photo below.
                      </p>
                    </div>

                    <div className="grid grid-cols-8 gap-3">
                      {loadingPhotos ? (
                        <p className="text-sm text-black/60 col-span-8">
                          Loading photos…
                        </p>
                      ) : recentPhotos.length === 0 ? (
                        <p className="text-sm text-black/60 col-span-8">
                          No photos available.
                        </p>
                      ) : (
                        recentPhotos.map((p) => {
                          const active = draftAvatarPhotoId === p._id;
                          return (
                            <button
                              key={p._id}
                              type="button"
                              className={`rounded overflow-hidden border transition ${
                                active
                                  ? "border-emerald-600 ring-2 ring-emerald-600/20"
                                  : "border-black/10 hover:border-black/25"
                              }`}
                              onClick={() => setDraftAvatarPhotoId(p._id)}
                              title="Set as profile picture"
                            >
                              <img
                                src={photoFileUrl(p._id)}
                                alt={p.caption || "Photo"}
                                className="h-12 w-full object-cover"
                                loading="lazy"
                              />
                            </button>
                          );
                        })
                      )}
                    </div>

                    <p className="text-xs text-black/60">
                      Tip: Click a photo to set it as your profile picture.
                    </p>
                  </section>

                  {/* BIO */}
                  <section className={sectionBase}>
                    <div className="flex items-center justify-between">
                      <h3 className={sectionHeaderTitle}>Bio</h3>
                      <div className={sectionHeaderActions}>
                        <button type="button" className={addBtn}>
                          Add bio
                        </button>
                      </div>
                    </div>

                    <Textarea
                      value={draftBio}
                      onChange={(e) => setDraftBio(e.target.value)}
                      placeholder="Write a short bio…"
                      className="bg-white text-black border-black/10 placeholder:text-black/40"
                    />
                  </section>

                  {/* INTRO */}
                  <section className={sectionBase}>
                    <div className="flex items-center justify-between">
                      <h3 className={sectionHeaderTitle}>Intro</h3>
                      <div className={sectionHeaderActions}>
                        <button type="button" className={addBtn}>
                          Add intro
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-black/60">Lives in</p>
                        <Input
                          value={draftLivesIn}
                          onChange={(e) => setDraftLivesIn(e.target.value)}
                          placeholder="City, Country"
                          className="bg-white text-black border-black/10 placeholder:text-black/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-black/60">From</p>
                        <Input
                          value={draftFrom}
                          onChange={(e) => setDraftFrom(e.target.value)}
                          placeholder="Hometown"
                          className="bg-white text-black border-black/10 placeholder:text-black/40"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <p className="text-xs text-black/60">
                          Relationship status
                        </p>
                        <Input
                          value={draftRelationshipStatus}
                          onChange={(e) =>
                            setDraftRelationshipStatus(e.target.value)
                          }
                          placeholder="Single / In a relationship / It's complicated…"
                          className="bg-white text-black border-black/10 placeholder:text-black/40"
                        />
                      </div>
                    </div>
                  </section>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10 flex justify-end gap-3">
                  <DialogClose asChild>
                    <button type="button" className={ghostBtn}>
                      Cancel
                    </button>
                  </DialogClose>

                  <DialogClose asChild>
                    <button type="button" className={addBtn} onClick={saveEdit}>
                      Save
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <hr className="mt-10" />
      </CardContent>
    </Card>
  );
};
