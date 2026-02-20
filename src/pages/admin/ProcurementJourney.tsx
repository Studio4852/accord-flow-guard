import { useState } from "react";
import { procurementCase } from "@/data/seedData";
import { Check, Circle, ChevronRight } from "lucide-react";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function ProcurementJourney() {
  const [activeStage, setActiveStage] = useState(procurementCase.currentStage);
  const pc = procurementCase;

  const stageDetails: Record<number, React.ReactNode> = {
    0: (
      <div className="space-y-3">
        <h3 className="font-semibold">Purchase Requisition — {pc.id}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Requester:</span> <span className="font-medium">{pc.requester}</span></div>
          <div><span className="text-muted-foreground">Department:</span> <span className="font-medium">{pc.department}</span></div>
          <div><span className="text-muted-foreground">Budget:</span> <span className="status-approved">Available</span></div>
          <div><span className="text-muted-foreground">Total:</span> <span className="font-medium">{fmt(pc.totalAmount)}</span></div>
        </div>
        <table className="demo-table mt-3">
          <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            {pc.items.map((item, i) => (
              <tr key={i}><td>{item.description}</td><td>{item.qty}</td><td>{fmt(item.unitPrice)}</td><td>{fmt(item.total)}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="text-sm"><span className="text-muted-foreground">Attachments:</span> <span className="text-primary cursor-pointer">spec_document.pdf</span></div>
        <div className="text-sm"><span className="text-muted-foreground">Approval:</span> <span className="status-approved">Approved by Dept Manager</span></div>
      </div>
    ),
    1: (
      <div className="space-y-3">
        <h3 className="font-semibold">Request for Quotation</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Invited Vendors:</span> <span className="font-medium">{pc.rfq.invitedVendors}</span></div>
          <div><span className="text-muted-foreground">Deadline:</span> <span className="font-medium">{pc.rfq.deadline}</span></div>
          <div><span className="text-muted-foreground">Status:</span> <span className="status-approved">{pc.rfq.status}</span></div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3">
        <h3 className="font-semibold">Vendor Evaluation</h3>
        <table className="demo-table">
          <thead><tr><th>Vendor</th><th>Quote</th><th>Quality</th><th>Delivery</th><th>Total Score</th></tr></thead>
          <tbody>
            {pc.evaluation.vendors.map((v, i) => (
              <tr key={i} className={v.name === pc.evaluation.recommended ? "bg-emerald-50" : ""}>
                <td className="font-medium">{v.name} {v.name === pc.evaluation.recommended && <span className="status-approved ml-2">Recommended</span>}</td>
                <td>{fmt(v.price)}</td>
                <td>{v.quality}/100</td>
                <td>{v.delivery}/100</td>
                <td className="font-bold">{v.total}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    3: (
      <div className="space-y-3">
        <h3 className="font-semibold">Purchase Order</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">PO Number:</span> <span className="font-medium">{pc.po.number}</span></div>
          <div><span className="text-muted-foreground">Status:</span> <span className="status-approved">{pc.po.status}</span></div>
          <div><span className="text-muted-foreground">Total Amount:</span> <span className="font-medium">{fmt(pc.po.amount)}</span></div>
        </div>
      </div>
    ),
    4: (
      <div className="space-y-3">
        <h3 className="font-semibold">Delivery</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Expected Date:</span> <span className="font-medium">{pc.delivery.date}</span></div>
          <div><span className="text-muted-foreground">Inspection:</span> <span className="status-pending">{pc.delivery.inspection}</span></div>
        </div>
      </div>
    ),
    5: (
      <div className="space-y-3">
        <h3 className="font-semibold">Goods Received Note</h3>
        <div className="text-sm"><span className="text-muted-foreground">GRN Status:</span> <span className="status-pending">{pc.grn.status}</span></div>
      </div>
    ),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Procurement Journey</h1>
        <p className="text-sm text-muted-foreground mt-1">End-to-end procurement lifecycle tracking</p>
      </div>

      {/* Progress Tracker */}
      <div className="panel-card p-5">
        <div className="flex items-center justify-between mb-6">
          {pc.stages.map((stage, i) => (
            <div key={i} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStage(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  stage.status === "completed" ? "stage-completed" :
                  stage.status === "active" ? "stage-active" : "stage-pending"
                } ${activeStage === i ? "ring-2 ring-ring ring-offset-2" : ""}`}
              >
                {stage.status === "completed" ? <Check className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                {stage.name}
              </button>
              {i < pc.stages.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1 shrink-0" />}
            </div>
          ))}
        </div>

        {/* Stage Detail Panel */}
        <div className="p-5 bg-muted/30 rounded-lg border">
          {stageDetails[activeStage]}
        </div>
      </div>
    </div>
  );
}
