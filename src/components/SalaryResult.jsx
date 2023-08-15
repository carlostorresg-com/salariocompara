import React from 'react';

const SalaryResult = ({ totalCompensation }) => {
  return (
    <div>
      <h2>Salary Result</h2>
      <p>Total Compensation: {totalCompensation} MXN</p>
    </div>
  );
};

export default SalaryResult;
