import React from "react";
import { cn } from "@/lib/utils";
import { AssetStatus, ScanType, DetectionType } from "@/types";
import { QrCode, Barcode, CheckCircle2, Clock, AlertTriangle, ShieldAlert } from "lucide-react";

interface StatusBadgeProps {
  status: AssetStatus;
  className?: string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, className, size = "md" }: StatusBadgeProps) {
  const isSm = size === "sm";

  switch (status) {
    case "Delivered":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-200",
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
            isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs tracking-wide",
            className
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
          </span>
          <CheckCircle2 className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
          <span>Delivered</span>
        </span>
      );

    case "In Transit":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-200",
            "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
            isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs tracking-wide",
            className
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
          </span>
          <Clock className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
          <span>In Transit</span>
        </span>
      );

    case "Flagged":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-200",
            "bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-[0_0_14px_rgba(244,63,94,0.25)]",
            isSm ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs tracking-wide",
            className
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-400"></span>
          </span>
          <AlertTriangle className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
          <span>Flagged</span>
        </span>
      );

    default:
      return null;
  }
}

export function ScanTypeBadge({ type, className }: { type: ScanType; className?: string }) {
  if (type === "QR") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold tracking-wider",
          "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
          className
        )}
      >
        <QrCode className="w-3 h-3 text-indigo-400" />
        QR-2D
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold tracking-wider",
        "bg-purple-500/15 text-purple-300 border border-purple-500/30",
        className
      )}
    >
      <Barcode className="w-3 h-3 text-purple-400" />
      1D-BAR
    </span>
  );
}

export function DetectionTypeBadge({
  type,
  className,
}: {
  type: DetectionType;
  className?: string;
}) {
  const isAnomaly =
    type === "Anomaly" ||
    type === "Damaged Barcode" ||
    type === "Unauthorized Movement" ||
    type === "Thermal Variance" ||
    type === "Label Tampering";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border",
        isAnomaly
          ? "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.15)]"
          : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
        className
      )}
    >
      {isAnomaly && <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />}
      <span>{type}</span>
    </span>
  );
}

export function SeverityBadge({
  severity,
  className,
}: {
  severity: "low" | "medium" | "high" | "critical";
  className?: string;
}) {
  const styles = {
    low: "bg-slate-800 text-slate-300 border-slate-700",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    high: "bg-orange-500/15 text-orange-400 border-orange-500/40",
    critical: "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]",
  };

  return (
    <span
      className={cn(
        "uppercase tracking-wider text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border",
        styles[severity],
        className
      )}
    >
      {severity}
    </span>
  );
}
