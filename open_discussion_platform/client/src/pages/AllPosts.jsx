import { useEffect } from "react";
import { usePostStore } from "../store/postStore";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const { posts, isPostsLoading, getAllPosts } = usePostStore();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  if (isPostsLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading posts...
      </div>
    );
  }

  if (!isPostsLoading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No posts yet. Be the first to create one!
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default AllPosts;
