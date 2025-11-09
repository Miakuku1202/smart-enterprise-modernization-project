import React from 'react';
import { 
  LayoutDashboard, 
  Factory, 
  Truck, 
  Server, 
  Brain, 
  Handshake, 
  Headphones,
  Settings,
  LogOut,
  BarChart3,
  Leaf,
  Shield
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../../public/Logo.png';
interface SidebarProps {
  role: string;
  onLogout: () => void;
}

export function Sidebar({ role, onLogout }: SidebarProps) {
  const location = useLocation();

  const roleMenus: Record<string, Array<{ label: string; path: string; icon: any }>> = {
    "Executive": [
      { label: "Overview", path: "/dashboard/executive", icon: LayoutDashboard },
      { label: "Analytics", path: "/dashboard/executive/analytics", icon: BarChart3 },
      { label: "Sustainability", path: "/dashboard/executive/sustainability", icon: Leaf },
      { label: "Settings", path: "/dashboard/executive/settings", icon: Settings }
    ],
    "Factory Manager": [
      { label: "Overview", path: "/dashboard/factory", icon: LayoutDashboard },
      { label: "Machines", path: "/dashboard/factory/machines", icon: Factory },
      { label: "Maintenance", path: "/dashboard/factory/maintenance", icon: Settings },
      { label: "Reports", path: "/dashboard/factory/reports", icon: BarChart3 }
    ],
    "Supply Chain Manager": [
      { label: "Overview", path: "/dashboard/supply-chain", icon: LayoutDashboard },
      { label: "Logistics", path: "/dashboard/supply-chain/logistics", icon: Truck },
      { label: "Suppliers", path: "/dashboard/supply-chain/suppliers", icon: Handshake },
      { label: "Inventory", path: "/dashboard/supply-chain/inventory", icon: BarChart3 }
    ],
    "IT/DevOps Engineer": [
      { label: "Overview", path: "/dashboard/it-devops", icon: LayoutDashboard },
      { label: "Infrastructure", path: "/dashboard/it-devops/infrastructure", icon: Server },
      { label: "APIs", path: "/dashboard/it-devops/apis", icon: BarChart3 },
      { label: "Security", path: "/dashboard/it-devops/security", icon: Shield }
    ],
    "AI Engineer": [
      { label: "Overview", path: "/dashboard/ai-engineer", icon: LayoutDashboard },
      { label: "Models", path: "/dashboard/ai-engineer/models", icon: Brain },
      { label: "Pipeline", path: "/dashboard/ai-engineer/pipeline", icon: Server },
      { label: "Analytics", path: "/dashboard/ai-engineer/analytics", icon: BarChart3 }
    ],
    "Partner/Supplier": [
      { label: "Overview", path: "/dashboard/partner", icon: LayoutDashboard },
      { label: "Orders", path: "/dashboard/partner/orders", icon: Truck },
      { label: "Integration", path: "/dashboard/partner/integration", icon: Server },
      { label: "Performance", path: "/dashboard/partner/performance", icon: BarChart3 }
    ],
    "Customer Support": [
      { label: "Overview", path: "/dashboard/support", icon: LayoutDashboard },
      { label: "Tickets", path: "/dashboard/support/tickets", icon: Headphones },
      { label: "Customers", path: "/dashboard/support/customers", icon: Handshake },
      { label: "Analytics", path: "/dashboard/support/analytics", icon: BarChart3 }
    ]
  };

  const menuItems = roleMenus[role] || [];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link to="/" className="flex items-center gap-2">
          <img src={} alt="Smart Enterprise Logo" className="w-10 h-10" />
          <div>
            <h1 className="text-white">Smart Enterprise</h1>
            <p className="text-xs text-slate-400">Automotive Digital</p>
          </div>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-4 bg-slate-800/50">
        <div className="text-xs text-slate-400">Logged in as</div>
        <div className="text-teal-400">{role}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-400 border border-teal-500/30"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
