import { KPICard } from "../shared/KPICard";
import { executiveData, sustainabilityData } from "../../data/mockData";
import { TrendingUp, DollarSign, Leaf, Zap, Activity, FileText } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";
import { GenerateReportModal } from "../modals/GenerateReportModal";
import { ScheduleReviewModal } from "../modals/ScheduleReviewModal";

const COLORS = ['#14b8a6', '#3b82f6', '#8b5cf6', '#f59e0b'];

export function ExecutiveDashboard() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Executive Dashboard</h1>
          <p className="text-slate-400">Real-time business insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => setShowReportModal(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button 
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
            onClick={() => setShowScheduleModal(true)}
          >
            <Activity className="w-4 h-4 mr-2" />
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Modals */}
      <GenerateReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} />
      <ScheduleReviewModal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Production Efficiency"
          value="92%"
          change="+5% from last month"
          trend="up"
          icon={TrendingUp}
        />
        <KPICard
          title="Revenue Growth"
          value="+12%"
          change="YoY Performance"
          trend="up"
          icon={DollarSign}
        />
        <KPICard
          title="Carbon Footprint"
          value="1,200kg"
          change="15% reduction"
          trend="up"
          icon={Leaf}
        />
        <KPICard
          title="Energy Efficiency"
          value="87%"
          change="Target: 90%"
          trend="neutral"
          icon={Zap}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Overview
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Forecasting
          </TabsTrigger>
          <TabsTrigger value="optimization" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Cost Optimization
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            Sustainability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Quarterly Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={executiveData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} name="Revenue ($K)" />
                  <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} name="Target ($K)" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Department Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Department Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={executiveData.departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="department" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey="score" fill="#14b8a6" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Energy Usage Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Energy Usage Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={executiveData.energyUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {executiveData.energyUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Action Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white group-hover:text-teal-400 transition-colors">View Plant Reports</h4>
                      <p className="text-sm text-slate-400 mt-1">Detailed production analytics</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white group-hover:text-teal-400 transition-colors">Financial Overview</h4>
                      <p className="text-sm text-slate-400 mt-1">Q4 2025 performance summary</p>
                    </div>
                    <DollarSign className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white group-hover:text-teal-400 transition-colors">Sustainability Dashboard</h4>
                      <p className="text-sm text-slate-400 mt-1">Environmental impact metrics</p>
                    </div>
                    <Leaf className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl text-white mb-6">Revenue Forecast - Next Quarter</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={executiveData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} name="Actual Revenue" />
                <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" name="Projected Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl text-white mb-4">Cost Reduction Opportunities</h3>
              <div className="space-y-4">
                {[
                  { area: "Energy Optimization", potential: "$45K/month", impact: "High" },
                  { area: "Supply Chain Efficiency", potential: "$32K/month", impact: "Medium" },
                  { area: "Workforce Scheduling", potential: "$18K/month", impact: "Medium" },
                  { area: "Cloud Infrastructure", potential: "$12K/month", impact: "Low" }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white">{item.area}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.impact === "High" ? "bg-red-500/20 text-red-400" :
                        item.impact === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {item.impact} Impact
                      </span>
                    </div>
                    <p className="text-teal-400">{item.potential}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl text-white mb-4">Monthly Cost Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={executiveData.departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="department" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" name="Efficiency Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl text-white mb-6">Carbon Footprint Reduction</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sustainabilityData.carbonFootprint}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="emissions" stroke="#f59e0b" strokeWidth={2} name="Emissions (kg)" />
                  <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} name="CO₂ Saved (kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl text-white mb-4">Optimization Recommendations</h3>
              <div className="space-y-3">
                {sustainabilityData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        rec.impact === "High" ? "bg-teal-500/20 text-teal-400" : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {rec.impact}
                      </span>
                    </div>
                    <p className="text-green-400">{rec.savings}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}