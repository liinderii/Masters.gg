import { mockPosts } from "../data/mockPosts";
import { Posts } from "./Posts";
import { useState } from "react";

export const PostGrid = () => {
  const [open, setOpen] = useState();
  return (
    <section>
      <div className="grid gap-4">
        {mockPosts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
