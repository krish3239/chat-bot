import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL='https://chat-bot-backend-kwxg.onrender.com'
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  socket:null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({authUser:res.data})
      // get().connectSocket();
    } catch (error) {
        console.log("error occured",error)
        set({authUser:null})
    }finally{
        set({isCheckingAuth:false})
    }
  },
  login:async(data)=>{
    set({isLoggingIn:true});
    try {
      const res=await axiosInstance.post('/auth/login',data);
      set({authUser:res.data});
      toast.success("Logged in Successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error)
      toast.error(error.response);
    }finally{
      set({isLoggingIn:false});
    }
  },

  updateProfile:async(data)=>{
    set({isUpdatingProfile:true})
    try {
      const res=await axiosInstance.put('/auth/update-profile',data);
      set({authUser:res.data})
      console.log("profile updated")
      toast.success("Profile Updated successfully")
    } catch (error) {
      console.log("error in update profile:",error)
      toast.error(error.response.data.message)
    }
    finally{
      set({isUpdatingProfile:false})
    }
  },



  signup:async (data)=>{
    set({isSigningUp:true})
    try {
      const res =await axiosInstance.post("/auth/signup",data)
      set({authUser:res.data})
      toast.success("Account created successfully");
      // get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      set({isSigningUp:false});
    }
  },
  logout:async()=>{
    try {
      await axiosInstance.post('/auth/logout');
      set({authUser:null});
      toast.success("Logged out successfully")
      // get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  connectSocket:()=>{
  //   const {authUser}=get()
  //   if(!authUser||get().socket?.connected)return 
  //  const socket=io(BASE_URL)
  //  socket.connect()
  },
  disconnectSocket:()=>{

  }

}));
