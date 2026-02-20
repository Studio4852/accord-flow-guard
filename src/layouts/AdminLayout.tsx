import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import {
  LayoutDashboard, Wallet, Route, UserCheck, FileText, Receipt,
  ScrollText, ShieldCheck, LogOut, Eye, EyeOff, Triangle
} from "lucide-react";

const navItems = [
  { label: "Executive Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Budget Control", path: "/admin/budget", icon: Wallet },
  { label: "Procurement Journey", path: "/admin/procurement", icon: Route },
  { label: "Vendor Onboarding", path: "/admin/vendors", icon: UserCheck },
  { label: "Accounts Payable", path: "/admin/payable", icon: FileText },
  { label: "Accounts Receivable", path: "/admin/receivable", icon: Receipt },
  { label: "Contracts", path: "/admin/contracts", icon: ScrollText },
  { label: "Audit Logs", path: "/admin/audit", icon: ShieldCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { demoMode, setDemoMode } = useDemo();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar flex flex-col shrink-0">
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-sidebar-border">
          <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
            <Triangle className="w-4 h-4 text-sidebar-primary-foreground fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">E-Procurement</h1>
            <p className="text-[10px] text-sidebar-muted">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary border-r-2 border-sidebar-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Demo Mode Toggle */}
        <div className="px-5 py-3 border-t border-sidebar-border">
          <button
            onClick={() => setDemoMode(!demoMode)}
            className="flex items-center gap-2 text-xs text-sidebar-muted hover:text-sidebar-foreground w-full"
          >
            {demoMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            Demo Mode: {demoMode ? "ON" : "OFF"}
          </button>
        </div>

        <div className="px-5 py-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-sm text-sidebar-muted hover:text-sidebar-foreground w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
