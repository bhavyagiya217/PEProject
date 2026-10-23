import { AssetScan, VisionLog, SystemMetricPoint } from "@/types";

export const initialAssetScans: AssetScan[] = [
  {
    id: "AST-89201",
    assetName: "CryoBio Ultra-Cold Vaccine Shipper v2",
    category: "Pharma Cold-Chain",
    scanType: "QR",
    location: {
      city: "Frankfurt, DE",
      hub: "CargoCity South Gate 4",
      coordinates: [50.0379, 8.5622],
    },
    timestamp: "2026-10-23 10:22:14",
    status: "In Transit",
    operator: "K. Lindemann (ID: 4402)",
    temperature: "-78.2°C",
    batteryLevel: 94,
    barcodeValue: "QR://PHRMA-BIO-CRY0-89201-FRA-JFK",
  },
  {
    id: "AST-44812",
    assetName: "Titanium CFM56 Low-Pressure Turbine Blade",
    category: "Aerospace Components",
    scanType: "Barcode",
    location: {
      city: "Singapore, SG",
      hub: "Changi Aerospace Park Bay 12",
      coordinates: [1.3644, 103.9915],
    },
    timestamp: "2026-10-23 10:20:47",
    status: "Delivered",
    operator: "T. Chen (ID: 8812)",
    temperature: "22.4°C",
    batteryLevel: 98,
    barcodeValue: "BC128://AERO-CFM56-LPB-44812-SIN",
  },
  {
    id: "AST-77309",
    assetName: "3nm EUV Silicon Wafer FOUP Carrier",
    category: "Electronics",
    scanType: "QR",
    location: {
      city: "Hsinchu, TW",
      hub: "Science Park Cleanroom Hub B",
      coordinates: [24.7828, 120.9995],
    },
    timestamp: "2026-10-23 10:18:22",
    status: "Flagged",
    operator: "Autonomous AGV-09",
    temperature: "20.1°C",
    batteryLevel: 82,
    anomalyReason: "AI Vision detected micro-seal tear on FOUP flange",
    barcodeValue: "QR://SEMI-EUV3NM-FOUP-77309-TSM",
  },
  {
    id: "AST-10492",
    assetName: "High-Voltage 800V EV Battery Pack Module",
    category: "Automotive Parts",
    scanType: "Barcode",
    location: {
      city: "Stuttgart, DE",
      hub: "Zuffenhausen Logistics Terminal 2",
      coordinates: [48.8354, 9.1556],
    },
    timestamp: "2026-10-23 10:15:58",
    status: "In Transit",
    operator: "M. Weber (ID: 3109)",
    temperature: "24.6°C",
    batteryLevel: 89,
    barcodeValue: "BC128://AUTO-800V-BATMOD-10492-STG",
  },
  {
    id: "AST-65230",
    assetName: "Class 6.2 Infectious Diagnostic Specimens",
    category: "Hazardous Materials",
    scanType: "QR",
    location: {
      city: "Atlanta, GA, US",
      hub: "Hartsfield Biosafety Vault C",
      coordinates: [33.6407, -84.4277],
    },
    timestamp: "2026-10-23 10:12:05",
    status: "Flagged",
    operator: "S. Jackson (ID: 9940)",
    temperature: "-19.8°C",
    batteryLevel: 67,
    anomalyReason: "Thermal variance trigger: +3.2°C above upper limit",
    barcodeValue: "QR://HAZ-BIO62-ISPEC-65230-ATL",
  },
  {
    id: "AST-31908",
    assetName: "Quantum Computing Cryo-Coupler Array",
    category: "Electronics",
    scanType: "QR",
    location: {
      city: "Zurich, CH",
      hub: "ETH Quantum Tech Logistics Center",
      coordinates: [47.3769, 8.5417],
    },
    timestamp: "2026-10-23 10:09:41",
    status: "Delivered",
    operator: "H. Meier (ID: 1541)",
    temperature: "18.5°C",
    batteryLevel: 100,
    barcodeValue: "QR://TECH-QUANTUM-CRYO-31908-ZRH",
  },
  {
    id: "AST-58204",
    assetName: "Hydraulic Fly-By-Wire Actuator Assembly",
    category: "Aerospace Components",
    scanType: "Barcode",
    location: {
      city: "Toulouse, FR",
      hub: "Blagnac Aerospace Integration Hub",
      coordinates: [43.6291, 1.3638],
    },
    timestamp: "2026-10-23 10:05:19",
    status: "In Transit",
    operator: "P. Moreau (ID: 7215)",
    temperature: "21.0°C",
    batteryLevel: 91,
    barcodeValue: "BC128://AERO-HYDR-ACT-58204-TLS",
  },
  {
    id: "AST-92147",
    assetName: "Monoclonal Antibody Synthesis Precursor",
    category: "Pharma Cold-Chain",
    scanType: "QR",
    location: {
      city: "Basel, CH",
      hub: "Novartis Campus Pharma Ingress",
      coordinates: [47.5596, 7.5886],
    },
    timestamp: "2026-10-23 09:58:33",
    status: "In Transit",
    operator: "E. Fischer (ID: 2190)",
    temperature: "4.1°C",
    batteryLevel: 95,
    barcodeValue: "QR://PHRMA-MAB-PREC-92147-BSL",
  },
  {
    id: "AST-14092",
    assetName: "Silicon Carbide Inverter Power Modules",
    category: "Automotive Parts",
    scanType: "Barcode",
    location: {
      city: "Yokohama, JP",
      hub: "Keihin Industrial Port Zone 3",
      coordinates: [35.4437, 139.638],
    },
    timestamp: "2026-10-23 09:51:12",
    status: "Delivered",
    operator: "R. Tanaka (ID: 6023)",
    temperature: "23.8°C",
    batteryLevel: 97,
    barcodeValue: "BC128://AUTO-SIC-INV-14092-YOK",
  },
  {
    id: "AST-83021",
    assetName: "Lithium Hexafluorophosphate Electrolyte Drum",
    category: "Hazardous Materials",
    scanType: "Barcode",
    location: {
      city: "Rotterdam, NL",
      hub: "Maasvlakte Hazmat Terminal 7",
      coordinates: [51.9566, 4.0252],
    },
    timestamp: "2026-10-23 09:44:09",
    status: "Flagged",
    operator: "J. Van Dijk (ID: 5519)",
    temperature: "17.9°C",
    batteryLevel: 74,
    anomalyReason: "Barcode label abrasion > 35%, verified via camera fallback",
    barcodeValue: "BC128://HAZ-LIPF6-DRUM-83021-RTM",
  },
  {
    id: "AST-72901",
    assetName: "NextGen LiDAR Autonomous Sensor Node",
    category: "Electronics",
    scanType: "QR",
    location: {
      city: "San Jose, CA, US",
      hub: "Silicon Valley Gateway Depot 1",
      coordinates: [37.3382, -121.8863],
    },
    timestamp: "2026-10-23 09:37:50",
    status: "Delivered",
    operator: "A. Patel (ID: 8831)",
    temperature: "21.5°C",
    batteryLevel: 99,
    barcodeValue: "QR://TECH-LIDAR-AUTO-72901-SJC",
  },
  {
    id: "AST-60315",
    assetName: "Carbon-Fiber Wing Rib Spar Set",
    category: "Aerospace Components",
    scanType: "Barcode",
    location: {
      city: "Seattle, WA, US",
      hub: "Boeing Field Freight Facility 4",
      coordinates: [47.5301, -122.302],
    },
    timestamp: "2026-10-23 09:30:11",
    status: "In Transit",
    operator: "D. Miller (ID: 3418)",
    temperature: "16.8°C",
    batteryLevel: 88,
    barcodeValue: "BC128://AERO-CFRP-SPAR-60315-SEA",
  },
];

