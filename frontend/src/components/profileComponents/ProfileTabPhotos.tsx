import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { mockProfilePhotos } from "../../data/mockProfilePhotos";

export const ProfilePhotos = () => {
  const data = mockProfilePhotos;

  return (
    <div className="space-y-6">
      {/* ACTION CARD */}
      <Card className="w-full mx-auto max-w-[1600px] overflow-hidden border shadow-none">
        <CardHeader>
          <CardTitle>Photos</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
            Photos of you ({data.taggedPhotos.length})
          </button>
          <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
            Your photos ({data.yourPhotos.length})
          </button>
          <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
            Albums ({data.albums.length})
          </button>
          <button className="px-3 py-2 bg-emerald-500 text-white rounded-md hover:opacity-90">
            Add photos / video
          </button>
        </CardContent>
      </Card>

      {/* TAGGED PHOTOS */}
      <Card className="w-full mx-auto max-w-[1600px] overflow-hidden border shadow-none">
        <CardHeader>
          <CardTitle>Photos of you</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.taggedPhotos.length === 0 && (
            <p className="text-sm text-gray-400">No tagged photos yet</p>
          )}

          {data.taggedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="rounded overflow-hidden border border-white/10"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full object-cover"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* YOUR PHOTOS */}
      <Card className="w-full mx-auto max-w-[1600px] overflow-hidden border shadow-none">
        <CardHeader>
          <CardTitle>Your photos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.yourPhotos.length === 0 && (
            <p className="text-sm text-gray-400">No uploads yet</p>
          )}

          {data.yourPhotos.map((photo) => (
            <div
              key={photo.id}
              className="rounded overflow-hidden border border-white/10"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full object-cover"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ALBUMS */}
      <Card className="w-full mx-auto max-w-[1600px] overflow-hidden border shadow-none">
        <CardHeader>
          <CardTitle>Albums</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {data.albums.length === 0 && (
            <p className="text-sm text-gray-400">No albums created yet</p>
          )}

          {data.albums.map((album) => (
            <div
              key={album.id}
              className="flex justify-between items-center border-b border-white/10 pb-2 last:border-b-0"
            >
              <span>{album.title}</span>
              <span className="text-xs text-gray-400">
                {album.photos} photos
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
