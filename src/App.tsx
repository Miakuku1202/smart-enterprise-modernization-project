import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/auth/LoginPage";
import { ContactsPage } from "./components/auth/ContactsPage";
import { SignupPage } from "./components/auth/SignupPage";
import { Sidebar } from "./components/shared/Sidebar";
import { Navbar } from "./components/shared/Navbar";
import { AIAssistant } from "./components/shared/AIAssistant";
import { ExecutiveDashboard } from "./components/dashboards/ExecutiveDashboard";
import { FactoryManagerDashboard } from "./components/dashboards/FactoryManagerDashboard";
import { SupplyChainDashboard } from "./components/dashboards/SupplyChainDashboard";
import { ITDevOpsDashboard } from "./components/dashboards/ITDevOpsDashboard";
import { AIEngineerDashboard } from "./components/dashboards/AIEngineerDashboard";
import { PartnerSupplierDashboard } from "./components/dashboards/PartnerSupplierDashboard";
import { CustomerSupportDashboard } from "./components/dashboards/CustomerSupportDashboard";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { SustainabilityPage } from "./components/pages/SustainabilityPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { AccountSettingsPage } from "./components/pages/AccountSettingsPage";
import { HelpSupportPage } from "./components/pages/HelpSupportPage";
import { Toaster } from "./components/ui/sonner";
import { LogisticsPage } from "./components/pages/supply-chain/LogisticsPage";
import { SuppliersPage } from "./components/pages/supply-chain/SuppliersPage";
import { InventoryPage } from "./components/pages/supply-chain/InventoryPage";
import { ModelsPage } from "./components/pages/ai-engineer/ModelsPage";
import { PipelinePage } from "./components/pages/ai-engineer/PipelinePage";
import { AIAnalyticsPage } from "./components/pages/ai-engineer/AIAnalyticsPage";
import { TicketsPage } from "./components/pages/support/TicketsPage";
import { CustomersPage } from "./components/pages/support/CustomersPage";
import { SupportAnalyticsPage } from "./components/pages/support/SupportAnalyticsPage";
import { MachinesPage } from "./components/pages/factory/MachinesPage";
import { MaintenancePage } from "./components/pages/factory/MaintenancePage";
import { ReportsPage } from "./components/pages/factory/ReportsPage";
import { InfrastructurePage } from "./components/pages/devops/InfrastructurePage";
import { APIsPage } from "./components/pages/devops/APIsPage";
import { SecurityPage } from "./components/pages/devops/SecurityPage";
import { OrdersPage } from "./components/pages/partner/OrdersPage";
import { IntegrationPage } from "./components/pages/partner/IntegrationPage";
import { PerformancePage } from "./components/pages/partner/PerformancePage";

/**
 * Smart Enterprise Modernization Platform
 *
 * An enterprise-grade web application for automotive digital transformation
 * featuring role-based dashboards, real-time analytics, and AI-powered insights.
 *
 * Demo Credentials (All use password: demo123):
 * - Executive: cxo@automotive.com
 * - Factory Manager: factory@automotive.com
 * - Supply Chain Manager: supply@automotive.com
 * - IT/DevOps Engineer: it@automotive.com
 * - AI Engineer: ai@automotive.com
 * - Partner/Supplier: partner@automotive.com
 * - Customer Support: support@automotive.com
 */

interface User {
  email: string;
  role: string;
  name: string;
}

function DashboardLayout({
  children,
  user,
  onLogout,
}: {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar role={user.role} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar userName={user.name} userRole={user.role} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      {/* AI Assistant Widget */}
      <AIAssistant />
    </div>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  // Apply dark mode class to document element
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string, role: string) => {
    // Extract name from email
    const name =
      email.split("@")[0].charAt(0).toUpperCase() +
      email.split("@")[0].slice(1);
    const userData = { email, role, name };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={getRoleRoute(user.role)} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Global Protected Pages */}
        <Route
          path="/dashboard/profile"
          element={
            user ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <ProfilePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/account-settings"
          element={
            user ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AccountSettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/help-support"
          element={
            user ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <HelpSupportPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Executive Routes */}
        <Route
          path="/dashboard/executive"
          element={
            user && user.role === "Executive" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <ExecutiveDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/executive/analytics"
          element={
            user && user.role === "Executive" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/executive/sustainability"
          element={
            user && user.role === "Executive" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/executive/settings"
          element={
            user && user.role === "Executive" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Factory Manager Routes */}
        <Route
          path="/dashboard/factory"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <FactoryManagerDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/factory/settings"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/factory/analytics"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/factory/sustainability"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/factory/machines"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <MachinesPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/factory/maintenance"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <MaintenancePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/factory/reports"
          element={
            user && user.role === "Factory Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <ReportsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Supply Chain Manager Routes */}
        <Route
          path="/dashboard/supply-chain"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SupplyChainDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/supply-chain/settings"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/supply-chain/analytics"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/supply-chain/sustainability"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/supply-chain/logistics"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <LogisticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/supply-chain/suppliers"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SuppliersPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/supply-chain/inventory"
          element={
            user && user.role === "Supply Chain Manager" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <InventoryPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* IT/DevOps Engineer Routes */}
        <Route
          path="/dashboard/it-devops"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <ITDevOpsDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/it-devops/settings"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/it-devops/analytics"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/it-devops/sustainability"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/it-devops/infrastructure"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <InfrastructurePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/it-devops/apis"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <APIsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/it-devops/security"
          element={
            user && user.role === "IT/DevOps Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SecurityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* AI Engineer Routes */}
        <Route
          path="/dashboard/ai-engineer"
          element={
            user && user.role === "AI Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AIEngineerDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/ai-engineer/settings"
          element={
            user && user.role === "AI Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/ai-engineer/analytics"
          element={
            user && user.role === "AI Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AIAnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/ai-engineer/sustainability"
          element={
            user && user.role === "AI Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/ai-engineer/models"
          element={
            user && user.role === "AI Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <ModelsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/ai-engineer/pipeline"
          element={
            user && user.role === "AI Engineer" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <PipelinePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Partner/Supplier Routes */}
        <Route
          path="/dashboard/partner"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <PartnerSupplierDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/partner/settings"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/partner/analytics"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <AnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/partner/sustainability"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/partner/orders"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <OrdersPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/partner/integration"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <IntegrationPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/partner/performance"
          element={
            user && user.role === "Partner/Supplier" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <PerformancePage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Customer Support Routes */}
        <Route
          path="/dashboard/support"
          element={
            user && user.role === "Customer Support" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <CustomerSupportDashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/support/settings"
          element={
            user && user.role === "Customer Support" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SettingsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/support/analytics"
          element={
            user && user.role === "Customer Support" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SupportAnalyticsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/support/sustainability"
          element={
            user && user.role === "Customer Support" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <SustainabilityPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/support/tickets"
          element={
            user && user.role === "Customer Support" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <TicketsPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard/support/customers"
          element={
            user && user.role === "Customer Support" ? (
              <DashboardLayout
                user={user}
                onLogout={handleLogout}
              >
                <CustomersPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

// Helper function to get route based on role
function getRoleRoute(role: string): string {
  const roleRoutes: Record<string, string> = {
    Executive: "/dashboard/executive",
    "Factory Manager": "/dashboard/factory",
    "Supply Chain Manager": "/dashboard/supply-chain",
    "IT/DevOps Engineer": "/dashboard/it-devops",
    "AI Engineer": "/dashboard/ai-engineer",
    "Partner/Supplier": "/dashboard/partner",
    "Customer Support": "/dashboard/support",
  };
  return roleRoutes[role] || "/";
}

export default App;