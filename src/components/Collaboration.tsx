import React from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Search, 
  Users, 
  Hash, 
  AtSign,
  Check,
  CheckCheck,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

const channels = [
  { id: 'general', name: 'Geral', type: 'channel' },
  { id: 'processes', name: 'Processos Ativos', type: 'channel' },
  { id: 'financial', name: 'Financeiro', type: 'channel' },
];

const directMessages = [
  { id: 'ricardo', name: 'Dr. Ricardo Silva', status: 'online', role: 'Sócio' },
  { id: 'fernanda', name: 'Dra. Fernanda Lima', status: 'offline', role: 'Advogada' },
  { id: 'lucas', name: 'Dr. Lucas Souza', status: 'online', role: 'Advogado' },
];

const messages = [
  { id: 1, user: 'Dr. Ricardo Silva', content: 'Pessoal, a sentença da Maria Oliveira saiu e foi favorável! 🎉', time: '10:30', status: 'read' },
  { id: 2, user: 'Dra. Fernanda Lima', content: 'Excelente notícia! Já vou preparar o cálculo dos atrasados.', time: '10:35', status: 'read' },
  { id: 3, user: 'Dr. Lucas Souza', content: '@Fernanda, use o NexIA para agilizar a conferência do CNIS dela.', time: '10:42', status: 'sent' },
];

export default function Collaboration() {
  const [message, setMessage] = React.useState('');

  return (
    <div className="h-[calc(100vh-12rem)] flex glass-card overflow-hidden animate-in fade-in duration-500">
      {/* Sidebar */}
      <div className="w-72 border-r border-slate-100 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-nex-electric/20 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Canais</h4>
            <div className="space-y-1">
              {channels.map(c => (
                <button key={c.id} className={`w-full flex items-center space-x-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${c.id === 'general' ? 'bg-nex-electric/10 text-nex-electric' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <Hash size={16} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Mensagens Diretas</h4>
            <div className="space-y-1">
              {directMessages.map(dm => (
                <button key={dm.id} className="w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {dm.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${dm.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">{dm.name}</p>
                      <p className="text-[10px] text-slate-400">{dm.role}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-nex-electric/10 text-nex-electric rounded-xl flex items-center justify-center">
              <Hash size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Geral</h3>
              <p className="text-[10px] text-slate-500">Canal de comunicação geral do escritório</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-nex-electric transition-colors">
              <Users size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-nex-electric transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="px-4 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Hoje, 24 de Outubro
            </div>
          </div>

          {messages.map((m) => (
            <div key={m.id} className="flex items-start space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-nex-deep">
                {m.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-bold text-slate-800">{m.user}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none inline-block max-w-2xl">
                  <p className="text-sm text-slate-700 leading-relaxed">{m.content}</p>
                </div>
                <div className="mt-1 flex items-center space-x-2">
                  {m.status === 'read' ? <CheckCheck size={14} className="text-nex-electric" /> : <Check size={14} className="text-slate-300" />}
                  <span className="text-[10px] text-slate-400">Visto</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-2 border border-slate-200 focus-within:border-nex-electric focus-within:ring-2 focus-within:ring-nex-electric/10 transition-all">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva sua mensagem aqui... Use @ para marcar alguém"
              className="w-full bg-transparent border-none resize-none px-4 py-2 text-sm focus:outline-none min-h-[80px]"
            />
            <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-200/50">
              <div className="flex items-center space-x-1">
                <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-white rounded-lg transition-all">
                  <Paperclip size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-white rounded-lg transition-all">
                  <ImageIcon size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-white rounded-lg transition-all">
                  <FileText size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-white rounded-lg transition-all">
                  <AtSign size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-white rounded-lg transition-all">
                  <Smile size={18} />
                </button>
              </div>
              <button 
                className="flex items-center space-x-2 px-6 py-2 bg-nex-electric text-white rounded-xl font-bold text-sm hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20 disabled:opacity-50"
                disabled={!message.trim()}
              >
                <span>Enviar</span>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
