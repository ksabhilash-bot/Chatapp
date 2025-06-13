import { create } from "zustand";
import { axiosInstance } from "../lib/axiosSetup";
import toast from 'react-hot-toast'
import {useAuthStore} from './useAuthStore'
export const useMessageStore= create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        try {
            set({isUsersLoading:true});
            const res = await axiosInstance.get('/message/user');
            set({users:res?.data?.filteredUsers})
        } catch (error) {
            console.log("error from message store",error)
            
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(id)=>{
        try {
            set({isMessagesLoading:true})
            const res= await axiosInstance.get(`/message/${id}`)
            console.log(res?.data?.messages)
            set({messages:res?.data?.messages})
            
        } catch (error) {
            console.log("Error in message",error)
           
            
        }finally{
            set({isMessagesLoading:false})

        }
    },
    setSelectedUser:(data)=>{
        set({selectedUser:data})
    },
    sendMessage:async(messageData)=>{
        try {
            const {messages,selectedUser}=get()
            const res= await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
            console.log(res)
            set({messages:[...messages,res?.data]})
            console.log(messages)

        } catch (error) {
            console.log("Error",error)
            toast.error("Failed to send message")
            
            
        }
    },
    subscribeMessages:()=>{
        const {selectedUser}=get()
        if(! selectedUser) return;

        const socket =useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId != selectedUser._id) return;
            set({
            messages:[...get().messages,newMessage]    
            })
        })
    },
    unSubscribeMessages:()=>{
       const socket = useAuthStore.getState().socket;
       socket.off("newMessage")
    },
}))
