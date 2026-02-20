import { vendorPayments } from "@/data/seedData";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function VendorPayments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-sm text-muted-foreground mt-1">Payment history and pending disbursements</p>
      </div>

      <div className="panel-card overflow-hidden">
        <table className="demo-table">
          <thead>
            <tr><th>Payment ID</th><th>Invoice</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr>
          </thead>
          <tbody>
            {vendorPayments.map((pay) => (
              <tr key={pay.id}>
                <td className="font-medium">{pay.id}</td>
                <td className="text-muted-foreground">{pay.invoice}</td>
                <td>{fmt(pay.amount)}</td>
                <td>{pay.date || "—"}</td>
                <td>{pay.method || "—"}</td>
                <td>
                  <span className={pay.status === "Completed" ? "status-approved" : "status-pending"}>{pay.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
