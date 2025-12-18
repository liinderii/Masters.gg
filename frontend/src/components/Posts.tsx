import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import type { Post } from "../types/post";

export const Posts = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.caption}</CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent className="h-100">
        {post.text && <p>{post.text}</p>}
        {post.media?.type === "image" ? (
          <img
            src={post.media.src}
            alt={post.caption ?? "Post"}
            className="mt-4 w-full object-cover"
          />
        ) : post.media?.type === "video" ? (
          <video
            src={post.media.src}
            className="mt-4 w-full object-cover"
            controls
          />
        ) : null}
        {post.caption ? <p className="mt-4">{post.caption}</p> : null}
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
