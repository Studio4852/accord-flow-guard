import { useNavigate } from "react-router-dom";
import { vendorBids, vendorInvoices, vendorPayments, vendors } from "@/data/seedData";
import { FileCheck, Gavel, FileText, CreditCard, AlertTriangle, Check } from "lucide-react";
import { motion } from "framer-motion";

const fmt = (n: number) => "₦" + n.toLocaleString();
const vendor = vendors[1]; // Oceanic Logistics (approved vendor)

export default function VendorDashboard() {
  const navigate = useNavigate();

  const cards = [
    { label: "Compliance Score", value: `${vendor.complianceScore}%`, icon: FileCheck, color: "text-emerald-600", onClick: () => navigate("/vendor/compliance") },
    { label: "Active Bids", value: vendorBids.filter(b => b.status === "Under Evaluation").length, icon: Gavel, color: "text-primary", onClick: () => navigate("/vendor/bids") },
    { label: "Pending Invoices", value: vendorInvoices.filter(i => i.status !== "Paid").length, icon: FileText, color: "text-amber-600", onClick: () => navigate("/vendor/invoices") },
    { label: "Pending Payments", value: vendorPayments.filter(p => p.status === "Pending").length, icon: CreditCard, color: "text-primary", onClick: () => navigate("/vendor/payments") },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome, {vendor.contactPerson} — {vendor.name}</p>
      </div>

      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
        <Check className="w-4 h-4" /> Your vendor profile is approved and active
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={c.onClick}
            className="kpi-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{c.label}</span>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </div>
            <p className="text-2xl font-bold">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="panel-card p-5">
        <h2 className="section-header">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Gavel className="w-4 h-4 text-emerald-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Bid Won — Industrial Pump & Valves</p>
              <p className="text-xs text-muted-foreground">RFQ-2026-0015 • ₦890,000</p>
            </div>
            <span className="status-approved">Won</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <FileText className="w-4 h-4 text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Invoice Submitted — INV-2026-0034</p>
              <p className="text-xs text-muted-foreground">PO-2026-0089 • Pending Approval</p>
            </div>
            <span className="status-pending">Pending</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <div className="flex-1">
              <p className="text-sm font-medium">Payment Received — ₦1,250,000</p>
              <p className="text-xs text-muted-foreground">INV-2026-0022 • Bank Transfer</p>
            </div>
            <span className="status-approved">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
