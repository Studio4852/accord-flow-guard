import { useState } from "react";
import { contracts } from "@/data/seedData";
import { Search, AlertTriangle } from "lucide-react";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function Contracts() {
  const [tab, setTab] = useState<"active" | "archived">("active");
  const [search, setSearch] = useState("");

  const active = contracts.filter(c => c.status === "Active");
  const archived = contracts.filter(c => c.status === "Expired");

  const filtered = (tab === "active" ? active : archived).filter(
    c => c.vendor.toLowerCase().includes(search.toLowerCase()) || c.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Contracts Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Active and archived contract oversight</p>
      </div>

      <div className="panel-card">
        <div className="flex border-b">
          <button onClick={() => setTab("active")} className={`px-5 py-3 text-sm font-medium ${tab === "active" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
            Active Contracts ({active.length})
          </button>
          <button onClick={() => setTab("archived")} className={`px-5 py-3 text-sm font-medium ${tab === "archived" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
            Archived / Expired ({archived.length})
          </button>
        </div>

        {tab === "archived" && (
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search contracts..."
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-background"
              />
            </div>
          </div>
        )}

        <table className="demo-table">
          <thead>
            <tr>
              <th>Contract #</th>
              <th>Vendor</th>
              <th>Start</th>
              <th>End</th>
              <th>Value</th>
              <th>Status</th>
              <th>{tab === "active" ? "Expiry" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.number}>
                <td className="font-medium">{c.number}</td>
                <td>{c.vendor}</td>
                <td>{c.startDate}</td>
                <td>{c.endDate}</td>
                <td>{fmt(c.value)}</td>
                <td><span className={c.status === "Active" ? "status-approved" : "status-rejected"}>{c.status}</span></td>
                <td>
                  {c.status === "Active" && (
                    c.daysToExpiry <= 30 ? (
                      <span className="status-expiring flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3" />{c.daysToExpiry} days — Renew</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">{c.daysToExpiry} days</span>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
