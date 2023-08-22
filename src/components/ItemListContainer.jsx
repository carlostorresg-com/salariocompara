import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import splitAmount from '../utils/splitAmount';
import CurrencyIcon from './reusable/CurrencyIcon';
import CalendarIcon from './reusable/CalendarIcon';
import GiftIcon from './reusable/GiftIcon';

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
          <CurrencyIcon />
          <p className="flex-grow">
            {salary.toLocaleString()} {currency}
          </p>
          <p className="inline-block m-0 leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 text-sm bg-clip-text">
            $ {salaryAfterTax.toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2 text-sm my-3">
          <CalendarIcon />
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
          <GiftIcon />
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
