import { Bell, Lock, User, Globe, Shield, Database, Mail, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useState } from "react";

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and system configuration</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white">Profile Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Full Name</label>
              <Input 
                defaultValue="John Executive" 
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Email Address</label>
              <Input 
                defaultValue="cxo@automotive.com" 
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Department</label>
              <Input 
                defaultValue="Executive Leadership" 
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Phone Number</label>
              <Input 
                defaultValue="+1 (555) 123-4567" 
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-white">Email Notifications</div>
                <div className="text-sm text-slate-400">Receive email updates about your activity</div>
              </div>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-white">Push Notifications</div>
                <div className="text-sm text-slate-400">Get push notifications on your devices</div>
              </div>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-white">Weekly Reports</div>
                <div className="text-sm text-slate-400">Receive weekly summary reports via email</div>
              </div>
            </div>
            <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white">Security Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-white">Two-Factor Authentication</div>
                <div className="text-sm text-slate-400">Add an extra layer of security to your account</div>
              </div>
            </div>
            <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-slate-400" />
              <div className="text-white">Change Password</div>
            </div>
            <div className="space-y-3">
              <Input 
                type="password" 
                placeholder="Current Password" 
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Input 
                type="password" 
                placeholder="New Password" 
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Input 
                type="password" 
                placeholder="Confirm New Password" 
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Button variant="outline" className="border-slate-600 text-slate-300">
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white">System Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-white">Automatic Backups</div>
                <div className="text-sm text-slate-400">Automatically backup your data daily</div>
              </div>
            </div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>

          <div className="p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-slate-400" />
              <div className="text-white">Language & Region</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Language</label>
                <select className="w-full bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-2">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Timezone</label>
                <select className="w-full bg-slate-800 border border-slate-600 text-white rounded-md px-3 py-2">
                  <option>UTC-5 (EST)</option>
                  <option>UTC-8 (PST)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (CET)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
