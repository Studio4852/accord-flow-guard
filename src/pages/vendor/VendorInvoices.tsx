import { vendorInvoices } from "@/data/seedData";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function VendorInvoices() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-sm text-muted-foreground mt-1">Submitted invoices and payment status</p>
      </div>

      <div className="panel-card overflow-hidden">
        <table className="demo-table">
          <thead>
            <tr><th>Invoice #</th><th>PO Number</th><th>Amount</th><th>Submitted</th><th>Due Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {vendorInvoices.map((inv) => (
              <tr key={inv.id}>
                <td className="font-medium">{inv.id}</td>
                <td className="text-muted-foreground">{inv.poNumber}</td>
                <td>{fmt(inv.amount)}</td>
                <td>{inv.submitted}</td>
                <td>{inv.dueDate}</td>
                <td>
                  <span className={inv.status === "Paid" ? "status-approved" : "status-pending"}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
