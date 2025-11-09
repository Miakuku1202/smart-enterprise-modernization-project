import { TrendingUp, Activity, Brain, Database } from "lucide-react";
import { Badge } from "../../ui/badge";
import { motion } from "motion/react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


export function AIAnalyticsPage() {
  const modelComparison = [
    { model: "Predictive Maint.", accuracy: 94.2, precision: 92.1, recall: 95.3, f1Score: 93.7 },
    { model: "Quality Inspect.", accuracy: 96.8, precision: 95.4, recall: 97.2, f1Score: 96.3 },
    { model: "Demand Forecast", accuracy: 88.5, precision: 87.3, recall: 89.1, f1Score: 88.2 },
    { model: "Supply Chain Opt.", accuracy: 91.3, precision: 90.5, recall: 92.1, f1Score: 91.3 },
    { model: "Anomaly Detect.", accuracy: 92.7, precision: 91.8, recall: 93.5, f1Score: 92.6 }
  ];

  const trainingMetrics = [
    { epoch: 1, loss: 0.85, valLoss: 0.92, accuracy: 75 },
    { epoch: 5, loss: 0.62, valLoss: 0.68, accuracy: 82 },
    { epoch: 10, loss: 0.45, valLoss: 0.51, accuracy: 88 },
    { epoch: 15, loss: 0.32, valLoss: 0.38, accuracy: 91 },
    { epoch: 20, loss: 0.24, valLoss: 0.29, accuracy: 94 },
    { epoch: 25, loss: 0.18, valLoss: 0.23, accuracy: 96 }
  ];

  const inferenceMetrics = [
    { time: "00:00", requests: 450, latency: 45, errors: 2 },
    { time: "04:00", requests: 320, latency: 42, errors: 1 },
    { time: "08:00", requests: 780, latency: 52, errors: 3 },
    { time: "12:00", requests: 920, latency: 58, errors: 5 },
    { time: "16:00", requests: 850, latency: 55, errors: 4 },
    { time: "20:00", requests: 610, latency: 48, errors: 2 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">AI Analytics</h1>
          <p className="text-slate-400">Detailed performance metrics and insights</p>
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
            <TrendingUp className="w-8 h-8 text-green-400" />
            <Badge className="bg-green-500/20 text-green-400">+5.2%</Badge>
          </div>
          <div className="text-3xl text-white mb-1">92.7%</div>
          <div className="text-sm text-slate-400">Avg Model Accuracy</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-teal-400" />
            <Badge className="bg-teal-500/20 text-teal-400">Live</Badge>
          </div>
          <div className="text-3xl text-white mb-1">3,930</div>
          <div className="text-sm text-slate-400">Requests/Hour</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <Badge className="bg-purple-500/20 text-purple-400">Avg</Badge>
          </div>
          <div className="text-3xl text-white mb-1">50ms</div>
          <div className="text-sm text-slate-400">Inference Latency</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Database className="w-8 h-8 text-blue-400" />
            <Badge className="bg-blue-500/20 text-blue-400">Today</Badge>
          </div>
          <div className="text-3xl text-white mb-1">29.3K</div>
          <div className="text-sm text-slate-400">Predictions Made</div>
        </motion.div>
      </div>

      {/* Model Performance Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Model Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modelComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="model" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Bar dataKey="accuracy" fill="#14b8a6" name="Accuracy %" />
            <Bar dataKey="precision" fill="#3b82f6" name="Precision %" />
            <Bar dataKey="recall" fill="#8b5cf6" name="Recall %" />
            <Bar dataKey="f1Score" fill="#10b981" name="F1 Score %" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Training Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Training Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trainingMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="epoch" stroke="#94a3b8" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} name="Training Loss" />
              <Line type="monotone" dataKey="valLoss" stroke="#f97316" strokeWidth={2} name="Validation Loss" />
              <Line type="monotone" dataKey="accuracy" stroke="#14b8a6" strokeWidth={2} name="Accuracy %" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Inference Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Inference Performance (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={inferenceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend />
              <Area type="monotone" dataKey="requests" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} name="Requests" />
              <Area type="monotone" dataKey="latency" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Latency (ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Model Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Detailed Model Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">Model</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Accuracy</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Precision</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Recall</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">F1 Score</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {modelComparison.map((model, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-white">{model.model}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-teal-400">{model.accuracy}%</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-blue-400">{model.precision}%</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-purple-400">{model.recall}%</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-green-400">{model.f1Score}%</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Performance Insights</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h4 className="text-white">Best Performer</h4>
            </div>
            <p className="text-sm text-slate-300">Quality Inspection Model shows 96.8% accuracy with consistent performance</p>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-yellow-400" />
              <h4 className="text-white">Needs Attention</h4>
            </div>
            <p className="text-sm text-slate-300">Demand Forecasting Model accuracy dropped 2% - consider retraining</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <h4 className="text-white">Optimization</h4>
            </div>
            <p className="text-sm text-slate-300">Average inference latency improved 15% after recent optimization</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
