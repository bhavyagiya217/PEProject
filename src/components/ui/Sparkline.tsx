"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  color?: "cyan" | "emerald" | "purple" | "amber" | "rose";
  className?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
}

const colorMap = {
  cyan: {
    stroke: "#22d3ee",
    gradientFrom: "rgba(34, 211, 238, 0.35)",
    gradientTo: "rgba(34, 211, 238, 0.0)",
    glow: "rgba(34, 211, 238, 0.5)",
  },
  emerald: {
    stroke: "#34d399",
    gradientFrom: "rgba(52, 211, 153, 0.35)",
    gradientTo: "rgba(52, 211, 153, 0.0)",
    glow: "rgba(52, 211, 153, 0.5)",
  },
  purple: {
    stroke: "#a78bfa",
    gradientFrom: "rgba(167, 139, 250, 0.35)",
    gradientTo: "rgba(167, 139, 250, 0.0)",
    glow: "rgba(167, 139, 250, 0.5)",
  },
  amber: {
    stroke: "#fbbf24",
    gradientFrom: "rgba(251, 191, 36, 0.35)",
    gradientTo: "rgba(251, 191, 36, 0.0)",
    glow: "rgba(251, 191, 36, 0.5)",
  },
  rose: {
    stroke: "#fb7185",
    gradientFrom: "rgba(251, 113, 133, 0.35)",
    gradientTo: "rgba(251, 113, 133, 0.0)",
    glow: "rgba(251, 113, 133, 0.5)",
  },
};

export function Sparkline({
  data,
  color = "cyan",
  className,
  height = 50,
  strokeWidth = 2,
}: SparklineProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const gradientId = `sparkline-gradient-${uniqueId}`;

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  // ViewBox bounds
  const svgWidth = 160;
  const svgHeight = height;
  const paddingY = 6;
  const usableHeight = svgHeight - paddingY * 2;

  // Calculate points
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * svgWidth;
    const y = svgHeight - paddingY - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Construct smooth cubic Bezier path
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
          <filter id={`glow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={theme.glow} />
          </filter>
        </defs>

        {/* Gradient Area Fill */}
        <path d={fillD} fill={`url(#${gradientId})`} />

        {/* Glowing Stroke Line */}
        <path
          d={pathD}
          fill="none"
          stroke={theme.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${uniqueId})`}
        />

        {/* Endpoint Pulsing Dot */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={3}
            fill={theme.stroke}
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
}
