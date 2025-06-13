import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById('profileImage');
    if (fileInput) fileInput.value = '';
  };

  const handleUpdateProfile = async () => {
    if (!selectedImage) return;

    try {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(selectedImage);
      });

      await updateProfile({ profilePic: base64 });
      setSelectedImage(null);
      setImagePreview(null);
      const fileInput = document.getElementById('profileImage');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white  rounded-2xl shadow-2xl p-8 transition-all duration-300 shadow-amber-100">
        <h1 className="text-3xl font-extrabold text-neutral-950 mb-8 text-center">
          Profile Settings
        </h1>

        {/* User Information Display */}
        <div className="mb-10">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center transition-transform duration-300 hover:scale-105">
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-3xl font-semibold">
                  {authUser?.fullname?.charAt(0)?.toUpperCase() || '?'}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {authUser?.fullname || 'No name provided'}
              </h2>
              <p className="text-gray-500">{authUser?.email || 'No email provided'}</p>
            </div>
          </div>
        </div>

        {/* Profile Picture Update Section */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Update Profile Picture
          </h3>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-6 flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleRemoveImage}
                className="px-4 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-full hover:bg-red-50 hover:border-red-500 transition-all duration-200"
              >
                Remove
              </button>
            </div>
          )}

          {/* File Input */}
          <div className="mb-6">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose new profile picture
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700 transition-colors duration-200"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdateProfile}
            disabled={!selectedImage || isUpdatingProfile}
            className={`w-full px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 ${
              !selectedImage || isUpdatingProfile
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {isUpdatingProfile ? 'Updating...' : 'Update Profile Picture'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;