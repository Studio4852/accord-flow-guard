// ==================== BUDGET DATA ====================
export const departmentBudgets = [
  { department: "Engineering", approved: 2500000, actual: 2180000, locked: true, approver: "CFO Sarah Chen", lockedAt: "2026-01-15 09:30" },
  { department: "Operations", approved: 1800000, actual: 1920000, locked: true, approver: "CFO Sarah Chen", lockedAt: "2026-01-15 09:30" },
  { department: "Procurement", approved: 950000, actual: 720000, locked: true, approver: "CFO Sarah Chen", lockedAt: "2026-01-15 09:30" },
  { department: "IT Services", approved: 1200000, actual: 1185000, locked: false, approver: "", lockedAt: "" },
  { department: "Facilities", approved: 600000, actual: 685000, locked: true, approver: "CFO Sarah Chen", lockedAt: "2026-01-20 14:15" },
  { department: "HSE", approved: 400000, actual: 310000, locked: true, approver: "CFO Sarah Chen", lockedAt: "2026-01-20 14:15" },
];

export const getBudgetVariance = (approved: number, actual: number) => {
  const variance = approved - actual;
  const pct = ((variance / approved) * 100);
  if (pct >= 10) return { amount: variance, status: "Green" as const, pct };
  if (pct >= 0) return { amount: variance, status: "Amber" as const, pct };
  return { amount: variance, status: "Red" as const, pct };
};

// ==================== VENDOR DATA ====================
export interface VendorDocument {
  type: string;
  fileName: string;
  uploadDate: string;
  expiryDate: string;
  status: "Approved" | "Under Review" | "Rejected" | "Expired" | "Expiring Soon";
  rejectionComment?: string;
}

export interface Vendor {
  id: string;
  name: string;
  regNumber: string;
  category: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  yearsInOperation: number;
  companyType: string;
  taxId: string;
  vatReg: string;
  isoStatus: string;
  hsePolicy: boolean;
  qualityManual: boolean;
  bankName: string;
  accountName: string;
  accountNumber: string;
  referenceName: string;
  referenceContact: string;
  referencePhone: string;
  status: "Pending" | "Approved" | "Rejected" | "Blacklisted";
  blacklistReason?: string;
  missingDocs: number;
  expiryAlerts: number;
  submissionDate: string;
  complianceScore: number;
  documents: VendorDocument[];
  auditTrail: { action: string; user: string; comment: string; date: string }[];
}

