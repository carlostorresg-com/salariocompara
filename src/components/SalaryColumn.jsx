import React, { useState } from 'react';
import ConceptRow from './ConceptRow';
import SalaryBaseInput from './SalaryBaseInput';
import BenefitRow from './BenefitRow';

const SalaryColumn = ({
  currency,
  benefits,
  benefitsYearly,
  onUpdateAmount,
  onAddBenefit,
  onRemoveBenefit,
}) => {
  const totalMonthly = benefits.reduce(
    (sum, benefit) => sum + parseFloat(benefit.amount),
    0,
  );

  const totalYearly = benefitsYearly.reduce(
    (sum, benefit) => sum + parseFloat(benefit.amount),
    0,
  );

  const total = totalMonthly * 12 + totalYearly;

  return (
    <div className="w-full pl-3 mt-6 md:w-5/12 md:flex-none">
      <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 drop-shadow-lg rounded-2xl bg-clip-border">
        <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
          <div className="flex flex-wrap -mx-3">
            <div className="max-w-full px-3 md:w-1/2 md:flex-none">
              <h6 className="mb-0">Caylent</h6>
            </div>
            <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
              <select
                id="currency"
                name="currency"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>MXN</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4 pt-6">
          <h6 className="mb-4 font-bold leading-tight uppercase text-xs text-slate-500">
            Ingresos Mensuales
          </h6>
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            {benefits.map((benefit, index) => (
              <BenefitRow
                key={index}
                emoji={benefit.emoji}
                name={benefit.name}
                description={benefit.description}
                amount={benefit.amount}
                onRemove={() => onRemoveBenefit(index)}
              />
            ))}
          </ul>
          <h6 className="my-4 font-bold leading-tight uppercase text-xs text-slate-500">
            Beneficios Anuales
          </h6>
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            {benefitsYearly.map((benefit, index) => (
              <BenefitRow
                key={index}
                emoji={benefit.emoji}
                name={benefit.name}
                description={benefit.description}
                amount={benefit.amount}
                onRemove={() => onRemoveBenefit(index)}
              />
            ))}
          </ul>
        </div>
        <div className="flex justify-between w-full px-5 py-3 bg-gray-50">
          <span className="">Cada mes:</span>
          <span className="">$ {totalMonthly.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-full px-5 pb-3 bg-gray-50 ">
          <span className="">Bono anual:</span>
          <span className="">$ {totalYearly.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-full px-5 pb-3 bg-gray-50 rounded-b-xl ">
          <span className="font-semibold">Total anual:</span>
          <span className="font-semibold">$ {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryColumn;
/*
    <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="p-4 border border-gray-300 bg-white rounded shadow px-3">
        <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
          <h6 className="mb-0">Caylent</h6>
        </div>
        <SalaryBaseInput />
        {concepts.map((concept) => (
          <ConceptRow
            key={concept.concept}
            concept={concept.concept}
            amount={concept.amount}
            onUpdateAmount={onUpdateAmount}
            onRemove={onRemoveConcept}
          />
        ))}
        <div className="flex justify-between mt-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
    */
