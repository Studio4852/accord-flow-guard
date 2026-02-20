import { auditLogs } from "@/data/seedData";
import { ShieldCheck, Lock } from "lucide-react";

export default function AuditLogs() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Immutable system audit trail</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <Lock className="w-3 h-3" /> Read-Only • Immutable Record
        </div>
      </div>

      <div className="panel-card overflow-hidden">
        <div className="p-4 border-b flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">All system actions are logged and cannot be edited or deleted.</span>
        </div>
        <table className="demo-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Reference</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log, i) => (
              <tr key={i}>
                <td className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</td>
                <td className="font-medium">{log.user}</td>
                <td>
                  <span className={
                    log.action.includes("Blacklisted") || log.action.includes("Rejected") ? "status-rejected" :
                    log.action.includes("Approved") ? "status-approved" :
                    log.action.includes("Login") || log.action.includes("Logout") ? "status-pending" :
                    "text-sm"
                  }>{log.action}</span>
                </td>
                <td className="text-sm">{log.module}</td>
                <td className="text-xs font-mono text-muted-foreground">{log.reference}</td>
                <td className="text-xs text-muted-foreground max-w-[200px] truncate">{log.comment || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
