import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  Users, 
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const events = [
  { id: 1, title: 'Audiência de Instrução', client: 'Maria Oliveira', time: '09:30', type: 'judicial', critical: true },
  { id: 2, title: 'Perícia Médica', client: 'João Santos', time: '14:00', type: 'admin', critical: false },
  { id: 3, title: 'Reunião de Equipe', client: '-', time: '16:30', type: 'internal', critical: false },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState<'month' | 'week' | 'day'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Main */}
        <div className="flex-1 glass-card overflow-hidden flex flex-col">
          {/* Calendar Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-bold text-slate-800 capitalize">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </h3>
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button onClick={prevMonth} className="p-1 hover:bg-white rounded transition-colors text-slate-600">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-white rounded transition-colors">
                  Hoje
                </button>
                <button onClick={nextMonth} className="p-1 hover:bg-white rounded transition-colors text-slate-600">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                {(['month', 'week', 'day'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-1 text-xs font-bold rounded transition-all ${
                      view === v ? 'bg-white text-nex-electric shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {v === 'month' ? 'Mês' : v === 'week' ? 'Semana' : 'Dia'}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-nex-electric text-white rounded-xl hover:bg-nex-electric/90 transition-all shadow-lg shadow-nex-electric/20">
                <Plus size={18} />
                <span className="text-sm font-medium">Novo Evento</span>
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 grid grid-cols-7 bg-slate-100 gap-px">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="bg-slate-50 p-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
            {calendarDays.map((day, i) => (
              <div 
                key={i} 
                className={`bg-white min-h-[120px] p-2 transition-colors hover:bg-slate-50/50 cursor-pointer relative ${
                  !isSameMonth(day, monthStart) ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span className={`text-xs font-bold ${isSameDay(day, new Date()) ? 'bg-nex-electric text-white w-6 h-6 flex items-center justify-center rounded-full' : ''}`}>
                  {format(day, 'd')}
                </span>
                
                {/* Sample Events */}
                {isSameDay(day, addDays(monthStart, 14)) && (
                  <div className="mt-2 space-y-1">
                    <div className="p-1.5 bg-rose-50 border-l-2 border-rose-500 rounded text-[10px] font-bold text-rose-700 truncate">
                      Audiência: Maria O.
                    </div>
                    <div className="p-1.5 bg-nex-electric/10 border-l-2 border-nex-electric rounded text-[10px] font-bold text-nex-electric truncate">
                      Perícia: João S.
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="glass-card p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <Clock size={18} className="mr-2 text-nex-electric" />
              Compromissos de Hoje
            </h4>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-400">{event.time}</span>
                      <div className={`w-2 h-2 rounded-full ${event.critical ? 'bg-rose-500 animate-pulse' : 'bg-nex-electric'}`}></div>
                    </div>
                    {event.critical && <AlertTriangle size={14} className="text-rose-500" />}
                  </div>
                  <div className="mt-1 pl-10 border-l border-slate-100 group-hover:border-nex-electric transition-colors">
                    <p className="text-sm font-bold text-slate-800">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.client}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-nex-electric bg-nex-electric/5 rounded-lg hover:bg-nex-electric/10 transition-colors">
              Ver todos os compromissos
            </button>
          </div>

          <div className="glass-card p-6">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <Users size={18} className="mr-2 text-nex-electric" />
              Filtros de Equipe
            </h4>
            <div className="space-y-3">
              {['Dr. Ricardo', 'Dra. Fernanda', 'Dr. Lucas', 'Dra. Beatriz'].map((name) => (
                <label key={name} className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-nex-electric focus:ring-nex-electric" />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
