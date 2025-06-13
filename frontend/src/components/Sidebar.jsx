import React, { useState, useMemo, useCallback } from 'react';
import { useMessageStore } from '../store/useMessageStore';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isUsersLoading, users, selectedUser, setSelectedUser } = useMessageStore();
  const {onlineUsers} = useAuthStore()

  // Memoized filtered users for better performance
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase().trim();
    return users.filter(user => 
      user.fullname.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  // Memoized user selection handler
  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
  }, [setSelectedUser]);

  // Memoized search handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  if (isUsersLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-64 h-full bg-base-100 border-r">
        <div className="loading loading-dots loading-lg"></div>
        <p className="text-sm text-gray-500 mt-2">Loading chats...</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-base-100 border-r flex flex-col h-full">
      
      <div className="p-2 border-b border-base-300">
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
        <p className="text-xs text-gray-500 mt-1">{users.length} contacts</p>
      </div>

      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="input input-sm input-bordered w-full pl-9 pr-8 bg-base-200 focus:bg-white transition-colors"
          />
          
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
         
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="text-xs text-gray-500 mt-2">
            {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center px-4">
            {searchQuery ? (
              <>
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-500 text-sm">No users found</p>
                <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
              </>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500 text-sm">No contacts yet</p>
                <p className="text-gray-400 text-xs mt-1">Start a conversation!</p>
              </>
            )}
          </div>
        ) : (
          <ul className="space-y-1 pb-4">
            {filteredUsers.map(user => {
              const isSelected = selectedUser?._id === user._id;
              const userInitial = user.fullname?.[0]?.toUpperCase() || '?';
              
              return (
                <li
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 mx-2 group
                    ${isSelected 
                      ? 'bg-emerald-400 text-primary-content shadow-lg' 
                      : 'hover:bg-base-200 active:bg-base-300'
                    }`}
                >
                  {/* Profile Picture */}
                  <div className="relative flex-shrink-0">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullname}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-base-300 group-hover:ring-primary/20 transition-all"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all
                        ${isSelected ? 'bg-neutral-950 text-white' : 'bg-gradient-to-br from-zinc-950 to-zinc-600'}
                      `}>
                        {userInitial}
                      </div>
                    )}
                    
                    {/* Online Status Indicator (for future use) */}
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate transition-colors
                      ${isSelected ? 'text-zinc-950' : 'text-gray-800'}
                    `}>
                      {user.fullname}
                    </p>
                    
                  </div>

                  
                  
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer (Optional) */}
      
    </div>
  );
};

export default React.memo(Sidebar);