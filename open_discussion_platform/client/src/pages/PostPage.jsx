import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/postStore";

const PostPage = () => {
  const { id } = useParams(); // /post/:id route param
  const { seletedPost, isPostsLoading, getPostById } = usePostStore();

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

  if (isPostsLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading post...
      </div>
    );
  }

  if (!seletedPost) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Post not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{seletedPost.title}</h1>
      <p className="text-gray-700 mb-4">{seletedPost.content}</p>
      <span className="text-sm text-gray-500">
        By {seletedPost.author?.username || "Anonymous"}
      </span>
    </div>
  );
};

export default PostPage;