export const vendors: Vendor[] = [
  {
    id: "V001",
    name: "Vertex Industrial Supplies",
    regNumber: "RC-2019-44521",
    category: "Industrial Equipment",
    address: "14 Marina Road, Lagos",
    contactPerson: "Adebayo Johnson",
    phone: "+234 801 234 5678",
    email: "adebayo@vertexsupplies.com",
    yearsInOperation: 8,
    companyType: "Limited Liability",
    taxId: "TIN-9920145",
    vatReg: "VAT-8812003",
    isoStatus: "Pending",
    hsePolicy: true,
    qualityManual: false,
    bankName: "First Bank",
    accountName: "Vertex Industrial Supplies Ltd",
    accountNumber: "2034567890",
    referenceName: "Shell Nigeria",
    referenceContact: "Mark Obi",
    referencePhone: "+234 802 345 6789",
    status: "Pending",
    missingDocs: 2,
    expiryAlerts: 1,
    submissionDate: "2026-02-10",
    complianceScore: 65,
    documents: [
      { type: "CAC Certificate", fileName: "cac_vertex.pdf", uploadDate: "2026-02-10", expiryDate: "2027-02-10", status: "Approved" },
      { type: "TIN Certificate", fileName: "tin_vertex.pdf", uploadDate: "2026-02-10", expiryDate: "2027-02-10", status: "Under Review" },
      { type: "VAT Certificate", fileName: "", uploadDate: "", expiryDate: "", status: "Rejected", rejectionComment: "Document is illegible. Please re-upload a clear copy." },
      { type: "ISO Certificate", fileName: "", uploadDate: "", expiryDate: "", status: "Under Review" },
      { type: "HSE Policy", fileName: "hse_vertex.pdf", uploadDate: "2026-02-10", expiryDate: "2026-03-15", status: "Expiring Soon" },
      { type: "Quality Manual", fileName: "", uploadDate: "", expiryDate: "", status: "Rejected", rejectionComment: "Missing sections on quality assurance procedures." },
    ],
    auditTrail: [
      { action: "Submitted Application", user: "Adebayo Johnson", comment: "Vendor registration submitted", date: "2026-02-10 09:15" },
      { action: "Document Rejected", user: "Admin Fatima", comment: "VAT Certificate illegible", date: "2026-02-12 11:30" },
    ],
  },
  {
    id: "V002",
    name: "Oceanic Logistics Ltd",
    regNumber: "RC-2015-33210",
    category: "Logistics & Transport",
    address: "45 Apapa Wharf Road, Lagos",
    contactPerson: "Chioma Nwosu",
    phone: "+234 803 456 7890",
    email: "chioma@oceaniclogistics.com",
    yearsInOperation: 12,
    companyType: "Public Limited",
    taxId: "TIN-7718923",
    vatReg: "VAT-6609182",
    isoStatus: "ISO 9001:2015 Certified",
    hsePolicy: true,
    qualityManual: true,
    bankName: "GTBank",
    accountName: "Oceanic Logistics Ltd",
    accountNumber: "0145678923",
    referenceName: "TotalEnergies",
    referenceContact: "Pierre Dupont",
    referencePhone: "+234 804 567 8901",
    status: "Approved",
    missingDocs: 0,
    expiryAlerts: 0,
    submissionDate: "2026-01-05",
    complianceScore: 100,
    documents: [
      { type: "CAC Certificate", fileName: "cac_oceanic.pdf", uploadDate: "2026-01-05", expiryDate: "2028-01-05", status: "Approved" },
      { type: "TIN Certificate", fileName: "tin_oceanic.pdf", uploadDate: "2026-01-05", expiryDate: "2028-01-05", status: "Approved" },
      { type: "VAT Certificate", fileName: "vat_oceanic.pdf", uploadDate: "2026-01-05", expiryDate: "2028-01-05", status: "Approved" },
      { type: "ISO Certificate", fileName: "iso_oceanic.pdf", uploadDate: "2026-01-05", expiryDate: "2028-01-05", status: "Approved" },
      { type: "HSE Policy", fileName: "hse_oceanic.pdf", uploadDate: "2026-01-05", expiryDate: "2027-06-30", status: "Approved" },
      { type: "Quality Manual", fileName: "qm_oceanic.pdf", uploadDate: "2026-01-05", expiryDate: "2027-06-30", status: "Approved" },
    ],
    auditTrail: [
      { action: "Submitted Application", user: "Chioma Nwosu", comment: "Full compliance package submitted", date: "2026-01-05 08:00" },
      { action: "Vendor Approved", user: "Admin Fatima", comment: "All documents verified and compliant", date: "2026-01-08 16:45" },
    ],
  },
  {
    id: "V003",
    name: "Delta Construction Co",
    regNumber: "RC-2012-11098",
    category: "Construction",
    address: "22 Warri Industrial Area, Delta",
    contactPerson: "Emeka Okafor",
    phone: "+234 805 678 9012",
    email: "emeka@deltaconst.com",
    yearsInOperation: 15,
    companyType: "Limited Liability",
    taxId: "TIN-5547821",
    vatReg: "VAT-4401293",
    isoStatus: "Expired",
    hsePolicy: false,
    qualityManual: false,
    bankName: "Zenith Bank",
    accountName: "Delta Construction Co Ltd",
    accountNumber: "1098765432",
    referenceName: "NNPC",
    referenceContact: "Ibrahim Musa",
    referencePhone: "+234 806 789 0123",
    status: "Blacklisted",
    blacklistReason: "Fraud — Compliance failure: Submitted forged ISO certification and falsified reference documents.",
    missingDocs: 3,
    expiryAlerts: 2,
    submissionDate: "2025-11-20",
    complianceScore: 20,
    documents: [
      { type: "CAC Certificate", fileName: "cac_delta.pdf", uploadDate: "2025-11-20", expiryDate: "2026-11-20", status: "Approved" },
      { type: "TIN Certificate", fileName: "tin_delta.pdf", uploadDate: "2025-11-20", expiryDate: "2026-11-20", status: "Approved" },
      { type: "ISO Certificate", fileName: "iso_delta_forged.pdf", uploadDate: "2025-11-20", expiryDate: "2025-12-01", status: "Expired" },
      { type: "HSE Policy", fileName: "", uploadDate: "", expiryDate: "", status: "Rejected", rejectionComment: "Not submitted" },
    ],
    auditTrail: [
      { action: "Submitted Application", user: "Emeka Okafor", comment: "", date: "2025-11-20 10:00" },
      { action: "Document Rejected", user: "Admin Fatima", comment: "ISO certificate appears forged", date: "2025-12-01 09:00" },
      { action: "Vendor Blacklisted", user: "Admin Director", comment: "Fraud — Compliance failure", date: "2025-12-05 14:30" },
    ],
  },
];

