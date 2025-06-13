import React, { useState } from 'react';
import { Settings, LogOut, UserRoundPen, MessageCircle, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    const res = await logout();
    if (res?.success) {
      toast.success("Logout Successfully");
    }
    document.cookie = 'jwt=; Max-Age=0; path=/;';
    navigate('/login');
    setIsMenuOpen(false); // Close mobile menu after logout
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-neutral-950 text-white relative z-50'>
      {/* Main navbar */}
      <div className='flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3'>
        {/* Logo */}
        <div className='boldonse-regular text-2xl sm:text-3xl lg:text-4xl'>
          Connecto
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          {authUser && (
            <>
              <button 
                className='flex items-center gap-2 hover:text-emerald-400 hover:cursor-pointer hover:font-semibold transition-colors duration-200'
                onClick={() => handleNavigation('/')}
              >
                <MessageCircle size={20} />
                <span className='hidden lg:inline'>Messages</span>
              </button>
              
              <button 
                className='flex items-center gap-2 hover:text-emerald-400 hover:cursor-pointer hover:font-semibold transition-colors duration-200'
                onClick={() => handleNavigation('/profile')}
              >
                <UserRoundPen size={20} />
                <span className='hidden lg:inline'>Profile</span>
              </button>
              
              <button 
                className='flex items-center gap-2 hover:text-emerald-400 hover:cursor-pointer hover:font-semibold transition-colors duration-200'
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span className='hidden lg:inline'>Log Out</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className='md:hidden'>
          {authUser && (
            <button
              onClick={toggleMenu}
              className='p-2 hover:text-emerald-400 transition-colors duration-200'
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {authUser && (
        <div className={`md:hidden bg-neutral-900 border-t border-neutral-800 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className='px-4 py-2 space-y-1'>
            <button 
              className='w-full flex items-center gap-3 px-3 py-3 hover:bg-neutral-800 hover:text-emerald-400 rounded-lg transition-colors duration-200 text-left'
              onClick={() => handleNavigation('/')}
            >
              <MessageCircle size={20} />
              <span>Messages</span>
            </button>
            
            <button 
              className='w-full flex items-center gap-3 px-3 py-3 hover:bg-neutral-800 hover:text-emerald-400 rounded-lg transition-colors duration-200 text-left'
              onClick={() => handleNavigation('/profile')}
            >
              <UserRoundPen size={20} />
              <span>Profile</span>
            </button>
            
            <button 
              className='w-full flex items-center gap-3 px-3 py-3 hover:bg-neutral-800 hover:text-emerald-400 rounded-lg transition-colors duration-200 text-left'
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;