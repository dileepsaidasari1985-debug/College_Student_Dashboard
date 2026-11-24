import React, { useState } from 'react';
import { GraduationCap, Award, Download, Printer, Calculator } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { exportMarksCSV } from '../../utils/exportUtils';

export const ResultsView = () => {
  const { student, semesterResults } = useStudent();
  const [activeSemNumber, setActiveSemNumber] = useState(6);

  const activeSemester = semesterResults.find(s => s.semester === activeSemNumber) || semesterResults[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-purple-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Academic Results & Performance Transcripts</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Semester grades, grade points, and autonomous performance history.</p>
        </div>
        <button onClick={() => exportMarksCSV(semesterResults, student)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200">
          Export Transcript CSV
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {semesterResults.map(sem => (
          <button
            key={sem.semester}
            onClick={() => setActiveSemNumber(sem.semester)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSemNumber === sem.semester ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            Semester {sem.semester} {sem.semester === 6 ? '(Current)' : ''}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-3xl portal-card border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Semester {activeSemester.semester} Courses</h3>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
            SGPA: {activeSemester.sgpa} • CGPA: {activeSemester.cgpa}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3">Code</th>
                <th className="pb-3">Course Name</th>
                <th className="pb-3 text-center">Credits</th>
                <th className="pb-3 text-center">Internal</th>
                <th className="pb-3 text-center">Total (100)</th>
                <th className="pb-3 text-center">Grade</th>
                <th className="pb-3 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {activeSemester.subjects.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-800/30">
                  <td className="py-3 font-mono font-bold text-purple-400">{sub.code}</td>
                  <td className="py-3 font-semibold text-white">{sub.name}</td>
                  <td className="py-3 text-center">{sub.credits}</td>
                  <td className="py-3 text-center">{sub.internal ?? sub.internal1 ?? '-'}</td>
                  <td className="py-3 text-center font-bold text-cyan-400">{sub.total}</td>
                  <td className="py-3 text-center font-bold text-purple-300">{sub.grade}</td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">{sub.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
