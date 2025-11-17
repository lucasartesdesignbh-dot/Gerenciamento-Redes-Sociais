
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plan, Addon } from './types';
import { PLANS, ADDONS } from './constants';
import PlanCard from './components/PlanCard';
import AddonCheckbox from './components/AddonCheckbox';
import Icon from './components/Icons';

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const addonsSectionRef = useRef<HTMLElement>(null);
  const wasPlanSelectedBefore = useRef(false);

  useEffect(() => {
    const isPlanCurrentlySelected = selectedPlan !== null;
    // Scroll only when transitioning from not having a plan to having one.
    if (isPlanCurrentlySelected && !wasPlanSelectedBefore.current) {
      addonsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    wasPlanSelectedBefore.current = isPlanCurrentlySelected;
  }, [selectedPlan]);


  const handleSelectPlan = (plan: Plan) => {
    // Allow deselecting a plan by clicking it again
    if (selectedPlan?.id === plan.id) {
      setSelectedPlan(null);
    } else {
      setSelectedPlan(plan);
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(addonId)) {
        newSet.delete(addonId);
      } else {
        newSet.add(addonId);
      }
      return newSet;
    });
  };

  const totalCost = useMemo(() => {
    if (!selectedPlan) return 0;
    const planCost = selectedPlan.price;
    const addonsCost = ADDONS.reduce((total, addon) => {
      return selectedAddonIds.has(addon.id) ? total + addon.price : total;
    }, 0);
    return planCost + addonsCost;
  }, [selectedPlan, selectedAddonIds]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleHireNow = () => {
    if (!clientName || !clientPhone) {
      alert('Por favor, preencha seu nome e telefone para continuar.');
      return;
    }
    if (!selectedPlan) {
      alert('Por favor, selecione um plano.');
      return;
    }

    let message = `Olá! Tenho interesse em contratar seus serviços.\n\n`;
    message += `*Resumo do Pedido:*\n`;
    message += `*Nome:* ${clientName}\n`;
    message += `*Telefone:* ${clientPhone}\n\n`;
    message += `*Plano Selecionado:*\n`;
    message += `- ${selectedPlan.name}: ${formatCurrency(selectedPlan.price)}\n\n`;

    if (selectedAddonIds.size > 0) {
        message += `*Serviços Extras:*\n`;
        ADDONS.forEach(addon => {
            if (selectedAddonIds.has(addon.id)) {
                message += `- ${addon.name}: ${formatCurrency(addon.price)}\n`;
            }
        });
        message += `\n`;
    }

    message += `*Valor Total Mensal:* ${formatCurrency(totalCost)}`;

    const phoneNumber = '5531986601647';
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(url, '_blank');
  };

  return (
    <div className="relative isolate main-container min-h-screen bg-dark-primary text-gray-200 font-sans pb-32">
      <header className="container mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-300 tracking-wide mb-4">
          Lucas <span className="text-brand-orange">Rodrigues</span> | marketing
        </h1>
        
        <div className="flex justify-center items-center gap-6 mb-8">
            <a 
                href="https://www.instagram.com/lucasgr.pro/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram de Lucas Rodrigues"
                className="text-gray-400 hover:text-brand-orange transition-colors duration-300"
            >
                <Icon name="instagram" className="w-7 h-7" />
            </a>
            <a 
                href="https://wa.me/5531986601647" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp de Lucas Rodrigues"
                className="text-gray-400 hover:text-brand-orange transition-colors duration-300"
            >
                <Icon name="whatsapp" className="w-7 h-7" />
            </a>
        </div>

        <div>
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Gerenciamento de<br />
            <span className="text-brand-orange">Redes Sociais</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Selecione um plano de gerenciamento e adicione serviços extras para montar o pacote ideal para o seu negócio e ver o custo total mensal.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Step 1: Client Info */}
        <section id="client-info" className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-center mb-2 text-white">Seus Dados</h2>
            <p className="text-center text-gray-400 mb-8">
                Preencha para gerar sua proposta personalizada.
            </p>
            <div className="space-y-4 bg-dark-secondary p-6 rounded-lg shadow-lg">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nome:</label>
                    <input 
                        type="text" 
                        id="name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full bg-dark-tertiary text-white placeholder-gray-500 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Telefone:</label>
                    <input 
                        type="tel" 
                        id="phone"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="(XX) XXXXX-XXXX"
                        className="w-full bg-dark-tertiary text-white placeholder-gray-500 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition"
                    />
                </div>
            </div>
        </section>

        {/* Step 2: Plan Selection */}
        <section id="plans" className="mb-16 pt-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white">
            Escolha o Plano Ideal
          </h2>
          <p className="text-center text-lg text-gray-400 max-w-2xl mx-auto">
            Comece com uma base sólida para o gerenciamento de suas redes sociais e adicione serviços conforme sua necessidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start mt-12">
            {PLANS.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan?.id === plan.id}
                onSelect={() => handleSelectPlan(plan)}
              />
            ))}
          </div>
        </section>

        {/* Step 3: Add-on Selection */}
        {selectedPlan && (
           <section id="addons" ref={addonsSectionRef} className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-2 text-white">Adicione Serviços Extras</h2>
             <p className="text-center text-gray-400 mb-8">
                Os serviços podem ser pausados a qualquer momento, sem taxas ou multas.
            </p>
            <div className="space-y-4 bg-dark-secondary p-6 rounded-lg shadow-lg">
                {ADDONS.map(addon => (
                    <AddonCheckbox 
                        key={addon.id}
                        addon={addon}
                        isChecked={selectedAddonIds.has(addon.id)}
                        onToggle={() => handleToggleAddon(addon.id)}
                    />
                ))}
            </div>
           </section>
        )}
      </main>

      {/* Sticky Footer for Total */}
      {selectedPlan && (
        <footer className="fixed bottom-0 left-0 right-0 bg-dark-secondary/80 backdrop-blur-sm border-t border-dark-tertiary p-4 shadow-2xl-top">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <div className="mb-3 sm:mb-0">
                    <span className="text-gray-400">Valor total por mês:</span>
                    <p className="text-3xl md:text-4xl font-bold text-brand-orange">{formatCurrency(totalCost)}</p>
                </div>
                <button 
                  onClick={handleHireNow}
                  className="bg-brand-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg w-full sm:w-auto"
                >
                    Contratar Agora
                </button>
            </div>
        </footer>
      )}
    </div>
  );
};

export default App;
