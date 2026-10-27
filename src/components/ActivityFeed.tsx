"use client";

import React, { useState } from "react";
import { ActivityItem, ActivityType } from "@/types";
import {
  UserPlus,
  CreditCard,
  ArrowUpRight,
  ShoppingCart,
  Key,
  AlertCircle,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  activities: ActivityItem[];
  onSimulateActivity?: () => void;
}

export function ActivityFeed({ activities, onSimulateActivity }: ActivityFeedProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredActivities = activities.filter((act) => {
    if (filter === "signups") return act.type === "signup";
    if (filter === "payments") return act.type === "checkout" || act.type === "upgrade";
    if (filter === "alerts") return act.type === "abandoned" || act.type === "refund";
    return true;
  });

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case "signup":
        return <UserPlus className="h-3.5 w-3.5 text-blue-400" />;
      case "checkout":
        return <CreditCard className="h-3.5 w-3.5 text-emerald-400" />;
      case "upgrade":
        return <ArrowUpRight className="h-3.5 w-3.5 text-indigo-400" />;
      case "abandoned":
        return <ShoppingCart className="h-3.5 w-3.5 text-amber-400" />;
      case "api_key":
        return <Key className="h-3.5 w-3.5 text-zinc-400" />;
      case "refund":
        return <AlertCircle className="h-3.5 w-3.5 text-rose-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-zinc-900/50 border border-zinc-800 p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Live Activity Feed</h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs text-zinc-400">Real-time user actions and lifecycle events</p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              filter === "all" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("payments")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              filter === "payments" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
            )}
          >
            Orders
          </button>
          <button
            onClick={() => setFilter("signups")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              filter === "signups" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
            )}
          >
            Users
          </button>
        </div>
      </div>

      {/* Clean Activity List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[380px] pr-1">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="flex items-start justify-between gap-3 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800/80 border border-zinc-700/60 shrink-0 mt-0.5">
                {getIcon(act.type)}
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-200">
                  <span className="text-white font-semibold">{act.user}</span>{" "}
                  <span className="text-zinc-400 font-normal">{act.description}</span>
                </p>
                {act.email && (
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{act.email}</p>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] text-zinc-500 block">{act.timestamp}</span>
              {act.amount && (
                <span className="text-xs font-semibold text-emerald-400 block mt-0.5">
                  +${act.amount}
                </span>
              )}
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="py-8 text-center text-xs text-zinc-500">
            No events match the selected filter.
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
        <span>Streaming live via WebSocket connection</span>
        <span className="text-zinc-400">{filteredActivities.length} events logged</span>
      </div>
    </div>
  );
}
