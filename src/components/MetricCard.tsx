"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/ui/Sparkline";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changePositive: boolean;
  subtext: string;
  sparklineData: number[];
  color: "cyan" | "emerald" | "purple" | "amber" | "rose";
  icon: LucideIcon;
  badgeText?: string;
}

const colorTheme = {
  cyan: {
    accentText: "text-cyan-400",
    borderHover: "hover:border-cyan-500/40",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    glowBg: "from-cyan-500/10 to-transparent",
    badge: "text-cyan-300 bg-cyan-950/60 border-cyan-800/60",
  },
  emerald: {
    accentText: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    glowBg: "from-emerald-500/10 to-transparent",
    badge: "text-emerald-300 bg-emerald-950/60 border-emerald-800/60",
  },
  purple: {
    accentText: "text-purple-400",
    borderHover: "hover:border-purple-500/40",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    glowBg: "from-purple-500/10 to-transparent",
    badge: "text-purple-300 bg-purple-950/60 border-purple-800/60",
  },
  amber: {
    accentText: "text-amber-400",
    borderHover: "hover:border-amber-500/40",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    glowBg: "from-amber-500/10 to-transparent",
    badge: "text-amber-300 bg-amber-950/60 border-amber-800/60",
  },
  rose: {
    accentText: "text-rose-400",
    borderHover: "hover:border-rose-500/40",
    iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/25",
    glowBg: "from-rose-500/10 to-transparent",
    badge: "text-rose-300 bg-rose-950/60 border-rose-800/60",
  },
};

export function MetricCard({
  title,
  value,
  change,
  changePositive,
  subtext,
  sparklineData,
  color,
  icon: Icon,
  badgeText,
}: MetricCardProps) {
  const theme = colorTheme[color];

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl p-5",
        "bg-white/[0.04] backdrop-blur-md border border-white/10",
        "shadow-[0_8px_30px_rgb(0,0,0,0.35)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
        theme.borderHover,
        "group"
      )}
    >
      {/* Top ambient radial gradient */}
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90",
          theme.glowBg
        )}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-sm transition-transform duration-300 group-hover:scale-110",
              theme.iconBg
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {title}
            </p>
            {badgeText && (
              <span
                className={cn(
                  "mt-0.5 inline-block rounded-full border px-2 py-0.2 text-[10px] font-mono",
                  theme.badge
                )}
              >
                {badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Change indicator */}
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md border",
            changePositive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
              : "bg-rose-500/10 text-rose-400 border-rose-500/25"
          )}
        >
          {changePositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{change}</span>
        </div>
      </div>

      {/* Metric Main Value */}
      <div className="relative z-10 mt-4 mb-2">
        <div className="text-3xl font-extrabold tracking-tight text-white font-mono flex items-baseline gap-2">
          <span>{value}</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
          <span>{subtext}</span>
        </p>
      </div>

      {/* Embedded Sparkline in Card Base */}
      <div className="relative -mx-5 -mb-5 mt-3 pt-1">
        <Sparkline data={sparklineData} color={color} height={46} strokeWidth={2.2} />
      </div>
    </div>
  );
}
