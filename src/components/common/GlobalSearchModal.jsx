import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, Library, Megaphone, ArrowRight } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const { subjects, assignments, announcements, studyMaterials, examinations, setActiveTab } = useStudent();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const matchedSubjects = q ? subjects.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) : [];
  const matchedAssignments = q ? assignments.filter(a => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)) : [];
  const matchedMaterials = q ? studyMaterials.filter(m => m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)) : [];
  const matchedAnnouncements = q ? announcements.filter(a => a.title.toLowerCase().includes(q)) : [];

  const handleSelect = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl portal-card border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search subjects, assignments, notes, exams..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {!q ? (
            <div className="py-8 text-center text-slate-400">
              <p className="font-medium">Quick Suggestions:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Deep Learning', 'DevOps', 'Compiler', 'Kubernetes'].map((tag) => (
                  <button key={tag} onClick={() => setQuery(tag)} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {matchedSubjects.map(s => (
                <div key={s.id} onClick={() => handleSelect('subjects')} className="p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 cursor-pointer flex items-center justify-between">
                  <div className="font-bold text-white">{s.name} ({s.code})</div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </div>
              ))}
              {matchedAssignments.map(a => (
                <div key={a.id} onClick={() => handleSelect('assignments')} className="p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 cursor-pointer flex items-center justify-between">
                  <div className="font-bold text-white">{a.title} ({a.status})</div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </div>
              ))}
              {matchedMaterials.map(m => (
                <div key={m.id} onClick={() => handleSelect('study-materials')} className="p-2.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 cursor-pointer flex items-center justify-between">
                  <div className="font-bold text-white">{m.title}</div>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
