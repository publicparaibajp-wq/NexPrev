import React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Gavel, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ExternalLink,
  X
} from 'lucide-react';

const processes = [
  { id: 1, client: 'Maria das Dores Oliveira', type: 'Judicial', benefit: 'Aposentadoria por Idade', status: 'Citação', value: 'R$ 45.000,00', probability: 'Alta', lastUpdate: '12/10/2023', deadline: '2026-03-02' }, // Vencido
  { id: 2, client: 'João Batista dos Santos', type: 'Administrativo', benefit: 'Auxílio-Doença', status: 'Análise', value: 'R$ 12.400,00', probability: 'Média', lastUpdate: '15/10/2023', deadline: '2026-03-06' }, // Urgente
  { id: 3, client: 'Ana Paula Costa', type: 'Judicial', benefit: 'Pensão por Morte', status: 'Sentença', value: 'R$ 88.200,00', probability: 'Alta', lastUpdate: '20/10/2023', deadline: '2026-03-15' }, // Normal
  { id: 4, client: 'Carlos Eduardo Lima', type: 'Judicial', benefit: 'BPC/LOAS', status: 'Perícia', value: 'R$ 15.000,00', probability: 'Baixa', lastUpdate: '22/10/2023', deadline: '2026-03-05' }, // Urgente
  { id: 5, client: 'Beatriz Souza Rocha', type: 'Administrativo', benefit: 'Aposentadoria Especial', status: 'Concedido', value: 'R$ 120.000,00', probability: 'Concluído', lastUpdate: '24/10/2023', deadline: null },
];

