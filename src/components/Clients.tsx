import React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  FileText,
  ChevronRight,
  UserPlus,
  CheckCircle2,
  Upload,
  X,
  File,
  Trash2,
  Loader2,
  Zap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const clients = [
  { id: 1, name: 'Maria das Dores Oliveira', cpf: '123.456.789-00', nit: '123.45678.90-1', birthDate: '15/05/1965', status: 'Ativo', type: 'Aposentadoria por Idade', lastContact: '2 dias atrás' },
  { id: 2, name: 'João Batista dos Santos', cpf: '987.654.321-11', nit: '987.65432.10-2', birthDate: '22/08/1958', status: 'Aguardando Documentos', type: 'Auxílio-Doença', lastContact: '5 dias atrás' },
  { id: 3, name: 'Ana Paula Costa', cpf: '456.789.123-22', nit: '456.78912.30-3', birthDate: '10/12/1972', status: 'Ativo', type: 'Pensão por Morte', lastContact: 'Ontem' },
  { id: 4, name: 'Carlos Eduardo Lima', cpf: '321.654.987-33', nit: '321.65498.70-4', birthDate: '05/03/1960', status: 'Suspenso', type: 'BPC/LOAS', lastContact: '1 semana atrás' },
  { id: 5, name: 'Beatriz Souza Rocha', cpf: '789.123.456-44', nit: '789.12345.60-5', birthDate: '30/01/1980', status: 'Ativo', type: 'Aposentadoria Especial', lastContact: '3 horas atrás' },
];

interface Document {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  notes?: string;
}

interface DocumentUploadModalProps {
  client: typeof clients[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentUploadModal = ({ client, isOpen, onClose }: DocumentUploadModalProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [documents, setDocuments] = React.useState<Document[]>([
    { id: '1', name: 'RG_Frente.pdf', size: '1.2 MB', type: 'application/pdf', uploadDate: '20/10/2023', notes: 'Documento legível.' },
    { id: '2', name: 'CNIS_Completo.pdf', size: '4.5 MB', type: 'application/pdf', uploadDate: '22/10/2023', notes: 'Vínculos de 1990 a 2023.' },
  ]);
  const [generalNotes, setGeneralNotes] = React.useState('');

  if (!isOpen || !client) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      uploadFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    
    try {
      // Simulate real upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const newDocs: Document[] = await Promise.all(files.map(async (file) => {
        // If it's a PDF or Image, we can "analyze" it with Gemini
        // For this demo, we'll just simulate the analysis result
        const id = Math.random().toString(36).substr(2, 9);
        
        return {
          id,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          type: file.type,
          uploadDate: new Date().toLocaleDateString('pt-BR'),
        };
      }));

