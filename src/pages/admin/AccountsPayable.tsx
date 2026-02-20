import { useState } from "react";
import { invoices } from "@/data/seedData";
import { AlertTriangle, Check, X, FileText } from "lucide-react";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function AccountsPayable() {
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Accounts Payable</h1>
        <p className="text-sm text-muted-foreground mt-1">Invoice matching, approval workflow, and payment control</p>
      </div>

      {/* Invoice Matching - 3 Column */}
      <div className="panel-card p-5">
        <h2 className="section-header">Invoice Matching — {selectedInvoice.id}</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Invoice */}
          <div className="border rounded-lg p-3">
            <h3 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1"><FileText className="w-3 h-3" /> Invoice</h3>
            <table className="w-full text-xs">
              <thead><tr><th className="text-left pb-2 text-muted-foreground">Item</th><th className="text-right pb-2 text-muted-foreground">Qty</th><th className="text-right pb-2 text-muted-foreground">Total</th></tr></thead>
              <tbody>
                {selectedInvoice.invoiceItems.map((item, i) => (
                  <tr key={i}>
                    <td className="py-1">{item.description}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{fmt(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr><td colSpan={2} className="pt-2 font-semibold">Total</td><td className="text-right pt-2 font-semibold">{fmt(selectedInvoice.amount)}</td></tr></tfoot>
            </table>
          </div>

          {/* PO */}
          <div className="border rounded-lg p-3">
            <h3 className="text-xs font-semibold text-primary mb-2">Purchase Order — {selectedInvoice.poNumber}</h3>
            <table className="w-full text-xs">
              <thead><tr><th className="text-left pb-2 text-muted-foreground">Item</th><th className="text-right pb-2 text-muted-foreground">Qty</th><th className="text-right pb-2 text-muted-foreground">Total</th></tr></thead>
              <tbody>
                {selectedInvoice.poItems.map((item, i) => {
                  const invItem = selectedInvoice.invoiceItems[i];
                  const mismatch = invItem && invItem.total !== item.total;
                  return (
                    <tr key={i} className={mismatch ? "bg-red-50" : ""}>
                      <td className="py-1">{item.description}</td>
                      <td className="text-right">{item.qty}</td>
                      <td className="text-right">{fmt(item.total)} {mismatch && <AlertTriangle className="w-3 h-3 text-red-500 inline ml-1" />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* GRN */}
          <div className="border rounded-lg p-3">
            <h3 className="text-xs font-semibold text-primary mb-2">GRN — {selectedInvoice.grnNumber}</h3>
            <table className="w-full text-xs">
              <thead><tr><th className="text-left pb-2 text-muted-foreground">Item</th><th className="text-right pb-2 text-muted-foreground">Ordered</th><th className="text-right pb-2 text-muted-foreground">Received</th><th className="text-right pb-2 text-muted-foreground">Status</th></tr></thead>
              <tbody>
                {selectedInvoice.grnItems.map((item, i) => (
                  <tr key={i} className={item.status !== "OK" ? "bg-red-50" : ""}>
                    <td className="py-1">{item.description}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{item.received}</td>
                    <td className="text-right">{item.status === "OK" ? <Check className="w-3 h-3 text-emerald-600 inline" /> : <span className="text-red-600 font-medium">{item.status}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mismatch Warning */}
        {selectedInvoice.id === "INV-2026-0034" && (
          <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span><strong>Mismatch Detected:</strong> Invoice amount exceeds PO. Unit price variance on 2 items. Approval blocked pending review.</span>
          </div>
        )}
      </div>

      {/* Bills to Pay */}
      <div className="panel-card overflow-hidden">
        <div className="p-4 border-b"><h2 className="section-header mb-0">Bills to Pay</h2></div>
        <table className="demo-table">
          <thead>
            <tr><th>Supplier</th><th>Invoice #</th><th>Amount</th><th>Due Date</th><th>Priority</th><th>Status</th></tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} onClick={() => setSelectedInvoice(inv)} className={`cursor-pointer ${selectedInvoice.id === inv.id ? "bg-accent" : ""}`}>
                <td className="font-medium">{inv.supplier}</td>
                <td>{inv.id}</td>
                <td>{fmt(inv.amount)}</td>
                <td>{inv.dueDate}</td>
                <td><span className={inv.priority === "Critical" ? "status-rejected" : "status-pending"}>{inv.priority}</span></td>
                <td>{inv.isOverdue ? <span className="status-overdue">Overdue</span> : <span className="status-pending">{inv.status}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approval Workflow */}
      <div className="panel-card p-5">
        <h2 className="section-header">Approval Workflow — {selectedInvoice.id}</h2>
        <div className="space-y-3">
          {selectedInvoice.approvalSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step.status === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
              }`}>{i + 1}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{step.step}</p>
                <p className="text-xs text-muted-foreground">{step.approver} {step.date && `• ${step.date}`}</p>
              </div>
              <span className={step.status === "Approved" ? "status-approved" : "status-pending"}>{step.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Voucher Preview */}
      {selectedInvoice.approvalSteps.every(s => s.status === "Approved") && (
        <div className="panel-card p-5 border-l-4 border-l-emerald-500">
          <h2 className="section-header">Payment Voucher — Auto Generated</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Voucher No:</span> <span className="font-medium">PV-2026-0029</span></div>
            <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">2026-02-07</span></div>
            <div><span className="text-muted-foreground">Amount:</span> <span className="font-medium">{fmt(selectedInvoice.amount)}</span></div>
            <div><span className="text-muted-foreground">Status:</span> <span className="status-approved">Signed & Posted</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
