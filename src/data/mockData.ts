import { Transaction, ActivityItem, RevenueDataPoint } from "@/types";

export const initialRevenueData: RevenueDataPoint[] = [
  { day: "Mon", date: "Oct 21", revenue: 5420, activeUsers: 11200, orders: 68, refunds: 120 },
  { day: "Tue", date: "Oct 22", revenue: 6890, activeUsers: 12450, orders: 84, refunds: 90 },
  { day: "Wed", date: "Oct 23", revenue: 6150, activeUsers: 11800, orders: 76, refunds: 150 },
  { day: "Thu", date: "Oct 24", revenue: 7940, activeUsers: 13200, orders: 98, refunds: 80 },
  { day: "Fri", date: "Oct 25", revenue: 8850, activeUsers: 14100, orders: 112, refunds: 210 },
  { day: "Sat", date: "Oct 26", revenue: 10420, activeUsers: 15600, orders: 134, refunds: 140 },
  { day: "Sun", date: "Oct 27", revenue: 11620, activeUsers: 16840, orders: 149, refunds: 110 },
];

export const extended30DaysRevenue: RevenueDataPoint[] = [
  { day: "W1-1", date: "Sep 28", revenue: 4200, activeUsers: 9400, orders: 52, refunds: 80 },
  { day: "W1-3", date: "Sep 30", revenue: 4800, activeUsers: 10100, orders: 59, refunds: 110 },
  { day: "W1-5", date: "Oct 02", revenue: 5300, activeUsers: 10800, orders: 65, refunds: 95 },
  { day: "W2-1", date: "Oct 05", revenue: 5100, activeUsers: 10600, orders: 62, refunds: 70 },
  { day: "W2-3", date: "Oct 07", revenue: 5900, activeUsers: 11400, orders: 71, refunds: 120 },
  { day: "W2-5", date: "Oct 09", revenue: 6400, activeUsers: 12100, orders: 79, refunds: 85 },
  { day: "W3-1", date: "Oct 12", revenue: 6200, activeUsers: 11900, orders: 75, refunds: 90 },
  { day: "W3-3", date: "Oct 14", revenue: 7100, activeUsers: 12800, orders: 88, refunds: 130 },
  { day: "W3-5", date: "Oct 16", revenue: 7800, activeUsers: 13400, orders: 96, refunds: 100 },
  { day: "W4-1", date: "Oct 19", revenue: 7400, activeUsers: 13100, orders: 91, refunds: 80 },
  { day: "W4-3", date: "Oct 21", revenue: 8600, activeUsers: 14200, orders: 106, refunds: 140 },
  { day: "W4-5", date: "Oct 23", revenue: 9400, activeUsers: 15100, orders: 118, refunds: 115 },
  { day: "W4-7", date: "Oct 25", revenue: 10800, activeUsers: 16200, orders: 136, refunds: 125 },
  { day: "W5-2", date: "Oct 27", revenue: 11620, activeUsers: 16840, orders: 149, refunds: 110 },
];

export const initialTransactions: Transaction[] = [
  {
    id: "ORD-7291",
    customerName: "Alex Rivers",
    customerEmail: "alex.rivers@acme.inc",
    amount: 149.0,
    status: "Success",
    item: "Pro Annual Subscription",
    paymentMethod: "Stripe",
    timestamp: "2 mins ago",
  },
  {
    id: "ORD-7290",
    customerName: "Sarah Chen",
    customerEmail: "sarah.chen@linear.dev",
    amount: 29.0,
    status: "Success",
    item: "Starter Monthly Plan",
    paymentMethod: "Card",
    timestamp: "8 mins ago",
  },
  {
    id: "ORD-7289",
    customerName: "Liam Vance",
    customerEmail: "liam@vancecap.com",
    amount: 499.0,
    status: "Pending",
    item: "Enterprise Custom Tier",
    paymentMethod: "Stripe",
    timestamp: "16 mins ago",
  },
  {
    id: "ORD-7288",
    customerName: "Emma Watson",
    customerEmail: "emma.w@designcraft.io",
    amount: 89.0,
    status: "Success",
    item: "Design Kit Bundle",
    paymentMethod: "Apple Pay",
    timestamp: "24 mins ago",
  },
  {
    id: "ORD-7287",
    customerName: "Marcus Sterling",
    customerEmail: "m.sterling@fintech.co",
    amount: 199.0,
    status: "Failed",
    item: "Developer API Expansion",
    paymentMethod: "Card",
    timestamp: "42 mins ago",
  },
  {
    id: "ORD-7286",
    customerName: "Chloe Dupont",
    customerEmail: "chloe@ateliers.fr",
    amount: 59.0,
    status: "Success",
    item: "Add-on Seat (x2)",
    paymentMethod: "PayPal",
    timestamp: "1 hour ago",
  },
  {
    id: "ORD-7285",
    customerName: "Jordan Miller",
    customerEmail: "jordan@millerops.net",
    amount: 149.0,
    status: "Success",
    item: "Pro Annual Subscription",
    paymentMethod: "Stripe",
    timestamp: "2 hours ago",
  },
  {
    id: "ORD-7284",
    customerName: "Hana Takahashi",
    customerEmail: "hana@shibuya.jp",
    amount: 79.0,
    status: "Pending",
    item: "Team Workspace License",
    paymentMethod: "Card",
    timestamp: "3 hours ago",
  },
];

