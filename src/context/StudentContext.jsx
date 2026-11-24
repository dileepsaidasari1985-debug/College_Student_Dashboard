import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_SEMESTER_RESULTS,
  INITIAL_TIMETABLE,
  INITIAL_ASSIGNMENTS,
  INITIAL_EXAMINATIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_FEES,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_STUDY_TASKS,
  INITIAL_ACHIEVEMENTS,
} from '../data/mockStudentData';

const StudentContext = createContext();

const safeLoad = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
    }
    if (typeof fallback === 'object' && fallback !== null) {
      return { ...fallback, ...parsed };
    }
    return parsed !== undefined && parsed !== null ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
};

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(() => safeLoad('iits_student_profile', INITIAL_STUDENT_PROFILE));
  const [attendanceThreshold, setAttendanceThreshold] = useState(() => {
    try {
      const saved = localStorage.getItem('iits_attendance_threshold');
      return saved ? Number(saved) : 75;
    } catch {
      return 75;
    }
  });
  const [subjects, setSubjects] = useState(() => safeLoad('iits_subjects', INITIAL_SUBJECTS));
  const [semesterResults, setSemesterResults] = useState(() => safeLoad('iits_semester_results', INITIAL_SEMESTER_RESULTS));
  const [timetable, setTimetable] = useState(() => safeLoad('iits_timetable', INITIAL_TIMETABLE));
  const [assignments, setAssignments] = useState(() => safeLoad('iits_assignments', INITIAL_ASSIGNMENTS));
  const [examinations, setExaminations] = useState(() => safeLoad('iits_examinations', INITIAL_EXAMINATIONS));
  const [announcements, setAnnouncements] = useState(() => safeLoad('iits_announcements', INITIAL_ANNOUNCEMENTS));
  const [notifications, setNotifications] = useState(() => safeLoad('iits_notifications', INITIAL_NOTIFICATIONS));
  const [studyMaterials, setStudyMaterials] = useState(() => safeLoad('iits_study_materials', INITIAL_STUDY_MATERIALS));
  const [fees, setFees] = useState(() => safeLoad('iits_fees', INITIAL_FEES));
  const [calendarEvents, setCalendarEvents] = useState(() => safeLoad('iits_calendar_events', INITIAL_CALENDAR_EVENTS));
  const [studyTasks, setStudyTasks] = useState(() => safeLoad('iits_study_tasks', INITIAL_STUDY_TASKS));
  const [achievements, setAchievements] = useState(() => safeLoad('iits_achievements', INITIAL_ACHIEVEMENTS));
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('iits_active_tab') || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    localStorage.setItem('iits_student_profile', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('iits_attendance_threshold', String(attendanceThreshold));
  }, [attendanceThreshold]);

  useEffect(() => {
    localStorage.setItem('iits_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('iits_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('iits_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('iits_study_materials', JSON.stringify(studyMaterials));
  }, [studyMaterials]);

  useEffect(() => {
    localStorage.setItem('iits_fees', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem('iits_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('iits_study_tasks', JSON.stringify(studyTasks));
  }, [studyTasks]);

  useEffect(() => {
    localStorage.setItem('iits_active_tab', activeTab);
  }, [activeTab]);

  const totalClassesConducted = subjects.reduce((acc, s) => acc + s.classesConducted, 0);
  const totalClassesAttended = subjects.reduce((acc, s) => acc + s.classesAttended, 0);
  const overallAttendancePercentage = totalClassesConducted > 0
    ? Number(((totalClassesAttended / totalClassesConducted) * 100).toFixed(1))
    : 0;

  const pendingAssignmentsCount = assignments.filter(a => a.status === 'Pending').length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const upcomingExamsCount = examinations.length;

  const updateStudentProfile = (updatedFields) => {
    setStudent(prev => ({ ...prev, ...updatedFields }));
  };

  const submitAssignment = (assignmentId, fileName, comment) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'Submitted',
          submissionFile: fileName,
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          studentComment: comment
        };
      }
      return a;
    }));

    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: "Assignment Submitted Successfully",
      message: `Your file "${fileName}" was uploaded for ${assignmentId}.`,
      category: "assignment",
      priority: "medium",
      timestamp: "Just now",
      read: false,
      actionUrl: "assignments"
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleBookmarkMaterial = (id) => {
    setStudyMaterials(prev => prev.map(m => m.id === id ? { ...m, bookmarked: !m.bookmarked } : m));
  };

  const addStudyTask = (newTask) => {
    setStudyTasks(prev => [{ id: `TASK-${Date.now()}`, completed: false, ...newTask }, ...prev]);
  };

  const toggleStudyTask = (id) => {
    setStudyTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteStudyTask = (id) => {
    setStudyTasks(prev => prev.filter(t => t.id !== id));
  };

  const addCalendarEvent = (newEvent) => {
    setCalendarEvents(prev => [...prev, { id: `EVT-${Date.now()}`, ...newEvent }]);
  };

  const payFee = (amount, paymentMethod) => {
    const numAmount = Number(amount);
    const newBalance = Math.max(0, fees.remainingBalance - numAmount);
    const newPaid = fees.amountPaid + numAmount;
    const txnId = `TXN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const receiptId = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTransaction = {
      id: txnId,
      date: new Date().toISOString().split('T')[0],
      amount: numAmount,
      paymentMethod,
      referenceNumber: `SIM/${Date.now().toString().substring(4)}/AUT`,
      status: "Successful",
      receiptId,
      description: "College Fee Payment (Simulated Transaction)",
    };

    setFees(prev => ({
      ...prev,
      amountPaid: newPaid,
      remainingBalance: newBalance,
      status: newBalance === 0 ? "Fully Paid" : "Partially Paid",
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setStudent(INITIAL_STUDENT_PROFILE);
    setSubjects(INITIAL_SUBJECTS);
    setSemesterResults(INITIAL_SEMESTER_RESULTS);
    setTimetable(INITIAL_TIMETABLE);
    setAssignments(INITIAL_ASSIGNMENTS);
    setExaminations(INITIAL_EXAMINATIONS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setStudyMaterials(INITIAL_STUDY_MATERIALS);
    setFees(INITIAL_FEES);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setStudyTasks(INITIAL_STUDY_TASKS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setAttendanceThreshold(75);
    setActiveTab('dashboard');
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        updateStudentProfile,
        attendanceThreshold,
        setAttendanceThreshold,
        subjects,
        semesterResults,
        timetable,
        assignments,
        submitAssignment,
        examinations,
        announcements,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        studyMaterials,
        toggleBookmarkMaterial,
        fees,
        payFee,
        calendarEvents,
        addCalendarEvent,
        studyTasks,
        addStudyTask,
        toggleStudyTask,
        deleteStudyTask,
        achievements,
        overallAttendancePercentage,
        totalClassesConducted,
        totalClassesAttended,
        pendingAssignmentsCount,
        unreadNotificationsCount,
        upcomingExamsCount,
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        userRole,
        setUserRole,
        resetToDefaultData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudent must be used within a StudentProvider');
  return context;
};
