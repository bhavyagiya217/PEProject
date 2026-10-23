import { NextRequest, NextResponse } from "next/server";
import { AssetScan, VisionLog } from "@/types";

// In-memory telemetry buffer for development & hardware testing
interface IngestionBuffer {
  scans: AssetScan[];
  visionLogs: VisionLog[];
  totalIngestedCount: number;
  lastIngestedAt: string | null;
}

const globalBuffer: IngestionBuffer = {
  scans: [],
  visionLogs: [],
  totalIngestedCount: 0,
  lastIngestedAt: null,
};

/**
 * GET /api/ingest
 * Health check & webhook endpoint discovery for hardware scanners and camera edge nodes.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ONLINE",
      service: "OmniTrace Ingestion Telemetry Gateway",
      version: "4.2.0-edge",
      timestamp: new Date().toISOString(),
      acceptedPayloadTypes: [
        {
          type: "scan",
          description: "Physical hardware barcode and QR 2D optical scanner event",
          requiredFields: ["assetName", "scanType", "barcodeValue", "location"],
          optionalFields: ["category", "operator", "temperature", "batteryLevel", "status"],
        },
        {
          type: "vision",
          description: "Edge AI camera vision detection event",
          requiredFields: ["cameraId", "detectionType", "confidenceScore"],
          optionalFields: ["severity", "details", "boundingCoordinates", "assetIdRef"],
        },
      ],
      stats: {
        totalIngested: globalBuffer.totalIngestedCount,
        lastIngestedAt: globalBuffer.lastIngestedAt,
        bufferedScansCount: globalBuffer.scans.length,
        bufferedVisionLogsCount: globalBuffer.visionLogs.length,
      },
    },
    { status: 200 }
  );
}

/**
 * POST /api/ingest
 * Dedicated webhook target for hardware QR/barcode scanners and edge AI camera vision feeds.
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: "Invalid JSON payload format",
          code: "ERR_MALFORMED_PAYLOAD",
        },
        { status: 400 }
      );
    }

    const payloadType = (body.type || (body.cameraId ? "vision" : "scan")).toLowerCase();
    const now = new Date();
    const timestampStr = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    // Handle Physical Barcode / QR Scan Ingestion
    if (payloadType === "scan" || payloadType === "barcode" || payloadType === "qr") {
      const {
        id,
        assetName,
        category = "Electronics",
        scanType = "QR",
        location,
        operator = "Edge Automated Station",
        barcodeValue,
        temperature,
        batteryLevel = 100,
        status: initialStatus,
        anomalyReason,
      } = body;

      if (!assetName || !barcodeValue) {
        return NextResponse.json(
          {
            error: "Missing required fields: 'assetName' and 'barcodeValue' are mandatory for scan payloads.",
            code: "ERR_MISSING_FIELDS",
          },
          { status: 422 }
        );
      }

      // Automated anomaly detection based on cold-chain rules & checksum
      let status: "In Transit" | "Delivered" | "Flagged" = initialStatus || "In Transit";
      let detectedAnomaly = anomalyReason;

      // Rule: Cold chain temperature threshold check
      if (category === "Pharma Cold-Chain" && temperature) {
        const tempValue = parseFloat(temperature);
        if (!isNaN(tempValue) && tempValue > -20.0) {
          status = "Flagged";
          detectedAnomaly = `Cold-chain thermal limit breached: recorded ${temperature} (Threshold: <= -20°C)`;
        }
      }

      // Rule: Low battery threshold
      if (batteryLevel < 15 && status !== "Flagged") {
        status = "Flagged";
        detectedAnomaly = `Critical tracker battery depletion: ${batteryLevel}%`;
      }

      const generatedId = id || `AST-${Math.floor(10000 + Math.random() * 89999)}`;

      const newScan: AssetScan = {
        id: generatedId,
        assetName,
        category,
        scanType: scanType.toUpperCase() === "BARCODE" ? "Barcode" : "QR",
        location: {
          city: location?.city || "Ingress Transit Hub",
          hub: location?.hub || "Dock Checkpoint 01",
          coordinates: location?.coordinates || [50.1109, 8.6821],
        },
        timestamp: timestampStr,
        status,
        operator,
        temperature: temperature || "Ambient",
        batteryLevel,
        anomalyReason: detectedAnomaly,
        barcodeValue,
      };

      // Add to in-memory buffer
      globalBuffer.scans.unshift(newScan);
      if (globalBuffer.scans.length > 100) globalBuffer.scans.pop();
      globalBuffer.totalIngestedCount += 1;
      globalBuffer.lastIngestedAt = now.toISOString();

      const processingTimeMs = Date.now() - startTime;

      return NextResponse.json(
        {
          success: true,
          status: "INGESTED",
          type: "scan",
          assetId: generatedId,
          evaluatedStatus: status,
          anomalyDetected: status === "Flagged",
          anomalyDetails: detectedAnomaly || null,
          processingTimeMs,
          payloadEcho: newScan,
        },
        { status: 201 }
      );
    }

    // Handle AI Vision Camera Event Ingestion
    if (payloadType === "vision" || payloadType === "camera") {
      const {
        id,
        cameraId,
        cameraName,
        location = "Automated Optical Gantry",
        detectionType = "Bounding Box Match",
        confidenceScore = 95.0,
        details,
        severity = "low",
        boundingCoordinates,
        assetIdRef,
      } = body;

      if (!cameraId) {
        return NextResponse.json(
          {
            error: "Missing required field: 'cameraId' is mandatory for vision logs.",
            code: "ERR_MISSING_CAMERA_ID",
          },
          { status: 422 }
        );
      }

      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(Math.floor(now.getMilliseconds())).padStart(3, "0")}`;
      const generatedVisId = id || `VIS-${Math.floor(10000 + Math.random() * 89999)}`;

      const newVisionLog: VisionLog = {
        id: generatedVisId,
        cameraId,
        cameraName: cameraName || `Active Sensor ${cameraId}`,
        location,
        detectionType,
        confidenceScore: Number(confidenceScore),
        time: timeStr,
        timestamp: now.toISOString(),
        details: details || `Optical verification completed on camera ${cameraId}.`,
        severity,
        boundingCoordinates,
        assetIdRef,
      };

      globalBuffer.visionLogs.unshift(newVisionLog);
      if (globalBuffer.visionLogs.length > 100) globalBuffer.visionLogs.pop();
      globalBuffer.totalIngestedCount += 1;
      globalBuffer.lastIngestedAt = now.toISOString();

      const processingTimeMs = Date.now() - startTime;

      return NextResponse.json(
        {
          success: true,
          status: "INGESTED",
          type: "vision",
          visionLogId: generatedVisId,
          confidenceScore,
          severity,
          processingTimeMs,
          payloadEcho: newVisionLog,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        error: `Unknown payload type '${payloadType}'. Expected 'scan' or 'vision'.`,
        code: "ERR_INVALID_TYPE",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal telemetry server error during payload processing",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
