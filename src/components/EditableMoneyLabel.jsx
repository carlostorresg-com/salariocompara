import React, { useRef, useState, useEffect } from 'react';

const EditableMoneyLabel = ({ index, amount, handleAmountEdit }) => {
  const inputRef = useRef(null);

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedAmount, setEditedAmount] = useState('');

  useEffect(() => {
    if (editingIndex === index && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingIndex, index]);

  return (
    <span id="money-label">
      {editingIndex == index ? (
        // TODO Fix: input width, it's too big
        <span className="grow-0 w-10">
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
            setEditedAmount(amount?.toString());
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditingIndex(index);
              setEditedAmount(amount?.toString());
            }
          }}
        >
          {amount < 0 ? (
            <p className="relative z-10 inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-red-600 to-rose-400 text-sm bg-clip-text">
              - $ {(amount * -1).toLocaleString()}
            </p>
          ) : (
            <p className="inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
              $ {(+amount).toLocaleString()}
            </p>
          )}
        </span>
      )}
    </span>
  );
};

export default EditableMoneyLabel;
