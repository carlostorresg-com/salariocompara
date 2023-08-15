import React from 'react';

const ConceptRow = ({ concept, amount, onUpdateAmount, onRemove }) => {
  return (
    <div className="flex items-center mb-2">
      <span className="w-1/2">{concept}</span>
      <input
        type="number"
        value={amount}
        onChange={(e) => onUpdateAmount(concept, e.target.value)}
        className="w-1/4 px-2 py-1 border rounded"
      />
      <button
        onClick={() => onRemove(concept)}
        className="w-1/4 ml-2 bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default ConceptRow;
