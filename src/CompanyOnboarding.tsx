import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Building2, FileText, MapPin, Phone, CheckCircle2, Loader2, Zap } from 'lucide-react';

export default function CompanyOnboarding() {
  const { user, companyProfile, updateCompanyProfile } = useAuth();
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (companyProfile.isCompleted || user?.role !== 'SOCIO') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateCompanyProfile({
      name,
      cnpj,
      address,
      phone
    });
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-nex-deep flex items-center justify-center p-4 overflow-y-auto">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-nex-electric/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-nex-electric/5 rounded-full blur-[100px] -ml-64 -mb-64"></div>

      <div className="w-full max-w-2xl relative z-10 my-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nex-electric text-white rounded-2xl shadow-xl shadow-nex-electric/20 mb-4">
            <Zap size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Bem-vindo à NexPrev</h1>
          <p className="text-slate-400 mt-2 max-w-md mx-auto">
            Pagamento confirmado! Agora, complete o cadastro do seu escritório para começar a usar a plataforma.
          </p>
        </div>

        <div className="glass-card p-8 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/10">
            <div className="p-2 bg-nex-electric/20 text-nex-electric rounded-lg">
              <Building2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Perfil do Escritório</h2>
              <p className="text-xs text-slate-500">Estas informações aparecerão em seus documentos e relatórios.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome do Escritório</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Building2 size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-nex-electric/50 focus:border-nex-electric outline-none transition-all"
                    placeholder="Ex: Silva & Associados"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <FileText size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-nex-electric/50 focus:border-nex-electric outline-none transition-all"
                    placeholder="00.000.000/0001-00"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Endereço Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-nex-electric/50 focus:border-nex-electric outline-none transition-all"
                    placeholder="Rua, Número, Bairro, Cidade - UF"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Telefone de Contato</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-nex-electric/50 focus:border-nex-electric outline-none transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-nex-electric hover:bg-nex-electric/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-nex-electric/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Salvando Perfil...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Finalizar Cadastro e Acessar Painel</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">
              Precisa de ajuda? <span className="text-nex-electric font-bold cursor-pointer hover:underline">Fale com o suporte</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">
            NexPrev LegalTech &copy; 2024 - Ambiente Seguro e Criptografado
          </p>
        </div>
      </div>
    </div>
  );
}
