import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import type { Video } from "../../types/video";
import { VideoActionsDialog } from "./VideoActionsDialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const ProfileVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function fetchVideos() {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/videos`, { credentials: "include" });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        setVideos([]);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch videos");

      const data = (await res.json()) as Video[];
      setVideos(data);
    } catch (e) {
      console.error(e);
      setError("An error occurred while fetching videos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePickVideo = () => fileInputRef.current?.click();

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      const form = new FormData();
      form.append("file", file);
      form.append("title", file.name.replace(/\.[^/.]+$/, ""));
      form.append("game", "");
      form.append("origin", "profile");

      const res = await fetch(`${API_BASE}/videos`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) {
        const msg = await res.json().catch(() => null);
        throw new Error(msg?.message ?? "Upload failed");
      }

      const created = (await res.json()) as Video;
      setVideos((prev) => [created, ...prev]);
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? "An error occurred while uploading the video.");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteVideo = async (videoId: string) => {
    try {
      setError(null);

      const res = await fetch(`${API_BASE}/videos/${videoId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) throw new Error("Failed to delete video");

      setVideos((prev) => prev.filter((v) => v._id !== videoId));
    } catch (e) {
      console.error(e);
      setError("Could not delete video.");
    }
  };

  const filtered = videos.filter((v) => {
    const hay = `${v.title ?? ""} ${v.game ?? ""}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  const pageBg = "bg-gray-100";
  const cardBase = "bg-white border border-black/10 shadow-none rounded-xl";
  const sectionInner = "rounded-xl border border-black/10 bg-black/[0.02] p-5";
  const inputStyle =
    "bg-white text-black border-black/10 placeholder:text-black/40";

  return (
    <section className={`w-full ${pageBg}`}>
      <div className="mx-auto max-w-[1600px] px-4 py-10 space-y-6">
        <Card className={cardBase}>
          <CardHeader>
            <CardTitle>Videos</CardTitle>
          </CardHeader>

          <CardContent>
            <div className={sectionInner}>
              <div className="flex flex-col gap-4">
                <Input
                  className={`p-2 rounded-md ${inputStyle}`}
                  placeholder="Search videos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <div className="flex gap-4 flex-wrap">
                  <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                    Your videos ({videos.length})
                  </button>

                  <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                    Tagged videos (0)
                  </button>

                  <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                    Live streams (0)
                  </button>

                  <button
                    type="button"
                    className="px-3 py-2 bg-emerald-500 text-white rounded-md hover:opacity-90 disabled:opacity-60"
                    onClick={handlePickVideo}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Add video / Go live"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                      e.currentTarget.value = "";
                    }}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cardBase}>
          <CardHeader>
            <CardTitle>Your videos</CardTitle>
          </CardHeader>

          <CardContent>
            <div className={sectionInner}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isLoading && (
                  <p className="text-sm text-black/60 col-span-full">
                    Loading…
                  </p>
                )}

                {!isLoading && filtered.length === 0 && !error && (
                  <p className="text-sm text-black/60 col-span-full">
                    No videos to display.
                  </p>
                )}

                {filtered.map((video) => (
                  <VideoActionsDialog
                    key={video._id}
                    video={video}
                    onDelete={deleteVideo}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
