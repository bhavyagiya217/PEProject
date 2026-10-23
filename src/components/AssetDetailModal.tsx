"use client";

import React from "react";
import { AssetScan } from "@/types";
import { StatusBadge, ScanTypeBadge } from "@/components/ui/Badge";
import {
  X,
  MapPin,
  Clock,
  User,
  Thermometer,
  Battery,
  AlertTriangle,
  QrCode,
  Barcode,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetDetailModalProps {
  asset: AssetScan | null;
  onClose: () => void;
}

export function AssetDetailModal({ asset, onClose }: AssetDetailModalProps) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={cn(
          "relative w-full max-w-2xl rounded-2xl overflow-hidden",
          "bg-slate-900/95 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]",
          "text-white font-sans flex flex-col max-h-[90vh]"
        )}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-mono text-cyan-300">{asset.id}</h3>
                <StatusBadge status={asset.status} size="sm" />
                <ScanTypeBadge type={asset.scanType} />
              </div>
              <p className="text-xs text-slate-400 font-sans">{asset.assetName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Anomaly banner if flagged */}
          {asset.status === "Flagged" && asset.anomalyReason && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200">
              <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  Anomaly Investigation Required
                </p>
                <p className="text-xs text-rose-200/90 mt-0.5 font-sans">
                  {asset.anomalyReason}
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Category</span>
              <span className="text-cyan-300 font-semibold">{asset.category}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Temperature</span>
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <Thermometer className="h-3 w-3 text-emerald-400" />
                {asset.temperature || "Ambient"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Tracker Battery</span>
              <span className="text-purple-300 font-semibold flex items-center gap-1">
                <Battery className="h-3 w-3 text-purple-400" />
                {asset.batteryLevel ? `${asset.batteryLevel}%` : "Hardwired"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="text-slate-400 text-[10px] uppercase block mb-1">Verification</span>
              <span className="text-cyan-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-cyan-400" />
                Valid CRC32
              </span>
            </div>
          </div>

          {/* Location & Custody */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>Location & Custody Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Location Hub:</span>
                <span className="text-white font-medium">{asset.location.hub}</span>
                <span className="text-slate-400 text-[11px] block">{asset.location.city}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Coordinates:</span>
                <span className="text-cyan-400 font-medium">
                  {asset.location.coordinates[0].toFixed(4)}°N, {asset.location.coordinates[1].toFixed(4)}°E
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Operator / Station:</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <User className="h-3 w-3 text-slate-400" />
                  {asset.operator}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Scan Timestamp:</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  {asset.timestamp}
                </span>
              </div>
            </div>
          </div>

          {/* Barcode / QR Payload Decoder Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                {asset.scanType === "QR" ? (
                  <QrCode className="h-3.5 w-3.5" />
                ) : (
                  <Barcode className="h-3.5 w-3.5" />
                )}
                <span>Decoded Optical Payload:</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">ISO/IEC 18004 COMPLIANT</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 select-all break-all">
              {asset.barcodeValue}
            </div>
          </div>

          {/* Custody Chain History */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Chain of Custody Events</span>
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-white/5">
                <span className="text-slate-300">1. Optical Gate Ingress Scan</span>
                <span className="text-emerald-400 font-bold">PASS [100%]</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-white/5">
                <span className="text-slate-300">2. AI Vision Dimension & Seal Check</span>
                <span className={asset.status === "Flagged" ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                  {asset.status === "Flagged" ? "FLAGGED" : "PASS [99.4%]"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-white/5">
                <span className="text-slate-300">3. Telemetry Sync (RFID/BLE)</span>
                <span className="text-cyan-400 font-bold">SYNCHRONIZED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-slate-950/60">
          <span className="text-[11px] text-slate-400 font-mono">
            OmniTrace Asset Registry ID: {asset.id}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
