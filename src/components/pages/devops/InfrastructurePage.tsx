import { useState } from "react";
import { itDevOpsData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Cloud, Server, Search, Filter, Activity, AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RestartServiceModal } from "../../modals/RestartServiceModal";
import { ScaleResourcesModal } from "../../modals/ScaleResourcesModal";

const containerData = [
  { id: "cont-001", name: "api-gateway", status: "running", cpu: 45, memory: 62, uptime: "15d 4h" },
  { id: "cont-002", name: "auth-service", status: "running", cpu: 38, memory: 55, uptime: "15d 4h" },
  { id: "cont-003", name: "payment-service", status: "running", cpu: 52, memory: 68, uptime: "12d 18h" },
  { id: "cont-004", name: "notification-service", status: "running", cpu: 28, memory: 42, uptime: "15d 4h" },
  { id: "cont-005", name: "analytics-worker", status: "warning", cpu: 78, memory: 85, uptime: "8d 12h" },
  { id: "cont-006", name: "data-processor", status: "running", cpu: 61, memory: 72, uptime: "10d 6h" },
];

const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, network: 120 },
  { time: "04:00", cpu: 38, memory: 58, network: 95 },
  { time: "08:00", cpu: 65, memory: 72, network: 180 },
  { time: "12:00", cpu: 72, memory: 78, network: 220 },
  { time: "16:00", cpu: 68, memory: 75, network: 195 },
  { time: "20:00", cpu: 54, memory: 68, network: 150 },
];

export function InfrastructurePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContainer, setSelectedContainer] = useState<any>(null);
  const [restartServiceOpen, setRestartServiceOpen] = useState(false);
  const [scaleResourcesOpen, setScaleResourcesOpen] = useState(false);

  const filteredContainers = containerData.filter(container => {
    const matchesSearch = container.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         container.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || container.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRestartService = (container: any) => {
    setSelectedContainer(container);
    setRestartServiceOpen(true);
  };

  const handleScaleResources = (container: any) => {
    setSelectedContainer(container);
    setScaleResourcesOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Infrastructure Management</h1>
          <p className="text-slate-400">Monitor and manage cloud resources and containers</p>
        </div>
        <Button
          onClick={() => setScaleResourcesOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        >
          <Cloud className="w-4 h-4 mr-2" />
          Scale Resources
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Services</p>
              <p className="text-3xl text-white">{containerData.length}</p>
            </div>
            <Server className="w-10 h-10 text-teal-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Running</p>
              <p className="text-3xl text-green-400">{containerData.filter(c => c.status === "running").length}</p>
            </div>
            <Activity className="w-10 h-10 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Warnings</p>
              <p className="text-3xl text-yellow-400">{containerData.filter(c => c.status === "warning").length}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Avg CPU Usage</p>
              <p className="text-3xl text-blue-400">52%</p>
            </div>
            <Activity className="w-10 h-10 text-blue-400" />
          </div>
        </motion.div>
      </div>

      {/* System Health Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">System Health Monitor</h3>
        <div className="space-y-4">
          {itDevOpsData.systemHealth.map((system, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      system.status === "healthy" ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  ></div>
                  <h4 className="text-white">{system.system}</h4>
                </div>
                <Badge
                  className={`${
                    system.status === "healthy"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {system.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-teal-400">{system.uptime}%</span>
                </div>
                <Progress value={system.uptime} className="h-2" />
              </div>
            </div>
          ))}
        </div>
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
              placeholder="Search containers..."
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
              <SelectItem value="running" className="text-white">Running</SelectItem>
              <SelectItem value="warning" className="text-white">Warning</SelectItem>
              <SelectItem value="stopped" className="text-white">Stopped</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Container Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContainers.map((container, index) => (
          <motion.div
            key={container.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">{container.name}</h3>
                <p className="text-xs text-slate-400">{container.id}</p>
              </div>
              <div 
                className={`w-3 h-3 rounded-full ${
                  container.status === "running" ? "bg-green-400" : "bg-yellow-400"
                }`}
              ></div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">CPU Usage</span>
                  <span className={`${container.cpu > 70 ? "text-yellow-400" : "text-teal-400"}`}>
                    {container.cpu}%
                  </span>
                </div>
                <Progress value={container.cpu} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Memory</span>
                  <span className={`${container.memory > 80 ? "text-red-400" : "text-blue-400"}`}>
                    {container.memory}%
                  </span>
                </div>
                <Progress value={container.memory} className="h-2" />
              </div>

              <div className="pt-2 border-t border-slate-600">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-slate-300">{container.uptime}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleRestartService(container)}
                size="sm"
                variant="outline"
                className="flex-1 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Restart
              </Button>
              <Button
                onClick={() => handleScaleResources(container)}
                size="sm"
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <Cloud className="w-4 h-4 mr-2" />
                Scale
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">24-Hour Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Line type="monotone" dataKey="cpu" stroke="#14b8a6" strokeWidth={2} name="CPU %" />
            <Line type="monotone" dataKey="memory" stroke="#3b82f6" strokeWidth={2} name="Memory %" />
            <Line type="monotone" dataKey="network" stroke="#8b5cf6" strokeWidth={2} name="Network MB/s" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Modals */}
      <RestartServiceModal 
        open={restartServiceOpen} 
        onClose={() => setRestartServiceOpen(false)}
        service={selectedContainer}
      />
      <ScaleResourcesModal 
        open={scaleResourcesOpen} 
        onClose={() => setScaleResourcesOpen(false)}
        service={selectedContainer}
      />
    </div>
  );
}
