import React, { useState } from 'react';

const SalaryInput = ({ onCalculate }) => {
  const [baseSalary, setBaseSalary] = useState('');
  const [currency, setCurrency] = useState('MXN');
  const [additionalIncome, setAdditionalIncome] = useState([]);

  const handleAddIncome = () => {
    setAdditionalIncome([...additionalIncome, { concept: '', amount: '' }]);
  };

  const handleIncomeChange = (index, field, value) => {
    const updatedIncome = [...additionalIncome];
    updatedIncome[index][field] = value;
    setAdditionalIncome(updatedIncome);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCalculate = () => {
    onCalculate({ baseSalary, currency, additionalIncome });
  };

  return (
    <div>
      <div>
        <label>
          Base Salary:
          <input
            type="number"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Currency:
          <select value={currency} onChange={handleCurrencyChange}>
            <option value="MXN">Mexican Pesos (MXN)</option>
            <option value="USD">US Dollars (USD)</option>
          </select>
        </label>
      </div>
      {additionalIncome.map((income, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Concept"
            value={income.concept}
            onChange={(e) =>
              handleIncomeChange(index, 'concept', e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Amount"
            value={income.amount}
            onChange={(e) =>
              handleIncomeChange(index, 'amount', e.target.value)
            }
          />
        </div>
      ))}
      <button onClick={handleAddIncome}>Add Income</button>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
};

export default SalaryInput;