// ==================== PROCUREMENT JOURNEY ====================
export const procurementCase = {
  id: "PR-2026-0042",
  requester: "John Adeyemi",
  department: "Engineering",
  budgetAvailable: true,
  items: [
    { description: "Industrial Pump Unit Model X-400", qty: 5, unitPrice: 85000, total: 425000 },
    { description: "Control Valve Assembly CV-200", qty: 10, unitPrice: 32000, total: 320000 },
    { description: "Pressure Gauges PG-100", qty: 20, unitPrice: 4500, total: 90000 },
  ],
  totalAmount: 835000,
  currentStage: 3, // 0-indexed: PO stage
  stages: [
    { name: "Purchase Requisition", status: "completed", date: "2026-02-01", approver: "Dept Manager" },
    { name: "RFQ", status: "completed", date: "2026-02-05", approver: "Procurement Team" },
    { name: "Vendor Evaluation", status: "completed", date: "2026-02-10", approver: "Evaluation Panel" },
    { name: "Purchase Order", status: "active", date: "2026-02-14", approver: "Procurement Manager" },
    { name: "Delivery", status: "pending", date: "", approver: "" },
    { name: "GRN", status: "pending", date: "", approver: "" },
  ],
  rfq: { invitedVendors: 4, deadline: "2026-02-08", status: "Closed" },
  evaluation: {
    vendors: [
      { name: "Vertex Industrial", price: 835000, quality: 78, delivery: 85, total: 81 },
      { name: "Oceanic Logistics", price: 890000, quality: 92, delivery: 90, total: 91 },
      { name: "MechPro Supplies", price: 810000, quality: 70, delivery: 75, total: 73 },
    ],
    recommended: "Oceanic Logistics",
  },
  po: { number: "PO-2026-0089", status: "Approved", amount: 890000 },
  delivery: { date: "2026-02-28", inspection: "Pending" },
  grn: { status: "Pending" },
};

