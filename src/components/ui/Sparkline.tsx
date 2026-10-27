"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  color?: "indigo" | "blue" | "emerald" | "amber" | "zinc";
  className?: string;
  height?: number;
  strokeWidth?: number;
}

const colorMap = {
  indigo: {
    stroke: "#6366f1",
    gradientFrom: "rgba(99, 102, 241, 0.2)",
    gradientTo: "rgba(99, 102, 241, 0.0)",
  },
  blue: {
    stroke: "#3b82f6",
    gradientFrom: "rgba(59, 130, 246, 0.2)",
    gradientTo: "rgba(59, 130, 246, 0.0)",
  },
  emerald: {
    stroke: "#10b981",
    gradientFrom: "rgba(16, 185, 129, 0.2)",
    gradientTo: "rgba(16, 185, 129, 0.0)",
  },
  amber: {
    stroke: "#f59e0b",
    gradientFrom: "rgba(245, 158, 11, 0.2)",
    gradientTo: "rgba(245, 158, 11, 0.0)",
  },
  zinc: {
    stroke: "#71717a",
    gradientFrom: "rgba(113, 113, 122, 0.15)",
    gradientTo: "rgba(113, 113, 122, 0.0)",
  },
};

export function Sparkline({
  data,
  color = "indigo",
  className,
  height = 42,
  strokeWidth = 1.8,
}: SparklineProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const gradientId = `sparkline-gradient-${uniqueId}`;

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const svgWidth = 140;
  const svgHeight = height;
  const paddingY = 4;
  const usableHeight = svgHeight - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * svgWidth;
    const y = svgHeight - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const controlX = (curr.x + next.x) / 2;
    pathD += ` C ${controlX} ${curr.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  const fillD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;
  const theme = colorMap[color];

  return (
    <div className={cn("relative w-full overflow-hidden pointer-events-none", className)}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.gradientFrom} />
            <stop offset="100%" stopColor={theme.gradientTo} />
          </linearGradient>
        </defs>

        <path d={fillD} fill={`url(#${gradientId})`} />
        <path
          d={pathD}
          fill="none"
          stroke={theme.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
