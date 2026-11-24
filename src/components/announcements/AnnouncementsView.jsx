import React from 'react';
import { Megaphone, Calendar } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const AnnouncementsView = () => {
  const { announcements } = useStudent();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-rose-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40">
        <h2 className="text-xl sm:text-2xl font-black text-white">College Announcements & Notices</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Official circulars from Academic Affairs, Examination Cell, and Student Council.</p>
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="p-5 rounded-3xl portal-card border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-400">{a.category}</span>
              <span className="text-xs text-slate-400">{a.publishedAt}</span>
            </div>
            <h3 className="text-base font-bold text-white">{a.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{a.description}</p>
            <span className="text-[11px] text-slate-500 block pt-1">Issued by: {a.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
