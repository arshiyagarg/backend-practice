import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user._id;

  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "All fields are required" });
    }

    const newPost = new Post({
      title,
      content,
      author: authorId,
    });

    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,   
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email"); // optional populate
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res
        .status(400)
        .json({ error: "Required inputs are not given" });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, author: userId },
      { content },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this post or post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,  
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    if (!deletedPost) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post or post not found" });
    }

    res.status(200).json({
      message: "Post has been successfully deleted",
      post: deletedPost,  
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getPostById = async (req, res) => {
    try{
        const { postId } = req.params;
        const post = await Post.findOne({_id: postId});
        
        if(!post){
            return res.status(403).json({error: "No such post exists"});
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    }
};
