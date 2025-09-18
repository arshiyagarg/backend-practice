import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
    createPost: async(data) => {
        try {
            const res = await axiosInstance.post("/post", data);
            toast.success("Post created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))