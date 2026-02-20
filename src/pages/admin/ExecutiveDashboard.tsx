import { useNavigate } from "react-router-dom";
import { getKPIs, vendors, contracts, invoices } from "@/data/seedData";
import { TrendingUp, TrendingDown, Clock, AlertTriangle, DollarSign, Users, FileWarning, CalendarClock } from "lucide-react";
import { motion } from "framer-motion";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const kpi = getKPIs();

  const kpiCards = [
    { label: "Approved Budget", value: fmt(kpi.totalBudget), icon: DollarSign, color: "text-primary", onClick: () => navigate("/admin/budget") },
    { label: "Spend to Date", value: fmt(kpi.totalSpend), icon: TrendingUp, color: "text-emerald-600", onClick: () => navigate("/admin/budget") },
    { label: "Pending Approvals", value: kpi.pendingApprovals, icon: Clock, color: "text-amber-600", onClick: () => navigate("/admin/procurement") },
    { label: "Overdue Payables", value: kpi.overduePayables, icon: TrendingDown, color: "text-red-600", onClick: () => navigate("/admin/payable") },
    { label: "Overdue Receivables", value: kpi.overdueReceivables, icon: AlertTriangle, color: "text-red-600", onClick: () => navigate("/admin/receivable") },
  ];

  const complianceAlerts = vendors.filter(v => v.missingDocs > 0 || v.expiryAlerts > 0);
  const expiringContracts = contracts.filter(c => c.daysToExpiry > 0 && c.daysToExpiry <= 30);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">E-Procurement governance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={kpi.onClick}
            className="kpi-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Vendor Compliance Alerts */}
        <div className="panel-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileWarning className="w-4 h-4 text-amber-600" />
            <h2 className="section-header mb-0">Vendor Compliance Alerts</h2>
          </div>
          {complianceAlerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No alerts</p>
          ) : (
            <div className="space-y-3">
              {complianceAlerts.map((v) => (
                <div
                  key={v.id}
                  onClick={() => navigate("/admin/vendors")}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.missingDocs} missing docs • {v.expiryAlerts} expiry alerts</p>
                  </div>
                  <span className={v.status === "Blacklisted" ? "status-blacklisted" : v.status === "Pending" ? "status-pending" : "status-approved"}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contract Expiry Alerts */}
        <div className="panel-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock className="w-4 h-4 text-red-600" />
            <h2 className="section-header mb-0">Contract Expiry Alerts</h2>
          </div>
          {expiringContracts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No expiring contracts</p>
          ) : (
            <div className="space-y-3">
              {expiringContracts.map((c) => (
                <div
                  key={c.number}
                  onClick={() => navigate("/admin/contracts")}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{c.vendor}</p>
                    <p className="text-xs text-muted-foreground">{c.number} • Ends {c.endDate}</p>
                  </div>
                  <span className="status-expiring">{c.daysToExpiry} days</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Approvals Breakdown */}
      <div className="panel-card p-5">
        <h2 className="section-header">Pending Approvals by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: "PR Approvals", count: 1, path: "/admin/procurement" },
            { type: "PO Approvals", count: 1, path: "/admin/procurement" },
            { type: "Invoice Approvals", count: 1, path: "/admin/payable" },
            { type: "Vendor Onboarding", count: 1, path: "/admin/vendors" },
          ].map((item) => (
            <div
              key={item.type}
              onClick={() => navigate(item.path)}
              className="p-4 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors text-center"
            >
              <p className="text-2xl font-bold text-foreground">{item.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
