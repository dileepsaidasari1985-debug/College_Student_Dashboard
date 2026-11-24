import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Shield,
  Edit3,
  CheckCircle,
  Award,
  IdCard,
  Printer,
  Save,
  X,
  AlertCircle,
  Sparkles,
  Camera
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { printUniversityDocument } from '../../utils/exportUtils';

export const ProfileView = () => {
  const { student, updateStudentProfile, subjects, semesterResults } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    fullName: student.fullName || '',
    email: student.email || '',
    phone: student.phone || '',
    dateOfBirth: student.dateOfBirth || '',
    address: student.address || '',
    guardianName: student.guardian?.name || '',
    guardianRelation: student.guardian?.relation || 'Parent',
    guardianPhone: student.guardian?.phone || '',
    guardianEmail: student.guardian?.email || '',
    bloodGroup: student.bloodGroup || 'O+',
    avatar: student.avatar || '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successToast, setSuccessToast] = useState(false);

  // Calculate profile completion
  const profileFields = [
    student.fullName,
    student.rollNumber,
    student.studentId,
    student.email,
    student.phone,
    student.dateOfBirth,
    student.address,
    student.guardian?.name,
    student.guardian?.phone,
    student.department,
    student.avatar,
    student.bloodGroup
  ];
  const filledFields = profileFields.filter(f => f && String(f).trim().length > 0).length;
  const completionPercentage = Math.round((filledFields / profileFields.length) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid phone number is required';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!formData.address.trim()) errors.address = 'Permanent address is required';
    if (!formData.guardianName.trim()) errors.guardianName = 'Guardian name is required';
    if (!formData.guardianPhone.trim()) errors.guardianPhone = 'Guardian contact number is required';
    return errors;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    updateStudentProfile({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      bloodGroup: formData.bloodGroup,
      avatar: formData.avatar || student.avatar,
      guardian: {
        name: formData.guardianName,
        relation: formData.guardianRelation,
        phone: formData.guardianPhone,
        email: formData.guardianEmail
      }
    });

    setIsEditing(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);
  };

  const handlePrintIdCard = () => {
    const cardHtml = `
      <div style="border: 3px solid #0f172a; border-radius: 12px; width: 440px; margin: 20px auto; padding: 24px; font-family: sans-serif; background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="margin: 0; color: #0f172a; font-size: 18px; text-transform: uppercase;">${student.collegeName}</h2>
          <p style="margin: 4px 0 0; color: #0284c7; font-weight: bold; font-size: 12px; letter-spacing: 1px;">OFFICIAL STUDENT IDENTITY CARD</p>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
          <img src="${student.avatar}" style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover; border: 2px solid #cbd5e1;" />
          <div style="font-size: 13px; line-height: 1.6;">
            <div style="font-size: 16px; font-weight: bold; color: #0f172a;">${student.fullName}</div>
            <div><strong>Roll No:</strong> ${student.rollNumber}</div>
            <div><strong>Student ID:</strong> ${student.studentId}</div>
            <div><strong>Dept:</strong> ${student.department}</div>
            <div><strong>Batch:</strong> ${student.batchYear}</div>
            <div><strong>Blood Group:</strong> ${student.bloodGroup || 'O+'}</div>
          </div>
        </div>
        <div style="border-top: 1px dashed #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b;">
          <div>Valid Thru: <strong>May 2026</strong></div>
          <div>Authorized Signatory</div>
        </div>
      </div>
    `;

    printUniversityDocument({
      title: `Student_ID_Card_${student.rollNumber}`,
      documentType: 'STUDENT IDENTITY CARD',
      student,
      contentHtml: cardHtml
    });
  };

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 lg:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="relative group">
              <img
                src={student.avatar}
                alt={student.fullName}
                className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl object-cover ring-4 ring-white/20 shadow-2xl transition-transform group-hover:scale-105"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-transform hover:scale-110"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {student.academicStatus}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {student.program}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Section {student.section}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">{student.fullName}</h1>
              <p className="text-slate-300 text-sm mt-1">{student.collegeName}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-xs text-slate-300">
                <span><strong>Roll No:</strong> {student.rollNumber}</span>
                <span>•</span>
                <span><strong>Student ID:</strong> {student.studentId}</span>
                <span>•</span>
                <span><strong>Batch:</strong> {student.batchYear}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
            <button
              onClick={handlePrintIdCard}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium border border-slate-700 transition-all hover:-translate-y-0.5"
            >
              <IdCard className="w-4 h-4 text-cyan-400" />
              Print Student ID
            </button>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Profile Completion Status
              </span>
              <span className="font-bold text-cyan-300">{completionPercentage}% Completed</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-400 text-right">
            {completionPercentage === 100
              ? '✨ All profile attributes verified by University Registrar'
              : 'Complete remaining details for instant campus placement pass'}
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Profile changes updated and saved securely to university local database!</span>
        </div>
      )}

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal & Academic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Academic Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Faculty / Department</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.department}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Course & Specialization</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.course}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Current Semester / Year</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.currentSemester} ({student.academicYear})</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Faculty Academic Proctor</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.advisor?.name || 'Dr. Arvind Sharma'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Cumulative CGPA</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-base">{student.cgpa} / 10.0</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Admission Quota / Category</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.admissionQuota || 'Merit General - JEE Adv'}</span>
              </div>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Personal & Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Mail className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Institutional Email</span>
                  <a href={`mailto:${student.email}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">{student.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Phone className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Primary Mobile</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Calendar className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Date of Birth</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.dateOfBirth}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Shield className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Blood Group</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">{student.bloodGroup || 'O+'}</span>
                </div>
              </div>
              <div className="sm:col-span-2 flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Permanent Residential Address</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{student.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guardian / Emergency Contact */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Guardian & Emergency Contacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Guardian Name</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardian?.name}</span>
                <span className="text-xs text-slate-400 block mt-0.5">Relation: {student.guardian?.relation}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Guardian Contact Number</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardian?.phone}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 block mt-0.5">Verified Emergency Contact</span>
              </div>
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">Guardian Email</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardian?.email || 'guardian.contact@gmail.com'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Status & ID Preview */}
        <div className="space-y-6">
          {/* Official University Identity Badge */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 block">Digital ID Card</span>
                <h3 className="font-bold text-sm text-slate-100">{student.collegeName}</h3>
              </div>
              <div className="p-2 rounded-lg bg-blue-600/30 border border-blue-500/30">
                <GraduationCap className="w-5 h-5 text-blue-400" />
              </div>
            </div>

            <div className="flex gap-4 items-center mb-5">
              <img
                src={student.avatar}
                alt={student.fullName}
                className="w-20 h-20 rounded-xl object-cover ring-2 ring-blue-500/50"
              />
              <div className="text-xs space-y-1">
                <div className="font-bold text-sm text-white">{student.fullName}</div>
                <div className="text-slate-300">Roll: {student.rollNumber}</div>
                <div className="text-slate-300">ID: {student.studentId}</div>
                <div className="text-cyan-300 font-semibold">{student.department}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 mb-4">
              <div>
                <span className="text-slate-400 block">Valid Thru</span>
                <span className="font-semibold text-white">May 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block">Barcode / RFID</span>
                <span className="font-mono text-cyan-300">IIT-{student.rollNumber}</span>
              </div>
            </div>

            <button
              onClick={handlePrintIdCard}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" />
              Download & Print Physical Card
            </button>
          </div>

          {/* Quick Academic Standing */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Current Semester Standing
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Total Enrolled Credits</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">24 Credits</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Library Card Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold">Active (0 Overdues)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Hostel Allocation</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Aryabhatta Hall - Room 304</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 dark:text-slate-400">Disciplinary Standing</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Exemplary (Clean)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Edit Student Profile</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Update contact and guardian information</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select Profile Picture
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {sampleAvatars.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Avatar ${idx}`}
                      onClick={() => setFormData(prev => ({ ...prev, avatar: url }))}
                      className={`w-14 h-14 rounded-xl object-cover cursor-pointer transition-all border-2 ${
                        formData.avatar === url
                          ? 'border-blue-600 scale-105 ring-2 ring-blue-500/30'
                          : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="Or enter custom image URL"
                  className="mt-2 w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                      formErrors.fullName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.fullName && <p className="text-xs text-rose-500 mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                      formErrors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.email && <p className="text-xs text-rose-500 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                      formErrors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.phone && <p className="text-xs text-rose-500 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                      formErrors.dateOfBirth ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Residential Address *
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                      formErrors.address ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.address && <p className="text-xs text-rose-500 mt-1">{formErrors.address}</p>}
                </div>
              </div>

              {/* Guardian Info */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Guardian Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Guardian Full Name *
                    </label>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleInputChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      name="guardianRelation"
                      value={formData.guardianRelation}
                      onChange={handleInputChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Guardian Phone Number *
                    </label>
                    <input
                      type="text"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleInputChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Guardian Email
                    </label>
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleInputChange}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-0.5"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
