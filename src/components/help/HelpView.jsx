import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  CheckCircle,
  Send,
  LifeBuoy,
  Building,
  AlertCircle
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const HelpView = () => {
  const { student } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState('all');
  const [expandedFaqId, setExpandedFaqId] = useState(null);

  // Ticket Form state
  const [ticketForm, setTicketForm] = useState({
    category: 'academic',
    subject: '',
    description: '',
    priority: 'medium'
  });
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const faqs = [
    {
      id: 'faq-1',
      category: 'attendance',
      question: 'What is the minimum attendance required to appear in semester exams?',
      answer: 'According to University Ordinance 4.2, students must maintain a minimum of 75% aggregate attendance across all registered courses. Shortage cases below 75% require medical dispensation approved by the Dean of Academic Affairs.'
    },
    {
      id: 'faq-2',
      category: 'attendance',
      question: 'How do I submit medical or on-duty (OD) leave applications?',
      answer: 'Medical certificates must be endorsed by the Campus Medical Officer within 3 working days of resumption and submitted to your Department Faculty Proctor through the Student ERP portal.'
    },
    {
      id: 'faq-3',
      category: 'exams',
      question: 'When will the End-Semester Examination Hall Tickets be released?',
      answer: 'Admit cards are generated 7 days prior to the first examination slot, provided there are no pending tuition dues and your attendance meets the eligibility threshold.'
    },
    {
      id: 'faq-4',
      category: 'fees',
      question: 'How do I download official fee receipts for income tax or loan reimbursement?',
      answer: 'Navigate to "Fee Details" in the sidebar, scroll down to Payment History, and click "Print Official Receipt" next to any completed transaction.'
    },
    {
      id: 'faq-5',
      category: 'technical',
      question: 'Who do I contact if my internal assessment marks are displayed incorrectly?',
      answer: 'Internal assessment marks are uploaded directly by the course instructor. Please raise a grievance ticket with your subject code and notify the faculty member before the marks freeze deadline.'
    },
    {
      id: 'faq-6',
      category: 'technical',
      question: 'Can I change my elective subject after the semester has commenced?',
      answer: 'Elective add/drop window is active during the first 10 calendar days of the semester. Contact the Academic Section Room 102 for elective reassignment.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
    return matchesSearch && matchesCat;
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) return;

    const ticketNumber = `TICK-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      ticketNumber,
      date: new Date().toLocaleDateString(),
      subject: ticketForm.subject,
      category: ticketForm.category,
      priority: ticketForm.priority
    });

    setTicketForm({
      category: 'academic',
      subject: '',
      description: '',
      priority: 'medium'
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 lg:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                24/7 Student Grievance & Helpdesk
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Help Center & Academic Support
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Get answers to frequently asked academic questions, raise support tickets, and access emergency campus contacts.
            </p>
          </div>

          <div className="p-3 bg-blue-600/30 rounded-2xl border border-blue-500/30">
            <LifeBuoy className="w-10 h-10 text-cyan-300" />
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative mt-6 max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., 'attendance shortage', 'hall ticket', 're-eval')..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Directory & Advisors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Faculty Proctor', name: 'Dr. Arvind Sharma', email: 'arvind.sharma@iits.edu', office: 'CSE Block 3, Room 314' },
          { title: 'Dean of Academics', name: 'Prof. Meenakshi Sundaram', email: 'dean.acad@iits.edu', office: 'Admin Wing, Room 102' },
          { title: 'Controller of Exams', name: 'Dr. Rajeshwari Nair', email: 'coe@iits.edu', office: 'Exam Cell, Room 201' },
          { title: 'IT & ERP Support', name: 'Campus IT Helpdesk', email: 'erp.support@iits.edu', office: 'Central Computer Facility' },
        ].map((contact, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block mb-1">
              {contact.title}
            </span>
            <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{contact.name}</div>
            <div className="text-slate-500 dark:text-slate-400 truncate mb-2">{contact.email}</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {contact.office}
            </div>
          </div>
        ))}
      </div>

      {/* Main Support Grid: FAQ on Left, Ticket Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-blue-500" />
                Frequently Answered Queries
              </h2>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto">
                {['all', 'attendance', 'exams', 'fees', 'technical'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFaqCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs capitalize transition-colors ${
                      activeFaqCategory === cat
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No questions found matching your search.
                </div>
              ) : (
                filteredFaqs.map(faq => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full text-left p-4 flex justify-between items-center gap-3 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Raise Support Ticket Form */}
        <div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              Raise Academic Ticket
            </h3>
            <p className="text-xs text-slate-500 mb-4">Direct inquiry dispatched to Departmental Cell</p>

            {submittedTicket && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 mb-4 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Ticket Dispatched!
                </div>
                <div>ID: <strong className="font-mono">{submittedTicket.ticketNumber}</strong></div>
                <div>Status: In Review by Academic Advisor</div>
              </div>
            )}

            <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Issue Category</label>
                <select
                  value={ticketForm.category}
                  onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="academic">Academic & Coursework</option>
                  <option value="attendance">Attendance Discrepancy</option>
                  <option value="exam">Examination & Admit Card</option>
                  <option value="fee">Fee & Payment Reconciliation</option>
                  <option value="it">Portal & Technical Bug</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Attendance mismatch in CS603 Lab"
                  value={ticketForm.subject}
                  onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                <select
                  value={ticketForm.priority}
                  onChange={e => setTicketForm({ ...ticketForm, priority: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low - General Inquiry</option>
                  <option value="medium">Medium - Standard Academic Request</option>
                  <option value="urgent">Urgent - Exam or Admit Card Issue</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Details & Supporting Context *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue with date, faculty name, or class slot..."
                  value={ticketForm.description}
                  onChange={e => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                Submit Grievance Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
