import React from 'react';
import { 
  Check, 
  CreditCard, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  AlertCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'R$ 197',
    period: '/mês',
    description: 'Ideal para advogados autônomos iniciando na área previdenciária.',
    features: [
      'Até 50 clientes ativos',
      'NexIA: 10 leituras de CNIS/mês',
      'Cálculos Previdenciários Básicos',
      'Agenda e Gestão de Prazos',
      'Suporte via Email'
    ],
    current: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 397',
    period: '/mês',
    description: 'O plano mais popular para escritórios em crescimento.',
    features: [
      'Até 500 clientes ativos',
      'NexIA: Leituras de CNIS Ilimitadas',
      'Cálculos de RMI e ROI Avançados',
      'Chat Colaborativo e Menções',
      'Suporte Prioritário via WhatsApp',
      'Controle Financeiro e RBAC'
    ],
    current: true,
    highlight: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'R$ 897',
    period: '/mês',
    description: 'Solução completa para grandes bancas e redes de escritórios.',
    features: [
      'Clientes Ilimitados',
      'NexIA: Customizações Exclusivas',
      'API de Integração',
      'Gerente de Conta Dedicado',
      'Auditoria de Ações Completa',
      'Treinamento de Equipe'
    ],
    current: false
  }
];

const invoices = [
  { id: 'INV-001', date: '01 Out, 2023', amount: 'R$ 397,00', status: 'Pago' },
  { id: 'INV-002', date: '01 Set, 2023', amount: 'R$ 397,00', status: 'Pago' },
  { id: 'INV-003', date: '01 Ago, 2023', amount: 'R$ 397,00', status: 'Pago' },
];

export default function Subscription() {
  const { theme } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Current Plan Banner */}
      <div className="glass-card p-8 bg-nex-deep text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Zap size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-nex-electric text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Plano Atual</span>
              <span className="text-slate-300 text-sm">Renova em 01 Nov, 2023</span>
            </div>
            <h2 className="text-3xl font-bold">NexPrev Pro</h2>
            <p className="text-slate-300 mt-2 max-w-md">
              Você está utilizando o plano Pro com acesso total às ferramentas de IA e gestão financeira.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-4xl font-bold">R$ 397,00<span className="text-sm font-normal text-slate-400">/mês</span></p>
            <button className="mt-4 px-6 py-2 bg-white text-nex-deep rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">
              Gerenciar Assinatura
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`glass-card p-8 flex flex-col relative transition-all duration-300 hover:translate-y-[-4px] ${
              plan.highlight ? 'ring-2 ring-nex-electric dark:ring-nex-electric/50' : ''
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-nex-electric text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                Recomendado
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{plan.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{plan.description}</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-800 dark:text-white">{plan.price}</span>
              <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
            </div>
            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start space-x-3">
                  <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-0.5 rounded-full">
                    <Check size={12} />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                </div>
              ))}
            </div>
            <button 
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.current 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default' 
                  : 'bg-nex-deep dark:bg-nex-electric text-white hover:opacity-90 shadow-lg shadow-nex-deep/10'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Seu Plano Atual' : 'Mudar para este Plano'}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="glass-card p-8 dark:bg-slate-900/50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Método de Pagamento</h3>
            <button className="text-nex-electric text-sm font-bold hover:underline">Adicionar Novo</button>
          </div>
          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <CreditCard size={20} className="text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Visa terminando em 4242</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Expira em 12/26</p>
              </div>
            </div>
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Principal</span>
          </div>
          
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl flex items-start space-x-3">
            <AlertCircle className="text-amber-600 mt-0.5" size={18} />
            <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed">
              Sua próxima fatura será processada automaticamente no dia 01 de Novembro. Certifique-se de que o cartão acima possui limite disponível.
            </p>
          </div>
        </div>

        {/* Billing History */}
        <div className="glass-card dark:bg-slate-900/50 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Histórico de Faturamento</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{invoice.id}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{invoice.amount}</p>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{invoice.status}</span>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-nex-electric transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-center">
            <button className="text-xs font-bold text-nex-electric hover:underline flex items-center justify-center mx-auto">
              Ver todas as faturas <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
