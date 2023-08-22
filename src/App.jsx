import React from 'react';
import { createRoot } from 'react-dom/client';
import ItemListContainer from './components/ItemListContainer';
import EmptyItemListContainer from './components/EmptyItemListContainer';

const benefitsYearly = [
  {
    emoji: '💵',
    name: 'WFH Stipend',
    description: 'topado al 8%',
    amount: 1000,
  },
  {
    emoji: '💵',
    name: 'Fondo de Ahorro',
    description: 'topado al 8%',
    amount: 40000,
  },
  {
    emoji: '🤓',
    name: 'Learning Stipend',
    description: 'Cursos, conferencias...',
    amount: 10000,
  },
  {
    emoji: '🩺',
    name: 'SGMM',
    description: 'Plan Superior AXA',
    amount: 31500,
  },
  {
    emoji: '🛟',
    name: 'Seguro de Vida',
    amount: 3000,
  },
  {
    emoji: '💻',
    name: 'WFH set up',
    description: 'Para mejorar tu home office',
    amount: 3300,
  },
  {
    emoji: '💵',
    name: 'Quarterly Bonus',
    description: 'Para mejorar tu home office',
    amount: 42000,
  },
  {
    emoji: '📚',
    name: 'Certifications Bonus (1,500 usd)',
    description: 'Exam reimbursement + bonus',
    amount: 0,
  },
  {
    emoji: '🔻',
    name: 'Deducción',
    description: 'Ejemplo de una deducción',
    amount: -2500,
  },
];

function AddCardIcon({ onClick }) {
  return (
    <div
      className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center cursor-pointer absolute right-2 bottom-2 hover:bg-indigo-600"
      onClick={onClick}
    >
      <span className="text-lg">+</span>
    </div>
  );
}

const App = () => {
  return (
    <div className="flex justify-center mt-10">
      <ItemListContainer initialItems={benefitsYearly} />
      <EmptyItemListContainer />
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
