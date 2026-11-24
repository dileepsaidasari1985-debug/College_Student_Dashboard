# 🎓 Autonomous Indian Institute of Technology & Science
## 🚀 Advanced College Student ERP Dashboard & Academic Management System

![College Student ERP Portal](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80)

> A premium-quality, modern, fully responsive, and interactive **College Student ERP Portal** engineered for higher education institutions. Provides comprehensive academic lifecycle management including attendance tracking with AI shortage predictors, semester examination grades, interactive weekly routine, digital library notes, assignments with file upload, fee receipts, calendar events, and multi-role student administration.

---

## 🌐 Live Worldwide Production URL
- **Production URL:** [https://iits-student-portal.surge.sh](https://iits-student-portal.surge.sh)
- **GitHub Repository:** [https://github.com/dileepsaidasari1985-debug/College_Student_Dashboard](https://github.com/dileepsaidasari1985-debug/College_Student_Dashboard)

---

## 📸 Key Features & Capabilities

### 1. 🏛️ Modern Dashboard Overview & KPIs
- **Personalized Header:** "Welcome Back, [Student Name]!" with institutional accreditation badges, department, year, and semester details.
- **Summary Cards & Counters:** Total Attendance Percentage, Cumulative CGPA, Enrolled Subjects, Pending Assignments, Upcoming Examinations, and Unread Notifications.
- **Today's Class Schedule:** Real-time timetable schedule with room numbers, faculty details, and active time slot indicator.
- **Quick Shortcuts:** Direct 1-click access to View Attendance, Check Results, Download Timetable, Submit Assignment, and View Announcements.

### 2. 👤 Student Profile & Digital Identity Card
- **Institutional Profile:** Full name, roll number, student ID, department, course, academic year, institutional email, phone, permanent address, and blood group.
- **Guardian & Emergency Contacts:** Father/Mother/Guardian name, verified emergency phone number, and relation.
- **Interactive Profile Editor:** Edit profile attributes with real-time field validation and local persistence.
- **Digital Student ID Card:** Official university card preview with printable printable A4 identity verification document.
- **Profile Completion Tracker:** Animated progress bar tracking completeness of student records.

### 3. 📊 Attendance Management & Smart Predictor
- **Detailed Ledger:** Subject-wise breakdown of classes conducted, classes attended, classes missed, and percentage.
- **Visual Progress & Bar Charts:** Color-coded progress indicators (Green ≥ 75%, Amber 65-74%, Red < 65%).
- **Smart Attendance Predictor:**
  - Configurable minimum attendance threshold slider (65% to 90%, default 75%).
  - Real-time calculation of **classes required to attend** to hit target percentage.
  - Calculation of **safe bunk classes remaining** before dropping below threshold.
- **Reports:** One-click CSV export and printable official attendance verification certificate.

### 4. 🏆 Marks, Semester Results & CGPA Simulator
- **Multi-Semester Grade Sheets:** Complete grade records across Semesters 1 through 6.
- **Mark Breakdown:** Internal assessments (/30), external examinations (/70), total marks, letter grades (O, A+, A, B+), and grade points.
- **Best & Lowest Scoring Highlights:** Automatic detection of highest scoring subject and subjects needing improvement.
- **Interactive CGPA / SGPA Simulator:** Target GPA calculator allowing students to experiment with prospective grades.
- **Printable Grade Card:** Official semester grade sheet generation with university seal formatting.

### 5. 📅 Interactive Weekly Timetable
- **Weekly Matrix:** Monday through Saturday schedule with class timings, classroom numbers, and faculty names.
- **Active Class Highlighting:** Dynamic simulator highlighting the current active lecture and next upcoming class.
- **Filter by Day:** Easily toggle between full week view and daily routine.
- **Print & Export:** Download timetable as CSV or printable PDF schedule.

### 6. 📚 Subjects Management & Syllabus
- **Curriculum Cards:** Subject code, credit units, faculty in-charge, and attendance status.
- **Syllabus Modal:** Detailed 5-unit curriculum breakdown, course outcomes, and recommended reference textbooks.
- **Direct Resource Links:** Quick links from subject cards to download notes and lecture slides.

### 7. 📝 Assignments & Submissions
- **Deadline Tracking:** Pending, submitted, late, and graded assignment statuses.
- **Working File Upload Modal:** Interactive assignment submission modal with file selector, student comment input, and instant receipt notification.
- **Countdown Timer:** Urgent deadline warnings for assignments due within 48 hours.

### 8. 📝 Examinations & Admit Card (Hall Ticket)
- **Upcoming Date Sheet:** End-semester examination timetable with subject, exam hall, seat number, and timings.
- **Exam Countdown:** Live countdown timer to the next upcoming examination slot.
- **Admit Card Generator:** One-click printable University Examination Admit Card with candidate photo, seat number, exam controller signature, and candidate instructions.

### 9. 🔔 Notification Center & Announcements
- **Categorized Alerts:** Attendance alerts, exam reminders, assignment deadlines, fee notices, and timetable updates.
- **Interactive Controls:** Mark as read, mark all as read, delete notification, and unread counter badges.
- **College Notice Board:** Official notices categorized into Academic, Examination, Events, and Holidays with attachment download links.

### 10. 📖 Study Materials & Digital Library
- **Categorized Repository:** Lecture notes, previous year question papers (PYQs), reference e-books, and laboratory manuals.
- **Integrated Document Viewer:** Interactive document reader modal with search and preview capabilities.
- **Bookmarks:** Save frequently used study materials for fast revision.

### 11. 💳 Fee Management & Payment Receipts
- **Fee Ledger:** Total semester fees, amount paid, and remaining balance.
- **Payment History:** Complete transaction log with transaction IDs, dates, and payment modes.
- **Simulated Payment Gateway:** Demo tuition fee payment modal with instant receipt generation.
- **Printable Fee Receipt:** Official University accounts receipt with payment reference numbers and cashier stamp.

### 12. 🗓️ Academic Calendar & Personal Planner
- **Month & Week Views:** Interactive calendar showing exams, assignment due dates, college fests, workshops, and statutory holidays.
- **Personal Study Events:** Add custom study tasks and personal academic reminders.
- **Agenda View:** Scrollable list of upcoming key dates.

### 13. 📈 Performance Analytics & Achievements
- **Semester Progression Line Chart:** SGPA vs Cumulative CGPA trend over 6 semesters.
- **Grade Distribution Donut Chart:** Visual breakdown of letter grades across all completed courses.
- **Engineering Skill Radar:** Multi-dimensional competency assessment across core computer science competencies.
- **Achievements & Certifications:** Verified hackathon wins, research papers, online certifications, and honors.

### 14. 🛠️ Settings, Customization & Helpdesk
- **Theme Studio:** Instant switching between Dark Navy, Executive Lumina (Light), Quantum Obsidian, and Emerald Matrix.
- **Configurable Attendance Warning Threshold:** Adjust alert sensitivity between 65% and 90%.
- **Notification Preferences:** Toggle institutional email digests, SMS alerts, and timetable change pings.
- **Security & 2FA:** Password update form and two-factor authentication simulation.
- **Help Center:** Searchable FAQs, campus advisor directory, and interactive student grievance ticket generator (`TICK-xxxx`).

---

## 💻 Tech Stack

- **Framework:** React 18 (Vite SPA)
- **Styling:** Tailwind CSS with custom portal glassmorphism and theme variables
- **Icons:** Lucide React
- **Charts & Data Visualization:** Recharts (LineChart, BarChart, PieChart, RadarChart)
- **State Management:** React Context API with LocalStorage sync
- **Document Export:** Native HTML-to-print engine & CSV generators

---

## 🏃 Local Development Setup

To run this project locally on your computer:

```bash
# 1. Clone the repository
git clone https://github.com/dileepsaidasari1985-debug/College_Student_Dashboard.git

# 2. Enter directory
cd College_Student_Dashboard

# 3. Install dependencies
npm install

# 4. Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Building for Production

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛡️ License & University Attribution
Developed for **Autonomous Indian Institute of Technology & Science** Student ERP Portal. Designed for modern higher education institutions.
All demo data is realistic simulation data for institutional portal evaluation.
