import { Search, Bell, Settings, User, Moon, Sun } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from 'react';

interface NavbarProps {
  userName: string;
  userRole: string;
}

export function Navbar({ userName, userRole }: NavbarProps) {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications] = useState([
    { id: 1, text: "New maintenance alert", time: "5m ago" },
    { id: 2, text: "API deployment successful", time: "1h ago" },
    { id: 3, text: "Weekly report available", time: "2h ago" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleSettings = () => {
    const roleRoutes: Record<string, string> = {
      "Executive": "/dashboard/executive/settings",
      "Factory Manager": "/dashboard/factory/settings",
      "Supply Chain Manager": "/dashboard/supply-chain/settings",
      "IT/DevOps Engineer": "/dashboard/it-devops/settings",
      "AI Engineer": "/dashboard/ai-engineer/settings",
      "Partner/Supplier": "/dashboard/partner/settings",
      "Customer Support": "/dashboard/support/settings"
    };
    navigate(roleRoutes[userRole] || "/");
  };

  const handleMyProfile = () => {
    setShowProfile(false);
    navigate("/dashboard/profile");
  };

  const handleAccountSettings = () => {
    setShowProfile(false);
    navigate("/dashboard/account-settings");
  };

  const handleHelpSupport = () => {
    setShowProfile(false);
    navigate("/dashboard/help-support");
  };

  return (
    <div className="h-16 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search everywhere..."
            className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden" ref={notifRef}>
              <div className="p-4 border-b border-slate-700">
                <h3 className="text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer transition-colors"
                  >
                    <p className="text-slate-300 text-sm">{notif.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-slate-700">
                <button className="text-sm text-teal-400 hover:text-teal-300">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={handleSettings}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-sm text-white">{userName}</div>
              <div className="text-xs text-slate-400">{userRole}</div>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden" ref={profileRef}>
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white">{userName}</div>
                    <div className="text-sm text-slate-400">{userRole}</div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button 
                  onClick={handleMyProfile}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 rounded transition-colors"
                >
                  My Profile
                </button>
                <button 
                  onClick={handleAccountSettings}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 rounded transition-colors"
                >
                  Account Settings
                </button>
                <button 
                  onClick={handleHelpSupport}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 rounded transition-colors"
                >
                  Help & Support
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}