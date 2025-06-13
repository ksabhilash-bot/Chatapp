import React, { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'
const Homepage = () => {
  const {getUsers,getMessages,users,isMessagesLoading,selectedUser,messages,isUsersLoading}=useMessageStore()
  useEffect(()=>{
    getUsers()

  },[getUsers])
  
  return (
    <div className='h-screen  bg-base-200'>
      <div className="flex items-center justify-center pt-10 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-7xl h-[calc(93vh-5rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selectedUser?<NoChatSelected/>:<ChatContainer/>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage