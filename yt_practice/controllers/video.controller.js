import cloudinary from "../config/cloudinary.config.js";
import Video from "../models/video.model.js";
import jwt from "jsonwebtoken";

export const uploadVideo = async (req,res) => {
    const { title, description, category, tags} = req.body;
    try{
        if(!req.files || !req.files.video || !req.files.thumbnail){
            return res.status(400).json({error: "Video and Thumbnail are required"});
        }

        const videoUpload = await cloudinary.uploader.upload(req.files.video.tempFilePath,{
            resource_type: "video",
            folder: "videos"
        });

        const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath,{
            folder: "thumbnails"
        });

        const newVideo = new Video({
            title,
            description,
            user_id: req.user._id,
            videoUrl: videoUpload.secure_url,
            videoId: videoUpload.public_id,
            thumbnailUrl: thumbnailUpload.secure_url,
            thumbnailId: thumbnailUpload.public_id,
            category,
            tags: tags ? tags.split(",") : [],
        })

        await newVideo.save();

        res.status(201).json({
            message: "Video Uploaded successfully",
            video: newVideo
        })

    } catch(error){
        console.log("something went wrong in uploadVideo controller");
        res.status(400).send({message: "Internal Server error"});
    }
}

export const updateVideo = async (req,res) => {
    const { title, description, category, tags} = req.body;
    try{
        const videoId = req.params.id;
        let video = await Video.findById(videoId);
        if(!video){
            return res.status(404).json({error: "Video not found"});
        }

        if(video.user_id.toString() !== req.user._id.toString()){
            return res.status(403).json({error: "Unauthorized access"});
        }

        if(req.files && req.files.thumbnail){
            await cloudinary.uploader.destroy(video.thumbnailId);

            const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, {
                folder: "thumbnails"
            })

            video.thumbnailUrl = thumbnailUpload.secure_url;
            video.thumbnailId = thumbnailUpload.public_id;
        }

        video.title = title || video.title;
        video.description = description || video.description;
        video.category = category || video.category;
        video.tags = tags ? tags.split(",") : video.tags;

        await video.save();
        res.status(200).json({
            message: "Video updated successfully",
            video
        })

    } catch(error){
        console.log("something went wrong in uploadVideo controller");
        res.status(400).send({message: "Internal Server error"});
    }
}

export const getAllVideos = async (req,res) => {
    try{
        const video = await Video.find();
        console.log(video);
        if(!video){
            res.json({error: "Something went wrong"});
        }

        res.status(201).json({
            video
        })
    } catch(error){
        console.log("something went wrong in getAllVideo controller");
        res.status(400).send({message: "Internal Server error"});
    }
}

export const getMyVideos = async (req, res) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({error: "No token is provided"});
        }
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);
        const videos = await Video.find({user_id: decodedUser._id});

        if(!videos){
            return res.status(404).json({message: "No videos found"});
        }

        res.status(201).json({
            videos
        })
    } catch(error){
        console.log("something went wrong in getMyVideos controller");
        res.status(400).send({message: "Internal Server error"});
    }
} 

export const getVideoById = async(req, res) => {
    try{
        const videoId = req.params.id;
        if(!videoId){
            return res.status(401).json({error: "Video id is a required parameter"});
        }

        const video = await Video.findById(videoId);
        if(!video){
            return res.status(401).json({error: "Video does not exist"});
        }

        res.status(201).json(video);
    } catch(error){
        console.log("something went wrong in getVideoById controller");
        res.status(400).send({message: "Internal Server error"});   
    }
}