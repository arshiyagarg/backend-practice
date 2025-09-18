import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
    seletedPost : null,
    isPostsLoading : false,
    posts : [],

    createPost: async(data) => {
        try {
            const res = await axiosInstance.post("/post", data);
            toast.success("Post created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    getAllPosts: async() => {
        set({isPostsLoading: true})
        try{
            const res = await axiosInstance.get("/post");
            set({posts:res.posts})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isPostsLoading: false });
        }
    },
    updatePost: async(content) => {
        try {
            const res = await axiosInstance.put(`/post/${seletedPost._id}`,content);
            set({seletedPost: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    deletePost: async() => {
        try {
            const res = await axiosInstance.delete(`/post/${seletedPost._id}`);
            set({seletedPost: null})
            toast.success("Post deleted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))