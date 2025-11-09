import { useState } from "react";
import { customerSupportData } from "../../../data/mockData";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Star, Clock, CheckCircle, MessageSquare, Download } from "lucide-react";
import { motion } from "motion/react";
import { ViewFeedbackModal } from "../../modals/ViewFeedbackModal";

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

// Weekly ticket trends
const weeklyTrends = [
  { week: "Week 1", tickets: 45, resolved: 38, avgTime: 2.5 },
  { week: "Week 2", tickets: 52, resolved: 45, avgTime: 2.8 },
  { week: "Week 3", tickets: 48, resolved: 42, avgTime: 2.3 },
  { week: "Week 4", tickets: 58, resolved: 51, avgTime: 3.1 },
];

// Agent performance
const agentPerformance = [
  { name: "John Smith", resolved: 45, avgTime: 2.1, rating: 4.8 },
  { name: "Sarah Johnson", resolved: 38, avgTime: 2.5, rating: 4.6 },
  { name: "Mike Wilson", resolved: 42, avgTime: 2.3, rating: 4.7 },
  { name: "Emily Davis", resolved: 35, avgTime: 2.8, rating: 4.5 },
];

// Ticket categories
const ticketCategories = [
  { name: "Technical Issues", value: 35 },
  { name: "Billing Queries", value: 25 },
  { name: "Feature Requests", value: 20 },
  { name: "Integration Help", value: 15 },
  { name: "Other", value: 5 },
];

export function SupportAnalyticsPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleExportReport = () => {
    console.log("Exporting analytics report...");
    // Simulate export
    setTimeout(() => {
      alert("Analytics report exported successfully!");
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Support Analytics</h1>
          <p className="text-slate-400">Performance metrics and customer insights</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setFeedbackOpen(true)}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Star className="w-4 h-4 mr-2" />
            View Feedback
          </Button>
          <Button
            onClick={handleExportReport}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Resolution Rate</p>
          <p className="text-3xl text-white mb-1">94.2%</p>
          <p className="text-xs text-slate-500">Last 30 days</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingDown className="w-3 h-3 mr-1" />
              -8%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Avg Response Time</p>
          <p className="text-3xl text-white mb-1">45 min</p>
          <p className="text-xs text-slate-500">Target: 60 min</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Customer Satisfaction</p>
          <p className="text-3xl text-white mb-1">4.5/5.0</p>
          <p className="text-xs text-slate-500">288 responses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Tickets</p>
          <p className="text-3xl text-white mb-1">203</p>
          <p className="text-xs text-slate-500">This month</p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Weekly Ticket Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={2} name="New Tickets" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Ticket Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Ticket Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {ticketCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Agent Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Bar dataKey="resolved" fill="#14b8a6" name="Resolved Tickets" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Feedback Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Customer Feedback Ratings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerSupportData.feedbackRatings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="rating" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="count" fill="#f59e0b" name="Number of Ratings" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Agent Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Agent Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">Agent Name</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Resolved Tickets</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Avg Response Time</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Rating</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Performance</th>
              </tr>
            </thead>
            <tbody>
              {agentPerformance.map((agent, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        {agent.name.charAt(0)}
                      </div>
                      <span className="text-white">{agent.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-teal-400">{agent.resolved}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-slate-300">{agent.avgTime}h</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400">{agent.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge className={`${
                      agent.rating >= 4.7 ? "bg-green-500/20 text-green-400" :
                      agent.rating >= 4.5 ? "bg-blue-500/20 text-blue-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {agent.rating >= 4.7 ? "Excellent" : agent.rating >= 4.5 ? "Good" : "Average"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <ViewFeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