export const initialVisionLogs: VisionLog[] = [
  {
    id: "VIS-99104",
    cameraId: "CAM-04-NORTH-DOCK",
    cameraName: "North Dock High-Speed Ingress",
    location: "Dock 4 Gate A (Frankfurt)",
    detectionType: "Bounding Box Match",
    confidenceScore: 98.7,
    time: "10:24:02.115",
    timestamp: "2026-10-23 10:24:02",
    boundingCoordinates: { x: 34, y: 28, width: 38, height: 42 },
    details: "Container seal verified. Optical barcode decoded: QR://PHRMA-BIO-CRY0-89201",
    severity: "low",
    assetIdRef: "AST-89201",
  },
  {
    id: "VIS-99103",
    cameraId: "CAM-12-CONVEYOR-B",
    cameraName: "Cleanroom Sorter Conveyor B",
    location: "Hsinchu Fab 18 Hub",
    detectionType: "Anomaly",
    confidenceScore: 96.2,
    time: "10:23:44.890",
    timestamp: "2026-10-23 10:23:44",
    boundingCoordinates: { x: 52, y: 40, width: 28, height: 35 },
    details: "Surface anomaly detected: Micro-fissure on FOUP latch assembly. Automated reroute triggered.",
    severity: "high",
    assetIdRef: "AST-77309",
  },
  {
    id: "VIS-99102",
    cameraId: "CAM-08-GATE-EAST",
    cameraName: "East Ramp Vehicle Gate",
    location: "Changi Logistics Bay (Singapore)",
    detectionType: "Bounding Box Match",
    confidenceScore: 99.4,
    time: "10:22:58.204",
    timestamp: "2026-10-23 10:22:58",
    boundingCoordinates: { x: 22, y: 18, width: 48, height: 50 },
    details: "Pallet tag matching BC128 checksum. Clear line-of-sight confirmed.",
    severity: "low",
    assetIdRef: "AST-44812",
  },
  {
    id: "VIS-99101",
    cameraId: "CAM-02-HAZMAT-BAY",
    cameraName: "Hazmat Inspection Bay 2",
    location: "Rotterdam Maasvlakte",
    detectionType: "Damaged Barcode",
    confidenceScore: 92.1,
    time: "10:21:12.780",
    timestamp: "2026-10-23 10:21:12",
    boundingCoordinates: { x: 45, y: 35, width: 30, height: 26 },
    details: "Barcode contrast degradation at 38%. Reconstructed via Neural Optical OCR v4.",
    severity: "medium",
    assetIdRef: "AST-83021",
  },
  {
    id: "VIS-99100",
    cameraId: "CAM-16-CONTAINER-CRANE",
    cameraName: "Overhead Gantry Crane Cam",
    location: "Atlanta Air Cargo Vault C",
    detectionType: "Thermal Variance",
    confidenceScore: 97.5,
    time: "10:19:33.450",
    timestamp: "2026-10-23 10:19:33",
    boundingCoordinates: { x: 18, y: 24, width: 55, height: 48 },
    details: "FLIR thermal radiance zone: +3.2°C ambient delta flagged on cold containment shell.",
    severity: "critical",
    assetIdRef: "AST-65230",
  },
  {
    id: "VIS-99099",
    cameraId: "CAM-04-NORTH-DOCK",
    cameraName: "North Dock High-Speed Ingress",
    location: "Dock 4 Gate A (Frankfurt)",
    detectionType: "Bounding Box Match",
    confidenceScore: 99.1,
    time: "10:17:15.012",
    timestamp: "2026-10-23 10:17:15",
    boundingCoordinates: { x: 30, y: 32, width: 40, height: 38 },
    details: "Heavy freight transport cleared optical checkpoint. Speed: 4.8 km/h.",
    severity: "low",
    assetIdRef: "AST-58204",
  },
  {
    id: "VIS-99098",
    cameraId: "CAM-09-AUTOMATION-ROBOT",
    cameraName: "Robotic Arm Cell 09",
    location: "Stuttgart Zuffenhausen",
    detectionType: "Bounding Box Match",
    confidenceScore: 98.9,
    time: "10:15:40.612",
    timestamp: "2026-10-23 10:15:40",
    boundingCoordinates: { x: 40, y: 30, width: 32, height: 44 },
    details: "Robotic vacuum gripper engaged. Serial code 800V-BATMOD verified in 12ms.",
    severity: "low",
    assetIdRef: "AST-10492",
  },
];

