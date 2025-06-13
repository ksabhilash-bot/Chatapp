import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail } from 'lucide-react';
import BackgroundBubbles from '../components/BackgroundBubbles';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginfn, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    await loginfn(formData);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-neutral-950 ">
      <div className='fixed inset-0 z-10'><BackgroundBubbles/></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl z-50 shadow-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back!!!</h2>

        {/* Email */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Mail className="absolute right-3 top-9 text-gray-500" size={18} />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition"
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>

        {/* Switch to Signup */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-black font-md cursor-pointer hover:underline hover:font-bold"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
