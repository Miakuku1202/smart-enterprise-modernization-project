import { useState } from "react";
import { KPICard } from "../shared/KPICard";
import { itDevOpsData } from "../../data/mockData";
import { Server, Activity, AlertCircle, Cloud, Play, Code, Shield, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { ViewLogsModal } from "../modals/ViewLogsModal";
import { DeployServiceModal } from "../modals/DeployServiceModal";
import { RestartServiceModal } from "../modals/RestartServiceModal";
import { ViewMetricsModal } from "../modals/ViewMetricsModal";
import { ScaleResourcesModal } from "../modals/ScaleResourcesModal";

export function ITDevOpsDashboard() {
  const [viewLogsOpen, setViewLogsOpen] = useState(false);
  const [deployServiceOpen, setDeployServiceOpen] = useState(false);
  const [restartServiceOpen, setRestartServiceOpen] = useState(false);
  const [viewMetricsOpen, setViewMetricsOpen] = useState(false);
  const [scaleResourcesOpen, setScaleResourcesOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">IT & DevOps Dashboard</h1>
          <p className="text-slate-400">Infrastructure monitoring and API management</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setViewLogsOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Code className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button 
            onClick={() => setDeployServiceOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Deploy Service
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="System Uptime"
          value="99.9%"
          change="Last 30 days"
          trend="up"
          icon={Server}
        />
        <KPICard
          title="API Requests"
          value="15.4K"
          change="Today"
          trend="up"
          icon={Activity}
        />
        <KPICard
          title="Active Containers"
          value="165"
          change="Docker + K8s"
          trend="neutral"
          icon={Server}
        />
        <KPICard
          title="Error Rate"
          value="0.08%"
          change="Below threshold"
          trend="up"
          icon={AlertCircle}
        />
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="infrastructure" className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="infrastructure" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Cloud className="w-4 h-4 mr-2" />
            Infrastructure
          </TabsTrigger>
          <TabsTrigger value="apis" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <BarChart3 className="w-4 h-4 mr-2" />
            APIs
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Infrastructure Tab */}
        <TabsContent value="infrastructure" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* System Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">System Health Monitor</h3>
              <div className="space-y-4">
                {itDevOpsData.systemHealth.map((system, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
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

            {/* Cloud Usage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">Cloud Resources</h3>
                <Cloud className="w-6 h-6 text-teal-400" />
              </div>
              <div className="space-y-4">
                {Object.entries(itDevOpsData.cloudUsage).map(([key, value], index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-300 capitalize">{key}</span>
                      <span className="text-teal-400">{value}%</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <h4 className="text-white mb-4">Container Status</h4>
                <div className="space-y-3">
                  {itDevOpsData.containers.map((container, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm">{container.type}</div>
                        <div className="text-xs text-slate-400">{container.status}</div>
                      </div>
                      <div className="text-teal-400">{container.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* CI/CD Pipeline Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-6">CI/CD Pipeline Status</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { stage: "Build", status: "success", duration: "2m 34s" },
                { stage: "Test", status: "success", duration: "5m 12s" },
                { stage: "Deploy", status: "in-progress", duration: "Running..." },
                { stage: "Verify", status: "pending", duration: "Waiting..." }
              ].map((pipeline, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    pipeline.status === "success"
                      ? "bg-green-500/10 border-green-500/30"
                      : pipeline.status === "in-progress"
                      ? "bg-blue-500/10 border-blue-500/30"
                      : "bg-slate-700/30 border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white">{pipeline.stage}</h4>
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        pipeline.status === "success"
                          ? "bg-green-400"
                          : pipeline.status === "in-progress"
                          ? "bg-blue-400 animate-pulse"
                          : "bg-slate-400"
                      }`}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-400">{pipeline.duration}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* APIs Tab */}
        <TabsContent value="apis" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* API Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">API Request Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={itDevOpsData.apiMetrics}>
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

            {/* API Endpoints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Top API Endpoints</h3>
              <div className="space-y-3">
                {[
                  { endpoint: "/api/v1/orders", requests: "4.2K", latency: "45ms", status: "healthy" },
                  { endpoint: "/api/v1/inventory", requests: "3.8K", latency: "32ms", status: "healthy" },
                  { endpoint: "/api/v1/auth", requests: "2.9K", latency: "120ms", status: "warning" },
                  { endpoint: "/api/v1/payments", requests: "1.5K", latency: "78ms", status: "healthy" }
                ].map((api, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white text-sm font-mono">{api.endpoint}</h4>
                        <div className="flex gap-4 mt-2 text-xs text-slate-400">
                          <span>Requests: <span className="text-teal-400">{api.requests}</span></span>
                          <span>Latency: <span className="text-blue-400">{api.latency}</span></span>
                        </div>
                      </div>
                      <Badge className={api.status === "healthy" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {api.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setDeployServiceOpen(true)}
                className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <Play className="w-4 h-4 mr-2" />
                Deploy New Endpoint
              </Button>
            </motion.div>
          </div>

          {/* Error Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white">Recent Error Logs</h3>
              <div className="flex gap-3">
                <Badge className="bg-red-500/20 text-red-400">
                  {itDevOpsData.errorLogs.filter(e => e.severity === "high").length} Critical
                </Badge>
                <Button 
                  onClick={() => setViewLogsOpen(true)}
                  size="sm"
                  variant="outline"
                  className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                >
                  <Code className="w-4 h-4 mr-2" />
                  View All Logs
                </Button>
              </div>
            </div>
            <div className="space-y-3 max-h-[320px] overflow-y-auto">
              {itDevOpsData.errorLogs.map((log, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white text-sm">{log.service}</h4>
                      <p className="text-xs text-slate-400 mt-1">{log.error}</p>
                    </div>
                    <Badge
                      className={`${
                        log.severity === "high"
                          ? "bg-red-500/20 text-red-400"
                          : log.severity === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {log.severity}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Security Overview</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-white">SSL Certificates</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Valid</Badge>
                  </div>
                  <p className="text-sm text-slate-400">All certificates up to date • Expires in 87 days</p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-white">Firewall Rules</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  <p className="text-sm text-slate-400">145 rules configured • Last updated 2 days ago</p>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">Vulnerability Scan</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">2 Warnings</Badge>
                  </div>
                  <p className="text-sm text-slate-400">Medium priority vulnerabilities detected</p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-white">Access Control</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Secured</Badge>
                  </div>
                  <p className="text-sm text-slate-400">Role-based access control enforced</p>
                </div>
              </div>
            </motion.div>

            {/* Threat Detection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Threat Detection</h3>
              <div className="space-y-4">
                <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-4xl text-green-400 mb-2">0</div>
                  <div className="text-slate-400">Active Threats</div>
                  <p className="text-xs text-slate-500 mt-2">Last 24 hours</p>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">Failed Login Attempts</span>
                    <span className="text-yellow-400">12</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">Blocked IP Addresses</span>
                    <span className="text-red-400">8</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 text-sm">DDoS Attempts</span>
                    <span className="text-green-400">0</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <Button 
            onClick={() => setRestartServiceOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Server className="w-4 h-4 mr-2" />
            Restart Service
          </Button>
          <Button 
            onClick={() => setViewMetricsOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Activity className="w-4 h-4 mr-2" />
            View Metrics
          </Button>
          <Button 
            onClick={() => setViewLogsOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Code className="w-4 h-4 mr-2" />
            Access Logs
          </Button>
          <Button 
            onClick={() => setScaleResourcesOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Cloud className="w-4 h-4 mr-2" />
            Scale Resources
          </Button>
        </div>
      </motion.div>

      {/* Modals */}
      <ViewLogsModal open={viewLogsOpen} onClose={() => setViewLogsOpen(false)} />
      <DeployServiceModal open={deployServiceOpen} onClose={() => setDeployServiceOpen(false)} />
      <RestartServiceModal open={restartServiceOpen} onClose={() => setRestartServiceOpen(false)} service={null} />
      <ViewMetricsModal open={viewMetricsOpen} onClose={() => setViewMetricsOpen(false)} endpoint={null} />
      <ScaleResourcesModal open={scaleResourcesOpen} onClose={() => setScaleResourcesOpen(false)} service={null} />
    </div>
  );
}
