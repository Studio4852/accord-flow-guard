import { useState } from "react";
import { vendors, Vendor } from "@/data/seedData";
import { useDemo } from "@/contexts/DemoContext";
import { AlertTriangle, FileWarning, Upload, Check, X, Ban, MessageSquare, Eye, ChevronRight } from "lucide-react";

export default function VendorOnboarding() {
  const { demoMode } = useDemo();
  const [selectedVendor, setSelectedVendor] = useState<Vendor>(vendors[0]);
  const [activeTab, setActiveTab] = useState("general");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [modalAction, setModalAction] = useState<"reject" | "correction">("reject");

  const statusBadge = (status: Vendor["status"]) => {
    const cls = status === "Approved" ? "status-approved" : status === "Pending" ? "status-pending" : status === "Rejected" ? "status-rejected" : "status-blacklisted";
    return <span className={cls}>{status}</span>;
  };

  const tabs = ["general", "business", "qhse", "bank", "references", "documents"];

  const profileCompletion = (v: Vendor) => {
    let score = 0;
    if (v.name) score += 25;
    if (v.taxId) score += 25;
    if (v.documents.filter(d => d.status === "Approved").length > 0) score += 25;
    if (v.bankName) score += 25;
    return score;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Vendor Onboarding & Compliance Control</h1>
        <p className="text-sm text-muted-foreground mt-1">Split-screen Admin & Vendor view</p>
        <div className="mt-2">{statusBadge(selectedVendor.status)}</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ========== LEFT: ADMIN VIEW ========== */}
        <div className="space-y-4">
          <div className="panel-card p-4">
            <h2 className="text-base font-semibold text-primary mb-3">Admin Portal — Vendor Review</h2>

            {/* Pending Vendors Table */}
            <table className="demo-table text-xs">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Reg #</th>
                  <th>Missing</th>
                  <th>Expiry</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => { setSelectedVendor(v); setActiveTab("general"); }}
                    className={`cursor-pointer ${selectedVendor.id === v.id ? "bg-accent" : ""}`}
                  >
                    <td className="font-medium">{v.name}</td>
                    <td>{v.regNumber}</td>
                    <td>{v.missingDocs > 0 ? <span className="text-red-600 flex items-center gap-1"><FileWarning className="w-3 h-3" />{v.missingDocs}</span> : "—"}</td>
                    <td>{v.expiryAlerts > 0 ? <span className="text-amber-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{v.expiryAlerts}</span> : "—"}</td>
                    <td>{statusBadge(v.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vendor Profile Tabs */}
          <div className="panel-card">
            <div className="flex border-b overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                    activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "qhse" ? "QHSE" : tab === "bank" ? "Bank Details" : tab}
                </button>
              ))}
            </div>
            <div className="p-4 text-sm space-y-2">
              {activeTab === "general" && (
                <div className="grid grid-cols-2 gap-2">
                  {[["Vendor Name", selectedVendor.name], ["Reg Number", selectedVendor.regNumber], ["Category", selectedVendor.category], ["Address", selectedVendor.address], ["Contact", selectedVendor.contactPerson], ["Phone", selectedVendor.phone], ["Email", selectedVendor.email]].map(([l, v]) => (
                    <div key={l}><span className="text-muted-foreground text-xs">{l}</span><p className="font-medium text-xs">{v}</p></div>
                  ))}
                </div>
              )}
              {activeTab === "business" && (
                <div className="grid grid-cols-2 gap-2">
                  {[["Years in Operation", selectedVendor.yearsInOperation], ["Company Type", selectedVendor.companyType], ["Tax ID", selectedVendor.taxId], ["VAT Reg", selectedVendor.vatReg]].map(([l, v]) => (
                    <div key={String(l)}><span className="text-muted-foreground text-xs">{String(l)}</span><p className="font-medium text-xs">{String(v)}</p></div>
                  ))}
                </div>
              )}
              {activeTab === "qhse" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">ISO Certification</span><span className="text-xs font-medium">{selectedVendor.isoStatus}</span></div>
                  <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">HSE Policy</span>{selectedVendor.hsePolicy ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-600" />}</div>
                  <div className="flex justify-between items-center"><span className="text-xs text-muted-foreground">Quality Manual</span>{selectedVendor.qualityManual ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-600" />}</div>
                </div>
              )}
              {activeTab === "bank" && (
                <div className="grid grid-cols-1 gap-2">
                  {[["Bank Name", selectedVendor.bankName], ["Account Name", selectedVendor.accountName], ["Account Number", selectedVendor.accountNumber]].map(([l, v]) => (
                    <div key={l}><span className="text-muted-foreground text-xs">{l}</span><p className="font-medium text-xs">{v}</p></div>
                  ))}
                </div>
              )}
              {activeTab === "references" && (
                <div className="grid grid-cols-1 gap-2">
                  {[["Company", selectedVendor.referenceName], ["Contact", selectedVendor.referenceContact], ["Phone", selectedVendor.referencePhone]].map(([l, v]) => (
                    <div key={l}><span className="text-muted-foreground text-xs">{l}</span><p className="font-medium text-xs">{v}</p></div>
                  ))}
                </div>
              )}
              {activeTab === "documents" && (
                <table className="demo-table text-xs">
                  <thead><tr><th>Document</th><th>Expiry</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {selectedVendor.documents.map((d, i) => (
                      <tr key={i}>
                        <td className="font-medium">{d.type}</td>
                        <td>{d.expiryDate || "—"}</td>
                        <td><span className={d.status === "Approved" ? "status-approved" : d.status === "Rejected" || d.status === "Expired" ? "status-rejected" : d.status === "Expiring Soon" ? "status-expiring" : "status-pending"}>{d.status}</span></td>
                        <td>{d.fileName && <Eye className="w-3 h-3 text-primary cursor-pointer" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Admin Actions */}
          {!demoMode && (
            <div className="panel-card p-4">
              <h3 className="text-xs font-semibold mb-3">Admin Actions</h3>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-1.5 text-xs font-medium rounded bg-emerald-600 text-white hover:bg-emerald-700">Approve Vendor</button>
                <button onClick={() => { setModalAction("reject"); setShowRejectModal(true); }} className="px-3 py-1.5 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700">Reject Vendor</button>
                <button onClick={() => { setModalAction("correction"); setShowRejectModal(true); }} className="px-3 py-1.5 text-xs font-medium rounded bg-amber-500 text-white hover:bg-amber-600">Request Correction</button>
                <button onClick={() => setShowBlacklistModal(true)} className="px-3 py-1.5 text-xs font-medium rounded bg-gray-900 text-white hover:bg-gray-800">Blacklist Vendor</button>
              </div>
            </div>
          )}

          {/* Audit Trail */}
          <div className="panel-card p-4">
            <h3 className="text-xs font-semibold mb-3">Audit Trail</h3>
            <div className="space-y-2">
              {selectedVendor.auditTrail.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-muted-foreground whitespace-nowrap">{a.date}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium">{a.action}</span> by {a.user}
                    {a.comment && <p className="text-muted-foreground mt-0.5">"{a.comment}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== RIGHT: VENDOR VIEW ========== */}
        <div className="space-y-4">
          <div className="panel-card p-4">
            <h2 className="text-base font-semibold text-primary mb-3">Vendor Portal — Compliance Submission</h2>

            {/* Status Banner */}
            {selectedVendor.status === "Blacklisted" && (
              <div className="p-3 rounded-lg bg-gray-900 text-white text-sm mb-4 flex items-center gap-2">
                <Ban className="w-4 h-4" /> You are blacklisted and cannot participate in procurement
              </div>
            )}
            {selectedVendor.status === "Pending" && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm mb-4">
                Your registration is under review
              </div>
            )}
            {selectedVendor.status === "Approved" && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm mb-4 flex items-center gap-2">
                <Check className="w-4 h-4" /> Your vendor profile is approved and active
              </div>
            )}

            {/* Profile Completion */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Profile Completion</span>
                <span className="font-semibold">{profileCompletion(selectedVendor)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${profileCompletion(selectedVendor)}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {[["General Info", !!selectedVendor.name], ["Business Info", !!selectedVendor.taxId], ["Compliance Docs", selectedVendor.documents.some(d => d.status === "Approved")], ["Bank Details", !!selectedVendor.bankName]].map(([label, done]) => (
                  <div key={String(label)} className="flex items-center gap-1 text-xs">
                    {done ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className={done ? "text-foreground" : "text-muted-foreground"}>{String(label)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Document Upload Table */}
          <div className="panel-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold">Compliance Document Upload</h3>
              {!demoMode && (
                <button className="px-2 py-1 text-xs rounded bg-primary text-primary-foreground flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Upload New
                </button>
              )}
            </div>
            <table className="demo-table text-xs">
              <thead><tr><th>Document Type</th><th>File</th><th>Expiry</th><th>Status</th></tr></thead>
              <tbody>
                {selectedVendor.documents.map((d, i) => (
                  <tr key={i}>
                    <td className="font-medium">{d.type}</td>
                    <td>{d.fileName ? <span className="text-primary cursor-pointer">{d.fileName}</span> : <span className="text-muted-foreground">Not uploaded</span>}</td>
                    <td>{d.expiryDate || "—"}</td>
                    <td><span className={d.status === "Approved" ? "status-approved" : d.status === "Rejected" || d.status === "Expired" ? "status-rejected" : d.status === "Expiring Soon" ? "status-expiring" : "status-pending"}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Compliance Status */}
          <div className="panel-card p-4">
            <h3 className="text-xs font-semibold mb-3">Compliance Status</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl font-bold text-foreground">{selectedVendor.complianceScore}%</div>
              <span className="text-xs text-muted-foreground">Compliance Score</span>
            </div>
            <div className="space-y-2">
              {selectedVendor.documents.filter(d => d.status === "Expired").map((d, i) => (
                <div key={i} className="p-2 rounded bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> {d.type} — Expired
                </div>
              ))}
              {selectedVendor.documents.filter(d => d.status === "Expiring Soon").map((d, i) => (
                <div key={i} className="p-2 rounded bg-amber-50 border border-amber-200 text-xs text-amber-700 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3" /> {d.type} — Expiring Soon ({d.expiryDate})
                </div>
              ))}
              {selectedVendor.documents.filter(d => d.status === "Rejected").map((d, i) => (
                <div key={i} className="p-2 rounded bg-red-50 border border-red-200 text-xs text-red-700">
                  <div className="flex items-center gap-2"><X className="w-3 h-3" /> {d.type} — Rejected</div>
                  {d.rejectionComment && <p className="mt-1 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Admin: "{d.rejectionComment}"</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reject/Correction Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRejectModal(false)}>
          <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-3">{modalAction === "reject" ? "Reject Vendor" : "Request Correction"}</h3>
            <textarea
              value={rejectComment}
              onChange={e => setRejectComment(e.target.value)}
              placeholder="Enter comment (required)..."
              className="w-full border rounded-lg p-3 text-sm h-24 resize-none bg-background"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 text-sm rounded border">Cancel</button>
              <button disabled={!rejectComment.trim()} className="px-4 py-2 text-sm rounded bg-red-600 text-white disabled:opacity-40">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Blacklist Modal */}
      {showBlacklistModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowBlacklistModal(false)}>
          <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3 text-red-600">
              <Ban className="w-5 h-5" />
              <h3 className="font-semibold">Blacklist Vendor</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">This vendor will be blocked from procurement and system access.</p>
            <textarea
              value={rejectComment}
              onChange={e => setRejectComment(e.target.value)}
              placeholder="Enter reason (required)..."
              className="w-full border rounded-lg p-3 text-sm h-24 resize-none bg-background"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowBlacklistModal(false)} className="px-4 py-2 text-sm rounded border">Cancel</button>
              <button disabled={!rejectComment.trim()} className="px-4 py-2 text-sm rounded bg-gray-900 text-white disabled:opacity-40">Confirm Blacklist</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
