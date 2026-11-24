import React, { useState } from 'react';
import { BookOpen, Search, User, ChevronRight, X } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const SubjectsView = () => {
  const { subjects, setActiveTab } = useStudent();
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-indigo-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40">
        <h2 className="text-xl sm:text-2xl font-black text-white">Registered Courses & Syllabus</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Autonomous curriculum structure, faculty coordinators, and syllabus outlines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((sub) => (
          <div key={sub.id} className="p-5 rounded-3xl portal-card border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-cyan-400">{sub.code}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400">{sub.type} • {sub.credits} Credits</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{sub.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">{sub.description}</p>
              <div className="p-2.5 rounded-xl bg-slate-900/60 text-xs text-slate-300 mb-4">
                Faculty: <strong>{sub.faculty}</strong>
              </div>
            </div>
            <button
              onClick={() => setSelectedSubject(sub)}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
            >
              Curriculum & Syllabus Details
            </button>
          </div>
        ))}
      </div>

      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl portal-card border border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">{selectedSubject.name} ({selectedSubject.code})</h3>
              <button onClick={() => setSelectedSubject(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedSubject.description}</p>
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-cyan-400 uppercase text-[10px] block">Syllabus Outline:</span>
              {selectedSubject.syllabus?.map((u, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-900 text-slate-300">{u}</div>
              ))}
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={() => { setSelectedSubject(null); setActiveTab('study-materials'); }} className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950">
                View Notes for this Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
