import React, { useRef, useEffect } from 'react';

const Item = ({
  item,
  index,
  editingIndex,
  editedAmount,
  setEditingIndex,
  setEditedAmount,
  handleAmountEdit,
  removeItem,
  provided,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingIndex === index && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingIndex, index]);

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
      {editingIndex === index ? (
        // TODO Refactor out into EditableMoneyLabel
        // TODO Fix: input width, it's too big
        <span className="grow-0 w-15">
          <input
            ref={inputRef}
            type="text"
            className="border p-1 outline-none rounded-md text-sm text-right focus:ring focus:ring-indigo-100"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') {
                handleAmountEdit(index, editedAmount);
                setEditingIndex(-1);
                setEditedAmount('');
              }
            }}
            // TODO Fix onBlur event, it's not always working
            onBlur={(_e) => {
              handleAmountEdit(index, editedAmount);
              setEditingIndex(-1);
              setEditedAmount('');
            }}
          />
        </span>
      ) : (
        <span
          role="button"
          tabIndex="0"
          className="hover:font-medium"
          onClick={() => {
            setEditingIndex(index);
            setEditedAmount(item.amount?.toString());
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditingIndex(index);
              setEditedAmount(item.amount?.toString());
            }
          }}
        >
          {item.amount < 0 ? (
            <p className="relative z-10 inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-red-600 to-rose-400 text-sm bg-clip-text">
              - $ {(item.amount * -1).toLocaleString()}
            </p>
          ) : (
            <p className="inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
              $ {(+item.amount).toLocaleString()}
            </p>
          )}
        </span>
      )}
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
      {/* TODO Figure out how to do display $ after taxes */}
    </div>
  );
};

export default Item;
