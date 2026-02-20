import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DemoProvider } from "@/contexts/DemoContext";

import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

import ExecutiveDashboard from "./pages/admin/ExecutiveDashboard";
import BudgetControl from "./pages/admin/BudgetControl";
import ProcurementJourney from "./pages/admin/ProcurementJourney";
import VendorOnboarding from "./pages/admin/VendorOnboarding";
import AccountsPayable from "./pages/admin/AccountsPayable";
import AccountsReceivable from "./pages/admin/AccountsReceivable";
import Contracts from "./pages/admin/Contracts";
import AuditLogs from "./pages/admin/AuditLogs";

import VendorDashboard from "./pages/vendor/VendorDashboard";
import ComplianceDocuments from "./pages/vendor/ComplianceDocuments";
import Opportunities from "./pages/vendor/Opportunities";
import MyBids from "./pages/vendor/MyBids";
import VendorInvoices from "./pages/vendor/VendorInvoices";
import VendorPayments from "./pages/vendor/VendorPayments";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DemoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><ExecutiveDashboard /></AdminLayout>} />
            <Route path="/admin/budget" element={<AdminLayout><BudgetControl /></AdminLayout>} />
            <Route path="/admin/procurement" element={<AdminLayout><ProcurementJourney /></AdminLayout>} />
            <Route path="/admin/vendors" element={<AdminLayout><VendorOnboarding /></AdminLayout>} />
            <Route path="/admin/payable" element={<AdminLayout><AccountsPayable /></AdminLayout>} />
            <Route path="/admin/receivable" element={<AdminLayout><AccountsReceivable /></AdminLayout>} />
            <Route path="/admin/contracts" element={<AdminLayout><Contracts /></AdminLayout>} />
            <Route path="/admin/audit" element={<AdminLayout><AuditLogs /></AdminLayout>} />

            {/* Vendor Routes */}
            <Route path="/vendor" element={<VendorLayout><VendorDashboard /></VendorLayout>} />
            <Route path="/vendor/compliance" element={<VendorLayout><ComplianceDocuments /></VendorLayout>} />
            <Route path="/vendor/opportunities" element={<VendorLayout><Opportunities /></VendorLayout>} />
            <Route path="/vendor/bids" element={<VendorLayout><MyBids /></VendorLayout>} />
            <Route path="/vendor/invoices" element={<VendorLayout><VendorInvoices /></VendorLayout>} />
            <Route path="/vendor/payments" element={<VendorLayout><VendorPayments /></VendorLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DemoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
