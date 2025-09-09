import cloudinary from "../config/cloudinary.config.js";
import Video from "../models/video.model.js";

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