import { useState } from "react";
import { itDevOpsData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Activity, Search, Filter, Code, Play, BarChart3, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DeployServiceModal } from "../../modals/DeployServiceModal";
import { ViewMetricsModal } from "../../modals/ViewMetricsModal";

const apiEndpoints = [
  { endpoint: "/api/v1/orders", method: "GET", requests: "4.2K", latency: "45ms", status: "healthy", errorRate: "0.02%" },
  { endpoint: "/api/v1/inventory", method: "GET", requests: "3.8K", latency: "32ms", status: "healthy", errorRate: "0.01%" },
  { endpoint: "/api/v1/auth/login", method: "POST", requests: "2.9K", latency: "120ms", status: "warning", errorRate: "0.15%" },
  { endpoint: "/api/v1/payments", method: "POST", requests: "1.5K", latency: "78ms", status: "healthy", errorRate: "0.03%" },
  { endpoint: "/api/v1/users", method: "GET", requests: "5.1K", latency: "28ms", status: "healthy", errorRate: "0%" },
  { endpoint: "/api/v1/products", method: "GET", requests: "6.3K", latency: "35ms", status: "healthy", errorRate: "0.01%" },
  { endpoint: "/api/v1/analytics", method: "POST", requests: "890", latency: "155ms", status: "warning", errorRate: "0.22%" },
  { endpoint: "/api/v1/notifications", method: "POST", requests: "3.4K", latency: "42ms", status: "healthy", errorRate: "0.05%" },
];

const requestVolumeData = [
  { hour: "00:00", rest: 1200, graphql: 800 },
  { hour: "04:00", rest: 900, graphql: 600 },
  { hour: "08:00", rest: 2100, graphql: 1400 },
  { hour: "12:00", rest: 3200, graphql: 2100 },
  { hour: "16:00", rest: 2800, graphql: 1800 },
  { hour: "20:00", rest: 1800, graphql: 1200 },
];

export function APIsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAPI, setSelectedAPI] = useState<any>(null);
  const [deployServiceOpen, setDeployServiceOpen] = useState(false);
  const [viewMetricsOpen, setViewMetricsOpen] = useState(false);

  const filteredAPIs = apiEndpoints.filter(api => {
    const matchesSearch = api.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || api.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewMetrics = (api: any) => {
    setSelectedAPI(api);
    setViewMetricsOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">API Management</h1>
          <p className="text-slate-400">Monitor API performance and manage endpoints</p>
        </div>
        <Button
          onClick={() => setDeployServiceOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        >
          <Play className="w-4 h-4 mr-2" />
          Deploy New API
        </Button>
      </div>

      {/* API Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Requests</p>
              <p className="text-3xl text-white">15.4K</p>
            </div>
            <Activity className="w-10 h-10 text-teal-400" />
          </div>
          <p className="text-xs text-green-400 mt-2">+12% from yesterday</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Avg Latency</p>
              <p className="text-3xl text-green-400">58ms</p>
            </div>
            <Clock className="w-10 h-10 text-green-400" />
          </div>
          <p className="text-xs text-green-400 mt-2">-5ms improvement</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Success Rate</p>
              <p className="text-3xl text-blue-400">99.92%</p>
            </div>
            <BarChart3 className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-xs text-slate-400 mt-2">Within SLA</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Error Rate</p>
              <p className="text-3xl text-yellow-400">0.08%</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-xs text-yellow-400 mt-2">2 endpoints flagged</p>
        </motion.div>
      </div>

      {/* API Request Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">API Request Analytics (24 Hours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={requestVolumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="hour" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Line type="monotone" dataKey="rest" stroke="#14b8a6" strokeWidth={2} name="REST API" />
            <Line type="monotone" dataKey="graphql" stroke="#3b82f6" strokeWidth={2} name="GraphQL" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search endpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">All Status</SelectItem>
              <SelectItem value="healthy" className="text-white">Healthy</SelectItem>
              <SelectItem value="warning" className="text-white">Warning</SelectItem>
              <SelectItem value="error" className="text-white">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* API Endpoints List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">API Endpoints ({filteredAPIs.length})</h3>
        <div className="space-y-3">
          {filteredAPIs.map((api, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="border-slate-500 text-slate-300">
                      {api.method}
                    </Badge>
                    <code className="text-white text-sm font-mono">{api.endpoint}</code>
                  </div>
                  <div className="flex gap-6 text-xs text-slate-400">
                    <span>Requests: <span className="text-teal-400">{api.requests}</span></span>
                    <span>Latency: <span className="text-blue-400">{api.latency}</span></span>
                    <span>Error Rate: <span className={parseFloat(api.errorRate) > 0.1 ? "text-yellow-400" : "text-green-400"}>{api.errorRate}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={api.status === "healthy" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}
                  >
                    {api.status}
                  </Badge>
                  <Button
                    onClick={() => handleViewMetrics(api)}
                    size="sm"
                    variant="outline"
                    className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Metrics
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Response Time Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Response Time Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { range: "0-50ms", count: 8500 },
            { range: "51-100ms", count: 4200 },
            { range: "101-200ms", count: 1800 },
            { range: "201-500ms", count: 450 },
            { range: "500ms+", count: 50 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="range" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            />
            <Bar dataKey="count" fill="#14b8a6" name="Requests" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Modals */}
      <DeployServiceModal open={deployServiceOpen} onClose={() => setDeployServiceOpen(false)} />
      <ViewMetricsModal 
        open={viewMetricsOpen} 
        onClose={() => setViewMetricsOpen(false)}
        endpoint={selectedAPI}
      />
    </div>
  );
}
