import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Zap, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nex-deep flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nex-electric/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-nex-electric/5 rounded-full blur-[100px] -ml-64 -mb-64"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nex-electric text-white rounded-2xl shadow-xl shadow-nex-electric/20 mb-4">
            <Zap size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">NexPrev</h1>
          <p className="text-slate-400 mt-2">LegalTech Premium para Direito Previdenciário</p>
        </div>

        <div className="glass-card p-8 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Acesse sua conta</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-nex-electric/50 focus:border-nex-electric outline-none transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senha</label>
                <button type="button" className="text-[10px] font-bold text-nex-electric hover:underline uppercase tracking-widest">Esqueceu?</button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-nex-electric/50 focus:border-nex-electric outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-nex-electric hover:bg-nex-electric/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-nex-electric/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Entrar no Sistema</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-slate-500">
              Não tem uma conta? <span className="text-nex-electric font-bold cursor-pointer hover:underline">Contate seu administrador</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">
            &copy; 2024 NexPrev LegalTech. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
