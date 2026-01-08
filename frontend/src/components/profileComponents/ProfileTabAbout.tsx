// src/components/profile/ProfileAboutColumns.tsx
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

  // 👉 Intro edit state
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState("");

  const sidebarPhotos = useMemo(() => photos.slice(0, 6), [photos]);
  const sidebarVideos = useMemo(() => videos.slice(0, 4), [videos]);

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

  useEffect(() => {
    fetchAll();
  }, []);

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
    <div className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}
      {isLoading && <p className="text-sm text-gray-400">Loading…</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Intro / Bio */}
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle>Intro</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {!isEditingBio && (
              <>
                {currentBio ? (
                  <p className="text-sm whitespace-pre-line">{currentBio}</p>
                ) : (
                  <p className="text-sm text-gray-400">No bio added yet.</p>
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
              <div className="space-y-3">
                <textarea
                  className="w-full min-h-[120px] rounded-md border border-white/10 bg-transparent p-3 text-sm outline-none focus:border-white/30"
                  placeholder="Write something about yourself…"
                  value={bioDraft}
                  onChange={(e) => setBioDraft(e.target.value)}
                />

                <div className="flex gap-2">
                  <button className={buttons} onClick={saveBio}>
                    Save
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-gray-400 hover:underline"
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
          </CardContent>
        </Card>

        {/* Friends */}
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle>Friends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {friends.length === 0 ? (
              <p className="text-sm text-gray-400">No friends yet.</p>
            ) : (
              friends.slice(0, 8).map((f) => (
                <div
                  key={f._id}
                  className="flex items-center justify-between border-b border-white/10 pb-2 last:border-b-0"
                >
                  <span className="text-sm">{f.name}</span>
                  <span className="text-xs text-gray-400">{f.email}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {sidebarPhotos.length === 0 ? (
              <p className="text-sm text-gray-400 col-span-3">No photos.</p>
            ) : (
              sidebarPhotos.map((p) => (
                <img
                  key={p._id}
                  src={`${API_BASE}/photos/${p._id}/file`}
                  alt={p.caption || "Photo"}
                  className="h-20 w-full object-cover rounded border border-white/10"
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Videos */}
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle>Videos</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {sidebarVideos.length === 0 ? (
              <p className="text-sm text-gray-400 col-span-2">No videos.</p>
            ) : (
              sidebarVideos.map((v) => (
                <video
                  key={v._id}
                  src={`${API_BASE}/videos/${v._id}/file`}
                  className="h-24 w-full object-cover rounded border border-white/10"
                  muted
                />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