const getDeadlineStatus = (deadline: string | null) => {
  if (!deadline) return null;
  const today = new Date('2026-03-04');
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: 'Vencido', color: 'bg-rose-500', text: 'text-rose-600', bg: 'bg-rose-50' };
  if (diffDays <= 3) return { label: 'Urgente', color: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50' };
  return { label: 'No Prazo', color: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50' };
};

interface NewProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProcessDetailsModal = ({ isOpen, onClose, process }: { isOpen: boolean; onClose: () => void; process: any }) => {
  if (!isOpen || !process) return null;

  const deadlineStatus = getDeadlineStatus(process.deadline);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-nex-deep/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-nex-electric text-white rounded-2xl shadow-lg shadow-nex-electric/20">
              <Gavel size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{process.client}</h3>
              <p className="text-xs text-slate-500 font-mono">0001234-56.2023.4.03.6100</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {deadlineStatus && (
            <div className={`p-4 rounded-2xl flex items-center justify-between ${deadlineStatus.bg} border border-${deadlineStatus.text.split('-')[1]}-100`}>
              <div className="flex items-center space-x-3">
                <AlertCircle className={deadlineStatus.text} size={20} />
                <div>
                  <p className={`text-sm font-bold ${deadlineStatus.text}`}>Alerta de Prazo: {deadlineStatus.label}</p>
                  <p className="text-[10px] text-slate-500">Vencimento em: {new Date(process.deadline).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${deadlineStatus.color}`}>
                {deadlineStatus.label === 'Vencido' ? 'Ação Imediata' : 'Atenção'}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tipo de Processo</label>
                <p className="text-sm font-bold text-slate-800 mt-1">{process.type}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Benefício / Objeto</label>
                <p className="text-sm font-bold text-slate-800 mt-1">{process.benefit}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fase Atual</label>
                <p className="text-sm font-bold text-slate-800 mt-1">{process.status}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor da Causa</label>
                <p className="text-sm font-bold text-slate-800 mt-1">{process.value}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end space-x-3">
            <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm">
              Editar Processo
            </button>
            <button className="px-6 py-3 bg-nex-electric text-white rounded-xl font-bold hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20 text-sm">
              Ver Movimentações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewProcessModal = ({ isOpen, onClose }: NewProcessModalProps) => {
  const [client, setClient] = React.useState('');
  const [benefit, setBenefit] = React.useState('Aposentadoria por Idade');
  const [otherArea, setOtherArea] = React.useState('');
  const [type, setType] = React.useState('Judicial');
  const [value, setValue] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Processo para ${client} cadastrado!\nBenefício: ${benefit === 'Outros' ? `Outros (${otherArea})` : benefit}`);
    onClose();
  };

  const benefitOptions = [
    'Aposentadoria por Idade',
    'Aposentadoria por Tempo de Contribuição',
    'Aposentadoria Especial',
    'Auxílio-Doença',
    'Pensão por Morte',
    'BPC/LOAS',
    'Salário Maternidade',
    'Auxílio-Acidente',
    'Outros'
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-nex-deep/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">Novo Processo</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cliente</label>
            <input 
              type="text" 
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
              placeholder="Nome do cliente já cadastrado"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
              >
                <option value="Judicial">Judicial</option>
                <option value="Administrativo">Administrativo</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Valor da Causa</label>
              <input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Benefício / Objeto</label>
            <select 
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
            >
              {benefitOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {benefit === 'Outros' && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-nex-electric uppercase tracking-widest">Especifique a Área (Ex: Trabalhista)</label>
              <input 
                type="text" 
                required
                value={otherArea}
                onChange={(e) => setOtherArea(e.target.value)}
                className="w-full px-4 py-2 bg-nex-electric/5 border border-nex-electric/30 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
                placeholder="Qual a área do direito?"
              />
            </div>
          )}

          <div className="pt-4 flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-3 bg-nex-electric text-white rounded-xl font-bold hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20">
              Criar Processo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Processes() {
  const [isNewProcessModalOpen, setIsNewProcessModalOpen] = React.useState(false);
  const [selectedProcess, setSelectedProcess] = React.useState<any>(null);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por processo, cliente ou OAB..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nex-electric/20 focus:border-nex-electric transition-all"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span className="text-sm font-medium">Filtros</span>
          </button>
          <button 
            onClick={() => setIsNewProcessModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-nex-electric text-white rounded-xl hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Novo Processo</span>
          </button>
        </div>
      </div>

      {/* Processes Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Processo / Cliente</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo / Benefício</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fase Atual</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor da Causa</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Êxito</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {processes.map((proc) => {
              const deadlineStatus = getDeadlineStatus(proc.deadline);
              return (
                <tr 
                  key={proc.id} 
                  onClick={() => setSelectedProcess(proc)}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-slate-100 rounded-lg text-nex-deep mr-3 group-hover:bg-nex-electric group-hover:text-white transition-colors">
                        <Gavel size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{proc.client}</p>
                        <p className="text-[10px] text-slate-500 font-mono">0001234-56.2023.4.03.6100</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${proc.type === 'Judicial' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                        {proc.type}
                      </span>
                      <p className="text-xs font-medium text-slate-600">{proc.benefit}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">{proc.status}</span>
                    </div>
                    {deadlineStatus ? (
                      <div className={`mt-1 flex items-center space-x-1 ${deadlineStatus.text}`}>
                        <AlertCircle size={10} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{deadlineStatus.label}</span>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1">Atualizado em {proc.lastUpdate}</p>
                    )}
                  </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">{proc.value}</p>
                  <p className="text-[10px] text-slate-500">Honorários: 30%</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      proc.probability === 'Alta' ? 'bg-emerald-500' : 
                      proc.probability === 'Média' ? 'bg-amber-500' : 
                      proc.probability === 'Baixa' ? 'bg-rose-500' : 'bg-slate-400'
                    }`}></div>
                    <span className="text-xs font-bold text-slate-700">{proc.probability}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-nex-electric/10 rounded-lg transition-all">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-nex-electric/10 rounded-lg transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
      </div>

      {/* Timeline Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-bold text-slate-800 mb-6">Movimentações Recentes do Escritório</h3>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {[
              { time: 'Há 2 horas', title: 'Sentença Proferida', desc: 'Processo de Maria Oliveira teve sentença favorável publicada.', type: 'success' },
              { time: 'Há 5 horas', title: 'Perícia Agendada', desc: 'Perícia médica de Carlos Lima agendada para 15/11.', type: 'info' },
              { time: 'Ontem', title: 'Novo Processo Protocolado', desc: 'Protocolo administrativo de Ana Costa realizado com sucesso.', type: 'new' },
            ].map((item, i) => (
              <div key={i} className="relative pl-8">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                  item.type === 'success' ? 'bg-emerald-500' : item.type === 'info' ? 'bg-nex-electric' : 'bg-amber-500'
                }`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800">{item.title}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-slate-800 mb-6">Resumo de Êxito</h3>
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="text-emerald-600" size={20} />
                <span className="text-xs font-bold text-emerald-700">84% de Sucesso</span>
              </div>
              <p className="text-[10px] text-emerald-600 leading-relaxed">
                Sua taxa de êxito em processos de Aposentadoria por Idade está acima da média nacional.
              </p>
            </div>
            
            <div className="p-4 bg-nex-deep rounded-xl text-white">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="text-nex-electric" size={20} />
                <p className="text-xs font-bold">Projeção de Honorários</p>
              </div>
              <p className="text-2xl font-bold">R$ 452.000</p>
              <p className="text-[10px] opacity-70 mt-1">Valor estimado a receber nos próximos 12 meses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Process Modal */}
      <NewProcessModal 
        isOpen={isNewProcessModalOpen} 
        onClose={() => setIsNewProcessModalOpen(false)} 
      />

      {/* Process Details Modal */}
      <ProcessDetailsModal 
        isOpen={!!selectedProcess}
        onClose={() => setSelectedProcess(null)}
        process={selectedProcess}
      />
    </div>
  );
}
