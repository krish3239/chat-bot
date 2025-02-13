import {create} from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:[],
    isUsersLoading:false,
    isMessagesLoading:false,


    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const res=await axiosInstance.get('/messages/users');
            console.log( "the data from get users is",res.data.filteredUsers)
            set({users:res.data.filteredUsers});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false});
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            console.log("frontend part userid is",userId)
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            //toast.error(error.response.data.message);  
        }finally{
            set({isMessagesLoading:false})
        }
    },
    setSelectedUser:(selectedUser)=>{
        set({selectedUser})
    },
    sendMessage:async (messageData)=>{
        const {selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    }
}))