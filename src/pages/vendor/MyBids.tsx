import { vendorBids } from "@/data/seedData";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function MyBids() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">My Bids</h1>
        <p className="text-sm text-muted-foreground mt-1">Track submitted bids and outcomes</p>
      </div>

      <div className="panel-card overflow-hidden">
        <table className="demo-table">
          <thead>
            <tr><th>Bid ID</th><th>RFQ</th><th>Title</th><th>Amount</th><th>Submitted</th><th>Status</th></tr>
          </thead>
          <tbody>
            {vendorBids.map((bid) => (
              <tr key={bid.id}>
                <td className="font-medium">{bid.id}</td>
                <td className="text-muted-foreground">{bid.rfq}</td>
                <td>{bid.title}</td>
                <td>{fmt(bid.amount)}</td>
                <td>{bid.submitted}</td>
                <td>
                  <span className={
                    bid.status === "Won" ? "status-approved" :
                    bid.status === "Lost" ? "status-rejected" : "status-pending"
                  }>{bid.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
