import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, PERMISSIONS, AuditLog } from '../types/auth';

export interface CompanyProfile {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  logoUrl?: string;
  isCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, module: string, details: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'tenantId'>) => void;
  removeUser: (id: string) => void;
  companyProfile: CompanyProfile;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  is2FAVerified: boolean;
  verify2FA: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  { id: '1', name: 'Dr. Roberto Sócio', email: 'roberto@nexprev.com', password: 'password123', role: UserRole.SOCIO, tenantId: 'tenant-1', is2FAEnabled: true },
  { id: '2', name: 'Dra. Aline Advogada', email: 'aline@nexprev.com', password: 'password123', role: UserRole.ADVOGADO, tenantId: 'tenant-1', is2FAEnabled: false },
  { id: '3', name: 'Lucas Assistente', email: 'lucas@nexprev.com', password: 'password123', role: UserRole.ASSISTENTE, tenantId: 'tenant-1', is2FAEnabled: false },
  { id: '4', name: 'Carla Financeiro', email: 'carla@nexprev.com', password: 'password123', role: UserRole.FINANCEIRO, tenantId: 'tenant-1', is2FAEnabled: false },
  { id: '5', name: 'Marcos Admin', email: 'marcos@nexprev.com', password: 'password123', role: UserRole.ADMINISTRATIVO, tenantId: 'tenant-1', is2FAEnabled: false },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_USERS[0]); // Auto-login as Socio for demo
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: '',
    cnpj: '',
    address: '',
    phone: '',
    isCompleted: false
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    
    const savedProfile = localStorage.getItem('companyProfile');
    if (savedProfile) {
      setCompanyProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateCompanyProfile = (profile: Partial<CompanyProfile>) => {
    const newProfile = { ...companyProfile, ...profile, isCompleted: true };
    setCompanyProfile(newProfile);
    localStorage.setItem('companyProfile', JSON.stringify(newProfile));
    addAuditLog('Atualização de Perfil', 'Configurações', 'Dados da empresa atualizados');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    addAuditLog('Alteração de Tema', 'Configurações', `Tema alterado para ${newTheme}`);
  };

  const addUser = (userData: Omit<User, 'id' | 'tenantId'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      tenantId: user?.tenantId || 'tenant-1'
    };
    setUsers(prev => [...prev, newUser]);
    addAuditLog('Criação de Usuário', 'Configurações', `Usuário ${newUser.name} criado com papel ${newUser.role}`);
  };

  const removeUser = (id: string) => {
    const userToRemove = users.find(u => u.id === id);
    if (userToRemove) {
      setUsers(prev => prev.filter(u => u.id !== id));
      addAuditLog('Exclusão de Usuário', 'Configurações', `Usuário ${userToRemove.name} removido`);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      setIs2FAVerified(false);
      addAuditLog('Login', 'Auth', `Usuário logado como ${foundUser.role}`, foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    addAuditLog('Logout', 'Auth', 'Usuário deslogado');
    setUser(null);
    setIs2FAVerified(false);
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code === '123456') {
      setIs2FAVerified(true);
      addAuditLog('2FA Verificado', 'Segurança', 'Verificação de dois fatores concluída com sucesso.');
      return true;
    }
    return false;
  };

  const addAuditLog = (action: string, module: string, details: string, targetUser?: User) => {
    const activeUser = targetUser || user;
    if (!activeUser) return;

    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      userId: activeUser.id,
      userName: activeUser.name,
      action,
      module,
      details,
      timestamp: new Date().toLocaleString('pt-BR'),
      ip: '192.168.1.45'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    switch (user.role) {
      case UserRole.SOCIO:
        return true; // Socio has all permissions
      case UserRole.FINANCEIRO:
        return [
          PERMISSIONS.FINANCIAL_VIEW_ALL,
          PERMISSIONS.FINANCIAL_EDIT
        ].includes(permission);
      case UserRole.ADVOGADO:
        return [
          PERMISSIONS.FINANCIAL_VIEW_OWN,
          PERMISSIONS.PROCESS_VIEW_ALL,
          PERMISSIONS.CLIENT_VIEW_ALL
        ].includes(permission);
      case UserRole.ASSISTENTE:
      case UserRole.ADMINISTRATIVO:
        return [
          PERMISSIONS.PROCESS_VIEW_ALL,
          PERMISSIONS.CLIENT_VIEW_ALL
        ].includes(permission);
      default:
        return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      hasPermission, 
      auditLogs, 
      addAuditLog,
      theme,
      toggleTheme,
      users,
      addUser,
      removeUser,
      companyProfile,
      updateCompanyProfile,
      is2FAVerified,
      verify2FA
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
