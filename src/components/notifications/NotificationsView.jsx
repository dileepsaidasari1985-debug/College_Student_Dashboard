import React from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const NotificationsView = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, setActiveTab } = useStudent();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-purple-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Notification Center</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Alerts on attendance shortages, exam notices, and assignments.</p>
        </div>
        <button onClick={markAllNotificationsAsRead} className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-500 text-white flex items-center gap-1.5">
          <CheckCheck className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-2xl border flex items-start justify-between gap-4 text-xs ${!n.read ? 'bg-purple-950/20 border-purple-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{n.title}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 uppercase">{n.category}</span>
              </div>
              <p className="text-slate-300">{n.message}</p>
              <span className="text-[10px] text-slate-500 font-mono block">{n.timestamp}</span>
            </div>
            <div className="flex gap-1 shrink-0">
              {!n.read && (
                <button onClick={() => markNotificationAsRead(n.id)} className="p-1.5 text-slate-400 hover:text-cyan-400">
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => deleteNotification(n.id)} className="p-1.5 text-slate-400 hover:text-rose-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
