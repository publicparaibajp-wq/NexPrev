import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import { 
  UserPlus, 
  Trash2, 
  Moon, 
  Sun, 
  Shield, 
  Users, 
  Building2,
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function Settings() {
  const { user, theme, toggleTheme, users, addUser, removeUser, hasPermission, companyProfile, updateCompanyProfile } = useAuth();
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('password123');
  const [newUserRole, setNewUserRole] = useState<UserRole>(UserRole.ADVOGADO);
  const [showAddUser, setShowAddUser] = useState(false);

  // Company profile local state
  const [compName, setCompName] = useState(companyProfile.name);
  const [compCnpj, setCompCnpj] = useState(companyProfile.cnpj);
  const [compAddress, setCompAddress] = useState(companyProfile.address);
  const [compPhone, setCompPhone] = useState(companyProfile.phone);
  const [isSavingComp, setIsSavingComp] = useState(false);

  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingComp(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateCompanyProfile({
      name: compName,
      cnpj: compCnpj,
      address: compAddress,
      phone: compPhone
    });
    setIsSavingComp(false);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) return;
    
    addUser({
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      role: newUserRole,
      is2FAEnabled: false
    });
    
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('password123');
    setShowAddUser(false);
  };

  const isSocio = user?.role === UserRole.SOCIO;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Configurações do Sistema</h2>
          <p className="text-slate-500 dark:text-slate-400">Gerencie sua conta, equipe e preferências visuais.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 dark:bg-slate-800/50 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-nex-electric/10 text-nex-electric rounded-lg">
                <SettingsIcon size={20} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white">Preferências</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  {theme === 'light' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-nex-electric" />}
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Modo Noturno</p>
                    <p className="text-[10px] text-slate-500">Reduza o brilho da tela</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-6 rounded-full transition-all relative ${theme === 'dark' ? 'bg-nex-electric' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-3">
                  <Shield size={20} className="text-emerald-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">2FA Obrigatório</p>
                    <p className="text-[10px] text-slate-500">Segurança extra para todos</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-slate-300 rounded-full relative">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 dark:bg-slate-800/50 dark:border-slate-700">
            <div className="flex items-center space-x-3 mb-4 text-amber-600">
              <AlertCircle size={20} />
              <h3 className="font-bold">Sua Conta</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-800 dark:text-white">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
              <p className="text-[10px] text-slate-400 font-medium italic">{companyProfile.name || 'Escritório não configurado'}</p>
              <div className="pt-4">
                <span className="px-2 py-1 bg-nex-electric/10 text-nex-electric text-[10px] font-bold rounded-full uppercase tracking-widest">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {isSocio && (
            <div className="glass-card p-6 dark:bg-slate-800/50 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-nex-electric/10 text-nex-electric rounded-lg">
                  <Building2 size={20} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">Perfil do Escritório</h3>
              </div>
              
              <form onSubmit={handleUpdateCompany} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nome Fantasia</label>
                  <input 
                    type="text"
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CNPJ</label>
                  <input 
                    type="text"
                    value={compCnpj}
                    onChange={(e) => setCompCnpj(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSavingComp}
                  className="w-full py-2 bg-nex-electric text-white rounded-lg text-xs font-bold hover:bg-nex-electric/90 transition-all disabled:opacity-50"
                >
                  {isSavingComp ? 'Salvando...' : 'Atualizar Dados'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* User Management */}
        <div className="lg:col-span-2">
          <div className="glass-card dark:bg-slate-800/50 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-nex-electric/10 text-nex-electric rounded-lg">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">Gestão de Equipe</h3>
              </div>
              {isSocio && (
                <button 
                  onClick={() => setShowAddUser(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-nex-electric text-white rounded-xl text-xs font-bold hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20"
                >
                  <UserPlus size={16} />
                  <span>Novo Usuário</span>
                </button>
              )}
            </div>

            <div className="p-6">
              {!isSocio ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Shield size={32} />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Apenas administradores (Sócios) podem gerenciar os acessos da equipe.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((u) => (
                    <div key={u.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl group hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-nex-electric flex items-center justify-center text-white font-bold">
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-400 rounded-md uppercase tracking-widest">
                          {u.role}
                        </span>
                        {u.id !== user?.id && (
                          <button 
                            onClick={() => removeUser(u.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-nex-deep/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Conceder Novo Acesso</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail Corporativo</label>
                <input 
                  type="email" 
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                  placeholder="joao@nexprev.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Senha Temporária</label>
                <input 
                  type="text" 
                  required
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                  placeholder="password123"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Papel (Role)</label>
                <select 
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all dark:text-white"
                >
                  {Object.values(UserRole).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-nex-electric text-white rounded-xl font-bold hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
