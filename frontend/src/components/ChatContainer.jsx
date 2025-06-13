import React, { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useAuthStore } from '../store/useAuthStore'
import {} from "lucide-react"
import { formatTime } from '../lib/utils'


const ChatContainer = () => {
  const {authUser} = useAuthStore()
  const {messages,getMessages,selectedUser,subscribeMessages,unSubscribeMessages}=useMessageStore()
  useEffect(()=>{
    getMessages(selectedUser?._id)
    subscribeMessages();

    return ()=>unSubscribeMessages();
  },[getMessages,selectedUser?._id,subscribeMessages,unSubscribeMessages])
  
  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {
          messages.map((message)=>(
            <div key={message._id}
            className={`chat ${message.senderId === authUser._id ?"chat-end":"chat-start"}`}
            >
              <div className="chat-image-avatar">
                <div className="size-10 rounded-full border">
                  <img src={message.senderId===authUser._id? authUser?.profilePic || '/avatar.png' : selectedUser.ProfilePic || '/avatar.png' } alt="" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className='text-xs opacity-50 ml-1'>{formatTime(message.createdAt)}</time>
              </div>
              <div className="chat-bubble flex flex-col">
                {
                  message?.image && (
                    <img src={message.image}
                    className='sm:max-w-[200px] rounded-md mb-2'
                    />
                  )
                }
                {
                  message.text && <p>{message.text}</p>
                }
              </div>

            </div>
          ))
        }
      </div>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer