import React from 'react';
import EditableMoneyLabel from './EditableMoneyLabel';

const Item = ({
  item,
  index,
  editingIndex,
  handleAmountEdit,
  removeItem,
  provided,
}) => {
  return (
    <div
      key={index}
      className="group flex items-center justify-between p-2 my-1 rounded hover:bg-gray-50 transition duration-200 text-sm text-slate-700"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span className="mr-2">{item.emoji}</span>
      <span className="flex-grow">{item.name}</span>
      <EditableMoneyLabel
        index={index}
        amount={item.amount}
        handleAmountEdit={handleAmountEdit}
      />
      <button
        className={
          'text-gray-400 ml-2 hidden ' +
          (editingIndex === index
            ? ''
            : 'group-hover:block hover:text-gray-600')
        }
        onClick={() => removeItem(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
      {/* TODO Add description */}
    </div>
  );
};

export default Item;
