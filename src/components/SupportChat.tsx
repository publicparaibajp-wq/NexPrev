import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Headphones, 
  Check, 
  CheckCheck,
  Loader2,
  Zap,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'support';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export default function SupportChat() {
  const { user, theme } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'support',
      content: `Olá, ${user?.name?.split(' ')[0] || 'Doutor'}! Sou o consultor de sucesso da NexPrev. Como posso ajudar você com o sistema hoje?`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'support',
        content: getAutoResponse(message),
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, supportMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getAutoResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('financeiro') || lowerInput.includes('dinheiro') || lowerInput.includes('pagamento')) {
      return "Para questões financeiras, você pode acessar a aba 'Financeiro' no menu lateral. Se precisar de ajuda com faturamento, nosso time financeiro responde em até 30 minutos.";
    }
    if (lowerInput.includes('processo') || lowerInput.includes('judicial')) {
      return "A gestão de processos permite que você acompanhe prazos e movimentações. Você já viu os novos alertas de prazos críticos na dashboard?";
    }
    if (lowerInput.includes('ia') || lowerInput.includes('nexia')) {
      return "A NexIA pode analisar seu CNIS em segundos! Basta fazer o upload do PDF na aba NexIA. Deseja que eu te mostre como?";
    }
    if (lowerInput.includes('senha') || lowerInput.includes('acesso')) {
      return "Você pode alterar sua senha em 'Configurações' > 'Segurança'. Lembre-se que ações sensíveis exigem confirmação de senha.";
    }
    return "Entendi sua dúvida. Vou encaminhar para um de nossos especialistas em sucesso do cliente e eles entrarão em contato em breve. Posso ajudar com mais algo?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div
          className={`absolute bottom-20 right-0 w-96 h-[500px] rounded-3xl shadow-2xl overflow-hidden flex flex-col border transition-all duration-300 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}
        >
          {/* Header */}
          <div className="p-6 bg-nex-deep text-white flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10 flex items-center space-x-3">
              <div className="w-10 h-10 bg-nex-electric rounded-xl flex items-center justify-center shadow-lg shadow-nex-electric/20">
                <Headphones size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Suporte NexPrev</h3>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-slate-300 font-medium">Online agora</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-nex-electric/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          </div>

          {/* Messages Area */}
          <div className={`flex-1 overflow-y-auto p-6 space-y-4 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50/50'
          }`}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-nex-electric text-white rounded-tr-none' 
                    : theme === 'dark' 
                      ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                  <div className={`mt-1 flex items-center space-x-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-[9px] opacity-60`}>{msg.timestamp}</span>
                    {msg.role === 'user' && (
                      msg.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-2xl rounded-tl-none border flex items-center space-x-1.5 ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <div className="w-1.5 h-1.5 bg-nex-electric rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-nex-electric rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-nex-electric rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t transition-colors duration-300 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Como podemos ajudar?"
                className={`flex-1 text-sm border-none rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all ${
                  theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'
                }`}
              />
              <button 
                onClick={handleSend}
                disabled={!message.trim() || isTyping}
                className="p-2.5 bg-nex-electric text-white rounded-xl hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center space-x-4">
              <button className="text-[10px] text-slate-500 hover:text-nex-electric font-bold uppercase tracking-widest flex items-center space-x-1">
                <HelpCircle size={12} />
                <span>FAQ</span>
              </button>
              <button className="text-[10px] text-slate-500 hover:text-nex-electric font-bold uppercase tracking-widest flex items-center space-x-1">
                <Zap size={12} />
                <span>Tutoriais</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 relative ${
          isOpen 
            ? 'bg-slate-800 text-white rotate-90' 
            : 'bg-nex-electric text-white shadow-nex-electric/40'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950 font-bold">
            1
          </span>
        )}
      </button>
    </div>
  );
}
