import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader as DialogHead,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const ProfileHeader = () => {
  return (
    <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border-0 shadow-none">
      <CardHeader className="p-0">
        <img
          src="/profile.jpg"
          alt="Profile header"
          className="block h-100 w-full object-cover rounded-lg"
        />
      </CardHeader>

      <CardContent className="relative p-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/avatar.jpg"
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
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded px-8 w-50 h-12 text-sm font-bold text-white bg-violet-400 hover:bg-violet-500 font-semibold ">
                  Add Story
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHead>
                  <DialogTitle>Add Story</DialogTitle>
                  <DialogDescription>
                    Add a new story to your profile.
                  </DialogDescription>
                </DialogHead>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded px-8 w-50 h-12 text-sm font-bold text-white bg-violet-400 hover:bg-violet-500 font-semibold ">
                  Edit Profile
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHead>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Edit your profile information.
                  </DialogDescription>
                </DialogHead>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <hr className="mt-10" />
      </CardContent>
    </Card>
  );
};
