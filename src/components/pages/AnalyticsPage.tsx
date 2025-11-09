import { TrendingUp, Users, DollarSign, Activity, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "../ui/button";

const revenueData = [
  { month: "Jan", revenue: 45000, profit: 12000, expenses: 33000 },
  { month: "Feb", revenue: 52000, profit: 15000, expenses: 37000 },
  { month: "Mar", revenue: 48000, profit: 13500, expenses: 34500 },
  { month: "Apr", revenue: 61000, profit: 18000, expenses: 43000 },
  { month: "May", revenue: 55000, profit: 16500, expenses: 38500 },
  { month: "Jun", revenue: 67000, profit: 21000, expenses: 46000 }
];

const performanceData = [
  { name: "Production", value: 35 },
  { name: "Quality", value: 25 },
  { name: "Delivery", value: 20 },
  { name: "Innovation", value: 20 }
];

const COLORS = ["#14b8a6", "#3b82f6", "#8b5cf6", "#f59e0b"];

const departmentMetrics = [
  { department: "Manufacturing", efficiency: 92, output: 85, quality: 94 },
  { department: "Supply Chain", efficiency: 88, output: 90, quality: 87 },
  { department: "R&D", efficiency: 85, output: 78, quality: 91 },
  { department: "Sales", efficiency: 90, output: 95, quality: 89 },
  { department: "Support", efficiency: 87, output: 88, quality: 92 }
];

export function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Advanced Analytics</h1>
          <p className="text-slate-400">Comprehensive business intelligence and performance metrics</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Revenue</span>
            <TrendingUp className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl text-white mb-1">$328,000</div>
          <div className="text-xs text-green-400">+12.5% from last period</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Active Users</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl text-white mb-1">2,847</div>
          <div className="text-xs text-green-400">+8.2% from last month</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Profit Margin</span>
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl text-white mb-1">31.3%</div>
          <div className="text-xs text-green-400">+2.1% improvement</div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">System Uptime</span>
            <Activity className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl text-white mb-1">99.94%</div>
          <div className="text-xs text-green-400">Above target</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white mb-4">Revenue & Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="profit" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-white mb-4">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Metrics */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-white mb-4">Department Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={departmentMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="department" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Legend />
            <Bar dataKey="efficiency" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="output" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="quality" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-white mb-4">Monthly Expense Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
