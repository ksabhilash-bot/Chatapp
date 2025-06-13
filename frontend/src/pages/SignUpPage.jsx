import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff,Mail,UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const navigate=useNavigate()
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    return formData.fullName && formData.email && formData.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all fields.');
      return;
    }
    const res=await signup({fullName:formData.fullName, email:formData.email, password:formData.password});
    if(res.success){
        toast.success("Registered successfully")
        navigate('/login')
    }
    else{
       alert("Unknown error Occured")
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side - Form */}
      <div className='flex flex-col justify-center px-6 sm:px-12'>
        <div className='w-full max-w-md mx-auto space-y-8'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold'>Create an Account</h1>
            <p className='text-sm text-zinc-500 mt-2'>Join us and start chatting!</p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='relative'>
                <div className='absolute top-[40%] inset-y-0 right-3 flex items-center text-zinc-500'>
                    <UserRound size={18} />
                </div>
                
              <label className='block text-sm font-medium mb-1'>Full Name</label>
              <input
                type='text'
                name='fullName'
                placeholder='enter your name'
                value={formData.fullName}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700'
                required
              />
            </div>
            <div className='relative'>
                <div className='absolute top-[40%] inset-y-0 right-3 flex items-center text-zinc-500'>
                    <Mail size={18} />
                </div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='enter a valid email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='min 6 digit password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700'
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-3 flex items-center text-zinc-500'
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition disabled:opacity-50'
              disabled={isSigningUp}
            >
              {isSigningUp ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div>
            <span className='font-semibold'>Already Have an account! </span><span className=' hover:bg-zinc-900 hover:text-amber-50 font-bold border-2 px-2 py-1 rounded-2xl max-h-fit flex items-center justify-center' onClick={()=>{navigate('/login')}}>Login</span>
          </div>
        </div>
      </div>
      <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends and stay in Touch."
      />
    </div>
  );
};

export default SignUpPage;
