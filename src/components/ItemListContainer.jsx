import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Item from './Item';
import splitAmount from '../utils/splitAmount';

const ItemListContainer = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems ?? []);
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
    <div className="max-w-md mx-auto p-4 mt-6 border-0 rounded-2xl drop-shadow-lg bg-white md:w-5/12">
      <h6 className="mb-4">Company 1</h6>
      <div className="space-y-2">
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
          placeholder='Agrega beneficio ej. "Aguinaldo 12k"'
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
