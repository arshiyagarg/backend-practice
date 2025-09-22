import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";
import CommentsSection from "../components/CommentSection";

const PostPage = () => {
  const { id } = useParams(); 
  const { selectedPost, isPostsLoading, getPostById } = usePostStore();

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

  if (!selectedPost) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Post not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{selectedPost.title}</h1>
      <span className="text-sm text-gray-500">
        By {selectedPost.author?.username || "Anonymous"}
      </span>
      <p className="text-gray-700 mb-2">{selectedPost.content}</p>

      <CommentsSection postId={id} />
    </div>
  );
};

export default PostPage;