export const initialSystemMetrics: SystemMetricPoint[] = [
  { time: "11:00", fullTimestamp: "Yesterday 11:00", activeTrackers: 13200, scanVolume: 6420, qrScans: 3980, barcodeScans: 2440, apiLatency: 17, anomalyRate: 2 },
  { time: "12:00", fullTimestamp: "Yesterday 12:00", activeTrackers: 13350, scanVolume: 7120, qrScans: 4410, barcodeScans: 2710, apiLatency: 18, anomalyRate: 1 },
  { time: "13:00", fullTimestamp: "Yesterday 13:00", activeTrackers: 13500, scanVolume: 8250, qrScans: 5120, barcodeScans: 3130, apiLatency: 21, anomalyRate: 3 },
  { time: "14:00", fullTimestamp: "Yesterday 14:00", activeTrackers: 13680, scanVolume: 9400, qrScans: 5800, barcodeScans: 3600, apiLatency: 22, anomalyRate: 2 },
  { time: "15:00", fullTimestamp: "Yesterday 15:00", activeTrackers: 13890, scanVolume: 10200, qrScans: 6350, barcodeScans: 3850, apiLatency: 24, anomalyRate: 4 },
  { time: "16:00", fullTimestamp: "Yesterday 16:00", activeTrackers: 14050, scanVolume: 9850, qrScans: 6100, barcodeScans: 3750, apiLatency: 20, anomalyRate: 1 },
  { time: "17:00", fullTimestamp: "Yesterday 17:00", activeTrackers: 14120, scanVolume: 8900, qrScans: 5520, barcodeScans: 3380, apiLatency: 19, anomalyRate: 2 },
  { time: "18:00", fullTimestamp: "Yesterday 18:00", activeTrackers: 14200, scanVolume: 7600, qrScans: 4700, barcodeScans: 2900, apiLatency: 18, anomalyRate: 0 },
  { time: "19:00", fullTimestamp: "Yesterday 19:00", activeTrackers: 14240, scanVolume: 6400, qrScans: 3960, barcodeScans: 2440, apiLatency: 16, anomalyRate: 1 },
  { time: "20:00", fullTimestamp: "Yesterday 20:00", activeTrackers: 14300, scanVolume: 5800, qrScans: 3600, barcodeScans: 2200, apiLatency: 15, anomalyRate: 1 },
  { time: "21:00", fullTimestamp: "Yesterday 21:00", activeTrackers: 14320, scanVolume: 5100, qrScans: 3150, barcodeScans: 1950, apiLatency: 16, anomalyRate: 0 },
  { time: "22:00", fullTimestamp: "Yesterday 22:00", activeTrackers: 14380, scanVolume: 4700, qrScans: 2900, barcodeScans: 1800, apiLatency: 15, anomalyRate: 2 },
  { time: "23:00", fullTimestamp: "Yesterday 23:00", activeTrackers: 14410, scanVolume: 4200, qrScans: 2600, barcodeScans: 1600, apiLatency: 14, anomalyRate: 0 },
  { time: "00:00", fullTimestamp: "Today 00:00", activeTrackers: 14450, scanVolume: 3900, qrScans: 2420, barcodeScans: 1480, apiLatency: 14, anomalyRate: 1 },
  { time: "01:00", fullTimestamp: "Today 01:00", activeTrackers: 14490, scanVolume: 3400, qrScans: 2100, barcodeScans: 1300, apiLatency: 13, anomalyRate: 0 },
  { time: "02:00", fullTimestamp: "Today 02:00", activeTrackers: 14510, scanVolume: 3100, qrScans: 1920, barcodeScans: 1180, apiLatency: 14, anomalyRate: 1 },
  { time: "03:00", fullTimestamp: "Today 03:00", activeTrackers: 14530, scanVolume: 3250, qrScans: 2010, barcodeScans: 1240, apiLatency: 15, anomalyRate: 0 },
  { time: "04:00", fullTimestamp: "Today 04:00", activeTrackers: 14580, scanVolume: 3800, qrScans: 2360, barcodeScans: 1440, apiLatency: 14, anomalyRate: 0 },
  { time: "05:00", fullTimestamp: "Today 05:00", activeTrackers: 14640, scanVolume: 5200, qrScans: 3220, barcodeScans: 1980, apiLatency: 15, anomalyRate: 1 },
  { time: "06:00", fullTimestamp: "Today 06:00", activeTrackers: 14710, scanVolume: 7800, qrScans: 4850, barcodeScans: 2950, apiLatency: 17, anomalyRate: 2 },
  { time: "07:00", fullTimestamp: "Today 07:00", activeTrackers: 14790, scanVolume: 9900, qrScans: 6140, barcodeScans: 3760, apiLatency: 19, anomalyRate: 2 },
  { time: "08:00", fullTimestamp: "Today 08:00", activeTrackers: 14840, scanVolume: 12100, qrScans: 7500, barcodeScans: 4600, apiLatency: 23, anomalyRate: 3 },
  { time: "09:00", fullTimestamp: "Today 09:00", activeTrackers: 14870, scanVolume: 13800, qrScans: 8550, barcodeScans: 5250, apiLatency: 24, anomalyRate: 2 },
  { time: "10:00", fullTimestamp: "Today 10:00", activeTrackers: 14892, scanVolume: 14650, qrScans: 9080, barcodeScans: 5570, apiLatency: 18, anomalyRate: 1 },
];

