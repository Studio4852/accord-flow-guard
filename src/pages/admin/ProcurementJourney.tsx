import { useState } from "react";
import { procurementCase } from "@/data/seedData";
import { Check, Circle, ChevronRight, FileText, Users, ClipboardCheck, Truck, Package, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fmt = (n: number) => "₦" + n.toLocaleString();

const stageIcons = [FileText, ShoppingCart, Users, ClipboardCheck, Truck, Package];

export default function ProcurementJourney() {
  const [activeStage, setActiveStage] = useState(procurementCase.currentStage);
  const pc = procurementCase;

  const stageDetails: Record<number, React.ReactNode> = {
    0: (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Purchase Requisition</h3>
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">{pc.id}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Requester", value: pc.requester },
            { label: "Department", value: pc.department },
            { label: "Budget Status", value: "Available", badge: true },
            { label: "Total Amount", value: fmt(pc.totalAmount) },
          ].map((item, i) => (
            <div key={i} className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              {item.badge ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Available</Badge>
              ) : (
                <p className="text-sm font-semibold">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        <Card className="shadow-none border-dashed">
          <CardContent className="p-0">
            <table className="demo-table">
              <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
              <tbody>
                {pc.items.map((item, i) => (
                  <tr key={i}><td>{item.description}</td><td>{item.qty}</td><td>{fmt(item.unitPrice)}</td><td className="font-semibold">{fmt(item.total)}</td></tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">📎 <span className="text-primary cursor-pointer hover:underline">spec_document.pdf</span></span>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Approved by Dept Manager</Badge>
        </div>
      </div>
    ),
    1: (
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Request for Quotation</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Invited Vendors", value: pc.rfq.invitedVendors, icon: "👥" },
            { label: "Deadline", value: pc.rfq.deadline, icon: "📅" },
            { label: "Status", value: pc.rfq.status, icon: "✅" },
          ].map((item, i) => (
            <div key={i} className="bg-muted/40 rounded-lg p-4 text-center">
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-sm font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    2: (
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Vendor Evaluation</h3>
        <Card className="shadow-none">
          <CardContent className="p-0">
            <table className="demo-table">
              <thead><tr><th>Vendor</th><th>Quote</th><th>Quality</th><th>Delivery</th><th>Total Score</th></tr></thead>
              <tbody>
                {pc.evaluation.vendors.map((v, i) => (
                  <tr key={i} className={v.name === pc.evaluation.recommended ? "bg-emerald-50/50" : ""}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{v.name}</span>
                        {v.name === pc.evaluation.recommended && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 text-[10px]">Recommended</Badge>
                        )}
                      </div>
                    </td>
                    <td>{fmt(v.price)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${v.quality}%` }} /></div>
                        <span className="text-xs">{v.quality}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${v.delivery}%` }} /></div>
                        <span className="text-xs">{v.delivery}</span>
                      </div>
                    </td>
                    <td><span className="font-bold text-primary">{v.total}/100</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    ),
    3: (
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Purchase Order</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "PO Number", value: pc.po.number },
            { label: "Status", value: pc.po.status },
            { label: "Total Amount", value: fmt(pc.po.amount) },
          ].map((item, i) => (
            <div key={i} className="bg-muted/40 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-base font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    4: (
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Delivery</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Expected Date</p>
            <p className="text-sm font-bold">{pc.delivery.date}</p>
          </div>
          <div className="bg-muted/40 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Inspection</p>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{pc.delivery.inspection}</Badge>
          </div>
        </div>
      </div>
    ),
    5: (
      <div className="space-y-5">
        <h3 className="text-lg font-bold">Goods Received Note</h3>
        <div className="bg-muted/40 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">GRN Status</p>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{pc.grn.status}</Badge>
        </div>
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
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Lifecycle Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Horizontal stepper */}
          <div className="relative flex items-center justify-between mb-8">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-border z-0" />
            <div className="absolute top-5 left-0 h-0.5 bg-primary z-0" style={{ width: `${(pc.currentStage / (pc.stages.length - 1)) * 100}%` }} />

            {pc.stages.map((stage, i) => {
              const Icon = stageIcons[i];
              const isCompleted = stage.status === "completed";
              const isActive = stage.status === "active";
              const isSelected = activeStage === i;

              return (
                <button
                  key={i}
                  onClick={() => setActiveStage(i)}
                  className="relative z-10 flex flex-col items-center gap-2 group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
                    isCompleted
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-card border-border text-muted-foreground"
                  } ${isSelected ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[11px] font-medium text-center leading-tight max-w-[80px] ${
                    isCompleted ? "text-emerald-600" : isActive ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage Detail Panel */}
          <div className="p-6 bg-muted/20 rounded-xl border border-border/50">
            {stageDetails[activeStage]}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
