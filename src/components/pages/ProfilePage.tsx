import { User, Mail, Phone, MapPin, Briefcase, Calendar, Award, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const activityData = [
  { week: "Week 1", activity: 45 },
  { week: "Week 2", activity: 52 },
  { week: "Week 3", activity: 48 },
  { week: "Week 4", activity: 61 },
  { week: "Week 5", activity: 55 },
  { week: "Week 6", activity: 67 }
];

export function ProfilePage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-white mb-2">My Profile</h1>
        <p className="text-slate-400">View and manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center border-4 border-slate-800">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-white mb-1">John Executive</h2>
              <p className="text-slate-400 mb-4">Executive Leadership</p>
              <div className="flex flex-wrap gap-2">
                <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
                  Edit Profile
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  View Activity
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Email</div>
                  <div className="text-white">cxo@automotive.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Phone</div>
                  <div className="text-white">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Location</div>
                  <div className="text-white">Detroit, Michigan</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Department</div>
                  <div className="text-white">Executive Leadership</div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white mb-4">Activity Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="activity" stroke="#14b8a6" fillOpacity={1} fill="url(#colorActivity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats & Achievements */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Member Since</span>
                  <Calendar className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-white">January 2023</div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Reports Generated</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-white">142</div>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Projects Managed</span>
                  <Briefcase className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-white">28</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white mb-4">Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-white text-sm">Top Performer</div>
                  <div className="text-xs text-slate-400">Q4 2024</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/30">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-white text-sm">Innovation Leader</div>
                  <div className="text-xs text-slate-400">2024</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white text-sm">Team Builder</div>
                  <div className="text-xs text-slate-400">2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
