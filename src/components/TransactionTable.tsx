"use client";

import React, { useState, useMemo } from "react";
import { Transaction, TransactionStatus } from "@/types";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
  onAddNewTransaction?: () => void;
  onSelectTransaction?: (transaction: Transaction) => void;
}

type SortField = "id" | "customerName" | "amount" | "timestamp" | "status";
type SortOrder = "asc" | "desc";

export function TransactionTable({
  transactions,
  onAddNewTransaction,
  onSelectTransaction,
}: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const term = searchTerm.toLowerCase();
        const matches =
          tx.id.toLowerCase().includes(term) ||
          tx.customerName.toLowerCase().includes(term) ||
          tx.customerEmail.toLowerCase().includes(term) ||
          tx.item.toLowerCase().includes(term);

        if (!matches) return false;

        if (statusFilter !== "ALL" && tx.status !== statusFilter) return false;

        return true;
      })
      .sort((a, b) => {
        let valA: string | number = "";
        let valB: string | number = "";

        if (sortField === "id") {
          valA = a.id;
          valB = b.id;
        } else if (sortField === "customerName") {
          valA = a.customerName;
          valB = b.customerName;
        } else if (sortField === "amount") {
          valA = a.amount;
          valB = b.amount;
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
  }, [transactions, searchTerm, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer Name", "Email", "Plan / Item", "Amount", "Method", "Status", "Timestamp"];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      `"${tx.customerName}"`,
      `"${tx.customerEmail}"`,
      `"${tx.item}"`,
      tx.amount,
      tx.paymentMethod,
      tx.status,
      `"${tx.timestamp}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PulseMetrics_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
      {/* Table Header Bar */}
      <div className="p-5 border-b border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
            <p className="text-xs text-zinc-400">
              Latest payment events processed via Stripe and billing providers
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onAddNewTransaction && (
              <button
                onClick={onAddNewTransaction}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Simulate Payment</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search orders, customers, or items..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-zinc-950 text-xs text-white placeholder-zinc-500 pl-8 pr-3 py-1.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            {["ALL", "Success", "Pending", "Failed"].map((st) => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-colors",
                  statusFilter === st
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-zinc-950/60 text-zinc-400 border-b border-zinc-800 select-none">
            <tr>
              <th
                onClick={() => handleSort("id")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Order ID</span>
                  {sortField === "id" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-zinc-200" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-zinc-200" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th
                onClick={() => handleSort("customerName")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Customer</span>
                  {sortField === "customerName" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-zinc-200" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-zinc-200" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th className="py-3 px-4">Plan / Item</th>

              <th
                onClick={() => handleSort("amount")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Amount</span>
                  {sortField === "amount" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-zinc-200" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-zinc-200" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>

              <th className="py-3 px-4">Method</th>

              <th
                onClick={() => handleSort("timestamp")}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Date</span>
                  {sortField === "timestamp" ? (
                    sortOrder === "asc" ? (
                      <ArrowUp className="w-3 h-3 text-zinc-200" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-zinc-200" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
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
                      <ArrowUp className="w-3 h-3 text-zinc-200" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-zinc-200" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/60">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => onSelectTransaction && onSelectTransaction(tx)}
                  className="hover:bg-zinc-850/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-4 font-mono font-medium text-zinc-300">
                    {tx.id}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{tx.customerName}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{tx.customerEmail}</div>
                  </td>

                  <td className="py-3 px-4 text-zinc-300 font-medium">
                    {tx.item}
                  </td>

                  <td className="py-3 px-4 font-mono font-semibold text-white">
                    ${tx.amount.toFixed(2)}
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-zinc-950 border border-zinc-800 text-zinc-400">
                      <CreditCard className="w-3 h-3" />
                      {tx.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">
                    {tx.timestamp}
                  </td>

                  <td className="py-3 px-4">
                    {tx.status === "Success" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Success
                      </span>
                    )}
                    {tx.status === "Pending" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                    {tx.status === "Failed" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="w-3 h-3" />
                        Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-zinc-500 text-xs">
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-t border-zinc-800 bg-zinc-950/40 text-xs text-zinc-400">
        <div>
          Showing{" "}
          <span className="text-white font-medium">
            {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="text-white font-medium">
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
          </span>{" "}
          of <span className="text-white font-medium">{filteredTransactions.length}</span> transactions
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-zinc-800"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="px-2 py-1 text-zinc-300 font-mono">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 disabled:opacity-40 disabled:pointer-events-none hover:bg-zinc-800"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
