import React, { useState } from 'react';
import { LogOut, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const LogoutModal = ({ isOpen, onClose }) => {
  const { student, resetToDefaultData } = useStudent();
  const [loggedOut, setLoggedOut] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedLogout = () => {
    setLoggedOut(true);
    setTimeout(() => {
      setLoggedOut(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl portal-card border border-slate-700 p-6 text-center">
        {loggedOut ? (
          <div className="py-6 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Session Ended</h3>
            <p className="text-xs text-slate-400">Securely logged out from Autonomous ERP.</p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center mb-3">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Logout from Portal?</h3>
            <p className="text-xs text-slate-400 mt-1">
              End session for <strong className="text-white">{student?.fullName || 'Student'}</strong> ({student?.rollNumber || 'ID'})?
            </p>
            <div className="mt-5 space-y-2">
              <button onClick={handleSimulatedLogout} className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white">
                Confirm Logout
              </button>
              <button onClick={() => { resetToDefaultData(); onClose(); }} className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300">
                Reset Demo Data
              </button>
              <button onClick={onClose} className="w-full py-1 text-xs text-slate-400 hover:text-white">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
