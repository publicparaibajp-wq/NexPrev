import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Zap, 
  Settings, 
  LogOut,
  ChevronRight,
  Bell,
  ShieldAlert,
  CreditCard
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import SupportChat from './SupportChat';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full p-3 my-1 transition-all duration-200 rounded-lg group",
      active 
        ? "bg-nex-electric text-white shadow-lg shadow-nex-electric/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon size={20} className={cn("min-w-[20px]", !collapsed && "mr-3")} />
    {!collapsed && <span className="font-medium text-sm">{label}</span>}
    {active && !collapsed && <ChevronRight size={14} className="ml-auto opacity-50" />}
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardLayout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user, logout, hasPermission, theme, companyProfile } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: null },
    { id: 'clients', label: 'Clientes', icon: Users, permission: null },
    { id: 'processes', label: 'Processos', icon: Briefcase, permission: null },
    { id: 'financial', label: 'Financeiro', icon: DollarSign, permission: 'financial:view_all' },
    { id: 'calendar', label: 'Agenda', icon: Calendar, permission: null },
    { id: 'collaboration', label: 'Colaboração', icon: MessageSquare, permission: null },
    { id: 'ai', label: 'NexIA', icon: Zap, permission: null },
    { id: 'subscription', label: 'Assinatura', icon: CreditCard, permission: 'financial:view_all' },
    { id: 'audit', label: 'Auditoria', icon: ShieldAlert, permission: 'audit:view' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <div className={cn("flex h-screen overflow-hidden transition-colors duration-300", theme === 'dark' ? "bg-slate-950" : "bg-slate-50")}>
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-nex-deep text-white transition-all duration-300 flex flex-col z-50",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tighter text-white truncate max-w-[180px]">
                {companyProfile.name || 'NexPrev'}
              </span>
              <span className="text-[10px] text-nex-electric uppercase tracking-widest font-semibold">Premium LegalTech</span>
            </div>
          )}
          {collapsed && <span className="text-2xl font-bold text-nex-electric">N</span>}
        </div>

        <nav className="flex-1 px-4 mt-4">
          {filteredMenuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <SidebarItem 
            icon={Settings} 
            label="Configurações" 
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')} 
            collapsed={collapsed}
          />
          <SidebarItem 
            icon={LogOut} 
            label="Sair" 
            onClick={logout} 
            collapsed={collapsed}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={cn("h-16 border-b flex items-center justify-between px-8 z-40 transition-colors duration-300", theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200")}>
          <div className="flex items-center space-x-4">
            <h2 className={cn("text-lg font-semibold capitalize", theme === 'dark' ? "text-white" : "text-slate-800")}>
              {menuItems.find(i => i.id === activeTab)?.label || (activeTab === 'settings' ? 'Configurações' : activeTab)}
            </h2>
            {user?.role === UserRole.SOCIO && (
              <span className="bg-nex-electric/10 text-nex-electric text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-nex-electric/20">
                Acesso Total
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative group cursor-pointer">
              <Bell size={20} className={cn("transition-colors", theme === 'dark' ? "text-slate-400 group-hover:text-nex-electric" : "text-slate-500 group-hover:text-nex-electric")} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                3
              </span>
            </div>
            
            <div className={cn("flex items-center space-x-3 pl-6 border-l", theme === 'dark' ? "border-slate-800" : "border-slate-200")}>
              <div className="text-right hidden sm:block">
                <p className={cn("text-sm font-semibold", theme === 'dark' ? "text-white" : "text-slate-800")}>{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-nex-electric flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
        
        {/* Support Chat Widget */}
        <SupportChat />
      </main>
    </div>
  );
}
