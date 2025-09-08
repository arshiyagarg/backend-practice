import Post from "../models/post.model.js";

export const createPost = async (req,res) => {
    const {title, content} = req.body;
    const authorId = req.user._id;

    try{
        if(!title || !content){
            return res.json({message: "Error in createPost : all credentials are required"});
        }

        const newPost = new Post({
            title,
            content,
            author: authorId
        });

        await newPost.save();
        res.status(201).json({
            message: "Post successfull creater",
            data: newPost
        })
    } catch(error){
        console.log("Error in logout controller: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }

}