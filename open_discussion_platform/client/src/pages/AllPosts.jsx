import { useEffect } from "react";
import { usePostStore } from "../store/usePostStore.js";
import PostCard from "../components/PostCard";
import Spinner from "../assets/spinner.jsx";

const AllPosts = () => {
  const { posts, isPostsLoading, getAllPosts } = usePostStore();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  if (isPostsLoading) {
    return (
      <div className="flex justify-center items-center py-24 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Spinner />
          <span>Loading posts...</span>
        </div>
      </div>
    )
  }

  if (!isPostsLoading && (!posts || posts.length === 0)) {
    return (
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg border bg-card p-10 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-accent-foreground">
              <path
                fill="currentColor"
                d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5zM6 7v10h12V7zm2 2h8v1H8zm0 3h8v1H8zm0 3h5v1H8z"
              />
            </svg>
            <span className="sr-only">No posts</span>
          </div>
          <h2 className="mb-2 text-balance text-lg font-medium">No posts yet</h2>
          <p className="text-muted-foreground">Be the first to create one!</p>
        </div>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">All Posts</h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </header>

      <section aria-label="Posts" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="animate-in fade-in-50 duration-300">
            <PostCard post={post} />
          </div>
        ))}
      </section>
    </main>
  )
};

export default AllPosts;
