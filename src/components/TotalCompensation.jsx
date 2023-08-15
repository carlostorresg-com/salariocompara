import React from 'react';

const TotalCompensation = ({ baseSalary, currency, additionalIncome }) => {
  const calculateTotalCompensation = () => {
    let total = parseFloat(baseSalary);
    for (const income of additionalIncome) {
      total += parseFloat(income.amount);
    }
    if (currency === 'USD') {
      // Apply 2.5% tax for USD currency
      total *= 0.975; // (100% - 2.5%)
    }
    return total;
  };

  return (
    <div>
      <h2>Total Compensation</h2>
      <p>{calculateTotalCompensation()} MXN</p>
    </div>
  );
};

export default TotalCompensation;
