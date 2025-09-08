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
    } catch(error){
        console.log("Error in createComment controller: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}