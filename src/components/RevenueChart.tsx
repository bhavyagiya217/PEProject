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
} from "recharts";
import { RevenueDataPoint } from "@/types";
import { TrendingUp, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface RevenueChartProps {
  data: RevenueDataPoint[];
  timeRange: "7d" | "30d";
  onTimeRangeChange: (range: "7d" | "30d") => void;
}

export function RevenueChart({
  data,
  timeRange,
  onTimeRangeChange,
}: RevenueChartProps) {
  const [mounted, setMounted] = useState(false);
  const [metric, setMetric] = useState<"revenue" | "users">("revenue");

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPeriodRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgDailyRevenue = Math.round(totalPeriodRevenue / data.length);
  const maxUsers = Math.max(...data.map((d) => d.activeUsers));

  return (
    <div className="flex flex-col h-full rounded-xl bg-zinc-900/50 border border-zinc-800 p-5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Revenue & Growth Overview</h3>
          <p className="text-xs text-zinc-400">
            Track daily gross recurring revenue and active customer engagement
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Metric Selector */}
          <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setMetric("revenue")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                metric === "revenue"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetric("users")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                metric === "users"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Active Users
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => onTimeRangeChange("7d")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                timeRange === "7d"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              7D
            </button>
            <button
              onClick={() => onTimeRangeChange("30d")}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                timeRange === "30d"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              30D
            </button>
          </div>
        </div>
      </div>

      {/* Metric highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-xs">
        <div>
          <span className="text-zinc-500 block">Total Volume</span>
          <span className="text-white font-semibold text-sm">
            ${totalPeriodRevenue.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-zinc-500 block">Daily Average</span>
          <span className="text-white font-semibold text-sm">
            ${avgDailyRevenue.toLocaleString()}/day
          </span>
        </div>
        <div className="hidden sm:block">
          <span className="text-zinc-500 block">Peak Active Users</span>
          <span className="text-white font-semibold text-sm">
            {maxUsers.toLocaleString()} users
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-[280px]">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.05)"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#52525b"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                axisLine={{ stroke: "#27272a" }}
                tickLine={false}
              />
              <YAxis
                stroke="#52525b"
                tick={{ fill: "#a1a1aa", fontSize: 11 }}
                axisLine={{ stroke: "#27272a" }}
                tickLine={false}
                tickFormatter={(val) =>
                  metric === "revenue"
                    ? `$${(val / 1000).toFixed(0)}k`
                    : `${(val / 1000).toFixed(0)}k`
                }
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0];
                    return (
                      <div className="rounded-lg bg-zinc-900 p-3 shadow-xl border border-zinc-800 text-xs font-sans">
                        <p className="text-zinc-400 font-medium mb-1">{label}</p>
                        <p className="text-white font-semibold flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>
                            {item.name}:{" "}
                            {item.dataKey === "revenue"
                              ? `$${Number(item.value).toLocaleString()}`
                              : `${Number(item.value).toLocaleString()} users`}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {metric === "revenue" ? (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Gross Revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#indigoGradient)"
                />
              ) : (
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Active Users"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#blueGradient)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500 text-xs">
            Loading chart...
          </div>
        )}
      </div>
    </div>
  );
}
