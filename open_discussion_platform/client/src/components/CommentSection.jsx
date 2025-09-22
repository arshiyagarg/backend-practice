import { useEffect, useState } from "react";
import { useCommentStore } from "../store/useCommentStore.js";
import { usePostStore } from "../store/usePostStore.js";

const CommentsSection = ({ postId }) => {
  const {
    comments,
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
    setSelectedComment,
    selectedComment,
  } = useCommentStore();

  const {
    seletedPost
  } = usePostStore();

  const [newComment, setNewComment] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (seletedPost) {
      getAllComments();
    }
  }, [seletedPost, getAllComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await createComment({ content: newComment, parentPost: postId });
    setNewComment("");
    getAllComments();
  };

  const handleUpdate = async (commentId) => {
    if (!editContent.trim()) return;
    await updateComment({ content: editContent });
    setEditMode(null);
    getAllComments();
  };

  const handleDelete = async (commentId) => {
    await deleteComment();
    getAllComments();
  };

  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border rounded-md p-2 focus:outline-none focus:ring"
          rows="3"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              onClick={() => setSelectedComment(comment)} // ✅ sets selected comment
              className={`bg-white p-3 rounded-md shadow-sm cursor-pointer ${
                selectedComment?._id === comment._id
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              {editMode === comment._id ? (
                <>
                  <textarea
                    className="w-full border rounded-md p-2"
                    rows="2"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUpdate(comment._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="flex gap-3 text-sm text-gray-500 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent overriding selection
                        setEditMode(comment._id);
                        setEditContent(comment.content);
                      }}
                      className="hover:text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent overriding selection
                        handleDelete(comment._id);
                      }}
                      className="hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsSection;
