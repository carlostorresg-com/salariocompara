import React from 'react';
import EditableMoneyLabel from './EditableMoneyLabel';
import DeleteIcon from './DeleteIcon';

const Item = ({ item, index, handleAmountEdit, removeItem, provided }) => {
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
        onSave={handleAmountEdit}
      />
      <DeleteIcon index={index} onClick={removeItem} />
      {/* TODO Add description */}
    </div>
  );
};

export default Item;
