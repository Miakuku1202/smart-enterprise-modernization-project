import { useState } from "react";
import { KPICard } from "../shared/KPICard";
import { aiEngineerData } from "../../data/mockData";
import { Brain, TrendingUp, Activity, Database, Play, RefreshCw } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { DeployModelModal } from "../modals/DeployModelModal";
import { ViewDataPipelineModal } from "../modals/ViewDataPipelineModal";
import { RetrainAllModal } from "../modals/RetrainAllModal";
import { RunInferenceModal } from "../modals/RunInferenceModal";
import { ExportDataModal } from "../modals/ExportDataModal";
import { ModelRegistryModal } from "../modals/ModelRegistryModal";
import { RestartPipelineModal } from "../modals/RestartPipelineModal";

export function AIEngineerDashboard() {
  const [deployModelOpen, setDeployModelOpen] = useState(false);
  const [viewPipelineOpen, setViewPipelineOpen] = useState(false);
  const [retrainAllOpen, setRetrainAllOpen] = useState(false);
  const [runInferenceOpen, setRunInferenceOpen] = useState(false);
  const [exportDataOpen, setExportDataOpen] = useState(false);
  const [modelRegistryOpen, setModelRegistryOpen] = useState(false);
  const [restartPipelineOpen, setRestartPipelineOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">AI & Analytics Dashboard</h1>
          <p className="text-slate-400">Model performance and data pipeline monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setViewPipelineOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Database className="w-4 h-4 mr-2" />
            View Data Pipeline
          </Button>
          <Button 
            onClick={() => setDeployModelOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Deploy Model
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Models"
          value="5"
          change="All operational"
          trend="up"
          icon={Brain}
        />
        <KPICard
          title="Avg Accuracy"
          value="92.2%"
          change="+2.1% this month"
          trend="up"
          icon={TrendingUp}
        />
        <KPICard
          title="Predictions/Day"
          value="18.9K"
          change="Inference rate"
          trend="up"
          icon={Activity}
        />
        <KPICard
          title="Data Throughput"
          value="15.2K/min"
          change="Processing rate"
          trend="neutral"
          icon={Database}
        />
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="models" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Brain className="w-4 h-4 mr-2" />
            Models
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Database className="w-4 h-4 mr-2" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white">Model Performance</h3>
              <div className="flex gap-3">
                <Badge className="bg-yellow-500/20 text-yellow-400">
                  1 Model needs retraining
                </Badge>
                <Button 
                  onClick={() => setDeployModelOpen(true)}
                  size="sm" 
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Deploy New
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Model Name</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Accuracy</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Last Updated</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Retrain</th>
                    <th className="text-right py-3 px-4 text-sm text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {aiEngineerData.models.map((model, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-teal-400" />
                          <span className="text-white">{model.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={model.accuracy} className="w-20 h-2" />
                          <span className="text-teal-400">{model.accuracy}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={`${
                            model.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {model.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-400">{model.lastUpdated}</span>
                      </td>
                      <td className="py-4 px-4">
                        {model.retrain ? (
                          <Badge className="bg-red-500/20 text-red-400">Required</Badge>
                        ) : (
                          <Badge className="bg-green-500/20 text-green-400">Not Needed</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button 
                          size="sm" 
                          variant={model.retrain ? "default" : "ghost"}
                          className={model.retrain ? "bg-teal-500 hover:bg-teal-600" : "text-slate-400 hover:text-white"}
                        >
                          {model.retrain ? <RefreshCw className="w-3 h-3 mr-1" /> : null}
                          {model.retrain ? "Retrain" : "View"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white">Data Pipeline Status</h3>
              <Button 
                onClick={() => setViewPipelineOpen(true)}
                size="sm"
                variant="outline"
                className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
              >
                <Database className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {aiEngineerData.dataPipeline.map((stage, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    stage.status === "healthy"
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-yellow-500/10 border-yellow-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        stage.status === "healthy" ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    ></div>
                    <Database className={`w-4 h-4 ${
                      stage.status === "healthy" ? "text-green-400" : "text-yellow-400"
                    }`} />
                  </div>
                  <h4 className="text-white text-sm mb-1">{stage.stage}</h4>
                  <p className="text-xs text-slate-400">{stage.throughput}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Pipeline Metrics */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Pipeline Throughput</h3>
              <div className="space-y-4">
                {aiEngineerData.dataPipeline.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{stage.stage}</span>
                      <span className="text-teal-400">{stage.throughput}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          stage.status === "healthy" ? "bg-gradient-to-r from-green-500 to-teal-500" : "bg-gradient-to-r from-yellow-500 to-orange-500"
                        }`}
                        style={{ width: `${stage.status === "healthy" ? "85%" : "60%"}` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Pipeline Health</h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white">Data ingestion running smoothly</p>
                      <p className="text-sm text-slate-400 mt-1">15.2K records/min processed</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-white">Feature engineering needs attention</p>
                      <p className="text-sm text-slate-400 mt-1">Performance degraded by 15%</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-white">Model training pipeline healthy</p>
                      <p className="text-sm text-slate-400 mt-1">All models updating on schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Predictive Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Predicted Maintenance Failures</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aiEngineerData.predictions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Bar dataKey="failures" fill="#14b8a6" name="Predicted Failures" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-slate-300">
                  Average prediction confidence: <span className="text-teal-400">85.8%</span>
                </p>
              </div>
            </motion.div>

            {/* Demand Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Demand Forecast by Product</h3>
              <div className="space-y-4">
                {aiEngineerData.demandForecast.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white">{item.product}</h4>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        {item.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Predicted Units</span>
                      <span className="text-teal-400">{item.predicted}</span>
                    </div>
                    <Progress value={item.confidence} className="mt-3 h-2" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-4">AI Insights</h3>
            <div className="space-y-3">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-white">Model drift detected for Production Forecast v3</p>
                    <p className="text-sm text-slate-400 mt-1">Recommendation: Retrain model with recent data</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-white">Quality Detection AI improved accuracy to 97.2%</p>
                    <p className="text-sm text-slate-400 mt-1">No action required • 2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-white">New training dataset available for Demand Forecasting</p>
                    <p className="text-sm text-slate-400 mt-1">5,230 new records added • 5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
            onClick={() => setRetrainAllOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retrain All
          </Button>
          <Button 
            onClick={() => setRunInferenceOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Inference
          </Button>
          <Button 
            onClick={() => setExportDataOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Database className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button 
            onClick={() => setModelRegistryOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Brain className="w-4 h-4 mr-2" />
            Model Registry
          </Button>
        </div>
      </motion.div>

      {/* Modals */}
      <DeployModelModal open={deployModelOpen} onClose={() => setDeployModelOpen(false)} />
      <ViewDataPipelineModal open={viewPipelineOpen} onClose={() => setViewPipelineOpen(false)} />
      <RetrainAllModal open={retrainAllOpen} onClose={() => setRetrainAllOpen(false)} />
      <RunInferenceModal open={runInferenceOpen} onClose={() => setRunInferenceOpen(false)} />
      <ExportDataModal open={exportDataOpen} onClose={() => setExportDataOpen(false)} />
      <ModelRegistryModal open={modelRegistryOpen} onClose={() => setModelRegistryOpen(false)} />
      <RestartPipelineModal open={restartPipelineOpen} onClose={() => setRestartPipelineOpen(false)} />
    </div>
  );
}