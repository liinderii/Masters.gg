import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { buttons } from "../../Styles/button";
import type { Photo } from "../../types/photo";
import type { Video } from "../../types/video";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type ProfileColumns = {
  about: string[];
};

type Friend = {
  _id: string;
  name: string;
  email: string;
  isOnline?: boolean;
};

export const ProfileAboutColumns = () => {
  const [data, setData] = useState<ProfileColumns>({ about: [] });
  const [friends, setFriends] = useState<Friend[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState("");

  const sidebarPhotos = useMemo(() => photos.slice(0, 6), [photos]);
  const sidebarVideos = useMemo(() => videos.slice(0, 4), [videos]);

  // 🔁 SAMMA STYLING SOM POSTS
  const pageBg = "bg-gray-100";
  const cardBase = "bg-white border border-black/10 shadow-none rounded-xl";
  const sectionInner = "rounded-xl border border-black/10 bg-black/[0.02] p-5";

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [colsRes, friendsRes, photosRes, videosRes] = await Promise.all([
        fetch(`${API_BASE}/profile-columns`, { credentials: "include" }),
        fetch(`${API_BASE}/friends`, { credentials: "include" }).catch(
          () => null
        ),
        fetch(`${API_BASE}/photos`, { credentials: "include" }).catch(
          () => null
        ),
        fetch(`${API_BASE}/videos`, { credentials: "include" }).catch(
          () => null
        ),
      ]);

      if (!colsRes.ok) throw new Error("Failed to load columns");

      const cols = await colsRes.json();
      setData({ about: cols.about ?? [] });

      if (friendsRes?.ok) setFriends(await friendsRes.json());
      if (photosRes?.ok) setPhotos(await photosRes.json());
      if (videosRes?.ok) setVideos(await videosRes.json());
    } catch (e) {
      console.error(e);
      setError("Could not load profile columns.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveBio = async () => {
    const next = { about: bioDraft.trim() ? [bioDraft.trim()] : [] };
    setData(next);

    const res = await fetch(`${API_BASE}/profile-columns`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });

    if (!res.ok) {
      setError("Could not save bio.");
      return;
    }

    setIsEditingBio(false);
  };

  const currentBio = data.about[0] ?? "";

  return (
    // 🌫️ GRÅ BAKGRUND UNDER TABS
    <section className={`w-full ${pageBg}`}>
      <div className="mx-auto max-w-[1600px] px-4 py-10 space-y-8">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {isLoading && <p className="text-sm text-black/60">Loading…</p>}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Intro / Bio */}
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Intro</CardTitle>
            </CardHeader>

            <CardContent>
              <div className={sectionInner}>
                <div className="space-y-4">
                  {!isEditingBio && (
                    <>
                      {currentBio ? (
                        <p className="text-sm whitespace-pre-line leading-relaxed text-black/80">
                          {currentBio}
                        </p>
                      ) : (
                        <p className="text-sm text-black/60">
                          No bio added yet.
                        </p>
                      )}

                      <button
                        className={buttons}
                        onClick={() => {
                          setBioDraft(currentBio);
                          setIsEditingBio(true);
                        }}
                      >
                        {currentBio ? "Edit bio" : "Add bio"}
                      </button>
                    </>
                  )}

                  {isEditingBio && (
                    <div className="space-y-4">
                      <textarea
                        className="w-full min-h-[140px] rounded-md border border-black/10 bg-white p-3 text-sm text-black outline-none focus:border-black/25 placeholder:text-black/40"
                        placeholder="Write something about yourself…"
                        value={bioDraft}
                        onChange={(e) => setBioDraft(e.target.value)}
                      />

                      <div className="flex gap-3">
                        <button className={buttons} onClick={saveBio}>
                          Save
                        </button>
                        <button
                          className="text-sm text-black/60 hover:underline"
                          onClick={() => {
                            setBioDraft(currentBio);
                            setIsEditingBio(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Friends */}
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={sectionInner}>
                <div className="space-y-3">
                  {friends.length === 0 ? (
                    <p className="text-sm text-black/60">No friends yet.</p>
                  ) : (
                    friends.slice(0, 8).map((f) => (
                      <div
                        key={f._id}
                        className="flex items-center justify-between border-b border-black/10 pb-2 last:border-b-0"
                      >
                        <span className="text-sm text-black/80">{f.name}</span>
                        <span className="text-xs text-black/60">{f.email}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={sectionInner}>
                <div className="grid grid-cols-3 gap-3">
                  {sidebarPhotos.length === 0 ? (
                    <p className="text-sm text-black/60 col-span-3">
                      No photos.
                    </p>
                  ) : (
                    sidebarPhotos.map((p) => (
                      <img
                        key={p._id}
                        src={`${API_BASE}/photos/${p._id}/file`}
                        alt={p.caption || "Photo"}
                        className="h-24 w-full object-cover rounded-md border border-black/10"
                      />
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos */}
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle>Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={sectionInner}>
                <div className="grid grid-cols-2 gap-3">
                  {sidebarVideos.length === 0 ? (
                    <p className="text-sm text-black/60 col-span-2">
                      No videos.
                    </p>
                  ) : (
                    sidebarVideos.map((v) => (
                      <video
                        key={v._id}
                        src={`${API_BASE}/videos/${v._id}/file`}
                        muted
                        className="h-28 w-full object-cover rounded-md border border-black/10"
                      />
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
