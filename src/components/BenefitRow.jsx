import React, { useState } from 'react';

const BenefitRow = ({ name, description, amount, emoji, onRemove }) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  return (
    <li
      className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 text-inherit rounded-md hover:bg-slate-100"
      onMouseEnter={() => setShowCloseIcon(true)}
      onMouseLeave={() => setShowCloseIcon(false)}
    >
      <div className="flex items-center">
        <button className="mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-transparent bg-transparent text-center align-middle hover:opacity-75">
          {emoji}
        </button>
        <div className="flex flex-col">
          <h6 className="mb-1 leading-normal text-sm text-slate-700">{name}</h6>
          <span className="leading-tight text-xs text-slate-400">
            {description}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {amount < 0 ? (
          <p className="relative z-10 inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-red-600 to-rose-400 text-sm bg-clip-text">
            - $ {(amount * -1).toLocaleString()}
          </p>
        ) : (
          <p className="relative z-10 inline-block m-0  leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
            $ {(amount * 1).toLocaleString()}
          </p>
        )}
        {showCloseIcon && (
          <button
            className="absolute right-3 top-1/2 transform bg-red-500 -translate-y-1/2 text-red-600 hover:text-red-800"
            onClick={onRemove}
          >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg> */}
          </button>
        )}
      </div>
    </li>
  );
};

export default BenefitRow;