export const camerasList = [
  { id: "CAM-04-NORTH-DOCK", name: "Dock 4 Gate A (Frankfurt)", fps: 60, status: "ONLINE", resolution: "4K UHD", zoom: "2.4x" },
  { id: "CAM-12-CONVEYOR-B", name: "Cleanroom Sorter B (Hsinchu)", fps: 120, status: "ONLINE", resolution: "4K UHD", zoom: "1.0x" },
  { id: "CAM-08-GATE-EAST", name: "East Ramp Vehicle Gate (Singapore)", fps: 60, status: "ONLINE", resolution: "1080p", zoom: "3.1x" },
  { id: "CAM-02-HAZMAT-BAY", name: "Hazmat Inspection Bay 2 (Rotterdam)", fps: 60, status: "ONLINE", resolution: "4K UHD", zoom: "1.8x" },
  { id: "CAM-16-CONTAINER-CRANE", name: "FLIR Thermal Gantry (Atlanta)", fps: 30, status: "WARNING", resolution: "Thermal/HD", zoom: "1.0x" },
];

const mockCatalog = [
  { name: "Cryo-Storage mRNA Lipid Nanoparticles", category: "Pharma Cold-Chain" as const, temp: "-81.4°C" },
  { name: "Single-Crystal Inconel 718 Turbine Disk", category: "Aerospace Components" as const, temp: "21.2°C" },
  { name: "Gallium Nitride Fast-Charge Power Wafer", category: "Electronics" as const, temp: "19.5°C" },
  { name: "High-Density Solid-State EV Cell Module", category: "Automotive Parts" as const, temp: "23.0°C" },
  { name: "Class 9 UN3480 Lithium Battery Containment", category: "Hazardous Materials" as const, temp: "18.1°C" },
  { name: "Biologics Lyophilized Factor VIII Vial Rack", category: "Pharma Cold-Chain" as const, temp: "3.8°C" },
  { name: "Carbon-Silicon Composite Braking Caliper", category: "Automotive Parts" as const, temp: "22.8°C" },
  { name: "Titanium Electron-Beam Welded Spar", category: "Aerospace Components" as const, temp: "20.6°C" },
  { name: "MEMS Inertial Navigation Gyroscope Core", category: "Electronics" as const, temp: "21.9°C" },
  { name: "Corrosive UN1760 Organosilane Drum Pallet", category: "Hazardous Materials" as const, temp: "16.4°C" },
];

