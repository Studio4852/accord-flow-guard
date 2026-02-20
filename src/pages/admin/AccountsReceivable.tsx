import { receivables } from "@/data/seedData";
import { AlertTriangle, Check, CreditCard } from "lucide-react";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function AccountsReceivable() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Accounts Receivable</h1>
        <p className="text-sm text-muted-foreground mt-1">Invoice generation, credit control, and payment posting</p>
      </div>

      {/* Invoice Generation Preview */}
      <div className="panel-card p-5">
        <h2 className="section-header">Invoice Generation</h2>
        <div className="p-4 rounded-lg bg-muted/50 border">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Sales Order:</span> <span className="font-medium">SO-2026-0045</span></div>
            <div><span className="text-muted-foreground">Client:</span> <span className="font-medium">Dangote Industries</span></div>
            <div><span className="text-muted-foreground">Invoice Number:</span> <span className="font-medium">AR-INV-2026-0012</span></div>
            <div><span className="text-muted-foreground">Status:</span> <span className="status-pending">Generated</span></div>
          </div>
        </div>
      </div>

      {/* Credit Limit Alerts */}
      <div className="panel-card p-5">
        <h2 className="section-header">Credit Limit Control</h2>
        <div className="space-y-3">
          {receivables.map((r) => {
            const utilization = ((r.outstanding / r.creditLimit) * 100);
            const exceeded = utilization > 80;
            return (
              <div key={r.id} className={`p-4 rounded-lg border ${exceeded ? "border-red-200 bg-red-50" : "bg-muted/30"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{r.client}</span>
                  {exceeded && <span className="status-rejected flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Credit Alert</span>}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Credit Limit</span><p className="font-semibold">{fmt(r.creditLimit)}</p></div>
                  <div><span className="text-muted-foreground">Outstanding</span><p className="font-semibold">{fmt(r.outstanding)}</p></div>
                  <div><span className="text-muted-foreground">Utilization</span><p className={`font-semibold ${exceeded ? "text-red-600" : "text-emerald-600"}`}>{utilization.toFixed(0)}%</p></div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div className={`rounded-full h-1.5 ${exceeded ? "bg-red-500" : "bg-emerald-500"}`} style={{ width: `${Math.min(utilization, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overdue Invoices */}
      <div className="panel-card overflow-hidden">
        <div className="p-4 border-b"><h2 className="section-header mb-0">Overdue Receivables</h2></div>
        <table className="demo-table">
          <thead>
            <tr><th>Invoice #</th><th>Client</th><th>Amount</th><th>Due Date</th><th>Days Overdue</th><th>Status</th></tr>
          </thead>
          <tbody>
            {receivables.map((r) => (
              <tr key={r.id}>
                <td className="font-medium">{r.id}</td>
                <td>{r.client}</td>
                <td>{fmt(r.amount)}</td>
                <td>{r.dueDate}</td>
                <td>{r.daysOverdue > 0 ? <span className="text-red-600 font-semibold">{r.daysOverdue} days</span> : "—"}</td>
                <td>
                  <span className={r.status === "Paid" ? "status-approved" : r.status === "Overdue" ? "status-overdue" : "status-pending"}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Posting */}
      <div className="panel-card p-5">
        <h2 className="section-header">Payment Posting</h2>
        <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">Payment Received & Posted</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-emerald-700">Invoice:</span> <span className="font-medium">AR-INV-2026-0018</span></div>
            <div><span className="text-emerald-700">Client:</span> <span className="font-medium">Flour Mills Plc</span></div>
            <div><span className="text-emerald-700">Amount:</span> <span className="font-medium">{fmt(890000)}</span></div>
            <div><span className="text-emerald-700">Status:</span> <span className="font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Fully Settled</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
