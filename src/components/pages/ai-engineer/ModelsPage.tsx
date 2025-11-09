import { useState } from "react";
import { Brain, TrendingUp, Activity, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { Progress } from "../../ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { aiEngineerData } from "../../../data/mockData";
import { DeployModelModal } from "../../modals/DeployModelModal";
import { RetrainAllModal } from "../../modals/RetrainAllModal";
import { RunInferenceModal } from "../../modals/RunInferenceModal";
import { ModelRegistryModal } from "../../modals/ModelRegistryModal";

export function ModelsPage() {
  const [deployModelOpen, setDeployModelOpen] = useState(false);
  const [retrainAllOpen, setRetrainAllOpen] = useState(false);
  const [runInferenceOpen, setRunInferenceOpen] = useState(false);
  const [modelRegistryOpen, setModelRegistryOpen] = useState(false);

  const models = [
    {
      name: "Predictive Maintenance Model",
      version: "v2.3.1",
      accuracy: 94.2,
      status: "Active",
      lastTrained: "2 days ago",
      predictions: "12.4K today"
    },
    {
      name: "Quality Inspection Model",
      version: "v1.8.4",
      accuracy: 96.8,
      status: "Active",
      lastTrained: "5 days ago",
      predictions: "8.2K today"
    },
    {
      name: "Demand Forecasting Model",
      version: "v3.1.0",
      accuracy: 88.5,
      status: "Active",
      lastTrained: "1 day ago",
      predictions: "5.6K today"
    },
    {
      name: "Supply Chain Optimizer",
      version: "v2.0.2",
      accuracy: 91.3,
      status: "Training",
      lastTrained: "In progress",
      predictions: "N/A"
    },
    {
      name: "Anomaly Detection Model",
      version: "v1.5.9",
      accuracy: 92.7,
      status: "Active",
      lastTrained: "3 days ago",
      predictions: "3.1K today"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">AI Models</h1>
          <p className="text-slate-400">Manage and monitor all AI/ML models</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setModelRegistryOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Brain className="w-4 h-4 mr-2" />
            Model Registry
          </Button>
          <Button 
            onClick={() => setDeployModelOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Deploy New Model
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
            <Brain className="w-8 h-8 text-purple-400" />
            <Badge className="bg-green-500/20 text-green-400">Active</Badge>
          </div>
          <div className="text-3xl text-white mb-1">5</div>
          <div className="text-sm text-slate-400">Total Models</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <Badge className="bg-blue-500/20 text-blue-400">Avg</Badge>
          </div>
          <div className="text-3xl text-white mb-1">92.7%</div>
          <div className="text-sm text-slate-400">Avg Accuracy</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-teal-400" />
            <Badge className="bg-teal-500/20 text-teal-400">Live</Badge>
          </div>
          <div className="text-3xl text-white mb-1">29.3K</div>
          <div className="text-sm text-slate-400">Predictions Today</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-8 h-8 text-blue-400" />
            <Badge className="bg-purple-500/20 text-purple-400">Status</Badge>
          </div>
          <div className="text-3xl text-white mb-1">4</div>
          <div className="text-sm text-slate-400">Models Deployed</div>
        </motion.div>
      </div>

      {/* Model Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Model Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={aiEngineerData.modelPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#14b8a6" strokeWidth={2} name="Accuracy %" />
            <Line type="monotone" dataKey="precision" stroke="#3b82f6" strokeWidth={2} name="Precision %" />
            <Line type="monotone" dataKey="recall" stroke="#8b5cf6" strokeWidth={2} name="Recall %" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Models Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-white">Active Models</h3>
          <Button 
            onClick={() => setRetrainAllOpen(true)}
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Retrain All Models
          </Button>
        </div>
        <div className="space-y-4">
          {models.map((model, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white">{model.name}</h4>
                    <Badge className="bg-slate-700 text-slate-300">{model.version}</Badge>
                    <Badge
                      className={`${
                        model.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Accuracy:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={model.accuracy} className="flex-1" />
                        <span className="text-white">{model.accuracy}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Last Trained:</span>
                      <div className="text-white mt-1">{model.lastTrained}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Predictions:</span>
                      <div className="text-teal-400 mt-1">{model.predictions}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-slate-400 hover:text-white"
                    onClick={() => setRunInferenceOpen(true)}
                  >
                    Run Test
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-teal-400 hover:text-teal-300"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <button 
            onClick={() => setRetrainAllOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-xs text-slate-400">5 Models</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Retrain All</h4>
          </button>
          <button 
            onClick={() => setRunInferenceOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-6 h-6 text-teal-400" />
              <span className="text-xs text-slate-400">Ready</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Run Inference</h4>
          </button>
          <button 
            onClick={() => setModelRegistryOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="text-xs text-slate-400">5 Available</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Model Registry</h4>
          </button>
          <button 
            onClick={() => setDeployModelOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-xs text-slate-400">Deploy</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Deploy Model</h4>
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <DeployModelModal open={deployModelOpen} onClose={() => setDeployModelOpen(false)} />
      <RetrainAllModal open={retrainAllOpen} onClose={() => setRetrainAllOpen(false)} />
      <RunInferenceModal open={runInferenceOpen} onClose={() => setRunInferenceOpen(false)} />
      <ModelRegistryModal open={modelRegistryOpen} onClose={() => setModelRegistryOpen(false)} />
    </div>
  );
}
