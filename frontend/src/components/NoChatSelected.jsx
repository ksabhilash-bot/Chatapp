import React from 'react';
import { MessageSquare } from 'lucide-react'; // optional icon

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center p-4 ">
      <MessageSquare className="w-16 h-16 text-neutral-800 mb-4 animate-bounce" />
      <h2 className="text-2xl font-semibold text-gray-700">No Chat Selected</h2>
      <p className="text-gray-500 mt-2 max-w-xs">
        Select a friend from the sidebar to start a conversation.
      </p>
    </div>
  );
};

export default NoChatSelected;
