export type TransactionStatus = "Success" | "Pending" | "Failed";

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: TransactionStatus;
  item: string;
  paymentMethod: "Stripe" | "Card" | "PayPal" | "Apple Pay";
  timestamp: string;
}

export type ActivityType =
  | "signup"
  | "checkout"
  | "upgrade"
  | "abandoned"
  | "api_key"
  | "refund";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  user: string;
  email?: string;
  description: string;
  timestamp: string;
  amount?: number;
}

export interface RevenueDataPoint {
  date: string;
  day: string;
  revenue: number;
  activeUsers: number;
  orders: number;
  refunds: number;
}

export interface KPIMetric {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  subtext: string;
  sparklineData: number[];
}
