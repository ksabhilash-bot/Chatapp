import React from 'react'
import { Settings,LogOut,UserRoundPen ,MessageCircle  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate=useNavigate()
  const {authUser,logout}=useAuthStore()
  const handleLogout=async()=>{
    const res = await logout()
    if(res?.success){
      toast.success("Logout Successfully")
    }
    document.cookie = 'jwt=; Max-Age=0; path=/;';
    navigate('/login')
  }
  return (
    <div className='bg-neutral-950 text-white flex justify-between px-10 py-2 z-99'>
      <div className={`boldonse-regular lg:text-4xl`}>Connecto</div>
      <div className='flex justify-evenly items-center gap-6 mr-3'>
        {authUser && ( <div className='flex gap-1.5'><button className='hover:text-emerald-400 hover:cursor-grab hover:font-semibold' onClick={handleLogout}><LogOut size={25}/>Log Out</button></div>
        )}
        {authUser && ( <div ><button className='hover:text-emerald-400 hover:cursor-grab hover:font-semibold'  onClick={()=>{navigate('/profile')}}><UserRoundPen size={25}/>Profile</button></div> )}
        {authUser && ( <div><button className='hover:text-emerald-400 hover:cursor-grab hover:font-semibold'  onClick={()=>{navigate('/')}}><MessageCircle size={25}/>Messages</button></div> )}
      </div>
    </div>
  )
}

export default Navbar