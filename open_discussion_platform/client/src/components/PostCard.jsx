import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        {/* <p className="text-gray-700 mb-2 line-clamp-2">{post.content}</p> */}
        <span className="text-sm text-gray-500">
          By {post.author?.username || "Anonymous"}
        </span>
      </div>
    </Link>
  );
};

export default PostCard;
