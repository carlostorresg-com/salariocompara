import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ItemListContainer from './components/ItemListContainer';
import EmptyItemListContainer from './components/EmptyItemListContainer';

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
  {
    emoji: '💰',
    name: 'Sueldo Bruto',
    description: 'antes de impuestos',
    amount: 95600,
  },
  {
    emoji: '💵',
    name: 'WFH Stipend',
    description: 'topado al 8%',
    amount: 1000,
  },
  {
    emoji: '🎄',
    name: 'Aguinaldo',
    description: '30 días',
    amount: 31500,
  },
  {
    emoji: '🏝️',
    name: 'Prima Vacacional',
    description: '10 días al 25%',
    amount: 8000,
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
