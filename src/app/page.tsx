"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroMetrics } from "@/components/HeroMetrics";
import { VisionFeed } from "@/components/VisionFeed";
import { ScanVelocityChart } from "@/components/ScanVelocityChart";
import { AssetLedger } from "@/components/AssetLedger";
import { AssetDetailModal } from "@/components/AssetDetailModal";
import {
  initialAssetScans,
  initialVisionLogs,
  initialSystemMetrics,
  generateMockScanPayload,
  generateMockVisionPayload,
} from "@/data/mockData";
import { AssetScan, VisionLog, SystemMetricPoint } from "@/types";
import { Zap, Radio, Bell, ArrowUpRight } from "lucide-react";

export default function CommandCenterPage() {
  const [assetScans, setAssetScans] = useState<AssetScan[]>(initialAssetScans);
  const [visionLogs, setVisionLogs] = useState<VisionLog[]>(initialVisionLogs);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetricPoint[]>(initialSystemMetrics);
  const [selectedAsset, setSelectedAsset] = useState<AssetScan | null>(null);
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [lastLiveEvent, setLastLiveEvent] = useState<{ id: string; name: string; type: string } | null>(null);
  const scanCounterRef = useRef<number>(184320);

  // Hero calculated metrics
  const totalScansCount = scanCounterRef.current;
  const anomaliesCount =
    assetScans.filter((s) => s.status === "Flagged").length +
    visionLogs.filter(
      (l) =>
        l.detectionType === "Anomaly" ||
        l.detectionType === "Damaged Barcode" ||
        l.detectionType === "Thermal Variance"
    ).length;

  /**
   * Pushes a new fake QR or barcode payload into application state
   * and updates both the AssetLedger and ScanVelocityChart dynamically.
   */
  const pushNewScanPayload = useCallback(() => {
    const newScan = generateMockScanPayload();

    // 1. Prepend to Asset Ledger
    setAssetScans((prev) => [newScan, ...prev.slice(0, 99)]);
    scanCounterRef.current += Math.floor(Math.random() * 8 + 3);

    // 2. Dynamically update ScanVelocityChart time-series
    setSystemMetrics((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      const currentPoint = updated[lastIndex];

      const scanIncrement = Math.floor(Math.random() * 45 + 25);
      const isQr = newScan.scanType === "QR";

      updated[lastIndex] = {
        ...currentPoint,
        scanVolume: currentPoint.scanVolume + scanIncrement,
        qrScans: isQr ? currentPoint.qrScans + scanIncrement : currentPoint.qrScans,
        barcodeScans: !isQr ? currentPoint.barcodeScans + scanIncrement : currentPoint.barcodeScans,
        activeTrackers: currentPoint.activeTrackers + (Math.random() > 0.5 ? 1 : 0),
        anomalyRate: newScan.status === "Flagged" ? currentPoint.anomalyRate + 1 : currentPoint.anomalyRate,
      };

      return updated;
    });

    // 3. Occasionally generate a matched AI camera vision event for this asset
    if (Math.random() > 0.3) {
      const newVisionLog = generateMockVisionPayload(newScan, newScan.status === "Flagged");
      setVisionLogs((prev) => [newVisionLog, ...prev.slice(0, 49)]);
    }

    // 4. Update the live visual pulse badge
    setLastLiveEvent({
      id: newScan.id,
      name: newScan.assetName,
      type: newScan.scanType,
    });
  }, []);

  /**
   * Simulation Interval Hook:
   * Triggers every 3.5 seconds when isLiveSimulating is enabled.
   */
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      pushNewScanPayload();
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveSimulating, pushNewScanPayload]);

  // Asset selection by ID lookup
  const handleSelectAssetById = (assetId: string) => {
    const found = assetScans.find((a) => a.id === assetId);
    if (found) {
      setSelectedAsset(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left cyan nebula glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        {/* Top-right purple nebula glow */}
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        {/* Center-bottom emerald nebula glow */}
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Top Header Command Bar */}
      <Header
        isLiveSimulating={isLiveSimulating}
        onToggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
        edgeNodesOnline={42}
        totalEdgeNodes={42}
      />

      {/* Live Stream Telemetry Banner */}
      <div className="relative z-20 border-b border-white/5 bg-slate-900/40 backdrop-blur-sm px-4 sm:px-6 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              REAL-TIME SIMULATION ENGINE:
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Pushing continuous QR/Barcode 2D optical payloads every 3.5s
            </span>
          </div>

          <div className="flex items-center gap-3">
            {lastLiveEvent && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={lastLiveEvent.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px]"
                >
                  <Zap className="h-3 w-3 text-cyan-400 animate-bounce" />
                  <span>JUST INGESTED:</span>
                  <span className="font-bold text-white">{lastLiveEvent.id}</span>
                  <span className="text-slate-400 hidden md:inline">({lastLiveEvent.type})</span>
                </motion.div>
              </AnimatePresence>
            )}

            <button
              onClick={pushNewScanPayload}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/25 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              <span>+ Force Next Scan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Command Center Bento Grid */}
      <main className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Bento Row 1: Top Hero Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <HeroMetrics
            metrics={systemMetrics}
            totalActiveAssets={14892 + (assetScans.length - initialAssetScans.length)}
            totalScansToday={totalScansCount}
            anomaliesDetected={anomaliesCount}
            systemUptime="99.94%"
            apiLatency={18}
          />
        </motion.section>

        {/* Bento Row 2: Center Dual Widgets (Vision Feed + Scan Velocity Chart) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Center Left: Simulated Live AI Camera Feed Widget (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col"
          >
            <VisionFeed
              logs={visionLogs}
              onTriggerAnomaly={() => {
                const flagged = generateMockVisionPayload(undefined, true);
                setVisionLogs((prev) => [flagged, ...prev.slice(0, 49)]);
              }}
              onSimulateDetection={() => {
                const matched = generateMockVisionPayload(assetScans[0], false);
                setVisionLogs((prev) => [matched, ...prev.slice(0, 49)]);
              }}
              onSelectAsset={handleSelectAssetById}
            />
          </motion.div>

          {/* Center Right: Scan Velocity Chart (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col"
          >
            <ScanVelocityChart data={systemMetrics} />
          </motion.div>
        </section>

        {/* Bento Row 3: Bottom Full-Width (Asset Ledger) */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <AssetLedger
            scans={assetScans}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
            onRefresh={() => setAssetScans([...initialAssetScans])}
            onAddNewScan={pushNewScanPayload}
          />
        </motion.section>
      </main>

      {/* Footer System Telemetry Status Bar */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/70 py-4 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>OMNITRACE ENTERPRISE SYSTEM CORE • SHA-256 VERIFIED IMMUTABLE LOGS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>WEBHOOK: /api/ingest</span>
            <span>TLS 1.3 SECURE ENDPOINT</span>
            <span>NEXT.js 15 APP ROUTER</span>
          </div>
        </div>
      </footer>

      {/* Telemetry Quick-Inspect Modal */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </div>
  );
}
