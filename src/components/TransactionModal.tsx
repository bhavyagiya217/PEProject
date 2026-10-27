"use client";

import React from "react";
import { Transaction } from "@/types";
import {
  X,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Receipt,
  User,
  ShieldCheck,
} from "lucide-react";

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionModal({ transaction, onClose }: TransactionModalProps) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl text-white font-sans flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white font-mono">
                  {transaction.id}
                </h3>
                {transaction.status === "Success" && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Success
                  </span>
                )}
                {transaction.status === "Pending" && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Pending
                  </span>
                )}
                {transaction.status === "Failed" && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Failed
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">{transaction.customerName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs font-sans">
          {/* Amount Box */}
          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-zinc-500 block text-[11px]">Charge Amount</span>
              <span className="text-2xl font-bold text-white font-sans">
                ${transaction.amount.toFixed(2)} USD
              </span>
            </div>
            <div className="text-right">
              <span className="text-zinc-500 block text-[11px]">Payment Method</span>
              <span className="text-zinc-300 font-medium flex items-center gap-1.5 justify-end mt-0.5">
                <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                {transaction.paymentMethod}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <span className="text-zinc-500 block text-[11px] mb-1">Customer Email</span>
              <span className="text-zinc-200 truncate block font-mono text-[11px]">
                {transaction.customerEmail}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
              <span className="text-zinc-500 block text-[11px] mb-1">Security Status</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified via 3D Secure
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-950/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[11px] mb-1">Plan / Subscription Item</span>
            <span className="text-white font-medium">{transaction.item}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-500 text-[11px] pt-1">
            <span>Timestamp: {transaction.timestamp}</span>
            <span className="font-mono text-zinc-400">Processor Ref: tx_live_8910</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
