import React from 'react';

const EmptyItemListContainer = () => {
  return (
    <div className="w-18 p-6 flex ml-8 mt-6 border-2 border-dashed border-gray-300 rounded-2xl drop-shadow-lg  hover:bg-gray-100">
      <div className="flex flex-grow items-center ">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EmptyItemListContainer;
