"use client";

import React from "react";
import { MetricCard } from "./MetricCard";
import { Box, ScanLine, AlertOctagon, Activity } from "lucide-react";
import { SystemMetricPoint } from "@/types";

interface HeroMetricsProps {
  metrics: SystemMetricPoint[];
  totalActiveAssets?: number;
  totalScansToday?: number;
  anomaliesDetected?: number;
  systemUptime?: string;
  apiLatency?: number;
}

export function HeroMetrics({
  metrics,
  totalActiveAssets = 14892,
  totalScansToday = 184320,
  anomaliesDetected = 23,
  systemUptime = "99.94%",
  apiLatency = 18,
}: HeroMetricsProps) {
  // Sparkline data extractions
  const activeTrackersSpark = metrics.map((m) => m.activeTrackers);
  const scanVolumeSpark = metrics.map((m) => m.scanVolume);
  const anomaliesSpark = metrics.map((m) => m.anomalyRate * 3 + Math.floor(m.scanVolume / 3000));
  const latencySpark = metrics.map((m) => m.apiLatency);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Active Assets */}
      <MetricCard
        title="Total Active Assets"
        value={totalActiveAssets.toLocaleString()}
        change="+8.4%"
        changePositive={true}
        subtext="Tracking across 38 global hubs"
        sparklineData={activeTrackersSpark}
        color="cyan"
        icon={Box}
        badgeText="GPS + RFID"
      />

      {/* 2. Today's Scans */}
      <MetricCard
        title="Today's Scans"
        value={totalScansToday.toLocaleString()}
        change="+14.2%"
        changePositive={true}
        subtext="62% QR • 38% Barcode 1D"
        sparklineData={scanVolumeSpark}
        color="emerald"
        icon={ScanLine}
        badgeText="High Velocity"
      />

      {/* 3. AI Vision Anomalies */}
      <MetricCard
        title="Vision Anomalies"
        value={anomaliesDetected}
        change="-5.3%"
        changePositive={true} // fewer anomalies is positive
        subtext="4 require immediate manual review"
        sparklineData={anomaliesSpark}
        color="rose"
        icon={AlertOctagon}
        badgeText="AI Neural Scan"
      />

      {/* 4. System Health */}
      <MetricCard
        title="System Health"
        value={systemUptime}
        change={`${apiLatency}ms`}
        changePositive={true}
        subtext="42/42 Edge Nodes synchronized"
        sparklineData={latencySpark}
        color="purple"
        icon={Activity}
        badgeText="Nominal"
      />
    </div>
  );
}