export const initialActivities: ActivityItem[] = [
  {
    id: "act-1",
    type: "upgrade",
    user: "Alex Rivers",
    email: "alex.rivers@acme.inc",
    description: "Upgraded subscription to Pro Annual Plan",
    timestamp: "Just now",
    amount: 149,
  },
  {
    id: "act-2",
    type: "signup",
    user: "David Miller",
    email: "d.miller@cloudops.org",
    description: "Created a new workspace account",
    timestamp: "3m ago",
  },
  {
    id: "act-3",
    type: "checkout",
    user: "Sarah Chen",
    email: "sarah.chen@linear.dev",
    description: "Completed checkout for Starter Plan ($29.00)",
    timestamp: "8m ago",
    amount: 29,
  },
  {
    id: "act-4",
    type: "abandoned",
    user: "Anonymous Guest #391",
    description: "Cart abandoned during checkout step",
    timestamp: "14m ago",
  },
  {
    id: "act-5",
    type: "api_key",
    user: "Kavita Patel",
    email: "kavita@nexusai.io",
    description: "Generated a new Production API key",
    timestamp: "22m ago",
  },
  {
    id: "act-6",
    type: "checkout",
    user: "Emma Watson",
    email: "emma.w@designcraft.io",
    description: "Purchased Design Kit Bundle ($89.00)",
    timestamp: "24m ago",
    amount: 89,
  },
  {
    id: "act-7",
    type: "refund",
    user: "Marcus Sterling",
    email: "m.sterling@fintech.co",
    description: "Card payment declined by issuing bank",
    timestamp: "42m ago",
  },
  {
    id: "act-8",
    type: "signup",
    user: "Elena Rostova",
    email: "elena@berlintech.de",
    description: "Signed up via Google OAuth",
    timestamp: "55m ago",
  },
];

const mockUsers = [
  { name: "Lucas Vance", email: "lucas.v@zenith.co" },
  { name: "Sophie Martin", email: "sophie.m@parisdev.fr" },
  { name: "Kenji Sato", email: "kenji@tokyolab.jp" },
  { name: "Rachel Adams", email: "rachel@austinstartups.io" },
  { name: "Daniel Craig", email: "daniel@londoncloud.uk" },
  { name: "Maya Lin", email: "maya@singaporefin.sg" },
];

const mockItems = [
  { item: "Pro Annual Subscription", amount: 149.0 },
  { item: "Starter Monthly Plan", amount: 29.0 },
  { item: "Team Workspace License", amount: 79.0 },
  { item: "API Tier Expansion", amount: 199.0 },
  { item: "Add-on Seat (x1)", amount: 15.0 },
  { item: "Enterprise Add-on Pack", amount: 350.0 },
];

/**
 * Generates a realistic simulated SaaS transaction.
 */
export function generateMockTransaction(): Transaction {
  const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const item = mockItems[Math.floor(Math.random() * mockItems.length)];
  const idNum = Math.floor(7000 + Math.random() * 2999);

  const isFailed = Math.random() < 0.08;
  const isPending = !isFailed && Math.random() < 0.2;
  const status: Transaction["status"] = isFailed ? "Failed" : isPending ? "Pending" : "Success";

  const paymentMethods: Transaction["paymentMethod"][] = ["Stripe", "Card", "Apple Pay", "PayPal"];
  const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

  return {
    id: `ORD-${idNum}`,
    customerName: user.name,
    customerEmail: user.email,
    amount: item.amount,
    status,
    item: item.item,
    paymentMethod,
    timestamp: "Just now",
  };
}

/**
 * Generates a realistic simulated user activity log.
 */
export function generateMockActivity(): ActivityItem {
  const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
  const id = `act-${Math.floor(100 + Math.random() * 899)}`;

  const activityTemplates: Array<{
    type: ActivityItem["type"];
    description: string;
    amount?: number;
  }> = [
    { type: "signup", description: "Created a new workspace account" },
    { type: "checkout", description: "Purchased Starter Plan ($29.00)", amount: 29 },
    { type: "upgrade", description: "Upgraded subscription to Pro Annual Plan", amount: 149 },
    { type: "abandoned", description: "Cart abandoned during checkout step" },
    { type: "api_key", description: "Generated a new Production API key" },
    { type: "signup", description: "Signed up via GitHub OAuth" },
  ];

  const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];

  return {
    id,
    type: template.type,
    user: user.name,
    email: user.email,
    description: template.description,
    timestamp: "Just now",
    amount: template.amount,
  };
}
