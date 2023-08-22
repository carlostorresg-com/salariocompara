import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import splitAmount from '../utils/splitAmount';

const ItemListContainer = ({
  id,
  title,
  salary,
  salaryAfterTax,
  currency,
  holidays,
  holidaysPct,
  aguinaldo,
  aguinaldoDays,
  benefits,
}) => {
  const [titlePosition, setTitlePosition] = useState(
    title ?? 'Nombre de la posición',
  );
  const [items, setItems] = useState(benefits ?? []);
  const [newItemDescription, setNewItemDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedAmount, setEditedAmount] = useState('');

  const addItem = () => {
    if (newItemDescription.trim() === '') return;

    const [name, amount] = splitAmount(newItemDescription);

    const newItem = {
      emoji: '🎁', // Replace with your emoji
      name,
      amount,
    };

    setItems([...items, newItem]);
    setNewItemDescription('');
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + +item.amount, 0);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      addItem();
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = [...items];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
  };

  const handleAmountEdit = (index, newAmount) => {
    if (!newAmount) return;
    const updatedItems = [...items];
    updatedItems[index].amount = parseFloat(newAmount);
    setItems(updatedItems);
  };

  // TODO Fix flashy reorder on DragEnd
  return (
    <div className="w-96 p-6 m-6 border-0 rounded-2xl drop-shadow-lg bg-white">
      <p className="text-xl font-semibold mt-2 mb-4">{titlePosition}</p>
      <div className="text-gray-400 p-2">
        <div className="flex space-x-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="flex-grow">
            {salary.toLocaleString()} {currency}
          </p>
          <p className="inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
            $ {salaryAfterTax.toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2 text-sm my-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="flex-grow">
            {holidays} días vacaciones{' '}
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {holidaysPct}%
            </span>
          </p>
          <p className="inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
            $ {(8000).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2 text-sm my-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <p className="flex-grow">{aguinaldoDays} días aguinaldo</p>
          <p className="inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
            $ {aguinaldo.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="border-t-2"></div>
      <div className="space-y-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="itemList" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Item
                        item={item}
                        index={index}
                        editingIndex={editingIndex}
                        editedAmount={editedAmount}
                        setEditingIndex={setEditingIndex}
                        setEditedAmount={setEditedAmount}
                        handleAmountEdit={handleAmountEdit}
                        removeItem={() => removeItem(index)}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Agrega beneficio ej. "Bono 12k"'
          className="flex-grow p-2 text-sm rounded-l-md border outline-none focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={addItem}
          className="bg-indigo-500 text-white rounded-r-md p-2 hover:bg-indigo-600 transition duration-200"
        >
          Add
        </button>
      </div>
      <div className="mt-4 text-right">
        <strong>Total:</strong> $ {calculateTotal().toLocaleString()}
      </div>
    </div>
  );
};

export default ItemListContainer;
