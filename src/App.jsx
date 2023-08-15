import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import SalaryColumn from './components/SalaryColumn';
import ItemListContainer from './components/ItemListContainer';

// const initialConcepts = [
//   { concept: 'Base Salary', amount: 50000 },
//   { concept: 'Bonus', amount: 2000 },
//   { concept: 'Vacation Allowance', amount: 1500 },
// ];

const benefits = [
  {
    emoji: '💰',
    name: 'Sueldo Bruto',
    description: 'antes de impuestos',
    amount: 109518,
  },
  {
    emoji: '🏠',
    name: 'WFH Stipend',
    description: 'para trabajar desde casa',
    amount: 1000,
  },
];

const benefitsYearly = [
  { emoji: '🎄', name: 'Aguinaldo', description: '30 días', amount: '31500' },
  {
    emoji: '🏝️',
    name: 'Prima Vacacional',
    description: '10 días al 25%',
    amount: '8000',
  },
  {
    emoji: '💵',
    name: 'Fondo de Ahorro',
    description: 'topado al 8%',
    amount: '40000',
  },
  {
    emoji: '🤓',
    name: 'Learning Stipend',
    description: 'Cursos, conferencias...',
    amount: '10000',
  },
  {
    emoji: '🩺',
    name: 'SGMM',
    description: 'Plan Superior AXA',
    amount: '31500',
  },
  {
    emoji: '🛟',
    name: 'Seguro de Vida',
    amount: '3000',
  },
  {
    emoji: '💻',
    name: 'WFH',
    description: 'Para mejorar tu home office',
    amount: '3300',
  },
  {
    emoji: '🔻',
    name: 'Deducción',
    description: 'Ejemplo de una deducción',
    amount: '-2500',
  },
];

const App = () => {
  const [salaryColumns, setSalaryColumns] = useState([
    {
      currency: 'MXN',
      benefits: [...benefits],
      benefitsYearly: [...benefitsYearly],
    },
  ]);

  const handleUpdateAmount = (currency, concept, amount) => {
    setSalaryColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.currency === currency) {
          return {
            ...column,
            concepts: column.concepts.map((c) =>
              c.concept === concept ? { ...c, amount: amount } : c,
            ),
          };
        }
        return column;
      }),
    );
  };

  const handleAddBenefit = (currency, newBenefit) => {
    setSalaryColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.currency === currency) {
          return {
            ...column,
            benefits: [...column.benefits, { benefit: newBenefit, amount: 0 }],
          };
        }
        return column;
      }),
    );
  };

  const handleRemoveBenefit = (currency, benefit) => {
    setSalaryColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.currency === currency) {
          return {
            ...column,
            benefits: column.benefits.filter((c) => c.benefit !== benefit),
          };
        }
        return column;
      }),
    );
  };

  return (
    <div className="flex justify-center mt-10">
      <ItemListContainer />
      {salaryColumns.map((column) => (
        <SalaryColumn
          key={column.currency}
          currency={column.currency}
          benefits={column.benefits}
          benefitsYearly={column.benefitsYearly}
          onUpdateAmount={(concept, amount) =>
            handleUpdateAmount(column.currency, concept, amount)
          }
          onAddBenefit={(newBenefit) =>
            handleAddBenefit(column.currency, newBenefit)
          }
          onRemoveBenefit={(benefit) =>
            handleRemoveBenefit(column.currency, benefit)
          }
        />
      ))}
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
