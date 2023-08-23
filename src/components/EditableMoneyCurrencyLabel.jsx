import React, { useRef, useState, useEffect } from 'react';

const EditableMoneyCurrencyLabel = ({ value, currency, onSave }) => {
  const inputRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [amount, setAmount] = useState(value);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  return (
    <>
      {editing ? (
        // TODO Fix: input width, it's too big
        <span className="flex-grow w-5 pr-14">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full text-sm rounded-md border-0 py-1 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              value={amount}
              placeholder="0"
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  onSave(amount);
                  setEditing(false);
                  setAmount(null);
                }
              }}
              onBlur={(e) => {
                onSave(amount);
                setEditing(false);
                setAmount(null);
              }}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={(e) => setNewCurrency(e.target.value)}
                value={newCurrency}
              >
                <option>MXN</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </span>
      ) : (
        <p className="flex-grow">
          <span
            role="button"
            tabIndex="0"
            className="hover:font-medium"
            onClick={() => {
              setEditing(true);
              setAmount(value?.toString());
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEditing(true);
                setAmount(value?.toString());
              }
            }}
          >
            {value.toLocaleString()} {currency}
          </span>
        </p>
      )}
    </>
  );
};

export default EditableMoneyCurrencyLabel;
