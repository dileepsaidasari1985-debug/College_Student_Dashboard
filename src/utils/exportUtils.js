export const downloadCSV = (filename, headers, rows) => {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(val => {
        const stringVal = String(val ?? '').replace(/"/g, '""');
        return `"${stringVal}"`;
      }).join(',')
    )
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAttendanceCSV = (subjects, student) => {
  const headers = ['Subject Code', 'Subject Name', 'Type', 'Faculty', 'Classes Conducted', 'Classes Attended', 'Classes Missed', 'Attendance Percentage (%)', 'Status'];
  const rows = subjects.map(s => [
    s.code,
    s.name,
    s.type,
    s.faculty,
    s.classesConducted,
    s.classesAttended,
    s.classesMissed,
    s.attendancePercentage.toFixed(1) + '%',
    s.attendancePercentage >= 75 ? 'Eligible' : 'Shortage Warning'
  ]);
  downloadCSV(`Attendance_Report_${student.rollNumber}`, headers, rows);
};

export const exportMarksCSV = (semesters, student) => {
  const headers = ['Semester', 'Subject Code', 'Subject Name', 'Credits', 'Internal Marks', 'External Marks', 'Total Marks', 'Grade', 'Grade Point', 'Status'];
  const rows = [];
  semesters.forEach(sem => {
    sem.subjects.forEach(sub => {
      rows.push([
        `Semester ${sem.semester}`,
        sub.code,
        sub.name,
        sub.credits,
        sub.internal ?? '-',
        sub.external ?? '-',
        sub.total,
        sub.grade,
        sub.gradePoint,
        sub.status
      ]);
    });
  });
  downloadCSV(`Academic_Transcript_${student.rollNumber}`, headers, rows);
};

export const exportTimetableCSV = (timetable, student) => {
  const headers = ['Day', 'Time Slot', 'Subject Code', 'Subject Name', 'Type', 'Room', 'Faculty'];
  const rows = [];
  Object.entries(timetable).forEach(([day, slots]) => {
    slots.forEach(slot => {
      rows.push([day, slot.time, slot.code, slot.subject, slot.type, slot.room, slot.faculty]);
    });
  });
  downloadCSV(`Timetable_${student.rollNumber}`, headers, rows);
};

export const printUniversityDocument = ({ title, documentType, student, contentHtml }) => {
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (!printWindow) {
    alert('Please allow popups to view and print this official document.');
    return;
  }

  const dateStr = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - ${student.rollNumber}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: system-ui, sans-serif; color: #1e293b; background: #ffffff; padding: 24px; font-size: 13px; line-height: 1.5; }
          .header { border-bottom: 2px solid #0f172a; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
          h1 { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; text-transform: uppercase; }
          .meta { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
          th { background: #f1f5f9; color: #0f172a; text-align: left; padding: 8px 10px; font-weight: 700; border-bottom: 2px solid #cbd5e1; }
          td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }
          .print-btn { position: fixed; bottom: 20px; right: 20px; background: #0f172a; color: white; padding: 10px 18px; border-radius: 8px; border: none; cursor: pointer; font-weight: bold; }
          @media print { .print-btn { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${student.collegeName}</h1>
            <p style="margin: 0; color: #64748b; font-size: 11px;">Autonomous Student ERP Official Academic Verification</p>
          </div>
          <div><span style="background: #0f172a; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">${documentType}</span></div>
        </div>
        <div class="meta">
          <div>Student: <strong>${student.fullName}</strong></div>
          <div>Roll No: <strong>${student.rollNumber}</strong></div>
          <div>Department: <strong>${student.department}</strong></div>
        </div>
        ${contentHtml}
        <button class="print-btn" onclick="window.print()">Print Document</button>
      </body>
    </html>
  `);
  printWindow.document.close();
};
