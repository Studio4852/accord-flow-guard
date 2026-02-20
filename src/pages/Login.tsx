import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Triangle, Shield } from "lucide-react";

const roles = [
  { id: "admin" as const, label: "Admin Demo User", desc: "Full governance & procurement oversight", path: "/admin" },
  { id: "vendor" as const, label: "Vendor Demo User", desc: "Vendor portal & compliance submission", path: "/vendor" },
  { id: "auditor" as const, label: "Auditor Demo User", desc: "Read-only audit & compliance review", path: "/admin/audit" },
];

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useDemo();
  const [selected, setSelected] = useState<typeof roles[0]>(roles[0]);

  const handleLogin = () => {
    setRole(selected.id);
    navigate(selected.path);
  };

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Triangle className="w-8 h-8 text-primary-foreground fill-current" />
          </div>
          <h1 className="text-2xl font-bold text-sidebar-foreground">E-Procurement Portal</h1>
          <p className="text-sm text-sidebar-muted mt-2">Client Demo — Select a role to begin</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Demo Mode — No credentials required</span>
          </div>

          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelected(role)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                selected.id === role.id
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="text-sm font-semibold">{role.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{role.desc}</p>
            </button>
          ))}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity mt-2"
          >
            Enter Demo as {selected.label}
          </button>
        </div>

        <p className="text-center text-xs text-sidebar-muted mt-6">E-Procurement Portal Demo v1.0 • Wireframe Preview</p>
      </div>
    </div>
  );
}
