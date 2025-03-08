import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/user"); // Updated endpoint
            set({ users: res.data });
        } catch (error) {
            console.error('Error fetching users:', error); // Log the error for debugging
            toast.error(error.response?.data?.message || 'Failed to fetch users');
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ message: res.data });
        } catch (error) {
            console.error('Error fetching messages:', error); // Log the error for debugging
            toast.error(error.response?.data?.message || 'Failed to fetch messages');
        } finally {
            set({ isMessageLoading: false });
        }
    },
    // todo: implement the sendMessage function
    setSelectedUser: (user) => set({ selectedUser: user }),
}));