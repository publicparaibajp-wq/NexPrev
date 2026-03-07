import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Download, 
  Filter, 
  MoreHorizontal,
  CreditCard,
  PieChart,
  BarChart3,
  ShieldCheck,
  Lock,
  EyeOff,
  Trash2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

const data = [
  { name: 'Jan', revenue: 42000 },
  { name: 'Fev', revenue: 48000 },
  { name: 'Mar', revenue: 45000 },
  { name: 'Abr', revenue: 52000 },
  { name: 'Mai', revenue: 58000 },
  { name: 'Jun', revenue: 67400 },
];

const transactions = [
  { id: 1, client: 'Maria Oliveira', description: 'Honorários Contratuais', amount: 'R$ 4.500,00', date: '22/10/2023', status: 'Pago', type: 'income' },
  { id: 2, client: 'João Santos', description: 'Honorários Sucumbenciais', amount: 'R$ 12.400,00', date: '20/10/2023', status: 'Pendente', type: 'income' },
  { id: 3, client: 'Fornecedor TI', description: 'Assinatura Software', amount: 'R$ 850,00', date: '18/10/2023', status: 'Pago', type: 'expense' },
  { id: 4, client: 'Ana Costa', description: 'Parcela 02/05', amount: 'R$ 1.200,00', date: '15/10/2023', status: 'Atrasado', type: 'income' },
];

export default function Financial() {
  const { user, addAuditLog, is2FAVerified, verify2FA } = useAuth();
  const [twoFACode, setTwoFACode] = React.useState('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [confirmModal, setConfirmModal] = React.useState<{ isOpen: boolean; type: 'export' | 'delete'; id?: number }>({
    isOpen: false,
    type: 'export'
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const isSocio = user?.role === UserRole.SOCIO;
  const isFinanceiro = user?.role === UserRole.FINANCEIRO;

  const handleVerify2FA = async () => {
    setIsVerifying(true);
    const success = await verify2FA(twoFACode);
    setIsVerifying(false);
    if (!success) {
      alert('Código 2FA inválido. Tente 123456');
    }
  };

  const handleConfirmAction = () => {
    if (confirmPassword === user?.password) {
      if (confirmModal.type === 'export') {
        addAuditLog('Exportação Financeira', 'Financeiro', 'Relatório completo exportado após confirmação de senha');
        alert('Relatório exportado com sucesso!');
      } else if (confirmModal.type === 'delete' && confirmModal.id) {
        const transaction = transactions.find(t => t.id === confirmModal.id);
        addAuditLog('Exclusão de Lançamento', 'Financeiro', `Lançamento "${transaction?.description}" (ID ${confirmModal.id}) excluído após confirmação de senha`);
        alert('Lançamento excluído com sucesso.');
      }
      
      setConfirmModal({ isOpen: false, type: 'export' });
      setConfirmPassword('');
    } else {
      alert('Senha incorreta. Por favor, tente novamente.');
    }
  };

  const handleDeleteClick = (id: number) => {
    setConfirmModal({ isOpen: true, type: 'delete', id });
  };

  // 2FA Protection for Socio
  if (isSocio && !is2FAVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-nex-electric/10 rounded-full flex items-center justify-center text-nex-electric">
          <ShieldCheck size={40} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Autenticação de Dois Fatores</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
            Como Sócio, seu acesso ao financeiro exige confirmação extra. Digite o código enviado ao seu dispositivo.
          </p>
        </div>
        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <input 
            type="text" 
            placeholder="Digite o código (ex: 123456)" 
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-xl font-bold tracking-[1em] focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
          />
          <button 
            onClick={handleVerify2FA}
            disabled={isVerifying}
            className="w-full py-3 bg-nex-electric text-white rounded-xl font-bold hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20 disabled:opacity-50 flex items-center justify-center"
          >
            {isVerifying ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
            {isVerifying ? 'Verificando...' : 'Verificar e Acessar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats - Restricted for Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 relative overflow-hidden dark:bg-slate-900/50 dark:border-slate-800">
          {!isSocio && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-slate-400">
              <EyeOff size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Restrito</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">+12.5%</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">MRR (Receita Recorrente)</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">R$ 67.400</p>
        </div>

        <div className="glass-card p-6 relative overflow-hidden dark:bg-slate-900/50 dark:border-slate-800">
          {!isSocio && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-slate-400">
              <EyeOff size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Restrito</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-nex-electric/10 text-nex-electric rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="text-[10px] font-bold text-nex-electric bg-nex-electric/5 px-2 py-0.5 rounded">Projetado</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Receita Projetada (12m)</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">R$ 852.000</p>
        </div>

        <div className="glass-card p-6 dark:bg-slate-900/50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <Calendar size={20} />
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">15 Pendentes</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Contas a Receber</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">R$ 24.800</p>
        </div>

        <div className="glass-card p-6 relative overflow-hidden dark:bg-slate-900/50 dark:border-slate-800">
          {!isSocio && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-slate-400">
              <EyeOff size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Restrito</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg">
              <ArrowDownRight size={20} />
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded">-2.4%</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Despesas Mensais</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">R$ 12.350</p>
        </div>
      </div>

      {/* Main Chart - Restricted for Financeiro */}
      <div className="glass-card p-8 relative overflow-hidden dark:bg-slate-900/50 dark:border-slate-800">
        {!isSocio && (
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-slate-400">
            <Lock size={40} className="mb-4 text-nex-electric/40" />
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">Relatório Estratégico Bloqueado</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs text-center">
              Apenas Sócios podem visualizar gráficos de performance e MRR estratégico.
            </p>
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Fluxo de Caixa</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Acompanhamento de entradas e saídas mensais</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setConfirmModal({ isOpen: true, type: 'export' })}
              className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Download size={18} />
            </button>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-xs font-bold text-slate-600 dark:text-slate-400 rounded-lg px-4 py-2 outline-none">
              <option>Ano de 2023</option>
              <option>Ano de 2022</option>
            </select>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2F80ED" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2F80ED" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-card dark:bg-slate-900/50 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 dark:text-white">Transações Recentes</h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-nex-electric text-white rounded-xl text-xs font-bold hover:bg-nex-electric/90 transition-all">
              Novo Lançamento
            </button>
            <button className="text-nex-electric text-xs font-bold hover:underline">Ver Extrato Completo</button>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição / Cliente</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${t.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'}`}>
                      {t.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{t.description}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.client}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">{t.date}</td>
                <td className="px-6 py-4">
                  <p className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'} {t.amount}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    t.status === 'Pago' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 
                    t.status === 'Pendente' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleDeleteClick(t.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-nex-electric rounded-lg transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-nex-deep/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-3 text-amber-600 mb-6">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  {confirmModal.type === 'export' ? 'Confirmar Exportação' : 'Confirmar Exclusão'}
                </h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Camada Extra de Segurança</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {confirmModal.type === 'export' 
                ? 'Para exportar o relatório financeiro completo, confirme sua senha de acesso. Esta operação será registrada no log de auditoria para fins de conformidade.'
                : 'Você está prestes a excluir um registro financeiro permanentemente. Esta ação é irreversível e requer confirmação de senha.'}
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Sua Senha</label>
                <input 
                  type="password" 
                  autoFocus
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirmAction()}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                />
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setConfirmModal({ isOpen: false, type: 'export' });
                    setConfirmPassword('');
                  }}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmAction}
                  className={`flex-1 py-3 text-white rounded-xl font-bold transition-all shadow-lg ${
                    confirmModal.type === 'delete' 
                      ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' 
                      : 'bg-nex-electric hover:bg-nex-electric/90 shadow-nex-electric/20'
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
