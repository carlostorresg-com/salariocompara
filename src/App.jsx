import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ItemListContainer from './components/ItemListContainer';
import EmptyItemListContainer from './components/EmptyItemListContainer';

const sampleBenefits = [
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

const App = () => {
  const initialCards = [
    {
      id: 1,
      title: 'Cloud Architect',
      salary: 103000,
      salaryAfterTax: 73500,
      currency: 'MXN',
      holidays: 10,
      holidaysPct: 25,
      aguinaldoDays: 30,
      aguinaldo: 30500,
      benefits: sampleBenefits,
    },
  ];

  const [cards, setCards] = useState(initialCards);

  const addCard = () => {
    console.log('add card');
    const emptyCard = {
      id: 2,
      title: null,
      salary: 0,
      salaryAfterTax: 0,
      currency: 'MXN',
      holidays: 10,
      holidaysPct: 25,
      aguinaldoDays: 15,
      aguinaldo: 0,
      benefits: [],
    };

    setCards([...cards, emptyCard]);
  };

  return (
    <div className="flex justify-center mt-10">
      {cards.map((card) => (
        <ItemListContainer key={card.id} {...card} />
      ))}
      {cards.length < 3 ? (
        <EmptyItemListContainer handleOnClick={addCard} />
      ) : (
        <></>
      )}
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
