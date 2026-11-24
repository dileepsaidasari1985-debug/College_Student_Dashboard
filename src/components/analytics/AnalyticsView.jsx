import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import {
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Download,
  Filter,
  Medal,
  ExternalLink
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const AnalyticsView = () => {
  const { student, subjects, semesterResults, achievements, overallAttendancePercentage } = useStudent();
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('overview');

  // CGPA & SGPA Growth Data
  const gpaTrendData = semesterResults.map(sem => ({
    semester: `Sem ${sem.semester}`,
    SGPA: sem.sgpa,
    CGPA: sem.cgpa,
  }));

  // Subject marks comparison data (Current Sem)
  const subjectMarksData = subjects.map(s => ({
    name: s.code,
    fullName: s.name,
    Internal: s.internalMarks,
    AttendancePct: s.attendancePercentage,
  }));

  // Grade Distribution Calculation
  const gradeCounts = {};
  semesterResults.forEach(sem => {
    sem.subjects.forEach(sub => {
      const g = sub.grade || 'A';
      gradeCounts[g] = (gradeCounts[g] || 0) + 1;
    });
  });

  const gradePieData = Object.entries(gradeCounts).map(([grade, count]) => ({
    name: `Grade ${grade}`,
    value: count,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899'];

  // Skill Competency Radar Data
  const competencyData = [
    { subject: 'Algorithms & Code', score: 92, fullMark: 100 },
    { subject: 'System Design', score: 85, fullMark: 100 },
    { subject: 'Database Architect', score: 88, fullMark: 100 },
    { subject: 'AI & ML Ops', score: 95, fullMark: 100 },
    { subject: 'Cyber Security', score: 82, fullMark: 100 },
    { subject: 'Project Delivery', score: 90, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Top Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                Institutional Academic Analytics
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Top 5% Department Ranking
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Academic Performance & Progress Analytics
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Comprehensive statistical insights into attendance correlation, cumulative CGPA progression, and verified co-curricular achievements.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Current CGPA</span>
              <span className="text-2xl font-black text-cyan-300">{student.cgpa}</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Credits</span>
              <span className="text-2xl font-black text-white">142</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveAnalysisTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAnalysisTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Performance Charts
        </button>
        <button
          onClick={() => setActiveAnalysisTab('achievements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAnalysisTab === 'achievements'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Student Achievements & Certifications ({achievements.length})
        </button>
        <button
          onClick={() => setActiveAnalysisTab('insights')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAnalysisTab === 'insights'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          AI Study Insights & Recommendations
        </button>
      </div>

      {activeAnalysisTab === 'overview' && (
        <div className="space-y-6">
          {/* Charts Row 1: CGPA Growth & Grade Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CGPA Progression Line Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Semester-by-Semester GPA Progression
                  </h3>
                  <p className="text-xs text-slate-500">Comparison of Semester SGPA vs Cumulative CGPA</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +0.62 Overall Growth
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gpaTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="semester" stroke="#94a3b8" fontSize={11} />
                    <YAxis domain={[7.5, 10]} stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="SGPA" stroke="#38bdf8" strokeWidth={3} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="CGPA" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grade Distribution Donut */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                  Cumulative Grade Breakdown
                </h3>
                <p className="text-xs text-slate-500 mb-4">Letter grades across all completed courses</p>
              </div>

              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {gradePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '11px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                {gradePieData.map((item, idx) => (
                  <div key={idx} className="p-1 rounded bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-[10px] text-slate-500 block">{item.name}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.value} Courses</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row 2: Attendance vs Internal Marks & Radar Competency */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject Internal Marks vs Attendance */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Current Semester: Attendance vs Internal Score
                  </h3>
                  <p className="text-xs text-slate-500">Evaluates correlation between class presence and continuous assessment</p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectMarksData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '11px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="AttendancePct" name="Attendance %" fill="#0284c7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Internal" name="Internal Marks (/30)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Skill Matrix */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                Engineering Skill Radar
              </h3>
              <p className="text-xs text-slate-500 mb-2">Evaluated through coursework & lab assessments</p>

              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={competencyData}>
                    <PolarGrid stroke="#334155" opacity={0.3} />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                    <PolarRadiusAxis stroke="#64748b" fontSize={9} />
                    <Radar name="Student Proficiency" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'achievements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Medal className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      {item.date}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
                  <span>Issuer: <strong>{item.issuer}</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAnalysisTab === 'insights' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Strengths */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Academic Strengths & Highlights
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  Exceptional Performance in Machine Learning (CS602)
                </span>
                Scored 29/30 in continuous internals, maintaining 90.9% attendance. Projected end-sem grade: A+ (10.0).
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200">
                <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">
                  Consistently Improving CGPA Trajectory
                </span>
                CGPA has steadily climbed from 8.50 in Semester 1 to 9.12 in Semester 6, demonstrating strong academic resilience.
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-slate-800 dark:text-slate-200">
                <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1">
                  Zero Assignment Delays
                </span>
                All 6 major laboratory assignments submitted ahead of scheduled deadlines with average score 94%.
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              Focus Areas for Upcoming Finals
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-slate-800 dark:text-slate-200">
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1">
                  Reinforce Compiler Design Proofs (CS603)
                </span>
                Review LR(1) parser tables and syntax-directed translations before the mid-term revision test on May 19.
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-200">
                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-1">
                  Attendance Buffer Monitoring
                </span>
                Overall attendance is 88.6%. Safe bunk limit is 2 classes for Software Engineering without dipping below 85% eligibility threshold.
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-slate-800 dark:text-slate-200">
                <span className="font-bold text-cyan-700 dark:text-cyan-400 block mb-1">
                  Final Year Capstone Milestone
                </span>
                Schedule review meeting with faculty advisor Dr. Arvind Sharma for Phase 1 prototype sign-off before June 5.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
