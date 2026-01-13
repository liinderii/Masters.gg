import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Photo } from "../../types/photo";
import { PhotoActionsDialog } from "./PhotoActionsDialog";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const ProfilePhotos = () => {
  const [yourPhotos, setYourPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function fetchPhotos() {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/photos`, {
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        setYourPhotos([]);
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch photos");

      const data = (await res.json()) as Photo[];
      setYourPhotos(data);
    } catch (e) {
      console.error(e);
      setError("An error occurred while fetching photos.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      const form = new FormData();
      form.append("file", file);
      form.append("caption", "");
      form.append("origin", "profile");

      const res = await fetch(`${API_BASE}/photos`, {
        method: "POST",
        credentials: "include",
        body: form,
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) throw new Error("Failed to upload photo");

      const created = (await res.json()) as Photo;
      setYourPhotos((prev) => [created, ...prev]);
    } catch (e) {
      console.error(e);
      setError("An error occurred while uploading the photo.");
    } finally {
      setIsUploading(false);
    }
  };

  const setAsProfile = async (photoId: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/photos/${photoId}/set-profile`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) throw new Error("Failed to set profile photo");
    } catch (e) {
      console.error(e);
      setError("Could not set profile photo.");
    }
  };

  const setAsCover = async (photoId: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/photos/${photoId}/set-cover`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) throw new Error("Failed to set cover photo");
    } catch (e) {
      console.error(e);
      setError("Could not set cover photo.");
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/photos/${photoId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized");
        return;
      }
      if (!res.ok) throw new Error("Failed to delete photo");

      setYourPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (e) {
      console.error(e);
      setError("Could not delete photo.");
    }
  };

  const pageBg = "bg-gray-100";
  const cardBase = "bg-white border border-black/10 shadow-none rounded-xl";
  const sectionInner = "rounded-xl border border-black/10 bg-black/[0.02] p-5";

  return (
    <section className={`w-full ${pageBg}`}>
      <div className="mx-auto max-w-[1600px] px-4 py-10 space-y-6">
        <Card className={cardBase}>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>

          <CardContent>
            <div className={sectionInner}>
              <div className="flex gap-4 flex-wrap">
                <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                  Photos of you (0)
                </button>

                <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                  Your photos ({yourPhotos.length})
                </button>

                <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                  Albums (0)
                </button>

                <button
                  type="button"
                  className="px-3 py-2 bg-emerald-500 text-white rounded-md hover:opacity-90 disabled:opacity-60"
                  onClick={handlePickFile}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Add photos / video"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleUpload(f);
                    e.currentTarget.value = "";
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={cardBase}>
          <CardHeader>
            <CardTitle>Your photos</CardTitle>
          </CardHeader>

          <CardContent>
            <div className={sectionInner}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {error && (
                  <p className="text-sm text-red-500 col-span-full">{error}</p>
                )}

                {isLoading && (
                  <p className="text-sm text-black/60 col-span-full">
                    Loading…
                  </p>
                )}

                {!isLoading && yourPhotos.length === 0 && !error && (
                  <p className="text-sm text-black/60 col-span-full">
                    No uploads yet
                  </p>
                )}

                {yourPhotos.map((photo) => (
                  <PhotoActionsDialog
                    key={photo._id}
                    photo={photo}
                    onSetProfile={setAsProfile}
                    onSetCover={setAsCover}
                    onDelete={deletePhoto}
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
