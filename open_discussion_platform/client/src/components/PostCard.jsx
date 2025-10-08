import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


const PostCard = ({ post }) => {
  const { setSelectedPost } = usePostStore();

  const handleClick = () => {
    setSelectedPost(post);
  };

  return (
    <Link to={`/post/${post._id}`} onClick={handleClick}>
      {/* <div className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <span className="text-sm text-gray-500">
          By {post.author?.username || "Anonymous"}
        </span>
      </div> */}
      <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-shadow hover:shadow-md">
      {/* <div className="aspect-[16/9] w-full bg-muted">
        <img
          src={cover || "/placeholder.svg?height=360&width=640&query=post%20cover"}
          alt={`Cover image for ${title}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div> */}

      <header className="p-4 pb-2">
        <h3 className="text-balance text-base font-semibold">{post.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="text-xs text-gray-400">
            Posted on {formatDate(post.createdAt)}
          </span>
        </div>
      </header>

      <div className="p-4 pt-0">
        <p className="line-clamp-3 text-sm text-muted-foreground">{post.content}</p>
      </div>

      <footer className="p-4 pt-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90"
          aria-label="Read more"
        >
          Read more
        </button>
      </footer>
    </article>
    </Link>
  );
};

export default PostCard;
