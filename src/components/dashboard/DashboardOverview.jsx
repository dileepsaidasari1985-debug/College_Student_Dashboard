import React from 'react';
import {
  CalendarCheck,
  GraduationCap,
  BookOpen,
  FileText,
  FileSpreadsheet,
  Bell,
  Clock,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStudent } from '../../context/StudentContext';

export const DashboardOverview = () => {
  const {
    student,
    subjects,
    overallAttendancePercentage,
    totalClassesConducted,
    totalClassesAttended,
    pendingAssignmentsCount,
    unreadNotificationsCount,
    upcomingExamsCount,
    assignments,
    examinations,
    announcements,
    timetable,
    fees,
    setActiveTab,
    attendanceThreshold,
  } = useStudent();

  const lowAttendanceSubjects = (subjects || []).filter(s => s && s.attendancePercentage < (attendanceThreshold || 75));
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = (timetable && timetable[todayName]) || (timetable && timetable['Monday']) || [];
  const nearestAssignment = (assignments || []).find(a => a && a.status === 'Pending') || assignments?.[0];
  const nearestExam = examinations?.[0];

  const subjectAttendanceData = (subjects || []).map(s => ({
    name: s?.code || '',
    attendance: s?.attendancePercentage || 0,
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-3xl portal-card border border-cyan-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/70 to-purple-950/50 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={student.avatarUrl} alt={student.fullName} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-400/50" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                  {student.standing}
                </span>
                <span className="text-[11px] font-mono text-slate-300">
                  Roll: {student.rollNumber}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Welcome Back, <span className="text-cyan-400">{student.fullName}!</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {student.department} • <strong className="text-white">{student.collegeName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profile')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View Full Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {lowAttendanceSubjects.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white">Attendance Warning:</span> {lowAttendanceSubjects.map(s => `${s.code} (${s.attendancePercentage}%)`).join(', ')} is below {attendanceThreshold}%.
            </div>
          </div>
          <button onClick={() => setActiveTab('attendance')} className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-500 text-white shrink-0">
            Predictor →
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <div onClick={() => setActiveTab('attendance')} className="p-4 rounded-2xl portal-card cursor-pointer border border-cyan-500/20">
          <span className="text-[11px] text-slate-400 font-semibold">Attendance</span>
          <div className="text-2xl font-black text-white mt-2">{overallAttendancePercentage}%</div>
          <span className="text-[10px] text-cyan-400">{totalClassesAttended}/{totalClassesConducted} Classes</span>
        </div>

        <div onClick={() => setActiveTab('results')} className="p-4 rounded-2xl portal-card cursor-pointer border border-purple-500/20">
          <span className="text-[11px] text-slate-400 font-semibold">Overall CGPA</span>
          <div className="text-2xl font-black text-purple-400 mt-2">{student.cgpa}</div>
          <span className="text-[10px] text-slate-400">Rank #{student.rankInClass} in Class</span>
        </div>

        <div onClick={() => setActiveTab('subjects')} className="p-4 rounded-2xl portal-card cursor-pointer border border-indigo-500/20">
          <span className="text-[11px] text-slate-400 font-semibold">Enrolled Subjects</span>
          <div className="text-2xl font-black text-white mt-2">{subjects.length}</div>
          <span className="text-[10px] text-indigo-300">6 Theory + 2 Labs</span>
        </div>

        <div onClick={() => setActiveTab('assignments')} className="p-4 rounded-2xl portal-card cursor-pointer border border-amber-500/20">
          <span className="text-[11px] text-slate-400 font-semibold">Pending Tasks</span>
          <div className="text-2xl font-black text-amber-400 mt-2">{pendingAssignmentsCount}</div>
          <span className="text-[10px] text-slate-400">Assignments Due</span>
        </div>

        <div onClick={() => setActiveTab('examinations')} className="p-4 rounded-2xl portal-card cursor-pointer border border-rose-500/20">
          <span className="text-[11px] text-slate-400 font-semibold">Upcoming Exams</span>
          <div className="text-2xl font-black text-rose-400 mt-2">{upcomingExamsCount}</div>
          <span className="text-[10px] text-slate-400">Starts Dec 03</span>
        </div>

        <div onClick={() => setActiveTab('notifications')} className="p-4 rounded-2xl portal-card cursor-pointer border border-cyan-500/20">
          <span className="text-[11px] text-slate-400 font-semibold">Notifications</span>
          <div className="text-2xl font-black text-cyan-300 mt-2">{unreadNotificationsCount}</div>
          <span className="text-[10px] text-slate-400">Unread Notices</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl portal-card border border-slate-800">
        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Zap className="w-4 h-4 text-cyan-400" /> Quick Academic Shortcuts
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[['attendance', 'Attendance'], ['results', 'Results'], ['timetable', 'Timetable'], ['study-materials', 'Study Notes'], ['assignments', 'Assignments'], ['announcements', 'Notices']].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors">
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl portal-card border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-cyan-400" /> Subject-wise Attendance
            </h3>
            <span className="text-xs text-slate-400">Target: {attendanceThreshold}%</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="attendance" fill="#00d2ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 rounded-2xl portal-card border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" /> Today's Routine ({todayName})
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {todaySchedule.slice(0, 4).map((slot, i) => (
              <div key={i} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <span className="font-mono text-cyan-400 text-[10px] block">{slot.time}</span>
                <span className="font-bold text-white block mt-0.5">{slot.subject}</span>
                <span className="text-[10px] text-slate-400">{slot.room} • {slot.faculty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
