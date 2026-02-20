import { departmentBudgets, getBudgetVariance } from "@/data/seedData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Lock, ShieldCheck } from "lucide-react";

const fmt = (n: number) => "₦" + n.toLocaleString();

export default function BudgetControl() {
  const chartData = departmentBudgets.map(d => ({
    name: d.department,
    "Approved Budget": d.approved,
    "Actual Spend": d.actual,
  }));

  const lockedBudgets = departmentBudgets.filter(d => d.locked);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Budget Control</h1>
        <p className="text-sm text-muted-foreground mt-1">Department budget allocation and spend tracking</p>
      </div>

      {/* Locked Budget Banner */}
      {lockedBudgets.length > 0 && (
        <div className="panel-card p-4 border-l-4 border-l-emerald-500 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-sm font-medium">Budget Approved & Locked</p>
            <p className="text-xs text-muted-foreground">
              Locked by {lockedBudgets[0].approver} on {lockedBudgets[0].lockedAt} • {lockedBudgets.length} departments locked
            </p>
          </div>
        </div>
      )}

      {/* Department Budgets Table */}
      <div className="panel-card overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="section-header mb-0">Department Budgets</h2>
        </div>
        <table className="demo-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Approved Budget</th>
              <th>Actual Spend</th>
              <th>Variance</th>
              <th>Status</th>
              <th>Locked</th>
            </tr>
          </thead>
          <tbody>
            {departmentBudgets.map((d) => {
              const v = getBudgetVariance(d.approved, d.actual);
              return (
                <tr key={d.department}>
                  <td className="font-medium">{d.department}</td>
                  <td>{fmt(d.approved)}</td>
                  <td>{fmt(d.actual)}</td>
                  <td className={v.status === "Green" ? "variance-green" : v.status === "Amber" ? "variance-amber" : "variance-red"}>
                    {fmt(Math.abs(v.amount))} ({v.pct > 0 ? "+" : ""}{v.pct.toFixed(1)}%)
                  </td>
                  <td>
                    <span className={v.status === "Green" ? "status-approved" : v.status === "Amber" ? "status-pending" : "status-rejected"}>
                      {v.status}
                    </span>
                  </td>
                  <td>{d.locked ? <Lock className="w-3.5 h-3.5 text-muted-foreground" /> : <span className="text-xs text-muted-foreground">—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Budget vs Actual Chart */}
      <div className="panel-card p-5">
        <h2 className="section-header">Budget vs Actual Spend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Legend />
              <Bar dataKey="Approved Budget" fill="hsl(215, 60%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual Spend" fill="hsl(25, 80%, 52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Over-Budget Warning Demo */}
      <div className="panel-card p-4 border-l-4 border-l-red-500">
        <div className="flex items-center gap-2 mb-1">
          <span className="status-rejected">Over Budget Warning</span>
        </div>
        <p className="text-sm text-foreground font-medium">Operations department has exceeded budget by ₦120,000</p>
        <p className="text-xs text-muted-foreground mt-1">Any new PR from Operations requires Senior Management approval before proceeding.</p>
      </div>
    </div>
  );
}
