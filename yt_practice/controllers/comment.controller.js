import Comment from "../models/comment.model.js";

export const add = async (req, res) =>{
    try{
        const {videoId, commentText} = req.body;
        const userId = req.user._id;

        const newComment = await Comment({
            videoId,
            userId,
            commentText
        })

        if(newComment){
            newComment.save();
            return res.status(200).json({
                message: "Comment successfully Added",
                newComment
            })
        }

        res.status(400).json({
            error: "Error in Adding Comment"
        })
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "something went wrong", message: error.message });
    }
}

export const deleteComment = async (req, res) =>{
    try{
        const {commentId} = req.params;

        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if(deletedComment){
            return res.status(200).json({
                message: "comment successfully deleted",
                deletedComment
            })
        }

        res.status(400).json({
            error: "Comment is wrong"
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
        const {commentId} = req.params;
        const {text} = req.body;

        if(!text || !commentId){
            return res.status(400).json({message : "All required inputs are not provided"});
        }

        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            commentText : text
        })

        if(updatedComment){
            return res.status(200).json({
                message: "Comment is successfully updated",
                updatedComment
            })
        }

        res.status(400).json({error : "The comment is not updated, no such comment exists"});
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "something went wrong", message: error.message });
    }
}

export const getAllComments = async (req, res) =>{
    try{
        const {videoId} = req.params;

        if(!videoId){
            return res.status(400).json({message : "All required inputs are not provided"});
        }

        // const comments = await Comment.find({videoId}).populate("channelName","logoUrl").sort({createdAt: -1});
        const comments = await Comment.find({videoId}).sort({createdAt: -1});

        if(comments.length === 0){
            return res.status(200).json({
                message: "There are no comments yet!",
            })
        }

        res.status(200).json({
            message: "All Comments are fetched",
            comments
        });
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({ error: "something went wrong", message: error.message });
    }
}