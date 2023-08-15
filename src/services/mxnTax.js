const mxnTax = (salary) => {
  const taxBrackets = [
    5952.85, 50524.92, 88793.04, 103218.0, 123580.2, 249243.48, 392841.96,
    750000.0,
  ];
  const taxRates = [
    0.0192, 0.064, 0.1088, 0.16, 0.1792, 0.2136, 0.2352, 0.3, 0.32,
  ];

  let totalTaxes = 0;
  let taxableIncome = salary;

  for (let i = 0; i < taxBrackets.length; i++) {
    if (taxableIncome <= 0) break;

    const taxableAmount =
      i === taxBrackets.length - 1
        ? taxableIncome
        : Math.min(taxBrackets[i + 1] - taxBrackets[i], taxableIncome);

    totalTaxes += taxableAmount * taxRates[i];
    taxableIncome -= taxableAmount;
  }

  return salary - totalTaxes;
};

export default mxnTax;
