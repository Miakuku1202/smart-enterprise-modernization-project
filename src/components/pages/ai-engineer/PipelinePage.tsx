import { useState } from "react";
import { Database, Activity, AlertCircle, CheckCircle, Clock, Play, RefreshCw } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { Progress } from "../../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { aiEngineerData } from "../../../data/mockData";
import { RestartPipelineModal } from "../../modals/RestartPipelineModal";
import { ExportDataModal } from "../../modals/ExportDataModal";

export function PipelinePage() {
  const [restartPipelineOpen, setRestartPipelineOpen] = useState(false);
  const [exportDataOpen, setExportDataOpen] = useState(false);

  const pipelines = [
    {
      name: "Production Data Ingestion",
      status: "Running",
      progress: 87,
      recordsProcessed: "1.2M",
      lastRun: "2 min ago",
      nextRun: "In 58 min"
    },
    {
      name: "Quality Metrics ETL",
      status: "Running",
      progress: 62,
      recordsProcessed: "456K",
      lastRun: "15 min ago",
      nextRun: "In 45 min"
    },
    {
      name: "Predictive Model Training",
      status: "Completed",
      progress: 100,
      recordsProcessed: "2.8M",
      lastRun: "1 hour ago",
      nextRun: "In 5 hours"
    },
    {
      name: "Supply Chain Analytics",
      status: "Failed",
      progress: 43,
      recordsProcessed: "189K",
      lastRun: "3 hours ago",
      nextRun: "Manual restart required"
    }
  ];

  const dataFlowMetrics = [
    { time: "00:00", ingestion: 1200, processing: 1150, output: 1100 },
    { time: "04:00", ingestion: 1400, processing: 1350, output: 1300 },
    { time: "08:00", ingestion: 1800, processing: 1750, output: 1700 },
    { time: "12:00", ingestion: 2100, processing: 2050, output: 2000 },
    { time: "16:00", ingestion: 1900, processing: 1850, output: 1800 },
    { time: "20:00", ingestion: 1600, processing: 1550, output: 1500 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Data Pipeline</h1>
          <p className="text-slate-400">Monitor and manage data processing workflows</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setExportDataOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Database className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button 
            onClick={() => setRestartPipelineOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart All Pipelines
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Database className="w-8 h-8 text-teal-400" />
            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
          </div>
          <div className="text-3xl text-white mb-1">4</div>
          <div className="text-sm text-slate-400">Active Pipelines</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <Badge className="bg-blue-500/20 text-blue-400">Live</Badge>
          </div>
          <div className="text-3xl text-white mb-1">4.6M</div>
          <div className="text-sm text-slate-400">Records/Day</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>
          </div>
          <div className="text-3xl text-white mb-1">97.8%</div>
          <div className="text-sm text-slate-400">Success Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <Badge className="bg-red-500/20 text-red-400">Alert</Badge>
          </div>
          <div className="text-3xl text-white mb-1">1</div>
          <div className="text-sm text-slate-400">Failed Pipeline</div>
        </motion.div>
      </div>

      {/* Data Flow Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Data Flow Metrics (24h)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataFlowMetrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Line type="monotone" dataKey="ingestion" stroke="#14b8a6" strokeWidth={2} name="Data Ingestion" />
            <Line type="monotone" dataKey="processing" stroke="#3b82f6" strokeWidth={2} name="Processing" />
            <Line type="monotone" dataKey="output" stroke="#8b5cf6" strokeWidth={2} name="Output" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pipeline Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-white">Data Pipeline Status</h3>
          <Button 
            onClick={() => setRestartPipelineOpen(true)}
            size="sm" 
            variant="outline" 
            className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Failed Pipelines
          </Button>
        </div>
        <div className="space-y-4">
          {pipelines.map((pipeline, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white">{pipeline.name}</h4>
                    <Badge
                      className={`${
                        pipeline.status === "Running"
                          ? "bg-blue-500/20 text-blue-400"
                          : pipeline.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {pipeline.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">Progress:</span>
                      <Progress value={pipeline.progress} className="flex-1 max-w-xs" />
                      <span className="text-sm text-white">{pipeline.progress}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Records Processed:</span>
                        <div className="text-teal-400">{pipeline.recordsProcessed}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Last Run:</span>
                        <div className="text-white">{pipeline.lastRun}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Next Run:</span>
                        <div className="text-white">{pipeline.nextRun}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {pipeline.status === "Failed" && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-400 hover:text-red-300"
                      onClick={() => setRestartPipelineOpen(true)}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Restart
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-slate-400 hover:text-white"
                  >
                    View Logs
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pipeline Stages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Pipeline Stages</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { name: "Ingestion", status: "Active", icon: Database, color: "teal" },
            { name: "Validation", status: "Active", icon: CheckCircle, color: "green" },
            { name: "Transform", status: "Active", icon: RefreshCw, color: "blue" },
            { name: "Processing", status: "Active", icon: Activity, color: "purple" },
            { name: "Output", status: "Warning", icon: AlertCircle, color: "yellow" }
          ].map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={index}
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center"
              >
                <Icon className={`w-8 h-8 text-${stage.color}-400 mx-auto mb-2`} />
                <h4 className="text-white mb-1">{stage.name}</h4>
                <Badge
                  className={`${
                    stage.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {stage.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={() => setRestartPipelineOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <RefreshCw className="w-6 h-6 text-teal-400" />
              <span className="text-xs text-slate-400">1 Failed</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Restart Pipeline</h4>
          </button>
          <button 
            onClick={() => setExportDataOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <Database className="w-6 h-6 text-blue-400" />
              <span className="text-xs text-slate-400">4.6M Records</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Export Data</h4>
          </button>
          <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left">
            <div className="flex items-center justify-between mb-2">
              <Play className="w-6 h-6 text-green-400" />
              <span className="text-xs text-slate-400">Ready</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Run Manual Job</h4>
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <RestartPipelineModal open={restartPipelineOpen} onClose={() => setRestartPipelineOpen(false)} />
      <ExportDataModal open={exportDataOpen} onClose={() => setExportDataOpen(false)} />
    </div>
  );
}
