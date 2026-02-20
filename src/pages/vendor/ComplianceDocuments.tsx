import { vendors } from "@/data/seedData";
import { Check, AlertTriangle, X, Upload, MessageSquare } from "lucide-react";

const vendor = vendors[1];

export default function ComplianceDocuments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Compliance Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload and manage your compliance documentation</p>
      </div>

      {/* Compliance Score */}
      <div className="panel-card p-5">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-emerald-600">{vendor.complianceScore}%</div>
          <div>
            <p className="text-sm font-medium">Compliance Score</p>
            <p className="text-xs text-muted-foreground">All documents verified and current</p>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="panel-card overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">Your Documents</h2>
          <button className="px-3 py-1.5 text-xs rounded bg-primary text-primary-foreground flex items-center gap-1">
            <Upload className="w-3 h-3" /> Upload New Document
          </button>
        </div>
        <table className="demo-table">
          <thead>
            <tr><th>Document Type</th><th>File</th><th>Upload Date</th><th>Expiry Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {vendor.documents.map((d, i) => (
              <tr key={i}>
                <td className="font-medium">{d.type}</td>
                <td>{d.fileName ? <span className="text-primary cursor-pointer">{d.fileName}</span> : <span className="text-muted-foreground">—</span>}</td>
                <td>{d.uploadDate || "—"}</td>
                <td>{d.expiryDate || "—"}</td>
                <td>
                  <span className={
                    d.status === "Approved" ? "status-approved" :
                    d.status === "Rejected" || d.status === "Expired" ? "status-rejected" :
                    d.status === "Expiring Soon" ? "status-expiring" : "status-pending"
                  }>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