// ==================== INVOICES & PAYABLES ====================
export const invoices = [
  {
    id: "INV-2026-0034",
    supplier: "Oceanic Logistics Ltd",
    poNumber: "PO-2026-0089",
    grnNumber: "GRN-2026-0021",
    amount: 890000,
    dueDate: "2026-03-15",
    status: "Pending Approval",
    priority: "High",
    isOverdue: false,
    invoiceItems: [
      { description: "Industrial Pump Unit", qty: 5, unitPrice: 89000, total: 445000 },
      { description: "Control Valve Assembly", qty: 10, unitPrice: 34000, total: 340000 },
      { description: "Pressure Gauges", qty: 20, unitPrice: 5250, total: 105000 },
    ],
    poItems: [
      { description: "Industrial Pump Unit", qty: 5, unitPrice: 85000, total: 425000 },
      { description: "Control Valve Assembly", qty: 10, unitPrice: 32000, total: 320000 },
      { description: "Pressure Gauges", qty: 20, unitPrice: 4500, total: 90000 },
    ],
    grnItems: [
      { description: "Industrial Pump Unit", qty: 5, received: 5, status: "OK" },
      { description: "Control Valve Assembly", qty: 10, received: 10, status: "OK" },
      { description: "Pressure Gauges", qty: 20, received: 18, status: "Short" },
    ],
    approvalSteps: [
      { step: "Finance Officer", approver: "Ade Bankole", status: "Approved", date: "2026-02-18 10:00" },
      { step: "Finance Manager", approver: "Sarah Chen", status: "Pending", date: "" },
      { step: "CFO", approver: "Dr. James Obi", status: "Pending", date: "" },
    ],
  },
  {
    id: "INV-2026-0029",
    supplier: "MechPro Supplies",
    poNumber: "PO-2026-0072",
    grnNumber: "GRN-2026-0018",
    amount: 245000,
    dueDate: "2026-02-10",
    status: "Overdue",
    priority: "Critical",
    isOverdue: true,
    invoiceItems: [
      { description: "Safety Helmets", qty: 100, unitPrice: 2450, total: 245000 },
    ],
    poItems: [
      { description: "Safety Helmets", qty: 100, unitPrice: 2450, total: 245000 },
    ],
    grnItems: [
      { description: "Safety Helmets", qty: 100, received: 100, status: "OK" },
    ],
    approvalSteps: [
      { step: "Finance Officer", approver: "Ade Bankole", status: "Approved", date: "2026-02-05 14:30" },
      { step: "Finance Manager", approver: "Sarah Chen", status: "Approved", date: "2026-02-06 09:15" },
      { step: "CFO", approver: "Dr. James Obi", status: "Approved", date: "2026-02-07 11:00" },
    ],
  },
];

// ==================== ACCOUNTS RECEIVABLE ====================
export const receivables = [
  { id: "AR-INV-2026-0012", client: "Dangote Industries", amount: 3200000, outstanding: 1800000, creditLimit: 5000000, dueDate: "2026-02-15", daysOverdue: 5, status: "Overdue" },
  { id: "AR-INV-2026-0015", client: "Nigerian Breweries", amount: 1500000, outstanding: 1500000, creditLimit: 3000000, dueDate: "2026-03-01", daysOverdue: 0, status: "Current" },
  { id: "AR-INV-2026-0018", client: "Flour Mills Plc", amount: 890000, outstanding: 0, creditLimit: 2000000, dueDate: "2026-02-20", daysOverdue: 0, status: "Paid" },
];

// ==================== CONTRACTS ====================
export const contracts = [
  { number: "CON-2025-0098", vendor: "Oceanic Logistics Ltd", startDate: "2025-03-01", endDate: "2026-03-01", value: 12500000, status: "Active", daysToExpiry: 9 },
  { number: "CON-2025-0112", vendor: "Vertex Industrial Supplies", startDate: "2025-06-15", endDate: "2026-06-15", value: 8900000, status: "Active", daysToExpiry: 115 },
  { number: "CON-2024-0067", vendor: "MechPro Supplies", startDate: "2024-01-01", endDate: "2025-12-31", value: 5600000, status: "Expired", daysToExpiry: 0 },
  { number: "CON-2025-0134", vendor: "Delta Construction Co", startDate: "2025-09-01", endDate: "2026-03-15", value: 22000000, status: "Active", daysToExpiry: 23 },
];

