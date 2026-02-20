import { vendorOpportunities } from "@/data/seedData";
import { Clock, AlertTriangle } from "lucide-react";

export default function Opportunities() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Opportunities</h1>
        <p className="text-sm text-muted-foreground mt-1">Available procurement opportunities</p>
      </div>

      <div className="grid gap-4">
        {vendorOpportunities.map((opp) => (
          <div key={opp.id} className="panel-card p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{opp.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{opp.id} • {opp.department}</p>
              </div>
              <span className={opp.status === "Closing Soon" ? "status-expiring flex items-center gap-1" : "status-approved"}>
                {opp.status === "Closing Soon" && <AlertTriangle className="w-3 h-3" />}
                {opp.status}
              </span>
            </div>
            <div className="flex items-center gap-6 mt-3 text-sm">
              <div><span className="text-muted-foreground">Budget:</span> <span className="font-medium">{opp.budget}</span></div>
              <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> Deadline: {opp.deadline}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
