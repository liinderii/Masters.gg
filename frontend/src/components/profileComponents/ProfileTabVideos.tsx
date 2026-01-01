import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { mockProfileVideos } from "../../data/mockProfileVideos";
import { Input } from "../ui/input";

export const ProfileVideos = () => {
  const data = mockProfileVideos;
  return (
    <>
      <div className="space-y-6">
        <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
          <CardHeader>
            <CardTitle>Videos</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input className="p-2 rounded-md" placeholder="Search videos..." />
            <div className="flex gap-4 flex-wrap">
              <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                Your videos ({data.yourVideos.length})
              </button>
              <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                Tagged videos ({data.taggedVideos.length})
              </button>
              <button className="px-3 py-2 bg-emerald-500 text-white rounded-md border border-white/20">
                Live streams ({data.liveStreams.length})
              </button>
              <button className="px-3 py-2 bg-emerald-500 text-white rounded-md hover:opacity-90">
                Add video / Go live
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full mx-auto max-w-[1600px] overflow-hidden gap-0 border shadow-none">
        <CardHeader>
          <CardTitle>Your Videos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.yourVideos.length === 0 && (
            <p className="text-sm text-gray-400">No videos to display.</p>
          )}

          {data.yourVideos.map((video) => (
            <div
              key={video.id}
              className="border border-white/10 rounded overflow-hidden"
            >
              {video.thumbnailUrl && (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full object-cover"
                />
              )}

              <p>{video.title}</p>
              <p>
                {video.game} {video.views} views
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          <button className="text-sm text-emerald-400 hover:underline">
            View
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tagged Videos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.taggedVideos.length === 0 && (
            <p className="text-sm text-gray-400">
              No tagged videos to display.
            </p>
          )}

          {data.taggedVideos.map((video) => (
            <div
              key={video.id}
              className="border border-white/10 rounded overflow-hidden"
            >
              {video.thumbnailUrl && (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full object-cover"
                />
              )}

              <p>{video.title}</p>
              <p>
                {video.game} {video.views} views
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          <button className="text-sm text-emerald-400 hover:underline">
            View
          </button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Live Streams</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.liveStreams.length === 0 && (
            <p className="text-sm text-gray-400">No live streams to display.</p>
          )}

          {data.liveStreams.map((stream) => (
            <div
              key={stream.id}
              className="border border-white/10 rounded overflow-hidden"
            >
              {stream.thumbnailUrl && (
                <img
                  src={stream.thumbnailUrl}
                  alt={stream.title}
                  className="w-full object-cover"
                />
              )}

              <p>{stream.title}</p>
              <p>
                {stream.game} {stream.views} viewers
                {new Date(stream.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          <button className="text-sm text-emerald-400 hover:underline">
            View
          </button>
        </CardContent>
      </Card>
    </>
  );
};
