import React, { useState } from 'react';
import { FileText, Clock, Upload, CheckCircle2, X } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const AssignmentsView = () => {
  const { assignments, submitAssignment } = useStudent();
  const [activeUpload, setActiveUpload] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [comment, setComment] = useState('');

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const fileName = selectedFile ? selectedFile.name : 'Assignment_Solution.pdf';
    submitAssignment(activeUpload.id, fileName, comment);
    setActiveUpload(null);
    setSelectedFile(null);
    setComment('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-amber-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40">
        <h2 className="text-xl sm:text-2xl font-black text-white">Assignments & Submissions</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Submit technical reports, laboratory solutions, and algorithms.</p>
      </div>

      <div className="space-y-4">
        {assignments.map((a) => (
          <div key={a.id} className="p-5 rounded-3xl portal-card border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-cyan-400">{a.subjectCode}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${a.status === 'Submitted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                  {a.status}
                </span>
                <span className="text-[10px] text-slate-400">Due: {a.dueDate}</span>
              </div>
              <h3 className="text-base font-bold text-white">{a.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{a.description}</p>
            </div>

            {a.status === 'Pending' ? (
              <button
                onClick={() => setActiveUpload(a)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1.5 shrink-0"
              >
                <Upload className="w-4 h-4" /> Submit File
              </button>
            ) : (
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-4 h-4" /> Submitted ({a.submissionFile})
              </div>
            )}
          </div>
        ))}
      </div>

      {activeUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl portal-card border border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Submit {activeUpload.subjectCode} Assignment</h3>
              <button onClick={() => setActiveUpload(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Upload Solution File:</label>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Remarks (Optional):</label>
                <textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Notes for faculty..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setActiveUpload(null)} className="px-3 py-1.5 text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl">Confirm & Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
