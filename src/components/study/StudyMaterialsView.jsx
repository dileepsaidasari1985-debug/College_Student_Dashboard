import React, { useState } from 'react';
import { Library, Download, Eye, Bookmark, BookmarkCheck, X } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const StudyMaterialsView = () => {
  const { studyMaterials, toggleBookmarkMaterial } = useStudent();
  const [previewMat, setPreviewMat] = useState(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-emerald-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40">
        <h2 className="text-xl sm:text-2xl font-black text-white">Digital Library & Study Materials</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Lecture slides, question banks (PYQs), lab manuals, and reference notes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {studyMaterials.map((m) => (
          <div key={m.id} className="p-5 rounded-3xl portal-card border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs font-bold text-cyan-400">{m.subjectCode}</span>
                <button onClick={() => toggleBookmarkMaterial(m.id)}>
                  {m.bookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{m.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{m.description}</p>
              <span className="text-[10px] text-slate-500 block mb-4">{m.faculty} • {m.fileSize}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPreviewMat(m)} className="flex-1 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-200">
                Preview
              </button>
              <button onClick={() => alert(`Downloading: ${m.title}`)} className="flex-1 py-1.5 rounded-xl bg-emerald-500 text-xs font-bold text-slate-950">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewMat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl portal-card border border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">{previewMat.title}</h3>
              <button onClick={() => setPreviewMat(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 text-xs text-slate-300 font-mono leading-relaxed max-h-60 overflow-y-auto">
              {previewMat.previewContent}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setPreviewMat(null)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
