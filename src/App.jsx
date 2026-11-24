import React, { useState } from 'react';
import { useStudent } from './context/StudentContext';
import { useTheme } from './context/ThemeContext';

// Layout
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';

// Common Modals
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { LogoutModal } from './components/common/LogoutModal';

// Views
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ProfileView } from './components/profile/ProfileView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { ResultsView } from './components/results/ResultsView';
import { SubjectsView } from './components/subjects/SubjectsView';
import { TimetableView } from './components/timetable/TimetableView';
import { AssignmentsView } from './components/assignments/AssignmentsView';
import { ExaminationsView } from './components/examinations/ExaminationsView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { AnnouncementsView } from './components/announcements/AnnouncementsView';
import { StudyMaterialsView } from './components/study/StudyMaterialsView';
import { FeesView } from './components/fees/FeesView';
import { CalendarView } from './components/calendar/CalendarView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { HelpView } from './components/help/HelpView';

export default function App() {
  const { activeTab, sidebarCollapsed } = useStudent();
  const { themePreset, themeMode } = useTheme();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileView />;
      case 'attendance':
        return <AttendanceView />;
      case 'results':
        return <ResultsView />;
      case 'subjects':
        return <SubjectsView />;
      case 'timetable':
        return <TimetableView />;
      case 'assignments':
        return <AssignmentsView />;
      case 'examinations':
        return <ExaminationsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'study-materials':
        return <StudyMaterialsView />;
      case 'fees':
        return <FeesView />;
      case 'calendar':
        return <CalendarView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView onOpenLogout={() => setLogoutModalOpen(true)} />;
      case 'help':
        return <HelpView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className={`min-h-screen ${themePreset?.bgClass || 'theme-navy'} flex flex-col font-sans transition-colors duration-300 text-slate-800 dark:text-slate-100`}>
      {/* Fixed Sidebar */}
      <Sidebar onOpenLogout={() => setLogoutModalOpen(true)} />

      {/* Main Page Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Top Navbar */}
        <Navbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenLogout={() => setLogoutModalOpen(true)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {renderActiveView()}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
            <span>
              &copy; {new Date().getFullYear()} Autonomous Indian Institute of Technology & Science • Student Portal ERP v4.2
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <span>UGC Autonomous Accredited Grade A++</span>
              <span>•</span>
              <span>Security Verified SSL/TLS</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}
