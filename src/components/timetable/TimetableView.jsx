import React, { useState } from 'react';
import { Clock, Download, MapPin, User } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { exportTimetableCSV } from '../../utils/exportUtils';

export const TimetableView = () => {
  const { student, timetable } = useStudent();
  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState('Monday');

  const slots = timetable[selectedDay] || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-indigo-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Semester VI Academic Timetable</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Section {student.section} • Class routines, lecture theatres, and lab venues.</p>
        </div>
        <button onClick={() => exportTimetableCSV(timetable, student)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200">
          Export Routine CSV
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {daysList.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDay === day ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {slots.map((slot, i) => (
          <div key={i} className="p-4 rounded-2xl portal-card border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="font-mono text-cyan-400 font-bold min-w-[90px]">{slot.time}</span>
              <div>
                <h4 className="font-bold text-white text-sm">{slot.subject}</h4>
                <span className="text-slate-400 text-[11px]">{slot.faculty} • {slot.type}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-lg bg-slate-900 text-purple-300 font-semibold border border-slate-800">
              {slot.room}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
