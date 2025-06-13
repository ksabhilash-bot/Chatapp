import React from 'react';
import { useMessageStore } from '../store/useMessageStore';
import { useAuthStore } from '../store/useAuthStore';
import { UserRound } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              {selectedUser.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser.fullname}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-base-300 group-hover:ring-primary/20 transition-all"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-full">
                  <UserRound className="w-6 h-6" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Status */}
          <div>
            <h3 className="font-semibold text-sm">{selectedUser.fullname}</h3>
            <p className={`text-xs ${isOnline ? 'text-green-500' : 'text-gray-500'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
