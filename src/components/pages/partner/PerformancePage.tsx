import { useState } from "react";
import { partnerSupplierData } from "../../../data/mockData";
import { Button } from "../../ui/button";
import { TrendingUp, Download } from "lucide-react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ViewPartnerAnalyticsModal } from "../../modals/ViewPartnerAnalyticsModal";

export function PerformancePage() {
  const [viewAnalyticsOpen, setViewAnalyticsOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Performance Analytics</h1>
          <p className="text-slate-400">Track delivery performance and key metrics</p>
        </div>
        <Button onClick={() => setViewAnalyticsOpen(true)} className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "125", change: "+12%", color: "teal" },
          { label: "Revenue", value: "$45.2K", change: "+8%", color: "blue" },
          { label: "Avg Delivery Time", value: "2.3 days", change: "-0.5 days", color: "purple" },
          { label: "Quality Rate", value: "98.5%", change: "+1.5%", color: "green" }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl text-${stat.color}-400 mb-2`}>{stat.value}</p>
              <p className="text-xs text-green-400">{stat.change} from last month</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Delivery Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={partnerSupplierData.performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} labelStyle={{ color: '#f1f5f9' }} />
              <Legend />
              <Bar dataKey="delivered" fill="#10b981" name="On Time %" stackId="a" />
              <Bar dataKey="delayed" fill="#ef4444" name="Delayed %" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Key Performance Indicators</h3>
          <div className="space-y-4">
            {[
              { label: "On-Time Delivery Rate", value: "96%", color: "green" },
              { label: "Customer Satisfaction", value: "4.8/5.0", color: "blue" },
              { label: "Order Accuracy", value: "98.5%", color: "purple" },
              { label: "Quality Score", value: "95%", color: "teal" }
            ].map((kpi, i) => (
              <div key={i} className={`p-4 bg-${kpi.color}-500/10 border border-${kpi.color}-500/30 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{kpi.label}</span>
                  <span className={`text-${kpi.color}-400`}>{kpi.value}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className={`bg-gradient-to-r from-${kpi.color}-500 to-${kpi.color === "green" ? "teal" : kpi.color === "blue" ? "purple" : kpi.color === "purple" ? "pink" : "blue"}-500 h-full rounded-full`} style={{ width: `${parseFloat(kpi.value)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ViewPartnerAnalyticsModal open={viewAnalyticsOpen} onClose={() => setViewAnalyticsOpen(false)} />
    </div>
  );
}
