/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import DashboardLayout from './components/Layout';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Calendar from './components/Calendar';
import NexIA from './components/NexIA';
import Processes from './components/Processes';
import Financial from './components/Financial';
import Collaboration from './components/Collaboration';
import AuditLogs from './components/AuditLogs';
import Settings from './components/Settings';
import Subscription from './components/Subscription';
import Login from './Login';
import CompanyOnboarding from './CompanyOnboarding';
import { useAuth } from './contexts/AuthContext';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    // Permission check for sensitive tabs
    if (activeTab === 'financial' && !hasPermission('financial:view_all')) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Acesso Negado</h2>
          <p className="text-slate-500 max-w-md">
            Você não tem permissão para acessar o módulo financeiro. 
            Contate um Sócio Administrador para solicitar acesso.
          </p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-2 bg-nex-deep text-white rounded-xl font-bold hover:bg-nex-deep/90 transition-all"
          >
            Voltar ao Dashboard
          </button>
        </div>
      );
    }

    if (activeTab === 'audit' && !hasPermission('audit:view')) {
      setActiveTab('dashboard');
      return null;
    }

    if (activeTab === 'subscription' && !hasPermission('financial:view_all')) {
      setActiveTab('dashboard');
      return null;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <Clients />;
      case 'calendar':
        return <Calendar />;
      case 'ai':
        return <NexIA />;
      case 'processes':
        return <Processes />;
      case 'financial':
        return <Financial />;
      case 'collaboration':
        return <Collaboration />;
      case 'audit':
        return <AuditLogs />;
      case 'settings':
        return <Settings />;
      case 'subscription':
        return <Subscription />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <CompanyOnboarding />
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
    </>
  );
}
