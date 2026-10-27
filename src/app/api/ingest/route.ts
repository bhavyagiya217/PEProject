import { NextRequest, NextResponse } from "next/server";
import { Transaction, ActivityItem } from "@/types";

interface SaaSBuffer {
  transactions: Transaction[];
  activities: ActivityItem[];
  totalIngested: number;
  lastUpdated: string | null;
}

const eventBuffer: SaaSBuffer = {
  transactions: [],
  activities: [],
  totalIngested: 0,
  lastUpdated: null,
};

/**
 * GET /api/ingest
 * Health check & webhook discovery for SaaS payment gateways & event bus
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ONLINE",
      service: "PulseMetrics Ingestion Gateway",
      version: "2.0.0",
      timestamp: new Date().toISOString(),
      acceptedEvents: [
        {
          type: "transaction",
          description: "Stripe/Billing checkout or subscription payment",
          requiredFields: ["customerName", "amount", "item"],
        },
        {
          type: "activity",
          description: "User lifecycle event (signup, upgrade, cart abandoned)",
          requiredFields: ["user", "description"],
        },
      ],
      stats: {
        totalIngested: eventBuffer.totalIngested,
        lastUpdated: eventBuffer.lastUpdated,
        bufferedTransactions: eventBuffer.transactions.length,
        bufferedActivities: eventBuffer.activities.length,
      },
    },
    { status: 200 }
  );
}

/**
 * POST /api/ingest
 * Webhook endpoint for transactions & user activities
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON payload format" },
        { status: 400 }
      );
    }

    const eventType = body.type || (body.amount ? "transaction" : "activity");
    const now = new Date();

    if (eventType === "transaction") {
      const {
        id,
        customerName,
        customerEmail = "guest@checkout.io",
        amount,
        status = "Success",
        item = "Standard Plan",
        paymentMethod = "Stripe",
      } = body;

      if (!customerName || amount === undefined) {
        return NextResponse.json(
          { error: "Missing required fields: customerName and amount" },
          { status: 422 }
        );
      }

      const newTx: Transaction = {
        id: id || `ORD-${Math.floor(7000 + Math.random() * 2999)}`,
        customerName,
        customerEmail,
        amount: Number(amount),
        status,
        item,
        paymentMethod,
        timestamp: "Just now",
      };

      eventBuffer.transactions.unshift(newTx);
      if (eventBuffer.transactions.length > 50) eventBuffer.transactions.pop();
      eventBuffer.totalIngested += 1;
      eventBuffer.lastUpdated = now.toISOString();

      return NextResponse.json(
        {
          success: true,
          status: "PROCESSED",
          type: "transaction",
          transactionId: newTx.id,
          payload: newTx,
        },
        { status: 201 }
      );
    }

    if (eventType === "activity") {
      const {
        id,
        user,
        email,
        description,
        activityType = "signup",
        amount,
      } = body;

      if (!user || !description) {
        return NextResponse.json(
          { error: "Missing required fields: user and description" },
          { status: 422 }
        );
      }

      const newAct: ActivityItem = {
        id: id || `act-${Math.floor(100 + Math.random() * 899)}`,
        type: activityType,
        user,
        email,
        description,
        timestamp: "Just now",
        amount,
      };

      eventBuffer.activities.unshift(newAct);
      if (eventBuffer.activities.length > 50) eventBuffer.activities.pop();
      eventBuffer.totalIngested += 1;
      eventBuffer.lastUpdated = now.toISOString();

      return NextResponse.json(
        {
          success: true,
          status: "PROCESSED",
          type: "activity",
          activityId: newAct.id,
          payload: newAct,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Unknown event type. Expected 'transaction' or 'activity'." },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error processing event" },
      { status: 500 }
    );
  }
}
