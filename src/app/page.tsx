"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { KPICards } from "@/components/KPICards";
import { RevenueChart } from "@/components/RevenueChart";
import { ActivityFeed } from "@/components/ActivityFeed";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import {
  initialRevenueData,
  extended30DaysRevenue,
  initialTransactions,
  initialActivities,
  generateMockTransaction,
  generateMockActivity,
} from "@/data/mockData";
import { Transaction, ActivityItem, RevenueDataPoint } from "@/types";
import { ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>(initialRevenueData);
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("7d");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  // Compute live KPI metrics
  const activeDataset = timeRange === "7d" ? revenueData : extended30DaysRevenue;
  const totalRevenue = activeDataset.reduce((acc, curr) => acc + curr.revenue, 0);
  const activeUsers = activeDataset[activeDataset.length - 1]?.activeUsers || 16840;
  const totalOrders = activeDataset.reduce((acc, curr) => acc + curr.orders, 0);

  const revenueSpark = activeDataset.map((d) => d.revenue);
  const usersSpark = activeDataset.map((d) => d.activeUsers);
  const ordersSpark = activeDataset.map((d) => d.orders);

  /**
   * Pushes a new realistic transaction and updates the live revenue chart
   */
  const handleAddNewTransaction = useCallback(() => {
    const newTx = generateMockTransaction();
    setTransactions((prev) => [newTx, ...prev.slice(0, 49)]);

    // Update current day's revenue in the chart
    setRevenueData((prev) => {
      const updated = [...prev];
      const last = updated.length - 1;
      updated[last] = {
        ...updated[last],
        revenue: updated[last].revenue + newTx.amount,
        orders: updated[last].orders + (newTx.status === "Success" ? 1 : 0),
        activeUsers: updated[last].activeUsers + Math.floor(Math.random() * 3 + 1),
      };
      return updated;
    });

    // Also push a corresponding activity item
    const newAct: ActivityItem = {
      id: `act-${Date.now().toString().slice(-4)}`,
      type: newTx.status === "Success" ? "checkout" : "refund",
      user: newTx.customerName,
      email: newTx.customerEmail,
      description:
        newTx.status === "Success"
          ? `Purchased ${newTx.item} ($${newTx.amount.toFixed(2)})`
          : `Payment failed for ${newTx.item}`,
      timestamp: "Just now",
      amount: newTx.status === "Success" ? newTx.amount : undefined,
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 39)]);

    setLastEvent(`New order #${newTx.id} ($${newTx.amount.toFixed(2)})`);
  }, []);

  /**
   * Live Simulation Interval Hook
   */
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // 60% chance to push transaction or activity
      if (Math.random() > 0.4) {
        handleAddNewTransaction();
      } else {
        const newAct = generateMockActivity();
        setActivities((prev) => [newAct, ...prev.slice(0, 39)]);
        setLastEvent(`User action: ${newAct.description}`);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveSimulating, handleAddNewTransaction]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        isLiveSimulating={isLiveSimulating}
        onToggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Row 1: KPI Cards */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <KPICards
            totalRevenue={totalRevenue}
            activeUsers={activeUsers}
            totalOrders={totalOrders}
            serverUptime="99.98%"
            revenueSpark={revenueSpark}
            usersSpark={usersSpark}
            ordersSpark={ordersSpark}
          />
        </motion.section>

        {/* Row 2: Revenue Chart & Activity Feed */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Revenue Chart (7 cols on lg, 8 on xl) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col"
          >
            <RevenueChart
              data={activeDataset}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </motion.div>

          {/* Activity Feed (5 cols on lg, 4 on xl) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 xl:col-span-4 flex flex-col"
          >
            <ActivityFeed
              activities={activities}
              onSimulateActivity={() => {
                const act = generateMockActivity();
                setActivities((prev) => [act, ...prev.slice(0, 39)]);
              }}
            />
          </motion.div>
        </section>

        {/* Row 3: Transaction Table */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <TransactionTable
            transactions={transactions}
            onAddNewTransaction={handleAddNewTransaction}
            onSelectTransaction={(tx) => setSelectedTransaction(tx)}
          />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-4 px-6 text-xs text-zinc-500">
        <div className="max-w-[1500px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>PulseMetrics Dashboard • Production SaaS Monitoring</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Next.js App Router</span>
            <span>Tailwind CSS</span>
            <span>Recharts</span>
          </div>
        </div>
      </footer>

      {/* Receipt Inspect Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
