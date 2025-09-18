import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useCommentStore = create((set, get) => ({
    createComment: async(data) => {
        try {
            const res = await axiosInstance.post("/comment", data);
            toast.success("Comment posted Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))