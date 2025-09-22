import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
    selectedPost : null,
    isPostsLoading : false,
    posts : [],

    setSelectedPost: (post) => set({ selectedPost: post }),
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
            set({posts:res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isPostsLoading: false });
        }
    },
    updatePost: async(content) => {
        try {
            const res = await axiosInstance.put(`/post/${selectedPost._id}`,content);
            set({selectedPost: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    deletePost: async() => {
        try {
            const res = await axiosInstance.delete(`/post/${selectedPost._id}`);
            set({selectedPost: null})
            toast.success("Post deleted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, 
    getPostById: async (postId) => {
        set({ isPostsLoading: true, selectedPost: null });
        try {
            const res = await axiosInstance.get(`/post/${postId}`);
            set({ selectedPost: res.data.post });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching post");
        } finally {
            set({ isPostsLoading: false });
        }
    },

}))