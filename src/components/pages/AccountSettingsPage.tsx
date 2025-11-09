import { CreditCard, DollarSign, Download, FileText, Shield, Trash2, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useState } from "react";

export function AccountSettingsPage() {
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [dataExport, setDataExport] = useState(false);
  const [apiAccess, setApiAccess] = useState(true);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-white mb-2">Account Settings</h1>
        <p className="text-slate-400">Manage your account, billing, and privacy settings</p>
      </div>

      {/* Account Overview */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-white mb-4">Account Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Account Type</div>
            <div className="text-white">Enterprise</div>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Account ID</div>
            <div className="text-white">ENT-2024-4782</div>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Status</div>
            <div className="text-green-400">Active</div>
          </div>
        </div>
      </div>

      {/* Billing & Subscription */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white">Billing & Subscription</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div>
              <div className="text-white mb-1">Current Plan: Enterprise Pro</div>
              <div className="text-sm text-slate-400">Next billing date: December 15, 2025</div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-white">$499</div>
              <div className="text-xs text-slate-400">/month</div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white">Payment Method</div>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                Update
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white text-sm">•••• •••• •••• 4242</div>
                <div className="text-xs text-slate-400">Expires 12/2027</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              View Invoices
            </Button>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white">Team Management</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div>
              <div className="text-white">Team Members</div>
              <div className="text-sm text-slate-400">24 of 50 seats used</div>
            </div>
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
              Invite Member
            </Button>
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="text-white mb-3">Active Users</div>
            <div className="space-y-2">
              {["John Executive", "Jane Manager", "Mike Engineer", "Sarah Analyst"].map((name, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="text-slate-300 text-sm">{name}</div>
                  </div>
                  <div className="text-xs text-slate-400">Active</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white">Privacy & Security</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div>
              <div className="text-white">Auto Session Timeout</div>
              <div className="text-sm text-slate-400">Automatically log out after 30 minutes of inactivity</div>
            </div>
            <Switch checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div>
              <div className="text-white">Data Export Enabled</div>
              <div className="text-sm text-slate-400">Allow exporting your personal data</div>
            </div>
            <Switch checked={dataExport} onCheckedChange={setDataExport} />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div>
              <div className="text-white">API Access</div>
              <div className="text-sm text-slate-400">Enable API access for third-party integrations</div>
            </div>
            <Switch checked={apiAccess} onCheckedChange={setApiAccess} />
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="text-white mb-3">API Keys</div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded">
                <div className="font-mono text-sm text-slate-300">sk_live_••••••••••••4kJ8</div>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Revoke
                </Button>
              </div>
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Generate New Key
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="w-5 h-5 text-red-400" />
          <h3 className="text-red-400">Danger Zone</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white mb-1">Delete Account</div>
              <div className="text-sm text-slate-400">Permanently delete your account and all associated data</div>
            </div>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
