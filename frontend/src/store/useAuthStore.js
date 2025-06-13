import { create } from "zustand";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axiosSetup";
import toast from "react-hot-toast";
const BASE_URL =import.meta.env.MODE === "development"? "http://localhost:3000" :"/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggin: false,
  isUpdating: false,
  isCheckingAuth: true,
  isLogout: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error, "From useAuthStore.js");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      get().connectSocket();
      return res?.data;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  loginfn: async (data) => {
    try {
      set({ isLoggin: true });
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res?.data?.data });
      toast.success("Logged Successfully");

      console.log("login", res);
      get().connectSocket();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggin: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      return res?.data;
    } catch (error) {
      console.log("error from store logout", error);
    } finally {
      set({ isLogout: true });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update", data);
      set({ authUser: res?.data?.data });

      return res?.data?.data;
    } catch (error) {
      console.log("error from updateProfile store", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const {authUser}=get();
    if(!authUser || get().socket?.connected) return
    const socket = io(BASE_URL,{
        withCredentials:true,
        query:{
            userId:authUser._id
        }
    })
    socket.connect()
    set({socket:socket})

    socket.on("onlineuser",(users)=>{
        set({onlineUsers:users})
    })
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
