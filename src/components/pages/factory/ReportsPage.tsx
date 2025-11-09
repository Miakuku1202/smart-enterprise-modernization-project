import { useState } from "react";
import { factoryData } from "../../../data/mockData";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileText, Download, TrendingUp, TrendingDown, Calendar, Filter } from "lucide-react";
import { motion } from "motion/react";
import { ExportReportModal } from "../../modals/ExportReportModal";

const COLORS = ['#14b8a6', '#3b82f6', '#8b5cf6', '#f59e0b'];

// Additional report data
const monthlyProduction = [
  { month: "Jul", units: 4200, target: 4000, quality: 96.5 },
  { month: "Aug", units: 4600, target: 4500, quality: 97.1 },
  { month: "Sep", units: 4850, target: 4800, quality: 96.8 },
  { month: "Oct", units: 5100, target: 5000, quality: 97.3 },
  { month: "Nov", units: 5250, target: 5200, quality: 96.8 },
];

const efficiencyByMachine = [
  { name: "Assembly Line 1", efficiency: 95 },
  { name: "Assembly Line 2", efficiency: 92 },
  { name: "Paint Station 1", efficiency: 88 },
  { name: "Paint Station 2", efficiency: 75 },
  { name: "Quality Control", efficiency: 98 },
  { name: "Welding Unit", efficiency: 91 },
];

const downtimeReasons = [
  { reason: "Scheduled Maintenance", hours: 12 },
  { reason: "Equipment Failure", hours: 8 },
  { reason: "Material Shortage", hours: 5 },
  { reason: "Quality Issues", hours: 3 },
];

export function ReportsPage() {
  const [timeRange, setTimeRange] = useState("month");
  const [exportReportOpen, setExportReportOpen] = useState(false);

  const handleQuickExport = (type: string) => {
    console.log(`Exporting ${type} report...`);
    setTimeout(() => {
      alert(`${type} report downloaded successfully!`);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Production Reports</h1>
          <p className="text-slate-400">Comprehensive analytics and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="week" className="text-white">This Week</SelectItem>
              <SelectItem value="month" className="text-white">This Month</SelectItem>
              <SelectItem value="quarter" className="text-white">This Quarter</SelectItem>
              <SelectItem value="year" className="text-white">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setExportReportOpen(true)}
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
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-teal-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Total Production</p>
          <p className="text-3xl text-white mb-1">5,250</p>
          <p className="text-xs text-slate-500">Units this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Quality Rate</p>
          <p className="text-3xl text-white mb-1">96.8%</p>
          <p className="text-xs text-slate-500">Pass rate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Target Achievement</p>
          <p className="text-3xl text-white mb-1">105%</p>
          <p className="text-xs text-slate-500">Above target</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-yellow-400" />
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-400">
              <TrendingDown className="w-3 h-3 mr-1" />
              -3%
            </Badge>
          </div>
          <p className="text-slate-400 text-sm mb-1">Downtime</p>
          <p className="text-3xl text-white mb-1">28h</p>
          <p className="text-xs text-slate-500">This month</p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Production Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-white">Monthly Production Trend</h3>
            <Button
              onClick={() => handleQuickExport("Production Trend")}
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line type="monotone" dataKey="units" stroke="#14b8a6" strokeWidth={2} name="Units Produced" />
              <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Machine Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-white">Machine Efficiency</h3>
            <Button
              onClick={() => handleQuickExport("Machine Efficiency")}
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={efficiencyByMachine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="efficiency" fill="#14b8a6" name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Downtime Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Downtime Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={downtimeReasons}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ reason, hours }) => `${reason}: ${hours}h`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="hours"
              >
                {downtimeReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Overall Equipment Effectiveness (OEE)</span>
                <span className="text-teal-400">84.5%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full" style={{ width: '84.5%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Availability</span>
                <span className="text-green-400">94.2%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Performance Rate</span>
                <span className="text-blue-400">91.8%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '91.8%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Quality Yield</span>
                <span className="text-purple-400">96.8%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '96.8%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weekly Production Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Weekly Production Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">Week</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Units Produced</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Target</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Achievement</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Quality Rate</th>
                <th className="text-center py-3 px-4 text-sm text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {factoryData.production.map((week, index) => {
                const achievement = Math.round((week.units / week.target) * 100);
                return (
                  <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-white">{week.week}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-teal-400">{week.units}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-slate-300">{week.target}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={achievement >= 100 ? "text-green-400" : "text-yellow-400"}>
                        {achievement}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-slate-300">
                        {(95 + Math.random() * 3).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={achievement >= 100 ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {achievement >= 100 ? "On Track" : "Below Target"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <ExportReportModal open={exportReportOpen} onClose={() => setExportReportOpen(false)} />
    </div>
  );
}
