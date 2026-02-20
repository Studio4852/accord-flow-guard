import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "vendor" | "auditor";

interface DemoContextType {
  role: Role;
  setRole: (role: Role) => void;
  demoMode: boolean;
  setDemoMode: (v: boolean) => void;
  selectedVendorId: string;
  setSelectedVendorId: (id: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("admin");
  const [demoMode, setDemoMode] = useState(true);
  const [selectedVendorId, setSelectedVendorId] = useState("V001");

  return (
    <DemoContext.Provider value={{ role, setRole, demoMode, setDemoMode, selectedVendorId, setSelectedVendorId }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
};
