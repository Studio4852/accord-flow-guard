import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileCheck, Search, Gavel, FileText, CreditCard, LogOut, Triangle
} from "lucide-react";

const navItems = [
  { label: "Vendor Dashboard", path: "/vendor", icon: LayoutDashboard },
  { label: "Compliance Documents", path: "/vendor/compliance", icon: FileCheck },
  { label: "Opportunities", path: "/vendor/opportunities", icon: Search },
  { label: "My Bids", path: "/vendor/bids", icon: Gavel },
  { label: "Invoices", path: "/vendor/invoices", icon: FileText },
  { label: "Payments", path: "/vendor/payments", icon: CreditCard },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-sidebar flex flex-col shrink-0">
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-sidebar-border">
          <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
            <Triangle className="w-4 h-4 text-sidebar-primary-foreground fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-sidebar-foreground">E-Procurement</h1>
            <p className="text-[10px] text-sidebar-muted">Vendor Portal</p>
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

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
