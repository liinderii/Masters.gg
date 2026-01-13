import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { Video } from "../../types/video";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
const videoFileUrl = (id: string) => `${API_BASE}/videos/${id}/file`;

type Props = {
  video: Video;
  onDelete: (videoId: string) => Promise<void> | void;
};

export const VideoActionsDialog = ({ video, onDelete }: Props) => {
  const [open, setOpen] = useState(false);

  const src = useMemo(() => videoFileUrl(video._id), [video._id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Thumbnail-kort: INGEN text-overlay */}
        <button
          type="button"
          className="relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-none w-full text-left"
          title="Open video"
        >
          <video
            src={src}
            className="h-40 w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />

          {/* Valfri: subtil hover-overlay utan text */}
          <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition bg-black/5" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-white text-black">
        <DialogHeader>
          {/* Om du inte vill ha titel här heller: kan tas bort helt */}
          <DialogTitle className="text-black">
            {video.title?.trim() ? video.title : "Video"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-black/10 bg-black">
            <video src={src} controls className="w-full max-h-[70vh]" />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={async () => {
                await onDelete(video._id);
                setOpen(false);
              }}
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-red-600 hover:bg-black/[0.03]"
            >
              Delete
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
