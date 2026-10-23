"use client";

import React, { useState, useEffect, useRef } from "react";
import { VisionLog } from "@/types";
import { camerasList } from "@/data/mockData";
import { DetectionTypeBadge, SeverityBadge } from "@/components/ui/Badge";
import {
  Video,
  Camera,
  Layers,
  Crosshair,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  Zap,
  Filter,
  CheckCircle,
  Eye,
  Scan,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisionFeedProps {
  logs: VisionLog[];
  onTriggerAnomaly?: () => void;
  onSimulateDetection?: () => void;
  onSelectAsset?: (assetId: string) => void;
}

export function VisionFeed({
  logs,
  onTriggerAnomaly,
  onSimulateDetection,
  onSelectAsset,
}: VisionFeedProps) {
  const [selectedCameraId, setSelectedCameraId] = useState<string>(camerasList[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [logFilter, setLogFilter] = useState<"all" | "anomalies" | "matches">("all");
  const [currentTimeMs, setCurrentTimeMs] = useState<string>("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  const selectedCamera =
    camerasList.find((c) => c.id === selectedCameraId) || camerasList[0];

  // Update millisecond HUD timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const ms = String(Math.floor(now.getMilliseconds())).padStart(3, "0");
      setCurrentTimeMs(`${h}:${m}:${s}.${ms}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (logFilter === "anomalies") {
      return (
        log.detectionType === "Anomaly" ||
        log.detectionType === "Damaged Barcode" ||
        log.detectionType === "Thermal Variance" ||
        log.detectionType === "Unauthorized Movement"
      );
    }
    if (logFilter === "matches") {
      return log.detectionType === "Bounding Box Match";
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-white/10 bg-slate-900/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Camera className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span>LIVE AI CAMERA VISION FEED</span>
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                    isPlaying ? "bg-emerald-400" : "bg-amber-400"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    isPlaying ? "bg-emerald-400" : "bg-amber-400"
                  )}
                />
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              EDGE NODE: {selectedCamera.id} • {selectedCamera.resolution} @ {selectedCamera.fps} FPS
            </p>
          </div>
        </div>

        {/* Camera Selector Dropdown & Actions */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCameraId}
            onChange={(e) => setSelectedCameraId(e.target.value)}
            className="bg-slate-900/90 text-xs font-mono text-cyan-300 border border-white/15 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            {camerasList.map((cam) => (
              <option key={cam.id} value={cam.id} className="bg-slate-900 text-slate-200">
                {cam.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Feed" : "Resume Feed"}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-lg border transition-colors",
              isPlaying
                ? "bg-slate-800 text-slate-300 border-white/10 hover:text-white"
                : "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
            )}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          {onTriggerAnomaly && (
            <button
              onClick={onTriggerAnomaly}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/40 hover:bg-rose-500/25 transition-all shadow-[0_0_12px_rgba(244,63,94,0.2)]"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              <span className="hidden sm:inline">Simulate Anomaly</span>
            </button>
          )}

          {onSimulateDetection && (
            <button
              onClick={onSimulateDetection}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/25 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            >
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Simulate Scan</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulated Live Camera Viewport (Center Top) */}
      <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden select-none border-b border-white/10">
        {/* Subtle high-tech perspective grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Radial ambient vignette */}
        <div className="absolute inset-0 bg-radial-vignette bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(2,6,23,0.85)_100%)]" />

        {/* Glowing Scanning Cyan Line moving top to bottom */}
        {isPlaying && (
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_#22d3ee,0_0_30px_#06b6d4] animate-scan-line z-20 opacity-80" />
        )}

        {/* Viewport Corner HUD Reticles */}
        <div className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400/80" />
        <div className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400/80" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400/80" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400/80" />

        {/* Center Crosshair Target */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
          <div className="relative w-20 h-20 border border-cyan-500/40 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            <div className="absolute top-0 w-0.5 h-3 bg-cyan-400/70" />
            <div className="absolute bottom-0 w-0.5 h-3 bg-cyan-400/70" />
            <div className="absolute left-0 h-0.5 w-3 bg-cyan-400/70" />
            <div className="absolute right-0 h-0.5 w-3 bg-cyan-400/70" />
          </div>
        </div>

        {/* Simulated Object Detection Bounding Box 1 */}
        <div
          className="absolute z-10 transition-all duration-700 pointer-events-auto"
          style={{
            top: "24%",
            left: "28%",
            width: "36%",
            height: "48%",
          }}
        >
          <div className="w-full h-full border-2 border-cyan-400/90 bg-cyan-500/5 rounded-sm relative shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            {/* Corner marks on bounding box */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-cyan-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-cyan-400" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-cyan-400" />

            {/* Tag label */}
            <div className="absolute -top-6 left-0 flex items-center gap-1.5 bg-cyan-950/90 border border-cyan-400/80 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-200 whitespace-nowrap shadow-lg">
              <Scan className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>AST-89201 | CONF: 98.7%</span>
            </div>

            {/* Bottom info pill */}
            <div className="absolute -bottom-5 right-0 bg-slate-900/90 border border-emerald-500/40 px-1.5 py-0.2 rounded text-[9px] font-mono text-emerald-400">
              SEAL: INTACT [PASS]
            </div>
          </div>
        </div>

        {/* Simulated Object Detection Bounding Box 2 (Anomaly / Sorter) */}
        <div
          className="absolute z-10 transition-all duration-700"
          style={{
            top: "38%",
            right: "10%",
            width: "22%",
            height: "38%",
          }}
        >
          <div className="w-full h-full border border-dashed border-amber-400/80 bg-amber-500/5 rounded-sm relative">
            <div className="absolute -top-5 left-0 bg-amber-950/90 border border-amber-400/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-amber-200 flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
              <span>FOV-ZONE-02</span>
            </div>
          </div>
        </div>

        {/* HUD Overlay Top-Left */}
        <div className="absolute top-3 left-4 z-20 flex flex-col gap-1 font-mono text-[10px] text-slate-300 drop-shadow">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-rose-400 font-bold bg-rose-950/70 border border-rose-500/40 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              REC ● LIVE
            </span>
            <span className="text-cyan-300 font-semibold">{currentTimeMs || "10:24:02.115"}</span>
          </div>
          <span className="text-slate-400 text-[10px]">LOC: {selectedCamera.name}</span>
        </div>

        {/* HUD Overlay Top-Right */}
        <div className="absolute top-3 right-4 z-20 flex flex-col items-end gap-1 font-mono text-[10px] text-cyan-300 drop-shadow">
          <div className="flex items-center gap-2 bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">
            <span>ZOOM: {selectedCamera.zoom}</span>
            <span className="text-slate-600">|</span>
            <span>LAT: 11ms</span>
          </div>
          <span className="text-[9px] text-emerald-400">ENGINE: YOLO-V8e-OPT</span>
        </div>

        {/* HUD Overlay Bottom */}
        <div className="absolute bottom-2 inset-x-4 z-20 flex items-center justify-between font-mono text-[10px] text-slate-400">
          <span className="text-cyan-400/90 bg-slate-900/70 px-2 py-0.5 rounded border border-cyan-500/20">
            RADAR: 43.629°N 1.363°E
          </span>
          <span className="bg-slate-900/70 px-2 py-0.5 rounded border border-white/10 text-slate-300">
            AUTO-TRACK: ACTIVE
          </span>
        </div>
      </div>

      {/* Rolling Text Log Underneath */}
      <div className="flex flex-col flex-1 p-3 bg-slate-950/60 min-h-[220px]">
        {/* Log Controls Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Real-Time Vision Stream Logs
            </span>
            <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded-full border border-cyan-500/30">
              {filteredLogs.length} events
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <button
              onClick={() => setLogFilter("all")}
              className={cn(
                "px-2 py-0.5 rounded transition-colors",
                logFilter === "all"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              All
            </button>
            <button
              onClick={() => setLogFilter("matches")}
              className={cn(
                "px-2 py-0.5 rounded transition-colors",
                logFilter === "matches"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Matches
            </button>
            <button
              onClick={() => setLogFilter("anomalies")}
              className={cn(
                "px-2 py-0.5 rounded transition-colors",
                logFilter === "anomalies"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Anomalies
            </button>
          </div>
        </div>

        {/* Scrollable Log Stream */}
        <div
          ref={logContainerRef}
          className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-56 scrollbar-thin scrollbar-thumb-white/10"
        >
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={cn(
                "p-2.5 rounded-xl border text-xs font-mono transition-all duration-200",
                "bg-slate-900/50 hover:bg-slate-800/60 border-white/5 hover:border-white/20",
                log.severity === "critical" && "border-rose-500/40 bg-rose-950/20",
                log.severity === "high" && "border-amber-500/30 bg-amber-950/15"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-cyan-400 font-bold">{log.time}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.2 rounded border border-white/5">
                    {log.cameraId}
                  </span>
                  <DetectionTypeBadge type={log.detectionType} />
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.2 rounded border",
                      log.confidenceScore >= 95
                        ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/30"
                        : "text-amber-400 bg-amber-950/40 border-amber-500/30"
                    )}
                  >
                    {log.confidenceScore}% conf
                  </span>
                  <SeverityBadge severity={log.severity} />
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed font-sans">{log.details}</p>

              {log.assetIdRef && (
                <div className="mt-1.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Target Asset Ref:</span>
                  <button
                    onClick={() => onSelectAsset && onSelectAsset(log.assetIdRef!)}
                    className="text-cyan-400 hover:text-cyan-300 hover:underline font-mono font-semibold"
                  >
                    {log.assetIdRef} ➔
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