// ==================== AUDIT LOGS ====================
export const auditLogs = [
  { user: "Admin Fatima", action: "Approved Vendor", module: "Vendor Onboarding", reference: "V002", timestamp: "2026-01-08 16:45", comment: "All documents verified" },
  { user: "Admin Director", action: "Blacklisted Vendor", module: "Vendor Onboarding", reference: "V003", timestamp: "2025-12-05 14:30", comment: "Fraud — Compliance failure" },
  { user: "John Adeyemi", action: "Created PR", module: "Procurement", reference: "PR-2026-0042", timestamp: "2026-02-01 09:00", comment: "Engineering equipment request" },
  { user: "Procurement Team", action: "Issued RFQ", module: "Procurement", reference: "RFQ-2026-0015", timestamp: "2026-02-05 10:30", comment: "4 vendors invited" },
  { user: "Evaluation Panel", action: "Completed Evaluation", module: "Procurement", reference: "EVAL-2026-0008", timestamp: "2026-02-10 15:00", comment: "Oceanic Logistics recommended" },
  { user: "Procurement Manager", action: "Approved PO", module: "Procurement", reference: "PO-2026-0089", timestamp: "2026-02-14 11:00", comment: "PO approved and sent to vendor" },
  { user: "Ade Bankole", action: "Approved Invoice", module: "Accounts Payable", reference: "INV-2026-0034", timestamp: "2026-02-18 10:00", comment: "First level approval" },
  { user: "Sarah Chen", action: "Approved Invoice", module: "Accounts Payable", reference: "INV-2026-0029", timestamp: "2026-02-06 09:15", comment: "Payment approved" },
  { user: "Admin Fatima", action: "Rejected Document", module: "Vendor Onboarding", reference: "V001-VAT", timestamp: "2026-02-12 11:30", comment: "VAT Certificate illegible" },
  { user: "CFO Sarah Chen", action: "Locked Budget", module: "Budget Control", reference: "FY2026-Q1", timestamp: "2026-01-15 09:30", comment: "Q1 budgets locked" },
  { user: "Admin Fatima", action: "Login", module: "Authentication", reference: "Session-4421", timestamp: "2026-02-20 08:00", comment: "" },
  { user: "John Adeyemi", action: "Login", module: "Authentication", reference: "Session-4418", timestamp: "2026-02-20 07:45", comment: "" },
  { user: "Chioma Nwosu", action: "Logout", module: "Authentication", reference: "Session-4410", timestamp: "2026-02-19 18:00", comment: "" },
];

// ==================== VENDOR PORTAL DATA ====================
export const vendorOpportunities = [
  { id: "RFQ-2026-0020", title: "Office Furniture Supply", department: "Facilities", deadline: "2026-03-05", budget: "₦5,000,000", status: "Open" },
  { id: "RFQ-2026-0022", title: "IT Network Equipment", department: "IT Services", deadline: "2026-03-10", budget: "₦12,000,000", status: "Open" },
  { id: "RFQ-2026-0018", title: "Safety Equipment Supply", department: "HSE", deadline: "2026-02-25", budget: "₦3,200,000", status: "Closing Soon" },
];

export const vendorBids = [
  { id: "BID-2026-0045", rfq: "RFQ-2026-0015", title: "Industrial Pump & Valves", amount: 890000, submitted: "2026-02-06", status: "Won" },
  { id: "BID-2026-0039", rfq: "RFQ-2026-0012", title: "Pipe Fittings Supply", amount: 450000, submitted: "2026-01-28", status: "Under Evaluation" },
  { id: "BID-2026-0032", rfq: "RFQ-2026-0008", title: "Welding Consumables", amount: 220000, submitted: "2026-01-15", status: "Lost" },
];

export const vendorInvoices = [
  { id: "INV-2026-0034", poNumber: "PO-2026-0089", amount: 890000, submitted: "2026-02-16", status: "Pending Approval", dueDate: "2026-03-15" },
  { id: "INV-2026-0022", poNumber: "PO-2025-0198", amount: 1250000, submitted: "2025-12-20", status: "Paid", dueDate: "2026-01-20" },
];

export const vendorPayments = [
  { id: "PAY-2026-0011", invoice: "INV-2026-0022", amount: 1250000, date: "2026-01-18", method: "Bank Transfer", status: "Completed" },
  { id: "PAY-2026-0019", invoice: "INV-2026-0034", amount: 890000, date: "", method: "", status: "Pending" },
];

// ==================== KPI CALCULATIONS ====================
export const getKPIs = () => {
  const totalBudget = departmentBudgets.reduce((s, d) => s + d.approved, 0);
  const totalSpend = departmentBudgets.reduce((s, d) => s + d.actual, 0);
  const pendingApprovals = 4; // PR:1, PO:0, Invoice:1, Vendor:1
  const overduePayables = invoices.filter(i => i.isOverdue).length;
  const overdueReceivables = receivables.filter(r => r.status === "Overdue").length;

  return { totalBudget, totalSpend, pendingApprovals, overduePayables, overdueReceivables };
};