const mockHubs = [
  { city: "Frankfurt, DE", hub: "CargoCity South Gate 4", coordinates: [50.0379, 8.5622] as [number, number] },
  { city: "Tokyo, JP", hub: "Haneda Cargo Center Bay 08", coordinates: [35.5494, 139.7798] as [number, number] },
  { city: "Chicago, IL, US", hub: "O'Hare Intermodal Terminal 5", coordinates: [41.9742, -87.9073] as [number, number] },
  { city: "Rotterdam, NL", hub: "Maasvlakte Automated Terminal", coordinates: [51.9566, 4.0252] as [number, number] },
  { city: "Singapore, SG", hub: "Changi Logistics Hub East", coordinates: [1.3644, 103.9915] as [number, number] },
  { city: "Zurich, CH", hub: "Kloten Air Freight Cargo 3", coordinates: [47.4582, 8.5555] as [number, number] },
  { city: "Seoul, KR", hub: "Incheon Free Economic Zone Air Cargo", coordinates: [37.4602, 126.4407] as [number, number] },
  { city: "London, UK", hub: "Heathrow World Cargo Centre", coordinates: [51.4700, -0.4543] as [number, number] },
];

const mockOperators = [
  "M. Schmidt (ID: 3901)",
  "K. Tanaka (ID: 8402)",
  "L. Rossi (ID: 1109)",
  "A. Moreau (ID: 5541)",
  "Autonomous Gantry AGV-14",
  "High-Speed Sorter Robotic Cell 02",
  "E. Johansson (ID: 7720)",
  "J. Vance (ID: 4490)",
];

