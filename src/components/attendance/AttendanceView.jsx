import React, { useState } from 'react';
import { CalendarCheck, Download, Printer, Sliders, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { exportAttendanceCSV, printUniversityDocument } from '../../utils/exportUtils';

export const AttendanceView = () => {
  const {
    student,
    subjects,
    attendanceThreshold,
    setAttendanceThreshold,
    overallAttendancePercentage,
    totalClassesConducted,
    totalClassesAttended,
  } = useStudent();

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || 'CS601');
  const [targetPercentage, setTargetPercentage] = useState(80);

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const calcRequiredClasses = (attended, conducted, target) => {
    const t = target / 100;
    if (t >= 1) return 'Infinite';
    const currentPerc = (attended / conducted) * 100;
    if (currentPerc >= target) return 0;
    return Math.max(0, Math.ceil((t * conducted - attended) / (1 - t)));
  };

  const calcSafeToBunk = (attended, conducted, threshold) => {
    const t = threshold / 100;
    const maxConducted = Math.floor(attended / t);
    return Math.max(0, maxConducted - conducted);
  };

  const requiredToAttend = calcRequiredClasses(selectedSubject.classesAttended, selectedSubject.classesConducted, targetPercentage);
  const safeToMiss = calcSafeToBunk(selectedSubject.classesAttended, selectedSubject.classesConducted, attendanceThreshold);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-cyan-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Attendance Records & Smart Predictor</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Course attendance tracking, shortage alerts, and target margin calculations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportAttendanceCSV(subjects, student)} className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200">
            Export CSV
          </button>
          <button onClick={() => alert("Printing official attendance ledger...")} className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950">
            Print Ledger
          </button>
        </div>
      </div>

      <div className="p-6 rounded-3xl portal-card border border-cyan-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Smart Attendance Predictor
          </h3>
          <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5">
            {subjects.map(s => <option key={s.id} value={s.id}>{s.code}: {s.name} ({s.attendancePercentage}%)</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex justify-between font-semibold text-slate-300">
              <span>Target Attendance:</span>
              <span className="text-cyan-400 font-bold">{targetPercentage}%</span>
            </div>
            <input type="range" min="70" max="95" value={targetPercentage} onChange={(e) => setTargetPercentage(Number(e.target.value))} className="w-full accent-cyan-400" />
            <div className="flex justify-between text-[10px] text-slate-400"><span>70%</span><span>75% (Min)</span><span>90%</span></div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
            <span className="font-bold text-cyan-300 uppercase block">Required Classes</span>
            <div className="text-2xl font-black text-white mt-1">
              {requiredToAttend === 0 ? <span className="text-emerald-400">Target Achieved!</span> : `+${requiredToAttend} Classes`}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Attend consecutive lectures to reach {targetPercentage}%.</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs">
            <span className="font-bold text-purple-300 uppercase block">Safe Bunk Margin</span>
            <div className="text-2xl font-black text-white mt-1">
              {safeToMiss === 0 ? <span className="text-rose-400">0 Classes</span> : `${safeToMiss} Classes`}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Classes you can miss while staying above {attendanceThreshold}%.</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl portal-card border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4">Subject-wise Attendance Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3">Code</th>
                <th className="pb-3">Course</th>
                <th className="pb-3 text-center">Conducted</th>
                <th className="pb-3 text-center">Attended</th>
                <th className="pb-3 text-center">Percentage</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {subjects.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/30">
                  <td className="py-3 font-mono font-bold text-cyan-400">{s.code}</td>
                  <td className="py-3 font-semibold text-white">{s.name}</td>
                  <td className="py-3 text-center">{s.classesConducted}</td>
                  <td className="py-3 text-center text-emerald-400 font-bold">{s.classesAttended}</td>
                  <td className="py-3 text-center font-bold font-mono">{s.attendancePercentage}%</td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.attendancePercentage >= attendanceThreshold ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {s.attendancePercentage >= attendanceThreshold ? 'Eligible' : 'Warning'}
                    </span>
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
