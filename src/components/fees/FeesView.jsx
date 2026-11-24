import React, { useState } from 'react';
import { CreditCard, Printer, CheckCircle2, X } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const FeesView = () => {
  const { student, fees, payFee } = useStudent();
  const [payModal, setPayModal] = useState(false);
  const [amount, setAmount] = useState(fees?.remainingBalance || 15000);

  const handlePay = (e) => {
    e.preventDefault();
    payFee(amount, 'UPI / Online Banking');
    setPayModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-6 rounded-3xl portal-card border border-indigo-500/20 bg-gradient-to-r from-navy-900 via-indigo-950/60 to-purple-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Tuition & College Fee Details</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Payment installments, receipts, and outstanding dues.</p>
        </div>
        {(fees?.remainingBalance || 0) > 0 && (
          <button onClick={() => setPayModal(true)} className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-500 text-white">
            Pay Outstanding Balance
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl portal-card border border-slate-800">
          <span className="text-xs text-slate-400">Total Annual Fee</span>
          <div className="text-2xl font-black text-white mt-1">₹{(fees?.totalAnnualFee || 0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-2xl portal-card border border-emerald-500/20">
          <span className="text-xs text-slate-400">Amount Paid</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{(fees?.amountPaid || 0).toLocaleString()}</div>
        </div>
        <div className="p-4 rounded-2xl portal-card border border-amber-500/20">
          <span className="text-xs text-slate-400">Remaining Due</span>
          <div className="text-2xl font-black text-amber-400 mt-1">₹{(fees?.remainingBalance || 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="p-6 rounded-3xl portal-card border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white mb-2">Payment Receipts</h3>
        {(fees?.transactions || []).map((t) => (
          <div key={t.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono text-cyan-400 font-bold block">{t.receiptId}</span>
              <span className="font-semibold text-white">{t.description}</span>
              <span className="text-slate-400 block text-[11px]">{t.date} • {t.paymentMethod}</span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-emerald-400 font-mono block">₹{t.amount.toLocaleString()}</span>
              <span className="text-slate-400 text-[10px]">Verified Settled</span>
            </div>
          </div>
        ))}
      </div>

      {payModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl portal-card border border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Simulated Fee Payment</h3>
              <button onClick={() => setPayModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handlePay} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Payment Amount (INR):</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono font-bold" />
              </div>
              <p className="text-[10px] text-slate-400">Demo Disclaimer: Simulated demo payment only.</p>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setPayModal(false)} className="px-3 py-1.5 text-slate-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white font-bold rounded-xl">Confirm Simulation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
