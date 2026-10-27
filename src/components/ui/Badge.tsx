import React from "react";
import { cn } from "@/lib/utils";
import { TransactionStatus, ActivityType } from "@/types";
import { CheckCircle2, Clock, XCircle, UserPlus, CreditCard, ArrowUpRight, ShoppingCart, Key, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: TransactionStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case "Success":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
            className
          )}
        >
          <CheckCircle2 className="w-3 h-3" />
          <span>Success</span>
        </span>
      );

    case "Pending":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20",
            className
          )}
        >
          <Clock className="w-3 h-3" />
          <span>Pending</span>
        </span>
      );

    case "Failed":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20",
            className
          )}
        >
          <XCircle className="w-3 h-3" />
          <span>Failed</span>
        </span>
      );

    default:
      return null;
  }
}
