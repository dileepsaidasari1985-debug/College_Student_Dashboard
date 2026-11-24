import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
  GraduationCap,
  CheckCheck,
  ShieldCheck
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ onOpenSearch, onOpenLogout }) => {
  const {
    student,
    activeTab,
    setActiveTab,
    setMobileMenuOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    userRole,
    setUserRole,
  } = useStudent();

  const { themeMode, toggleThemeMode } = useTheme();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifDropdownOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Student Academic Overview';
      case 'profile': return 'Student Official Profile';
      case 'attendance': return 'Attendance Records & Smart Predictor';
      case 'results': return 'Examinations & Academic Grades';
      case 'subjects': return 'Enrolled Subjects & Curriculum';
      case 'timetable': return 'Class Routine & Schedule';
      case 'assignments': return 'Assignments & Submissions';
      case 'examinations': return 'Examinations Schedule & Hall Ticket';
      case 'notifications': return 'Notification Center';
      case 'announcements': return 'College Notices & Circulars';
      case 'study-materials': return 'Digital Library & Course Materials';
      case 'fees': return 'Fee Structure & Payment Receipts';
      case 'calendar': return 'Academic Calendar & Events';
      case 'analytics': return 'Performance Analytics & Insights';
      case 'settings': return 'Portal Preferences & Configuration';
      case 'help': return 'Helpdesk & Academic Advisor Support';
      default: return 'Student Portal';
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-portal-header border-b border-slate-800/80 px-4 py-2.5 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Sem {student.currentSemester} • AY {student.academicYear}
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden lg:inline">
                ID: {student.rollNumber}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white truncate">
              {getPageTitle(activeTab)}
            </h1>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-all text-xs group"
          >
            <span className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Search subjects, assignments, exams, notes...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-800 text-slate-300 rounded border border-slate-700">
              Ctrl + K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Search className="w-5 h-5 text-cyan-400" />
          </button>

          <button
            onClick={() => setUserRole(userRole === 'student' ? 'faculty' : 'student')}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Role: <strong className="capitalize text-white">{userRole} View</strong></span>
          </button>

          <button
            onClick={toggleThemeMode}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl portal-card border border-slate-700/80 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-white">Notifications ({unreadNotificationsCount} unread)</span>
                  {unreadNotificationsCount > 0 && (
                    <button onClick={markAllNotificationsAsRead} className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.slice(0, 4).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.actionUrl) setActiveTab(n.actionUrl);
                        setNotifDropdownOpen(false);
                      }}
                      className="p-2.5 rounded-xl cursor-pointer transition-all border bg-slate-900/40 border-slate-800 hover:bg-slate-800/50"
                    >
                      <span className="text-xs font-semibold text-slate-100 line-clamp-1">{n.title}</span>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{n.message}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setNotifDropdownOpen(false);
                    }}
                    className="text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    View All Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-800/60 border border-slate-800/80 transition-all"
            >
              <img src={student.avatarUrl} alt={student.fullName} className="w-8 h-8 rounded-lg object-cover border border-cyan-400/30" />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white line-clamp-1">{student.fullName.split(' ')[0]}</span>
                <span className="text-[10px] text-cyan-400 font-mono">CGPA {student.cgpa}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl portal-card border border-slate-700/80 shadow-2xl p-2 z-50">
                <div className="p-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-white truncate">{student.fullName}</p>
                  <p className="text-[10px] text-cyan-400 font-mono">{student.rollNumber}</p>
                </div>
                <button
                  onClick={() => { setActiveTab('profile'); setProfileDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs"
                >
                  <User className="w-4 h-4 text-cyan-400" /> My Profile
                </button>
                <button
                  onClick={() => { setActiveTab('results'); setProfileDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs"
                >
                  <GraduationCap className="w-4 h-4 text-purple-400" /> Academic Results
                </button>
                <button
                  onClick={() => { setActiveTab('settings'); setProfileDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs"
                >
                  <Settings className="w-4 h-4 text-indigo-400" /> Settings
                </button>
                <div className="pt-1 mt-1 border-t border-slate-800">
                  <button
                    onClick={() => { setProfileDropdownOpen(false); onOpenLogout(); }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-medium"
                  >
                    <LogOut className="w-4 h-4" /> Logout Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
