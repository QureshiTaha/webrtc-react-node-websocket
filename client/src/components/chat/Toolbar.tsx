import React from 'react';

const Toolbar: React.FC = () => {
  return (
    <div className="absolute right-4 top-1/3 transform -translate-y-1/3 flex flex-col items-center space-y-4 z-50">
      {/* Camera toggle */}
      <button className="p-3 bg-blue-600 text-white rounded-full">
        📷
      </button>
      
      {/* Mute toggle */}
      <button className="p-3 bg-red-600 text-white rounded-full">
        🔇
      </button>

      {/* Switch camera */}
      <button className="p-3 bg-green-600 text-white rounded-full">
        🔄
      </button>
    </div>
  );
};

export default Toolbar;
