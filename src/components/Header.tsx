"use client";

import React, { useState, useEffect } from "react";
import {
  Radar,
  Radio,
  Clock,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  Wifi,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isLiveSimulating: boolean;
  onToggleLiveSimulation: () => void;
  edgeNodesOnline?: number;
  totalEdgeNodes?: number;
}

export function Header({
  isLiveSimulating,
  onToggleLiveSimulation,
  edgeNodesOnline = 42,
  totalEdgeNodes = 42,
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentUtc, setCurrentUtc] = useState<string>("");

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setCurrentUtc(
        now.toUTCString().slice(17, 25) + " UTC"
      );
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Radar className="h-6 w-6 text-cyan-400 animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider text-white font-mono flex items-center gap-1.5">
                <span>OMNITRACE</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  COMMAND CENTER v4.2
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-sans hidden sm:block">
              Multi-Industry Physical Asset Tracking & AI Vision Optical Telemetry
            </p>
          </div>
        </div>

        {/* Live Status Indicators & Clocks */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Edge Node Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono">
            <Wifi className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-slate-400">EDGE MESH:</span>
            <span className="text-emerald-400 font-bold">
              {edgeNodesOnline}/{totalEdgeNodes} ONLINE
            </span>
          </div>

          {/* System Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold uppercase tracking-wider">ALL NODES NOMINAL</span>
          </div>

          {/* Real-time Clock */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-white font-bold">{currentTime || "10:24:00"}</span>
            <span className="text-slate-500 text-[10px]">({currentUtc || "UTC"})</span>
          </div>

          {/* Live Simulation Stream Toggle */}
          <button
            onClick={onToggleLiveSimulation}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all duration-300 shadow-lg",
              isLiveSimulating
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_16px_rgba(6,182,212,0.3)]"
                : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
            )}
          >
            <Radio
              className={cn(
                "h-3.5 w-3.5",
                isLiveSimulating ? "text-cyan-400 animate-pulse" : "text-slate-500"
              )}
            />
            <span>{isLiveSimulating ? "LIVE FEED ACTIVE" : "SIMULATION PAUSED"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
