import React, { useState } from 'react';
import {
  Settings,
  Palette,
  Bell,
  Shield,
  Sliders,
  Database,
  RefreshCw,
  Download,
  CheckCircle,
  AlertTriangle,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Sun,
  Moon
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useTheme, THEME_PRESETS } from '../../context/ThemeContext';

export const SettingsView = ({ onOpenLogout }) => {
  const {
    student,
    attendanceThreshold,
    setAttendanceThreshold,
    resetToDefaultData
  } = useStudent();

  const { themeMode, toggleThemeMode, themePreset, setThemePreset } = useTheme();

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    examDeadlines: true,
    attendanceWarning: true,
    feePaymentReminders: true,
    timetableChanges: true,
  });

  // Password change simulation
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordToast, setPasswordToast] = useState(null);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleNotif = (key) => {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleThresholdChange = (e) => {
    setAttendanceThreshold(Number(e.target.value));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 8) {
      setPasswordToast({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordToast({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setPasswordToast({ type: 'success', message: 'Portal password updated successfully!' });
    setTimeout(() => {
      setPasswordToast(null);
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 2000);
  };

  const handleExportBackup = () => {
    const dataToExport = {
      exportDate: new Date().toISOString(),
      student,
      attendanceThreshold,
      portalSettings: notifSettings
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Student_Portal_Backup_${student.rollNumber}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setResetConfirmOpen(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Student Portal & System Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize dashboard preferences, notification channels, security policies, and minimum attendance thresholds.
        </p>
      </div>

      {/* Grid of Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Theme & Visual Appearance */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-500" />
            Theme & Appearance
          </h2>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">Dark / Light Mode</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Current mode: {themeMode === 'dark' ? 'University Dark Navy' : 'Academic Light Mode'}</span>
            </div>
            <button
              onClick={toggleThemeMode}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-medium text-xs text-slate-800 dark:text-slate-100 transition-colors"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-600" /> Dark Mode
                </>
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Color Palette Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(THEME_PRESETS).map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setThemePreset(preset.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    themePreset.id === preset.id
                      ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {preset.swatch.map((color, i) => (
                      <span key={i} className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Academic & Attendance Threshold */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-500" />
            Attendance Threshold & Policy
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Minimum Attendance Warning Threshold
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-black text-sm">
                {attendanceThreshold}%
              </span>
            </div>

            <input
              type="range"
              min="65"
              max="90"
              step="1"
              value={attendanceThreshold}
              onChange={handleThresholdChange}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span>65% (Lenient)</span>
              <span>75% (UGC Standard)</span>
              <span>90% (Strict Honor)</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
              When any subject attendance drops below <strong className="text-rose-500">{attendanceThreshold}%</strong>, the portal triggers visual shortage badges and restricts hall ticket generation.
            </p>
          </div>
        </div>

        {/* Card 3: Notification Alerts */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            Notification Channels & Triggers
          </h2>

          <div className="space-y-3 text-sm">
            {[
              { key: 'attendanceWarning', label: 'Low Attendance Warnings (< 75%)', desc: 'Instant warning badge & dashboard banner' },
              { key: 'examDeadlines', label: 'Examination Schedule Updates', desc: 'Reminders for date sheets & admit card release' },
              { key: 'timetableChanges', label: 'Timetable Room & Slot Swaps', desc: 'Real-time alert when a professor reschedules a class' },
              { key: 'feePaymentReminders', label: 'Semester Fee Due Date Alerts', desc: 'Reminders 7 days prior to penalty date' },
              { key: 'emailAlerts', label: 'Digest to Institutional Email', desc: `Forward alerts to ${student.email}` },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div>
                  <span className="font-medium text-slate-800 dark:text-slate-200 block text-xs">{item.label}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifSettings[item.key]}
                  onChange={() => handleToggleNotif(item.key)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Security & Credentials */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-500" />
            Account Security & Access
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">Portal Access Password</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Last changed: 35 days ago</span>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
            >
              Update Password
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">Two-Factor Authentication (2FA)</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Requires OTP via Registered Mobile</span>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-colors ${
                twoFactorEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 pt-1">
            <div className="flex justify-between">
              <span>Current Session IP:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">192.168.1.104 (Campus LAN)</span>
            </div>
            <div className="flex justify-between">
              <span>Portal Encryption:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">TLS 1.3 / AES-256</span>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone & Data Reset */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-rose-200 dark:border-rose-950 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Portal LocalStorage Data Management
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export a full JSON backup of your student profile or reset all simulated records to factory demo data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Backup
          </button>
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Update Portal Password</h3>
            <p className="text-xs text-slate-500 mb-4">Ensure your new password contains uppercase, lowercase, and numbers.</p>

            {passwordToast && (
              <div className={`p-3 rounded-xl mb-4 text-xs font-medium ${
                passwordToast.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {passwordToast.message}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 shadow-2xl">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Reset to Factory Demo Data?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              This will clear any local modifications made to attendance, assignments, fee receipts, or personal calendar entries and reload the pristine autonomous demo dataset.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
