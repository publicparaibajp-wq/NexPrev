import React from 'react';
import { 
  Zap, 
  FileSearch, 
  Calculator, 
  TrendingUp, 
  FileText, 
  ShieldCheck,
  ArrowRight,
  Loader2,
  Sparkles,
  MessageSquare,
  Send,
  History,
  Upload,
  BrainCircuit,
  Check,
  CheckCheck,
  Baby
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  status?: 'sent' | 'read';
  time?: string;
}

export default function NexIA() {
  const [activeTab, setActiveTab] = React.useState<'analysis' | 'chat' | 'history'>('analysis');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  
  // Chat state
  const [chatInput, setChatInput] = React.useState('');
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', content: 'Olá! Eu sou a NexIA. Como posso ajudar com suas dúvidas previdenciárias hoje?', status: 'read', time: '10:00' }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const [cnisProcessingStep, setCnisProcessingStep] = React.useState<number>(0);
  const [extractedVínculos, setExtractedVínculos] = React.useState<any[]>([]);

  const generateAnalysis = async (type: 'cnis' | 'calc' | 'projection' | 'maternidade' | 'generic' = 'generic') => {
    setIsProcessing(true);
    setResult(null);
    setExtractedVínculos([]);
    setCnisProcessingStep(0);
    
    let prompt = "";
    let systemInstruction = "Você é o NexIA, a inteligência artificial da NexPrev, uma LegalTech premium. Seu tom é profissional, técnico e estratégico.";

    if (type === 'cnis') {
      // Visual simulation steps for CNIS
      for (let i = 1; i <= 3; i++) {
        setCnisProcessingStep(i);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      prompt = `Simule uma leitura técnica de um CNIS (Cadastro Nacional de Informações Sociais) para a cliente 'Maria das Dores Oliveira'. 
      Retorne um relatório em Markdown que inclua:
      1. Uma tabela de vínculos (Empresa, Início, Fim, Tempo).
      2. Uma seção de 'Indicadores Encontrados' com explicações.
      3. Cálculo do Tempo Total de Contribuição.
      4. Sugestões de Retificação.
      
      Seja muito detalhista e técnico.`;
    } else if (type === 'maternidade') {
      // Visual simulation steps for Maternidade
      for (let i = 1; i <= 3; i++) {
        setCnisProcessingStep(i + 9); // 10, 11, 12 for maternidade
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      prompt = `Realize uma análise técnica de Salário Maternidade para a cliente 'Ana Paula Costa'.
      Considere os seguintes cenários:
      1. Segurada Empregada (Parto, Adoção).
      2. Segurada Desempregada (Período de Graça).
      3. Contribuinte Individual/Facultativa (Carência de 10 meses).
      
      O relatório deve conter:
      - Requisitos de Carência para cada categoria.
      - Cálculo da RMI (Média dos 12 últimos salários vs Salário Mínimo).
      - Documentação necessária para o requerimento.
      - Duração do benefício e regras de prorrogação.
      
      Use Markdown premium com tabelas e destaque os pontos críticos de atenção.`;
    } else if (type === 'calc') {
      // Visual simulation steps for Calculations
      for (let i = 1; i <= 3; i++) {
        setCnisProcessingStep(i + 3); // 4, 5, 6 for calc
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      prompt = `Realize um Planejamento Previdenciário Estratégico e Comparativo para 'Maria das Dores Oliveira' (58 anos, 28 anos de contribuição).
      
      Simule e compare DETALHADAMENTE as seguintes regras de aposentadoria (incluindo as de transição da EC 103/2019):
      1. Aposentadoria por Idade (Regra Geral e Transição)
      2. Pedágio de 50% (Tempo de Contribuição)
      3. Pedágio de 100% (Tempo de Contribuição)
      4. Regra de Pontos (86/96 progressiva)
      5. Idade Mínima Progressiva
      
      Para cada regra, apresente obrigatoriamente:
      - Data exata do implemento do direito.
      - Memória de cálculo da RMI (Renda Mensal Inicial) estimada.
      - Coeficiente de cálculo aplicado (60% + 2% por ano que exceder 15/20 anos).
      - Valor da RMI em valores atuais.
      
      Crie uma seção central chamada '🏆 ANÁLISE DE VANTAGEM FINANCEIRA (ROI)' que contenha:
      - Uma TABELA COMPARATIVA DE ALTO IMPACTO com as colunas: Regra, Data do Direito, RMI Estimada, Investimento Necessário (se houver), e 'Break-even' (Ponto de Equilíbrio).
      - Indicação clara da 'MELHOR REGRA' (The Best Option).
      - Justificativa Técnica do PORQUÊ: Explique matematicamente por que essa regra é superior. Considere o 'Valor Acumulado em 10 e 20 anos' (Expectativa de Vida).
      - Análise de Custo de Oportunidade: Vale a pena esperar 2 anos para ganhar R$ 500 a mais na RMI? Calcule quanto o cliente deixa de receber nesse período de espera.
      
      Finalize com uma 'Sugestão Estratégica NexPrev' para o advogado apresentar ao cliente.
      
      Use Markdown premium, utilize emojis para destacar pontos positivos e negativos, use tabelas e negritos para facilitar a leitura.`;
    } else if (type === 'projection') {
      // Visual simulation steps for Projections
      for (let i = 1; i <= 3; i++) {
        setCnisProcessingStep(i + 6); // 7, 8, 9 for projection
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      prompt = `Gere uma Projeção de Valores Retroativos (Atrasados) detalhada para um processo previdenciário da cliente 'Maria das Dores Oliveira'.
      
      Parâmetros da Simulação:
      - Data de Início do Benefício (DIB): 01/01/2022
      - RMI Estimada: R$ 3.850,00
      - Duração do Processo: 24 meses até a data atual.
      
      O relatório deve conter:
      1. Uma TABELA FINANCEIRA detalhada mês a mês ou por períodos, incluindo:
         - Valor Nominal do Benefício.
         - Correção Monetária (IPCA-E).
         - Juros de Mora (1% ao mês ou SELIC conforme legislação atual).
         - Valor Bruto Acumulado.
      2. Resumo de Retenções:
         - Imposto de Renda (RRA - Rendimentos Recebidos Acumulados).
         - Honorários Advocatícios Contratuais (30%).
      3. Resultado Final:
         - Valor Líquido para o Cliente.
         - Valor Total de Honorários para o Escritório.
      
      Use Markdown premium com tabelas bem formatadas e destaque os valores finais em negrito.`;
    } else {
      prompt = "Gere um relatório de análise previdenciária completo para 'Maria das Dores Oliveira'. Inclua tempo de contribuição, regras de transição, projeção de RMI e sugestão estratégica. Use Markdown.";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        }
      });
      
      setResult(response.text || "Erro ao gerar análise.");
      setActiveTab('analysis');
    } catch (error) {
      console.error("AI Error:", error);
      setResult("Ocorreu um erro ao processar a análise via IA. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
      setCnisProcessingStep(0);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      content: chatInput,
      status: 'sent',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: "Você é o NexIA, assistente jurídico especializado em Direito Previdenciário brasileiro. Você tem conhecimento profundo sobre todos os benefícios do RGPS: Aposentadoria por Idade, Tempo de Contribuição (regras de transição da EC 103/19), Especial, Auxílio-Doença (Incapacidade Temporária), Pensão por Morte, BPC/LOAS, Salário Maternidade, Auxílio-Acidente e Auxílio-Reclusão. Responda de forma clara, técnica e objetiva. Sempre cite que as informações devem ser validadas por um advogado.",
        }
      });

      const response = await chat.sendMessage({ message: chatInput });
      const assistantMsg: ChatMessage = { 
        role: 'assistant', 
        content: response.text || "Desculpe, não consegui processar sua pergunta.",
        status: 'read',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      // Mark user message as read when AI responds
      setChatMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1].status = 'read';
        }
        return [...updated, assistantMsg];
      });
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Houve um erro na conexão com meu cérebro digital. Tente novamente em instantes." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'analysis' ? 'bg-white text-nex-electric shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BrainCircuit size={18} />
            <span>Análise Estratégica</span>
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'chat' ? 'bg-white text-nex-electric shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MessageSquare size={18} />
            <span>Consultoria NexIA</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-nex-electric shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <History size={18} />
            <span>Histórico</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2 text-nex-electric bg-nex-electric/10 px-3 py-1 rounded-full">
          <Zap size={14} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest">IA Ativa</span>
        </div>
      </div>

      {activeTab === 'analysis' && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          {/* Hero Section */}
          <div className="bg-nex-deep rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-nex-electric/20 rounded-full border border-nex-electric/30">
                  <Sparkles size={14} className="text-nex-electric" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-nex-electric">Inteligência Artificial Premium</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">NexIA: O cérebro estratégico do seu escritório.</h2>
                <p className="text-slate-300 text-lg">
                  Automatize a leitura de CNIS, calcule tempos de contribuição complexos e receba sugestões estratégicas baseadas em dados reais.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <button 
                    onClick={() => generateAnalysis()}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-nex-electric hover:bg-nex-electric/90 text-white rounded-xl font-bold transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                    <span>{isProcessing ? 'Processando...' : 'Análise Completa'}</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all flex items-center space-x-2"
                  >
                    <MessageSquare size={20} />
                    <span>Tirar Dúvida</span>
                  </button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-64 h-64 bg-nex-electric/10 rounded-full flex items-center justify-center border border-nex-electric/20 relative">
                  <div className="absolute inset-0 animate-pulse bg-nex-electric/5 rounded-full"></div>
                  <Zap size={80} className="text-nex-electric drop-shadow-[0_0_15px_rgba(47,128,237,0.5)]" />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-nex-electric/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nex-electric/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'cnis', icon: FileSearch, title: 'Leitura de CNIS', desc: 'Extração automática de vínculos, salários e indicadores do INSS.' },
              { id: 'calc', icon: Calculator, title: 'Cálculos e ROI', desc: 'Simulação de RMI, Regras de Transição e Análise de Vantagem Financeira.' },
              { id: 'maternidade', icon: Baby, title: 'Salário Maternidade', desc: 'Análise de carência e qualidade de segurada para benefício maternidade.' },
              { id: 'projection', icon: TrendingUp, title: 'Projeção de Atrasados', desc: 'Estimativa precisa de valores retroativos e honorários sucumbenciais.' },
            ].map((f, i) => (
              <div 
                key={i} 
                onClick={() => generateAnalysis(f.id as any)}
                className="glass-card p-6 hover:border-nex-electric transition-colors cursor-pointer group relative overflow-hidden"
              >
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-nex-electric" size={24} />
                  </div>
                )}
                <div className="p-3 bg-slate-100 rounded-xl text-nex-deep group-hover:bg-nex-electric group-hover:text-white transition-colors w-fit mb-4">
                  <f.icon size={24} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{f.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center text-nex-electric text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Executar agora</span>
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Result Area */}
          {cnisProcessingStep > 0 && (
            <div className="glass-card p-8 animate-in fade-in duration-500 border-l-4 border-nex-electric bg-slate-50/50">
              <div className="flex flex-col items-center justify-center space-y-6 py-12">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-nex-electric/20 border-t-nex-electric rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileSearch className="text-nex-electric" size={32} />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">
                    {cnisProcessingStep === 1 && "Lendo arquivo CNIS..."}
                    {cnisProcessingStep === 2 && "Extraindo vínculos e salários..."}
                    {cnisProcessingStep === 3 && "Calculando tempo de contribuição..."}
                    {cnisProcessingStep === 4 && "Simulando regras de transição..."}
                    {cnisProcessingStep === 5 && "Calculando RMI e coeficientes..."}
                    {cnisProcessingStep === 6 && "Analisando vantagem financeira..."}
                    {cnisProcessingStep === 7 && "Calculando correção monetária..."}
                    {cnisProcessingStep === 8 && "Aplicando juros de mora..."}
                    {cnisProcessingStep === 9 && "Projetando honorários e líquido..."}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Nossa IA está processando os dados técnicos para gerar sua análise estratégica.
                  </p>
                </div>
                <div className="w-full max-w-md bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-nex-electric h-full transition-all duration-500" 
                    style={{ width: `${((cnisProcessingStep > 6 ? cnisProcessingStep - 6 : cnisProcessingStep > 3 ? cnisProcessingStep - 3 : cnisProcessingStep) / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="glass-card p-8 animate-in slide-in-from-top-4 duration-500 border-l-4 border-nex-electric">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Resultado da Análise NexIA</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-nex-electric transition-colors">
                    <FileText size={20} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-nex-electric transition-colors">
                    <ShieldCheck size={20} />
                  </button>
                </div>
              </div>
              <div className="markdown-body prose prose-slate max-w-none">
                <Markdown>{result}</Markdown>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400 italic">
                  * Esta análise foi gerada por inteligência artificial e deve ser validada por um profissional.
                </p>
                <button className="flex items-center space-x-2 text-nex-electric font-bold text-sm hover:underline">
                  <span>Gerar Relatório PDF</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="glass-card h-[600px] flex flex-col animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-slate-100 flex items-center space-x-4 bg-slate-50/50">
            <div className="w-12 h-12 bg-nex-electric text-white rounded-2xl flex items-center justify-center shadow-lg shadow-nex-electric/20">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Consultoria NexIA</h3>
              <p className="text-xs text-slate-500">Especialista em Direito Previdenciário</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-nex-electric text-white rounded-tr-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  <div className="markdown-body prose prose-sm max-w-none">
                    <Markdown
                      components={{
                        p: ({ children }) => {
                          if (typeof children === 'string') {
                            const parts = children.split(/(@\w+)/g);
                            return (
                              <p>
                                {parts.map((part, idx) => 
                                  part.startsWith('@') ? (
                                    <span key={idx} className="font-bold text-nex-electric bg-nex-electric/10 px-1 rounded">{part}</span>
                                  ) : part
                                )}
                              </p>
                            );
                          }
                          return <p>{children}</p>;
                        }
                      }}
                    >
                      {msg.content}
                    </Markdown>
                  </div>
                  <div className={`mt-1 flex items-center space-x-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-[9px] ${msg.role === 'user' ? 'text-white/70' : 'text-slate-400'}`}>{msg.time}</span>
                    {msg.role === 'user' && (
                      msg.status === 'read' 
                        ? <CheckCheck size={12} className="text-white" /> 
                        : <Check size={12} className="text-white/70" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                  <div className="w-2 h-2 bg-nex-electric rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-nex-electric rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-nex-electric rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex items-center space-x-4">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte algo sobre regras de transição, RMI, carência..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isTyping}
                className="p-3 bg-nex-electric text-white rounded-xl hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center">
              NexIA pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="glass-card p-6 animate-in fade-in duration-500">
          <h3 className="font-bold text-slate-800 mb-6">Histórico de Análises</h3>
          <div className="space-y-4">
            {[
              { id: 1, client: 'Maria das Dores Oliveira', date: '24/10/2023', type: 'Análise de CNIS', status: 'Concluído' },
              { id: 2, client: 'João Batista dos Santos', date: '22/10/2023', type: 'Simulação de RMI', status: 'Concluído' },
              { id: 3, client: 'Ana Paula Costa', date: '20/10/2023', type: 'Análise de Vínculos', status: 'Concluído' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg text-nex-electric shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.client}</p>
                    <p className="text-xs text-slate-500">{item.type} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">{item.status}</span>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-nex-electric transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
