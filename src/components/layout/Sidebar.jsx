import React from 'react';
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  GraduationCap,
  BookOpen,
  Clock,
  FileText,
  FileSpreadsheet,
  Bell,
  Megaphone,
  Library,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  ShieldCheck,
  HelpCircle,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badgeKey: 'lowAttendance' },
  { id: 'results', label: 'Academic Results', icon: GraduationCap },
  { id: 'subjects', label: 'Subjects', icon: BookOpen },
  { id: 'timetable', label: 'Timetable', icon: Clock },
  { id: 'assignments', label: 'Assignments', icon: FileText, badgeKey: 'pendingAssignments' },
  { id: 'examinations', label: 'Examinations', icon: FileSpreadsheet, badgeKey: 'upcomingExams' },
  { id: 'notifications', label: 'Notifications', icon: Bell, badgeKey: 'unreadNotifications' },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'study-materials', label: 'Study Materials', icon: Library },
  { id: 'fees', label: 'Fee Details', icon: CreditCard },
  { id: 'calendar', label: 'Calendar & Events', icon: Calendar },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export const Sidebar = ({ onOpenLogout }) => {
  const {
    student,
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    pendingAssignmentsCount,
    unreadNotificationsCount,
    upcomingExamsCount,
    subjects,
    attendanceThreshold
  } = useStudent();

  const hasLowAttendance = (subjects || []).some(s => s && s.attendancePercentage < (attendanceThreshold || 75));

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const renderBadge = (badgeKey) => {
    if (badgeKey === 'lowAttendance' && hasLowAttendance) {
      return (
        <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold bg-rose-500/20 text-rose-400 rounded-full border border-rose-500/30">
          <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
          Alert
        </span>
      );
    }
    if (badgeKey === 'pendingAssignments' && pendingAssignmentsCount > 0) {
      return (
        <span className="px-2 py-0.5 text-[11px] font-bold bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
          {pendingAssignmentsCount}
        </span>
      );
    }
    if (badgeKey === 'upcomingExams' && upcomingExamsCount > 0) {
      return (
        <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
          {upcomingExamsCount}
        </span>
      );
    }
    if (badgeKey === 'unreadNotifications' && unreadNotificationsCount > 0) {
      return (
        <span className="px-2 py-0.5 text-[11px] font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 animate-pulse">
          {unreadNotificationsCount}
        </span>
      );
    }
    return null;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-portal-sidebar border-r border-slate-800/80 select-none">
      <div className="flex items-center justify-between p-4 border-b border-slate-800/70">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-base font-extrabold tracking-wide text-white flex items-center gap-1.5">
                IITS <span className="text-cyan-400">PORTAL</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 truncate">
                Autonomous Student ERP
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {!sidebarCollapsed && (
        <div className="p-3 mx-3 my-3 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center gap-3">
          <img
            src={student.avatarUrl}
            alt={student.fullName}
            className="w-11 h-11 rounded-lg object-cover border border-cyan-400/40"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate flex items-center gap-1">
              {student.fullName}
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </span>
            <span className="text-[11px] font-mono text-cyan-400/90 truncate">{student.rollNumber}</span>
            <span className="text-[10px] text-slate-400 truncate">Sem {student.currentSemester} • {student.section}</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-cyan-400 to-indigo-500" />
              )}
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
              {!sidebarCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
              {!sidebarCollapsed && item.badgeKey && renderBadge(item.badgeKey)}
            </button>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-800/70 space-y-2">
        <button
          onClick={onOpenLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!sidebarCollapsed && <span>Logout Session</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden md:block fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
      )}

      <div className={`md:hidden fixed top-0 left-0 z-50 h-screen w-72 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </div>
    </>
  );
};
