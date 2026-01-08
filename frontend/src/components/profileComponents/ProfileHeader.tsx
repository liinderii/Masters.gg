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

type ProfileMe = {
  avatarPhotoId: string; // Photo._id eller ""
  coverPhotoId: string; // Photo._id eller ""
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
  };
}

export const ProfileHeader = () => {
  // FRONTEND state (för preview och modal)
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

  // 1) Ladda sparad avatar/cover från backend
  useEffect(() => {
    (async () => {
      try {
        const me = await getMyProfileMe();

        setHeader((prev) => ({
          ...prev,
          avatarPhotoId: me.avatarPhotoId ? me.avatarPhotoId : null,
          coverPhotoId: me.coverPhotoId ? me.coverPhotoId : null,
        }));
      } catch (e) {
        console.error(e);
        // fallback: behåll defaults
      }
    })();
  }, []);

  // 2) Ladda photos (för att kunna välja cover/avatar från photos)
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
    // Prefill draft från nuvarande state
    setDraftBio(header.bio ?? "");
    setDraftLivesIn(header.intro?.livesIn ?? "");
    setDraftFrom(header.intro?.from ?? "");
    setDraftRelationshipStatus(header.intro?.relationshipStatus ?? "");
    setDraftAvatarPhotoId(header.avatarPhotoId);
    setDraftCoverPhotoId(header.coverPhotoId);
  }

  // I detta steg: vi sparar bara avatar/cover.
  async function saveEdit() {
    // Uppdatera UI direkt (snabb känsla)
    setHeader((prev) => ({
      ...prev,
      avatarPhotoId: draftAvatarPhotoId,
      coverPhotoId: draftCoverPhotoId,
    }));

    try {
      const saved = await updateMyProfileMe({
        avatarPhotoId: (draftAvatarPhotoId ?? "").trim(),
        coverPhotoId: (draftCoverPhotoId ?? "").trim(),
      });

      // Sätt exakt vad backend sparade (source of truth)
      setHeader((prev) => ({
        ...prev,
        avatarPhotoId: saved.avatarPhotoId ? saved.avatarPhotoId : null,
        coverPhotoId: saved.coverPhotoId ? saved.coverPhotoId : null,
      }));
    } catch (e) {
      console.error(e);
      // Vill du revert:a vid fel: hämta om med getMyProfileMe() här.
    }
  }

  // Modal: vit bakgrund
  const modalBase =
    "bg-white text-black border border-black/10 sm:max-w-[920px]";

  // Sektion-styling för luftigare layout + tydlig gruppering
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
      {/* Cover photo title */}
      <div className="px-2 pb-2 text-sm font-semibold text-white/80">
        Cover photo
      </div>

      <CardHeader className="p-0">
        <img
          src={coverSrc}
          alt="Profile header"
          className="block h-100 w-full object-cover rounded-lg"
        />
      </CardHeader>

      <CardContent className="relative p-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={avatarSrc}
              alt="Profile avatar"
              className="-mt-16 h-62 w-62 rounded-full border-4 border-white object-cover"
            />

            <div className="mt-[-64px]">
              <h1 className="text-xl font-semibold">Marcus Linder</h1>
              <p className="text-sm text-gray-500">
                This is the profile page content.
              </p>
            </div>
          </div>

          <div className="mt-20 flex gap-2">
            {/* Add Story - behåller din */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded px-8 w-50 h-12 text-sm font-bold text-white bg-violet-400 hover:bg-violet-500 font-semibold ">
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
                <button className="rounded px-8 w-50 h-12 text-sm font-bold text-white bg-violet-400 hover:bg-violet-500 font-semibold ">
                  Edit Profile
                </button>
              </DialogTrigger>

              <DialogContent className={`${modalBase} max-h-[90vh]`}>
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

                  {/* BIO SECTION (oförändrad, men sparas ej i detta steg) */}
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

                  {/* INTRO SECTION (oförändrad, men sparas ej i detta steg) */}
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