      setDocuments(prev => [...prev, ...newDocs]);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const analyzeDocument = async (doc: Document) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analise este documento fictício chamado "${doc.name}" para o cliente "${client.name}". Gere um resumo de 3 pontos sobre o que este documento representa para um processo previdenciário.`,
        config: {
          systemInstruction: "Você é o NexIA, assistente jurídico da NexPrev. Seu tom é técnico e prestativo.",
        }
      });
      
      alert(`Análise NexIA para ${doc.name}:\n\n${response.text}`);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Erro ao analisar documento com NexIA.");
    }
  };

  const updateDocumentNotes = (id: string, notes: string) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, notes } : doc));
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-nex-deep/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Documentos do Cliente</h3>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>{client.name}</span>
              <span className="text-slate-300">•</span>
              <span>Nasc: {client.birthDate}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer",
              isDragging ? "border-nex-electric bg-nex-electric/5" : "border-slate-200 hover:border-nex-electric/50 hover:bg-slate-50"
            )}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileSelect}
            />
            <div className="w-12 h-12 bg-nex-electric/10 text-nex-electric rounded-full flex items-center justify-center mb-4">
              {isUploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
            </div>
            <p className="text-sm font-bold text-slate-800">
              {isUploading ? 'Enviando arquivos...' : 'Clique ou arraste arquivos para enviar'}
            </p>
            <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG ou DOCX (Max. 10MB)</p>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arquivos Enviados ({documents.length})</h4>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
              {documents.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <File size={32} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm">Nenhum documento anexado ainda.</p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="space-y-2 p-3 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg text-nex-electric shadow-sm">
                          <File size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{doc.name}</p>
                          <p className="text-[10px] text-slate-500">{doc.size} • Enviado em {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => analyzeDocument(doc)}
                          className="p-2 text-slate-400 hover:text-nex-electric transition-colors"
                          title="Analisar com NexIA"
                        >
                          <Zap size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-nex-electric transition-colors">
                          <FileText size={16} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeDocument(doc.id); }}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="px-1">
                      <input 
                        type="text"
                        placeholder="Adicionar observação..."
                        value={doc.notes || ''}
                        onChange={(e) => updateDocumentNotes(doc.id, e.target.value)}
                        className="w-full bg-white/50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* General Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Observações Gerais</h4>
            <textarea 
              placeholder="Anote aqui informações importantes sobre o conjunto de documentos..."
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600 focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all h-24 resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
            Fechar
          </button>
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold bg-nex-electric text-white rounded-xl hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewClientModal = ({ isOpen, onClose }: NewClientModalProps) => {
  const [name, setName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [nit, setNit] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [benefitType, setBenefitType] = React.useState('Aposentadoria por Idade');
  const [otherArea, setOtherArea] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would add the client to the list
    alert(`Cliente ${name} cadastrado com sucesso!\nBenefício: ${benefitType === 'Outros' ? `Outros (${otherArea})` : benefitType}`);
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
          <h3 className="text-xl font-bold text-slate-800">Novo Cadastro de Cliente</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nome Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
              placeholder="Ex: João da Silva"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">CPF</label>
              <input 
                type="text" 
                required
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
                placeholder="000.000.000-00"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">NIT / PIS</label>
              <input 
                type="text" 
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
                placeholder="000.00000.00-0"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data de Nascimento</label>
            <input 
              type="date" 
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo de Benefício / Serviço</label>
            <select 
              value={benefitType}
              onChange={(e) => setBenefitType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
            >
              {benefitOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {benefitType === 'Outros' && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-nex-electric uppercase tracking-widest">Especifique a Área / Tipo</label>
              <input 
                type="text" 
                required
                value={otherArea}
                onChange={(e) => setOtherArea(e.target.value)}
                className="w-full px-4 py-2 bg-nex-electric/5 border border-nex-electric/30 rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
                placeholder="Ex: Trabalhista, Cível, Revisão da Vida Toda..."
              />
            </div>
          )}

          <div className="pt-4 flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-3 bg-nex-electric text-white rounded-xl font-bold hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20">
              Cadastrar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Clients() {
  const [selectedClient, setSelectedClient] = React.useState<typeof clients[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = React.useState(false);

  const openUploadModal = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, CPF ou NIT..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nex-electric/20 focus:border-nex-electric transition-all"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span className="text-sm font-medium">Filtros</span>
          </button>
          <button 
            onClick={() => setIsNewClientModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-nex-electric text-white rounded-xl hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Novo Cliente</span>
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Documentos</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data de Nasc.</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo de Benefício</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Último Contato</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((client) => (
              <tr 
                key={client.id} 
                className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                onClick={() => openUploadModal(client)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-nex-deep font-bold mr-3 group-hover:bg-nex-electric group-hover:text-white transition-colors">
                      {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{client.name}</p>
                      <p className="text-xs text-slate-500">ID: #102{client.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-600">CPF: {client.cpf}</p>
                    <p className="text-xs font-medium text-slate-600">NIT: {client.nit}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600">{client.birthDate}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-700">{client.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    client.status === 'Ativo' ? "bg-emerald-100 text-emerald-700" : 
                    client.status === 'Suspenso' ? "bg-rose-100 text-rose-700" : 
                    "bg-amber-100 text-amber-700"
                  )}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-500">{client.lastContact}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openUploadModal(client); }}
                      className="p-2 text-slate-400 hover:text-nex-electric hover:bg-nex-electric/10 rounded-lg transition-all"
                      title="Documentos"
                    >
                      <Upload size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-nex-electric/10 rounded-lg transition-all">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-nex-electric/10 rounded-lg transition-all">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-nex-electric hover:bg-nex-electric/10 rounded-lg transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Mostrando 5 de 1.284 clientes</p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-400 cursor-not-allowed">Anterior</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">Próxima</button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="p-3 bg-nex-electric/10 text-nex-electric rounded-xl">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Novos este mês</p>
            <p className="text-xl font-bold text-slate-800">+42</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Docs Pendentes</p>
            <p className="text-xl font-bold text-slate-800">18</p>
          </div>
        </div>
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Taxa de Conversão</p>
            <p className="text-xl font-bold text-slate-800">68%</p>
          </div>
        </div>
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        client={selectedClient} 
      />

      {/* New Client Modal */}
      <NewClientModal 
        isOpen={isNewClientModalOpen} 
        onClose={() => setIsNewClientModalOpen(false)} 
      />
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
