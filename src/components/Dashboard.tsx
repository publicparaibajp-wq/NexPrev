import React from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Info,
  Heart,
  Stethoscope,
  Baby,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 45000, processes: 12 },
  { name: 'Fev', revenue: 52000, processes: 15 },
  { name: 'Mar', revenue: 48000, processes: 10 },
  { name: 'Abr', revenue: 61000, processes: 22 },
  { name: 'Mai', revenue: 55000, processes: 18 },
  { name: 'Jun', revenue: 67000, processes: 25 },
];

const pieData = [
  { name: 'Aposentadoria por Idade', value: 180 },
  { name: 'Aposentadoria por Tempo', value: 220 },
  { name: 'Aposentadoria Especial', value: 95 },
  { name: 'Auxílio-Doença', value: 310 },
  { name: 'Pensão por Morte', value: 185 },
  { name: 'BPC/LOAS', value: 140 },
  { name: 'Salário Maternidade', value: 75 },
  { name: 'Auxílio-Acidente', value: 45 },
];

const COLORS = [
  '#0F1F3D', // Nex Deep
  '#2F80ED', // Nex Electric
  '#2B2F36', // Nex Graphite
  '#94A3B8', // Slate 400
  '#10B981', // Emerald 500
  '#F59E0B', // Amber 500
  '#EC4899', // Pink 500
  '#8B5CF6', // Violet 500
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="glass-card p-6 flex flex-col dark:bg-slate-900/50 dark:border-slate-800">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-nex-deep dark:text-nex-electric">
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
  </div>
);

