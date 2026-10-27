"use client";

import React from "react";
import { Sparkline } from "@/components/ui/Sparkline";
import {
  DollarSign,
  Users,
  ShoppingBag,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleKPICardProps {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  subtext: string;
  sparklineData: number[];
  color: "indigo" | "blue" | "emerald" | "amber";
  icon: LucideIcon;
}

function SingleKPICard({
  title,
  value,
  change,
  changePositive,
  subtext,
  sparklineData,
  color,
  icon: Icon,
}: SingleKPICardProps) {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800 p-5 hover:border-zinc-700 transition-all duration-200">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800/70 border border-zinc-700/50 text-zinc-300">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400">{title}</p>
          </div>
        </div>

        {/* Change indicator */}
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md",
            changePositive
              ? "text-emerald-400 bg-emerald-500/10"
              : "text-rose-400 bg-rose-500/10"
          )}
        >
          {changePositive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          <span>{change}</span>
        </div>
      </div>

      {/* Main Value */}
      <div className="mt-4 mb-2">
        <div className="text-2xl font-bold tracking-tight text-white font-sans">
          {value}
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">{subtext}</p>
      </div>

      {/* Sparkline */}
      <div className="relative -mx-5 -mb-5 mt-2">
        <Sparkline data={sparklineData} color={color} height={38} strokeWidth={1.8} />
      </div>
    </div>
  );
}

interface KPICardsProps {
  totalRevenue?: number;
  activeUsers?: number;
  totalOrders?: number;
  serverUptime?: string;
  revenueSpark?: number[];
  usersSpark?: number[];
  ordersSpark?: number[];
}

export function KPICards({
  totalRevenue = 57390,
  activeUsers = 16840,
  totalOrders = 725,
  serverUptime = "99.98%",
  revenueSpark = [5420, 6890, 6150, 7940, 8850, 10420, 11620],
  usersSpark = [11200, 12450, 11800, 13200, 14100, 15600, 16840],
  ordersSpark = [68, 84, 76, 98, 112, 134, 149],
}: KPICardsProps) {
  const uptimeSpark = [99.95, 99.97, 99.99, 99.96, 99.98, 99.99, 99.98];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SingleKPICard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        change="+14.2%"
        changePositive={true}
        subtext="vs. previous 7 days"
        sparklineData={revenueSpark}
        color="indigo"
        icon={DollarSign}
      />

      <SingleKPICard
        title="Active Users"
        value={activeUsers.toLocaleString()}
        change="+9.5%"
        changePositive={true}
        subtext="1,240 currently online"
        sparklineData={usersSpark}
        color="blue"
        icon={Users}
      />

      <SingleKPICard
        title="Total Orders"
        value={totalOrders.toLocaleString()}
        change="+12.1%"
        changePositive={true}
        subtext="Avg. order value $79.15"
        sparklineData={ordersSpark}
        color="emerald"
        icon={ShoppingBag}
      />

      <SingleKPICard
        title="Server Health"
        value={serverUptime}
        change="22ms"
        changePositive={true}
        subtext="Global edge API status"
        sparklineData={uptimeSpark}
        color="amber"
        icon={Activity}
      />
    </div>
  );
}
