import React from 'react';
import { FileSpreadsheet, Clock, MapPin, Ticket } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const ExaminationsView = () => {
  const { student, examinations } = useStudent();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-rose-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Examinations Schedule & Hall Ticket</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">December 2024 autonomous end-semester examination session.</p>
        </div>
        <button onClick={() => alert("Downloading Digital Hall Ticket Admit Card...")} className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white flex items-center gap-1.5">
          <Ticket className="w-4 h-4" /> Download Admit Card
        </button>
      </div>

      <div className="p-6 rounded-3xl portal-card border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white mb-2">Scheduled Papers</h3>
        {examinations.map((e) => (
          <div key={e.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-rose-400 font-bold mr-2">{e.subjectCode}</span>
              <span className="font-bold text-white text-sm">{e.subjectName}</span>
              <p className="text-[11px] text-slate-400 mt-0.5">{e.examType} • Hall: {e.hall}</p>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="font-semibold text-cyan-400">{e.date} ({e.time})</span>
              <span className="font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Seat: {e.seatNumber}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
