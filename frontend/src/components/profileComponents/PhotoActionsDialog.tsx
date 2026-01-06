import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import type { Photo } from "../../types/photo";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

type Props = {
  photo: Photo;
  onSetProfile: (id: string) => Promise<void>;
  onSetCover: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function PhotoActionsDialog({
  photo,
  onSetProfile,
  onSetCover,
  onDelete,
}: Props) {
  const imgSrc = `${API_BASE}/photos/${photo._id}/file`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="w-full">
          <img
            src={imgSrc}
            alt={photo.caption || "Photo"}
            className="w-full h-48 object-cover rounded border border-white/10 hover:opacity-90 transition"
            loading="lazy"
          />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-gray-900">
        <DialogHeader>
          <DialogTitle>Photo actions</DialogTitle>
        </DialogHeader>

        <div className="rounded overflow-hidden border border-white/10">
          <img
            src={imgSrc}
            alt={photo.caption || "Photo"}
            className="w-full max-h-[50vh] object-contain bg-black/20"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4">
          <Button
            type="button"
            className="w-full text-white"
            onClick={() => onSetProfile(photo._id)}
          >
            Add profile picture
          </Button>

          <Button
            type="button"
            className="w-full text-white"
            onClick={() => onSetCover(photo._id)}
          >
            Add cover photo
          </Button>

          <Button
            type="button"
            className="w-full text-white"
            onClick={() => onDelete(photo._id)}
          >
            Delete photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
