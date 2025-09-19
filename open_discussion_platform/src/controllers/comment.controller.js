import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
    const {content, parentPost} = req.body;
    const author = req.user._id;
    try{
        if(!content || !parentPost){
            return res.json({message: "Invalid credentials in createComment"});
        }

        const newComment = new Comment({
            content,
            parentPost,
            author
        })

        if(!newComment){
            return res.json({message: "Internal Sever Error in createComment"});
        }

        await newComment.save();
        res.status(201).json({
            message: "Comment Added",
            data: newComment
        })
    } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "something went wrong", message: error.message });
  }
}

export const updateComment = async (req, res) =>{
    try{
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user._id
        if(!content){
            return res.status(400).json({error: "Required inputs are not given"})
        }

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: commentId, author: userId }, 
            { content },
            { new: true } 
        );

        if (!updatedComment) {
            return res.status(403).json({ error: "Not authorized to update this post or post not found" });
        }

        res.data = updatedComment;
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedComment,
        });
    } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "something went wrong", message: error.message });
  }
}

export const deleteComment = async (req, res) =>{
    try{
        const { commentId } = req.params;
        const userId = req.user._id;
        const deletedComment = await Comment.findOneAndDelete(
            {_id: commentId, author: userId}
        )

        if(!deletedComment){
            return res.status(403).json({ error: "Not authorized to delete this post or post not found" });
        }

        res.status(200).json({
            message: "Post has been successfully deleted",
            deletedComment
        })
    } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "something went wrong", message: error.message });
  }
}

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ parentPost: postId });

    if (comments.length === 0) {
      return res.status(200).json({
        message: "There are no comments yet!",
        comments: [],
      });
    }

    res.status(200).json({
      message: "Comments successfully fetched",
      comments,
    });
  } catch (error) {
    console.log("Error in getAllComments:", error.message);
    res.status(500).json({ error: "Something went wrong", message: error.message });
  }
};
