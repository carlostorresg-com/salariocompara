const mxnIMSS = (salary) => {
  const imssBrackets = [3748.38, 17684.92, 39603.23];
  const imssRates = [0.00625, 0.0125, 0.02, 0.0275];

  let totalIMSS = 0;
  let taxableIncome = salary;

  for (let i = 0; i < imssBrackets.length; i++) {
    if (taxableIncome <= 0) break;

    const taxableAmount =
      i === imssBrackets.length - 1
        ? taxableIncome
        : Math.min(imssBrackets[i + 1] - imssBrackets[i], taxableIncome);

    totalIMSS += taxableAmount * imssRates[i];
    taxableIncome -= taxableAmount;
  }

  return totalIMSS;
};

export default mxnIMSS;