export default function Dashboard() {
  const criticalDeadlines = [
    { id: 1, title: 'Réplica à Contestação', client: 'Maria Oliveira', deadline: '2026-03-02', status: 'overdue' },
    { id: 2, title: 'Audiência de Instrução', client: 'João Santos', deadline: '2026-03-05', status: 'urgent' },
    { id: 3, title: 'Recurso Ordinário', client: 'Carlos Lima', deadline: '2026-03-06', status: 'urgent' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Critical Alerts Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {criticalDeadlines.map((alert) => (
          <div 
            key={alert.id}
            className={`relative overflow-hidden p-4 rounded-2xl border flex items-center space-x-4 animate-in slide-in-from-top-4 duration-500 ${
              alert.status === 'overdue' 
                ? 'bg-rose-50 border-rose-100 dark:bg-rose-900/10 dark:border-rose-900/30' 
                : 'bg-amber-50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/30'
            }`}
          >
            <div className={`p-3 rounded-xl ${
              alert.status === 'overdue' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              <AlertCircle size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${
                  alert.status === 'overdue' ? 'text-rose-600' : 'text-amber-600'
                }`}>
                  {alert.status === 'overdue' ? 'Prazo Vencido' : 'Prazo Crítico'}
                </p>
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(alert.deadline).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">{alert.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{alert.client}</p>
            </div>
            <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full opacity-10 ${
              alert.status === 'overdue' ? 'bg-rose-500' : 'bg-amber-500'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Clientes Ativos" 
          value="1,284" 
          icon={Users} 
          trend="up" 
          trendValue="+12% este mês" 
        />
        <StatCard 
          title="Processos em Curso" 
          value="856" 
          icon={Briefcase} 
          trend="up" 
          trendValue="+5% este mês" 
        />
        <StatCard 
          title="Receita Mensal (MRR)" 
          value="R$ 67.400" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="+18% vs mês ant." 
        />
        <StatCard 
          title="Taxa de Êxito" 
          value="84.2%" 
          icon={CheckCircle2} 
          trend="up" 
          trendValue="+2.1%" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 dark:bg-slate-900/50 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">Crescimento de Receita</h3>
            <select className="text-xs border-none bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded px-2 py-1 outline-none">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2F80ED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2F80ED" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 dark:bg-slate-900/50 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6">Distribuição de Benefícios Detalhada</h3>
          <div className="h-80 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col space-y-1.5 pr-4 max-h-80 overflow-y-auto custom-scrollbar">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium truncate max-w-[120px]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Guide Section */}
      <div className="glass-card p-8 dark:bg-slate-900/50 dark:border-slate-800">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-nex-electric/10 text-nex-electric rounded-lg">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Guia de Benefícios NexPrev</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Detalhamento técnico dos principais benefícios do RGPS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Aposentadoria por Idade', 
              icon: Users, 
              color: 'text-blue-600', 
              bg: 'bg-blue-50 dark:bg-blue-900/20',
              desc: 'Exige idade mínima (65M/62F) e carência de 180 contribuições.' 
            },
            { 
              title: 'Aposentadoria por Tempo', 
              icon: Clock, 
              color: 'text-indigo-600', 
              bg: 'bg-indigo-50 dark:bg-indigo-900/20',
              desc: 'Regras de transição (pedágio, pontos, idade progressiva) pós-EC 103.' 
            },
            { 
              title: 'Salário Maternidade', 
              icon: Baby, 
              color: 'text-pink-600', 
              bg: 'bg-pink-50 dark:bg-pink-900/20',
              desc: 'Devido por 120 dias em caso de parto, adoção ou aborto não criminoso.' 
            },
            { 
              title: 'Auxílio-Doença', 
              icon: Stethoscope, 
              color: 'text-emerald-600', 
              bg: 'bg-emerald-50 dark:bg-emerald-900/20',
              desc: 'Incapacidade temporária para o trabalho por mais de 15 dias.' 
            },
            { 
              title: 'Pensão por Morte', 
              icon: Heart, 
              color: 'text-rose-600', 
              bg: 'bg-rose-50 dark:bg-rose-900/20',
              desc: 'Pago aos dependentes do segurado que falecer ou tiver morte presumida.' 
            },
            { 
              title: 'BPC / LOAS', 
              icon: ShieldCheck, 
              color: 'text-amber-600', 
              bg: 'bg-amber-50 dark:bg-amber-900/20',
              desc: 'Benefício assistencial para idosos (65+) ou deficientes de baixa renda.' 
            },
            { 
              title: 'Aposentadoria Especial', 
              icon: Zap, 
              color: 'text-purple-600', 
              bg: 'bg-purple-50 dark:bg-purple-900/20',
              desc: 'Trabalho exposto a agentes nocivos (químicos, físicos ou biológicos).' 
            },
            { 
              title: 'Auxílio-Acidente', 
              icon: AlertCircle, 
              color: 'text-orange-600', 
              bg: 'bg-orange-50 dark:bg-orange-900/20',
              desc: 'Indenização por sequelas que reduzam a capacidade laborativa.' 
            },
          ].map((benefit, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-nex-electric/30 transition-all group">
              <div className={`w-10 h-10 ${benefit.bg} ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <benefit.icon size={20} />
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">{benefit.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card dark:bg-slate-900/50 dark:border-slate-800 overflow-hidden border-t-4 border-nex-electric">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-nex-electric" />
              <h3 className="font-bold text-slate-800 dark:text-white">Agenda: Prazos Críticos</h3>
            </div>
            <button className="text-nex-electric text-xs font-bold hover:underline uppercase tracking-widest">Ver Agenda Completa</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { id: 1, title: 'Réplica à Contestação', client: 'Maria Oliveira', date: 'Vencido (02/03)', priority: 'overdue' },
              { id: 2, title: 'Audiência de Instrução', client: 'João Santos', date: 'Amanhã, 09:30', priority: 'urgent' },
              { id: 3, title: 'Protocolo Administrativo', client: 'Ana Costa', date: '06 Mar, 17:00', priority: 'urgent' },
              { id: 4, title: 'Recurso Ordinário', client: 'Carlos Lima', date: '06 Mar, 23:59', priority: 'urgent' },
            ].map((item) => (
              <div key={item.id} className="p-5 flex items-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                <div className={`w-1.5 h-12 rounded-full mr-5 ${
                  item.priority === 'overdue' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-nex-electric transition-colors">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.client}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${
                    item.priority === 'overdue' ? 'text-rose-600' : 'text-slate-700 dark:text-slate-300'
                  }`}>{item.date}</p>
                  <div className="flex items-center justify-end mt-1">
                    <span className={`text-[10px] uppercase font-bold tracking-tighter ${
                      item.priority === 'overdue' ? 'text-rose-500' : 'text-amber-500'
                    }`}>
                      {item.priority === 'overdue' ? 'Ação Imediata' : 'Urgente'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 dark:bg-slate-900/50 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white mb-6">Produtividade da Equipe</h3>
          <div className="space-y-6">
            {[
              { name: 'Dr. Ricardo', tasks: 45, progress: 85 },
              { name: 'Dra. Fernanda', tasks: 38, progress: 92 },
              { name: 'Dr. Lucas', tasks: 32, progress: 70 },
              { name: 'Dra. Beatriz', tasks: 29, progress: 60 },
            ].map((user) => (
              <div key={user.name} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{user.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{user.tasks} tarefas</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-nex-electric h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-nex-deep dark:bg-slate-900 rounded-xl text-white">
            <div className="flex items-center space-x-3">
              <Zap className="text-nex-electric" size={20} />
              <div>
                <p className="text-xs font-bold">NexIA Insight</p>
                <p className="text-[10px] opacity-80">A produtividade subiu 15% após a automação de CNIS.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