/**
 * Generates a realistic mock scan payload for real-time live simulation.
 */
export function generateMockScanPayload(): AssetScan {
  const item = mockCatalog[Math.floor(Math.random() * mockCatalog.length)];
  const hub = mockHubs[Math.floor(Math.random() * mockHubs.length)];
  const operator = mockOperators[Math.floor(Math.random() * mockOperators.length)];
  const idNum = Math.floor(10000 + Math.random() * 89999);
  const id = `AST-${idNum}`;

  const isQr = Math.random() > 0.45;
  const scanType = isQr ? "QR" : "Barcode";

  const isFlagged = Math.random() < 0.15;
  const isDelivered = !isFlagged && Math.random() > 0.55;
  const status: AssetScan["status"] = isFlagged ? "Flagged" : isDelivered ? "Delivered" : "In Transit";

  const anomalyReasons = [
    "Optical barcode damage: 32% symbol degradation",
    "Thermal variance: +4.1°C excursion outside safe band",
    "Tamper seal integrity breach detected by camera vision",
    "Telemetry mismatch: Geofence perimeter departure flag",
    "GS1 CRC32 checksum mismatch on second pass",
  ];

  const now = new Date();
  const timeStr = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  // Formatted barcode strings: GS1-128 or ISO/IEC 18004 QR
  const barcodeValue = isQr
    ? `QR://${item.category.toUpperCase().replace(/\s+/g, "-")}//${id}//${hub.city.slice(0, 3).toUpperCase()}`
    : `(01)00850006${idNum}(21)${id}(17)261231(10)LOT${Math.floor(100 + Math.random() * 900)}`;

  return {
    id,
    assetName: item.name,
    category: item.category,
    scanType,
    location: {
      city: hub.city,
      hub: hub.hub,
      coordinates: hub.coordinates,
    },
    timestamp: timeStr,
    status,
    operator,
    temperature: item.temp,
    batteryLevel: Math.floor(75 + Math.random() * 25),
    barcodeValue,
    anomalyReason: isFlagged ? anomalyReasons[Math.floor(Math.random() * anomalyReasons.length)] : undefined,
  };
}

/**
 * Generates an edge camera AI vision event for real-time live simulation.
 */
export function generateMockVisionPayload(
  referenceAsset?: AssetScan,
  forcedAnomaly: boolean = false
): VisionLog {
  const isAnomaly = forcedAnomaly || Math.random() < 0.2;
  const cam = camerasList[Math.floor(Math.random() * camerasList.length)];

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(Math.floor(now.getMilliseconds())).padStart(3, "0")}`;

  const detectionTypes: VisionLog["detectionType"][] = isAnomaly
    ? ["Anomaly", "Damaged Barcode", "Thermal Variance", "Unauthorized Movement", "Label Tampering"]
    : ["Bounding Box Match"];
  const detectionType = detectionTypes[Math.floor(Math.random() * detectionTypes.length)];

  const confidenceScore = Number((isAnomaly ? Math.random() * 5 + 91 : Math.random() * 3 + 97).toFixed(1));

  const targetAssetId = referenceAsset?.id || `AST-${Math.floor(10000 + Math.random() * 89999)}`;

  const details = isAnomaly
    ? `Neural AI Vision detected ${detectionType.toLowerCase()} on container perimeter [${targetAssetId}]. Alert broadcasted to security hub.`
    : `High-confidence optical alignment confirmed on payload ${targetAssetId}. Checksum verified via camera OCR.`;

  return {
    id: `VIS-${Math.floor(10000 + Math.random() * 89999)}`,
    cameraId: cam.id,
    cameraName: cam.name,
    location: cam.name,
    detectionType,
    confidenceScore,
    time: timeStr,
    timestamp: now.toISOString(),
    details,
    severity: isAnomaly ? (Math.random() > 0.4 ? "high" : "critical") : "low",
    boundingCoordinates: {
      x: Math.floor(Math.random() * 30 + 20),
      y: Math.floor(Math.random() * 25 + 20),
      width: Math.floor(Math.random() * 20 + 30),
      height: Math.floor(Math.random() * 20 + 30),
    },
    assetIdRef: targetAssetId,
  };
}
