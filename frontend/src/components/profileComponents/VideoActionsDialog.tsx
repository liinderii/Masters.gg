// src/components/profile/VideoActionsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import type { Video } from "../../types/video";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type Props = {
  video: Video;
  onDelete: (id: string) => Promise<void>;
};

export function VideoActionsDialog({ video, onDelete }: Props) {
  const src = `${API_BASE}/videos/${video._id}/file`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="w-full text-left">
          <div className="relative w-full h-48 rounded border border-white/10 overflow-hidden hover:opacity-90 transition">
            {/* Thumbnail preview */}
            <video
              className="w-full h-full object-cover"
              src={src}
              preload="metadata"
              muted
              playsInline
            />

            {/* Overlay (title + meta) */}
            <div className="absolute inset-x-0 bottom-0 p-2 bg-black/55">
              <p className="text-sm font-medium truncate">
                {video.title || "Untitled video"}
              </p>
              <p className="text-[11px] text-gray-200/80 truncate">
                {video.game || "No game"} •{" "}
                {video.createdAt
                  ? new Date(video.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>

            {/* Play icon indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-3 py-1 rounded-full bg-black/55 border border-white/15 text-xs">
                Play
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl bg-gray-900">
        <DialogHeader>
          <DialogTitle>{video.title || "Video"}</DialogTitle>
        </DialogHeader>

        <div className="rounded overflow-hidden border border-white/10">
          <video
            src={src}
            controls
            autoPlay
            className="w-full max-h-[55vh] bg-black/20"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4">
          <Button type="button" variant="secondary" className="w-full" disabled>
            Profile
          </Button>
          <Button type="button" variant="secondary" className="w-full" disabled>
            Cover
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={() => onDelete(video._id)}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
