import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { usePostStore } from "./usePostStore.js";

export const useCommentStore = create((set, get) => ({
    selectedComment: null,
    comments: [],

    setSelectedComment: (comment) => set({ selectedComment: comment }),
    createComment: async(data) => {
        try {
            const res = await axiosInstance.post("/comment", data);
            set((state) => ({
                comments: [...state.comments, res.data],
            }));
            toast.success("Comment posted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, 
    updateComment: async(content) => {
        try {
            const res = await axiosInstance.put(`/comment/${selectedComment._id}`,content);
            set({selectedComment: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    deleteComment: async() => {
        try {
            await axiosInstance.delete(`/comment/${seletedPost._id}`);
            set({selectedComment: null})
            toast.success("Post deleted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    getAllComments: async() => {
        try{
            const postId = usePostStore().seletedPost._id;
            const res = await axiosInstance.get(`/comment/${postId}`);
            set({comments: res.data});
        } catch (error) {
            console.log( "Error in getAllComments" + error)
            toast.error(error?.response?.data?.message || "Failed to fetch comments");
        }
    }
}))