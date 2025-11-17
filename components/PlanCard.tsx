
import React from 'react';
import { Plan } from '../types';
import Icon from './Icons';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
  };

  const finalCardClasses = [
      'rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col h-full',
      'bg-slate-900 shadow-2xl shadow-brand-purple/20',
      isSelected ? 'ring-2 ring-brand-orange' : 'ring-2 ring-transparent'
  ].join(' ');

  const textColor = 'text-gray-200';
  const priceColor = 'text-brand-orange';
  const buttonClasses = `
    w-full mt-auto text-center font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg
    bg-brand-purple text-white hover:bg-purple-700
  `;
  const iconColor = 'text-brand-orange';

  return (
    <div className={finalCardClasses} onClick={onSelect}>
      <h3 className={`text-4xl font-bold text-center mb-4 ${textColor}`}>{plan.name}</h3>
      <div className="w-20 h-0.5 bg-dark-tertiary mx-auto mb-6"></div>
      
      <p className="text-center text-gray-400 mb-6">Nesse plano você receberá:</p>
      
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center group relative">
            <span className={iconColor}>
                <Icon name={feature.icon} className="w-5 h-5 mr-3 flex-shrink-0" />
            </span>
            <span className={`flex-grow ${textColor}`}>{feature.name}</span>
            <span className="ml-2 text-gray-500 cursor-help">
              <Icon name="question" className="w-4 h-4" />
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-dark-tertiary text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              {feature.description}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-dark-tertiary"></div>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-center my-6">
        <p className="text-gray-400">Por apenas:</p>
        <p className={`text-5xl font-extrabold my-2 ${priceColor}`}>{formatCurrency(plan.price)}</p>
        <p className="text-gray-400">por mês</p>
      </div>

      <button className={buttonClasses}>
        Garantir oferta
      </button>
    </div>
  );
};

export default PlanCard;
