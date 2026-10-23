"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { SystemMetricPoint } from "@/types";
import { BarChart3, TrendingUp, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanVelocityChartProps {
  data: SystemMetricPoint[];
}

export function ScanVelocityChart({ data }: ScanVelocityChartProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"total" | "breakdown" | "latency">("total");
  const [timeRange, setTimeRange] = useState<"24h" | "12h" | "6h">("24h");

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayData = React.useMemo(() => {
    if (timeRange === "6h") return data.slice(-6);
    if (timeRange === "12h") return data.slice(-12);
    return data;
  }, [data, timeRange]);

  const peakVolume = Math.max(...displayData.map((d) => d.scanVolume));
  const avgVolume = Math.round(
    displayData.reduce((acc, curr) => acc + curr.scanVolume, 0) / displayData.length
  );

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-5">
      {/* Chart Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                SCAN VELOCITY & TELEMETRY
              </h3>
              <p className="text-[11px] text-slate-400">
                Multi-protocol optical throughput (QR 2D + Barcode 1D)
              </p>
            </div>
          </div>
        </div>

        {/* View Mode & Range Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Pill Selector */}
          <div className="flex bg-slate-900/80 p-0.5 rounded-lg border border-white/10 text-xs font-mono">
            <button
              onClick={() => setMode("total")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all",
                mode === "total"
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Volume Area
            </button>
            <button
              onClick={() => setMode("breakdown")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all",
                mode === "breakdown"
                  ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              QR vs Barcode
            </button>
            <button
              onClick={() => setMode("latency")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all",
                mode === "latency"
                  ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Latency Overlay
            </button>
          </div>

          {/* Time range pills */}
          <div className="flex bg-slate-900/80 p-0.5 rounded-lg border border-white/10 text-xs font-mono">
            {(["6h", "12h", "24h"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-2 py-1 rounded-md transition-all",
                  timeRange === range
                    ? "bg-white/15 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-slate-950/40 border border-white/5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Peak Velocity:</span>
          <span className="text-purple-300 font-bold">{peakVolume.toLocaleString()}/hr</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Avg Throughput:</span>
          <span className="text-emerald-400 font-bold">{avgVolume.toLocaleString()}/hr</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-slate-400">Target SLA:</span>
          <span className="text-cyan-400 font-bold">&gt; 12,000/hr (PASS)</span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="flex-1 w-full min-h-[300px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                {/* Deep Purple Gradient */}
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>

                {/* Emerald Green Gradient */}
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>

                {/* Cyan Neon Gradient */}
                <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />

              <XAxis
                dataKey="time"
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                tickLine={false}
                tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl bg-slate-900/95 p-3 shadow-2xl border border-white/20 backdrop-blur-xl font-mono text-xs min-w-[190px]">
                        <p className="text-white font-bold mb-2 pb-1 border-b border-white/10 flex items-center justify-between">
                          <span>TIME: {label}</span>
                          <span className="text-[10px] text-cyan-400">OmniTrace Telemetry</span>
                        </p>
                        {payload.map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className="flex items-center justify-between gap-4 py-0.5"
                          >
                            <span className="flex items-center gap-1.5 text-slate-300">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              {entry.name}:
                            </span>
                            <span className="font-bold text-white">
                              {Number(entry.value).toLocaleString()}{" "}
                              {entry.dataKey === "apiLatency" ? "ms" : "scans"}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {mode === "total" && (
                <>
                  <Area
                    type="monotone"
                    dataKey="scanVolume"
                    name="Scan Velocity"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#purpleGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="qrScans"
                    name="QR Protocol"
                    stroke="#10b981"
                    strokeWidth={1.8}
                    fillOpacity={1}
                    fill="url(#emeraldGradient)"
                  />
                </>
              )}

              {mode === "breakdown" && (
                <>
                  <Area
                    type="monotone"
                    dataKey="qrScans"
                    name="QR Code Scans"
                    stroke="#10b981"
                    strokeWidth={2.2}
                    fillOpacity={1}
                    fill="url(#emeraldGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="barcodeScans"
                    name="Barcode 1D Scans"
                    stroke="#8b5cf6"
                    strokeWidth={2.2}
                    fillOpacity={1}
                    fill="url(#purpleGradient)"
                  />
                </>
              )}

              {mode === "latency" && (
                <>
                  <Area
                    type="monotone"
                    dataKey="scanVolume"
                    name="Scan Volume"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fillOpacity={0.6}
                    fill="url(#purpleGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="apiLatency"
                    name="API Latency"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    fillOpacity={0.8}
                    fill="url(#cyanGradient)"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500 font-mono text-xs">
            Initializing chart engine...
          </div>
        )}
      </div>
    </div>
  );
}
