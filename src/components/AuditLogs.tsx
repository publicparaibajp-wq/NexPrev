import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert, Search, Download, Filter } from 'lucide-react';

export default function AuditLogs() {
  const { auditLogs } = useAuth();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Logs de Auditoria</h2>
          <p className="text-slate-500">Rastreamento completo de atividades sensíveis e acessos.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={18} />
            <span>Filtrar</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-nex-deep text-white rounded-xl text-sm font-medium hover:bg-nex-deep/90 transition-all">
            <Download size={18} />
            <span>Exportar Logs</span>
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por usuário, ação ou módulo..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-nex-electric/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <ShieldAlert size={14} className="text-nex-electric" />
            <span>Apenas Sócios podem visualizar estes registros.</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Data/Hora</th>
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Ação</th>
                <th className="px-6 py-4">Módulo</th>
                <th className="px-6 py-4">Detalhes</th>
                <th className="px-6 py-4">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {log.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-slate-800">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      log.action.includes('Login') ? 'bg-blue-50 text-blue-600' :
                      log.action.includes('Export') ? 'bg-amber-50 text-amber-600' :
                      log.action.includes('Delete') ? 'bg-red-50 text-red-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{log.module}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">{log.details}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{log.ip}</td>
                </tr>
              ))}
              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                    Nenhum registro de auditoria encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
