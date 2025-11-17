import React from 'react';
import { Addon } from '../types';
import Icon from './Icons';

interface AddonCheckboxProps {
  addon: Addon;
  isChecked: boolean;
  onToggle: () => void;
}

const AddonCheckbox: React.FC<AddonCheckboxProps> = ({ addon, isChecked, onToggle }) => {
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div 
            onClick={onToggle}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${isChecked ? 'bg-brand-purple/20 border-brand-purple' : 'bg-dark-tertiary border-transparent hover:border-gray-600'}`}
        >
            <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 ${isChecked ? 'border-brand-orange bg-brand-orange' : 'border-gray-500'} flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-300`}>
                    {isChecked && <Icon name="check" className="w-4 h-4 text-white" />}
                </div>
                <div>
                    <h4 className="font-bold text-lg text-gray-200">{addon.name}</h4>
                    <p className="text-sm text-gray-400">{addon.description}</p>
                </div>
            </div>
            <div className="text-right ml-4 whitespace-nowrap">
                <p className="text-gray-500 line-through text-sm">{formatCurrency(addon.originalPrice)}</p>
                <p className="font-bold text-lg text-brand-orange">
                    + {formatCurrency(addon.price)}
                </p>
            </div>
        </div>
    );
};

export default AddonCheckbox;