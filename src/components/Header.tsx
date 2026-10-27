"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Layers,
  Clock,
  Radio,
  CheckCircle2,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isLiveSimulating: boolean;
  onToggleLiveSimulation: () => void;
}

export function Header({
  isLiveSimulating,
  onToggleLiveSimulation,
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
            <Activity className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-white tracking-tight">
              PulseMetrics
            </h1>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-medium text-zinc-400">Analytics Overview</span>
          </div>

          {/* Environment Tag */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Production
          </span>
        </div>

        {/* Controls & Live Ticker */}
        <div className="flex items-center gap-3">
          {/* Live Status indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-[11px]">All Systems Operational</span>
          </div>

          {/* Current Local Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{currentTime || "12:00:00"}</span>
          </div>

          {/* Live Simulation Toggle */}
          <button
            onClick={onToggleLiveSimulation}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
              isLiveSimulating
                ? "bg-zinc-800 text-white border-zinc-700"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
            )}
          >
            <Radio
              className={cn(
                "w-3 h-3",
                isLiveSimulating ? "text-indigo-400 animate-pulse" : "text-zinc-600"
              )}
            />
            <span>{isLiveSimulating ? "Live Updates: On" : "Simulation Paused"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
