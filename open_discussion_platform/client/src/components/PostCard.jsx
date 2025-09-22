import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";

const PostCard = ({ post }) => {
  const { setSelectedPost } = usePostStore();

  const handleClick = () => {
    setSelectedPost(post);
  };

  return (
    <Link to={`/post/${post._id}`} onClick={handleClick}>
      <div className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <span className="text-sm text-gray-500">
          By {post.author?.username || "Anonymous"}
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
