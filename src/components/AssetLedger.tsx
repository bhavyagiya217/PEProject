"use client";

import React, { useState, useMemo } from "react";
import { AssetScan, AssetStatus, ScanType } from "@/types";
import { StatusBadge, ScanTypeBadge } from "@/components/ui/Badge";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Database,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetLedgerProps {
  scans: AssetScan[];
  onSelectAsset: (asset: AssetScan) => void;
  onRefresh?: () => void;
  onAddNewScan?: () => void;
}

type SortField = "id" | "assetName" | "scanType" | "city" | "timestamp" | "status";
type SortOrder = "asc" | "desc";

export function AssetLedger({
  scans,
  onSelectAsset,
  onRefresh,
  onAddNewScan,
}: AssetLedgerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Handle sort header click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filtered and sorted data
  const processedScans = useMemo(() => {
    return scans
      .filter((scan) => {
        // Search term check
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          scan.id.toLowerCase().includes(term) ||
          scan.assetName.toLowerCase().includes(term) ||
          scan.location.city.toLowerCase().includes(term) ||
          scan.location.hub.toLowerCase().includes(term) ||
          scan.operator.toLowerCase().includes(term) ||
          scan.barcodeValue.toLowerCase().includes(term);

        if (!matchesSearch) return false;

        // Status check
        if (statusFilter !== "ALL" && scan.status !== statusFilter) return false;

        // Type check
        if (typeFilter !== "ALL" && scan.scanType !== typeFilter) return false;

        // Category check
        if (categoryFilter !== "ALL" && scan.category !== categoryFilter) return false;

        return true;
      })
      .sort((a, b) => {
        let valA: string | number = "";
        let valB: string | number = "";

        if (sortField === "id") {
          valA = a.id;
          valB = b.id;
        } else if (sortField === "assetName") {
          valA = a.assetName;
          valB = b.assetName;
        } else if (sortField === "scanType") {
          valA = a.scanType;
          valB = b.scanType;
        } else if (sortField === "city") {
          valA = a.location.city;
          valB = b.location.city;
        } else if (sortField === "timestamp") {
          valA = a.timestamp;
          valB = b.timestamp;
        } else if (sortField === "status") {
          valA = a.status;
          valB = b.status;
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [scans, searchTerm, statusFilter, typeFilter, categoryFilter, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(processedScans.length / itemsPerPage) || 1;
  const paginatedScans = processedScans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = ["Asset ID", "Asset Name", "Category", "Scan Type", "City", "Hub", "Timestamp", "Status", "Operator", "Barcode Payload"];
    const rows = processedScans.map((s) => [
      s.id,
      `"${s.assetName}"`,
      `"${s.category}"`,
      s.scanType,
      `"${s.location.city}"`,
      `"${s.location.hub}"`,
      s.timestamp,
      s.status,
      `"${s.operator}"`,
      `"${s.barcodeValue}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `OmniTrace_Ledger_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ["ALL", "Pharma Cold-Chain", "Aerospace Components", "Electronics", "Automotive Parts", "Hazardous Materials"];

  return (
    <div className="flex flex-col rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] overflow-hidden">
      {/* Header & Controls bar */}
      <div className="p-5 border-b border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                <span>ASSET EVENT LEDGER</span>
                <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {processedScans.length} verified records
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Continuous optical & RFID scan events with immutable custody records
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {onAddNewScan && (
              <button
                onClick={onAddNewScan}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/25 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
              >
                <Plus className="h-3.5 w-3.5 text-cyan-400" />
                <span>Simulate Ingest</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export CSV</span>
            </button>

            {onRefresh && (
              <button
                onClick={onRefresh}
                className="flex items-center justify-center h-8 w-8 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                title="Refresh Ledger"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[260px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Asset ID, Name, City, Operator, or Barcode..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-900/80 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status filters */}
            <div className="flex items-center bg-slate-900/80 p-0.5 rounded-xl border border-white/10 text-xs font-mono">
              {["ALL", "Delivered", "In Transit", "Flagged"].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setStatusFilter(st);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all text-xs",
                    statusFilter === st
                      ? st === "Flagged"
                        ? "bg-rose-500/25 text-rose-300 border border-rose-500/40 font-bold"
                        : st === "Delivered"
                        ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-bold"
                        : "bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 font-bold"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Scan Type filters */}
            <div className="flex items-center bg-slate-900/80 p-0.5 rounded-xl border border-white/10 text-xs font-mono">
              {["ALL", "QR", "Barcode"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setTypeFilter(type);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-2.5 py-1 rounded-lg transition-all text-xs",
                    typeFilter === type
                      ? "bg-purple-500/25 text-purple-300 border border-purple-500/40 font-bold"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {type === "ALL" ? "All Types" : type}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-900/80 text-xs font-mono text-slate-300 border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Industries</option>
              {categories.filter((c) => c !== "ALL").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-white/10 select-none">
            <tr>
              <th
                onClick={() => handleSort("id")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Asset ID</span>
                  {sortField === "id" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("assetName")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Asset Description</span>
                  {sortField === "assetName" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("scanType")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Scan Protocol</span>
                  {sortField === "scanType" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("city")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Location Hub</span>
                  {sortField === "city" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("timestamp")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Timestamp</span>
                  {sortField === "timestamp" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("status")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  {sortField === "status" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-cyan-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  )}
                </div>
              </th>

              <th className="py-3 px-4 text-right">Inspect</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {paginatedScans.length > 0 ? (
              paginatedScans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => onSelectAsset(scan)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                    <span className="group-hover:text-cyan-200 group-hover:underline">
                      {scan.id}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-white group-hover:text-cyan-100">
                      {scan.assetName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{scan.category}</div>
                  </td>

                  <td className="py-3 px-4">
                    <ScanTypeBadge type={scan.scanType} />
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-slate-200">
                      <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{scan.location.city}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {scan.location.hub}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-300">
                    {scan.timestamp}
                  </td>

                  <td className="py-3 px-4">
                    <StatusBadge status={scan.status} />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAsset(scan);
                      }}
                      className="inline-flex items-center justify-center p-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition-colors"
                      title="Inspect Telemetry"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400 font-mono">
                  No scan records matching your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-white/10 bg-slate-950/60 text-xs font-mono text-slate-400">
        <div>
          Showing{" "}
          <span className="text-white font-bold">
            {processedScans.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="text-white font-bold">
            {Math.min(currentPage * itemsPerPage, processedScans.length)}
          </span>{" "}
          of <span className="text-white font-bold">{processedScans.length}</span> entries
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-slate-900 text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="px-2 py-1 text-white font-bold">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/10 bg-slate-900 text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
