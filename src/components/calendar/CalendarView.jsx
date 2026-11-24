import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Tag,
  Filter,
  CheckCircle,
  AlertCircle,
  FileText,
  Bookmark,
  X
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const CalendarView = () => {
  const { calendarEvents, addCalendarEvent, student } = useStudent();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025 default
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'academic',
    date: '2025-05-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Campus Hall / Online',
    description: '',
  });

  const categories = [
    { id: 'all', label: 'All Events', color: 'bg-slate-600' },
    { id: 'exam', label: 'Examinations', color: 'bg-rose-500' },
    { id: 'assignment', label: 'Assignment Deadlines', color: 'bg-amber-500' },
    { id: 'event', label: 'College Events', color: 'bg-purple-500' },
    { id: 'holiday', label: 'Holidays', color: 'bg-emerald-500' },
    { id: 'workshop', label: 'Workshops & Seminars', color: 'bg-cyan-500' },
    { id: 'academic', label: 'Academic Milestones', color: 'bg-blue-500' }
  ];

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'exam': return 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800';
      case 'assignment': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800';
      case 'holiday': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800';
      case 'workshop': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800';
      case 'event': return 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-300 dark:border-purple-800';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-300 dark:border-blue-800';
    }
  };

  const getCategoryDot = (category) => {
    switch (category) {
      case 'exam': return 'bg-rose-500';
      case 'assignment': return 'bg-amber-500';
      case 'holiday': return 'bg-emerald-500';
      case 'workshop': return 'bg-cyan-500';
      case 'event': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const filteredEvents = calendarEvents.filter(evt => {
    if (selectedCategory === 'all') return true;
    return evt.category === selectedCategory;
  });

  // Calendar matrix calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday

  const prevMonthDays = new Date(year, month, 0).getDate();
  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      dayNumber: prevMonthDays - i,
      isCurrentMonth: false,
      dateString: `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({
      dayNumber: d,
      isCurrentMonth: true,
      dateString
    });
  }

  // Next month leading days to complete full 35 or 42 grid
  const remainingCells = 35 - calendarCells.length > 0 ? 35 - calendarCells.length : 42 - calendarCells.length;
  for (let n = 1; n <= remainingCells; n++) {
    calendarCells.push({
      dayNumber: n,
      isCurrentMonth: false,
      dateString: `${year}-${String(month + 2).padStart(2, '0')}-${String(n).padStart(2, '0')}`
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    addCalendarEvent({
      ...newEvent,
      type: newEvent.category.toUpperCase()
    });

    setAddModalOpen(false);
    setNewEvent({
      title: '',
      category: 'academic',
      date: '2025-05-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Campus Hall / Online',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Academic Calendar & Events 2024-2025
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Synchronized with University Registrar Examination & Activity Schedule
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-900/20 transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            Add Personal Event
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Calendar on Left, Agenda on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Box */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          {/* Calendar Header with Navigation */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(2025, 4, 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((cell, idx) => {
              const dayEvents = calendarEvents.filter(e => e.date === cell.dateString);
              const isToday = cell.dateString === '2025-05-15';

              return (
                <div
                  key={idx}
                  className={`min-h-[75px] md:min-h-[85px] p-1.5 md:p-2 rounded-xl border transition-all flex flex-col justify-between ${
                    cell.isCurrentMonth
                      ? isToday
                        ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 ring-2 ring-blue-500/20'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      : 'bg-transparent border-transparent opacity-40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center'
                          : cell.isCurrentMonth
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {cell.dayNumber}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-semibold text-slate-400">
                        {dayEvents.length} evt
                      </span>
                    )}
                  </div>

                  {/* Event Dots / Badges */}
                  <div className="space-y-1 mt-1">
                    {dayEvents.slice(0, 2).map(evt => (
                      <button
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className="w-full text-left truncate text-[10px] px-1.5 py-0.5 rounded font-medium block transition-transform hover:scale-[1.02] bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                      >
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${getCategoryDot(evt.category)}`} />
                        {evt.title}
                      </button>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 block px-1">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events Agenda List */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center justify-between">
              <span>Upcoming Key Dates</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                {filteredEvents.length} Events
              </span>
            </h3>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {filteredEvents.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No events found in this category.
                </div>
              ) : (
                filteredEvents.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadge(evt.category)}`}>
                        {evt.category.toUpperCase()}
                      </span>
                      <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                        {evt.date}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {evt.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {evt.time || 'All Day'}
                      </span>
                      {evt.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {evt.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${getCategoryBadge(selectedEvent.category)}`}>
                {selectedEvent.category.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-slate-500">{selectedEvent.date}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {selectedEvent.title}
            </h3>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 py-3 border-y border-slate-100 dark:border-slate-800 my-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Time: <strong>{selectedEvent.time || 'Full Working Hours'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Venue: <strong>{selectedEvent.location || 'Department Notice Board / Online Portal'}</strong></span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {selectedEvent.description || 'Official college notification event. Please verify instructions with departmental office or subject faculties.'}
            </p>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Add Personal Event Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white">Add Personal Academic Event</h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Final Year Project Presentation, Robotics Seminar"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Event Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="academic">Academic</option>
                    <option value="exam">Examination</option>
                    <option value="assignment">Assignment</option>
                    <option value="workshop">Workshop</option>
                    <option value="event">College Event</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 02:00 PM - 04:00 PM"
                    value={newEvent.time}
                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Location / Room
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Seminar Hall B, Audi-1"
                    value={newEvent.location}
                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description / Agenda Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Notes, required documents, or study goals..."
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
