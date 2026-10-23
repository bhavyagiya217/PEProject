export type ScanType = "QR" | "Barcode";

export type AssetStatus = "In Transit" | "Delivered" | "Flagged";

export type DetectionType =
  | "Bounding Box Match"
  | "Anomaly"
  | "Damaged Barcode"
  | "Unauthorized Movement"
  | "Thermal Variance"
  | "Label Tampering";

export interface AssetScan {
  id: string;
  assetName: string;
  category: "Pharma Cold-Chain" | "Aerospace Components" | "Electronics" | "Automotive Parts" | "Hazardous Materials";
  scanType: ScanType;
  location: {
    city: string;
    hub: string;
    coordinates: [number, number];
  };
  timestamp: string; // ISO or formatted
  status: AssetStatus;
  operator: string;
  temperature?: string;
  batteryLevel?: number;
  anomalyReason?: string;
  barcodeValue: string;
}

export interface VisionLog {
  id: string;
  cameraId: string;
  cameraName: string;
  location: string;
  detectionType: DetectionType;
  confidenceScore: number; // 0 - 100
  time: string; // e.g. "10:24:18.420"
  timestamp: string;
  boundingCoordinates?: {
    x: number; // percentage
    y: number; // percentage
    width: number;
    height: number;
  };
  details: string;
  severity: "low" | "medium" | "high" | "critical";
  assetIdRef?: string;
}

export interface SystemMetricPoint {
  time: string; // e.g. "04:00"
  fullTimestamp: string;
  activeTrackers: number;
  scanVolume: number;
  qrScans: number;
  barcodeScans: number;
  apiLatency: number; // ms
  anomalyRate: number; // count
}

export interface HeroMetric {
  title: string;
  value: string | number;
  change: string;
  changePositive: boolean;
  subtext: string;
  sparklineData: number[];
  color: "cyan" | "emerald" | "purple" | "amber" | "rose";
}
