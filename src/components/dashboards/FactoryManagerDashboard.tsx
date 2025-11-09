import { useState } from "react";
import { KPICard } from "../shared/KPICard";
import { factoryData } from "../../data/mockData";
import { Factory, AlertTriangle, Users, TrendingUp, Wrench, Play, Cog, FileText, Power, Settings, Download, CheckCircle } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { ScheduleMaintenanceModal } from "../modals/ScheduleMaintenanceModal";
import { StartProductionModal } from "../modals/StartProductionModal";
import { StopMachineModal } from "../modals/StopMachineModal";
import { CalibrateMachineModal } from "../modals/CalibrateMachineModal";
import { CompleteMaintenanceModal } from "../modals/CompleteMaintenanceModal";
import { ExportReportModal } from "../modals/ExportReportModal";

const STATUS_COLORS = {
  operational: "#10b981",
  warning: "#f59e0b",
  maintenance: "#ef4444"
};

export function FactoryManagerDashboard() {
  const [scheduleMaintenanceOpen, setScheduleMaintenanceOpen] = useState(false);
  const [startProductionOpen, setStartProductionOpen] = useState(false);
  const [stopMachineOpen, setStopMachineOpen] = useState(false);
  const [calibrateOpen, setCalibrateOpen] = useState(false);
  const [completeMaintenanceOpen, setCompleteMaintenanceOpen] = useState(false);
  const [exportReportOpen, setExportReportOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Factory Management</h1>
          <p className="text-slate-400">Production monitoring and workforce optimization</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setScheduleMaintenanceOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Wrench className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button 
            onClick={() => setStartProductionOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Production
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Machines Operational"
          value={`${factoryData.machines.filter(m => m.status === "operational").length}/${factoryData.machines.length}`}
          change="Active now"
          trend="up"
          icon={Factory}
        />
        <KPICard
          title="Average Efficiency"
          value="91%"
          change="+3% this week"
          trend="up"
          icon={TrendingUp}
        />
        <KPICard
          title="Maintenance Alerts"
          value={factoryData.maintenanceAlerts.length.toString()}
          change="Pending actions"
          trend="neutral"
          icon={AlertTriangle}
        />
        <KPICard
          title="Workforce Utilization"
          value="85%"
          change="All shifts"
          trend="neutral"
          icon={Users}
        />
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="machines" className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="machines" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Factory className="w-4 h-4 mr-2" />
            Machines
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Wrench className="w-4 h-4 mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <FileText className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Machines Tab */}
        <TabsContent value="machines" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Machine Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Live Machine Status</h3>
              <div className="space-y-3">
                {factoryData.machines.map((machine) => (
                  <div
                    key={machine.id}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: STATUS_COLORS[machine.status as keyof typeof STATUS_COLORS] }}
                        ></div>
                        <div>
                          <h4 className="text-white">{machine.name}</h4>
                          <p className="text-sm text-slate-400">ID: {machine.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-slate-400">Efficiency</p>
                          <p className="text-teal-400">{machine.efficiency}%</p>
                        </div>
                        <Badge
                          className={`${
                            machine.status === "operational"
                              ? "bg-green-500/20 text-green-400"
                              : machine.status === "warning"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {machine.status}
                        </Badge>
                      </div>
                    </div>
                    {machine.status === "maintenance" && (
                      <div className="mt-3 pt-3 border-t border-slate-600">
                        <p className="text-sm text-slate-400">Scheduled maintenance in progress</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Workforce Utilization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Workforce Utilization</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={factoryData.workforce}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ shift, utilization }) => `${shift}: ${utilization}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="utilization"
                  >
                    {factoryData.workforce.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#14b8a6', '#3b82f6', '#8b5cf6'][index]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {factoryData.workforce.map((shift, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: ['#14b8a6', '#3b82f6', '#8b5cf6'][index] }}
                      ></div>
                      <span className="text-slate-300">{shift.shift}</span>
                    </div>
                    <span className="text-slate-400">{shift.utilization}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Maintenance Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">Predictive Maintenance Alerts</h3>
                <Badge className="bg-red-500/20 text-red-400">
                  {factoryData.maintenanceAlerts.filter(a => a.priority === "high").length} High Priority
                </Badge>
              </div>
              <div className="space-y-3">
                {factoryData.maintenanceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white">{alert.machine}</h4>
                        <p className="text-sm text-slate-400 mt-1">{alert.type} Maintenance</p>
                      </div>
                      <Badge
                        className={`${
                          alert.priority === "high"
                            ? "bg-red-500/20 text-red-400"
                            : alert.priority === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                      <span className="text-sm text-slate-400">Scheduled: {alert.date}</span>
                      <Button size="sm" variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10">
                        Trigger Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setScheduleMaintenanceOpen(true)}
                className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <Wrench className="w-4 h-4 mr-2" />
                Schedule New Maintenance
              </Button>
            </motion.div>

            {/* Maintenance History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Recent Maintenance</h3>
              <div className="space-y-3">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white">Assembly Line 3 - Completed</p>
                      <p className="text-sm text-slate-400 mt-1">Routine maintenance • 2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Cog className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-white">Paint Station 1 - Calibration</p>
                      <p className="text-sm text-slate-400 mt-1">Preventive check • 5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-white">Quality Control - Parts Replaced</p>
                      <p className="text-sm text-slate-400 mt-1">Emergency repair • 1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl text-teal-400 mb-1">15</div>
                    <div className="text-xs text-slate-400">This Month</div>
                  </div>
                  <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl text-green-400 mb-1">98%</div>
                    <div className="text-xs text-slate-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Production Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Weekly Production Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={factoryData.production}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" />
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

            {/* Production Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Production Statistics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Total Units This Month</span>
                    <span className="text-teal-400">5,250</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Quality Pass Rate</span>
                    <span className="text-green-400">96.8%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full" style={{ width: '96.8%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Target Achievement</span>
                    <span className="text-blue-400">105%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Equipment Uptime</span>
                    <span className="text-purple-400">94.2%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800">
                <FileText className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <Button 
            onClick={() => setStopMachineOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Power className="w-4 h-4 mr-2" />
            Stop Machine
          </Button>
          <Button 
            onClick={() => setCalibrateOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Settings className="w-4 h-4 mr-2" />
            Calibrate
          </Button>
          <Button 
            onClick={() => setCompleteMaintenanceOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Task
          </Button>
          <Button 
            onClick={() => setExportReportOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-white">Quality deviation detected on Assembly Line 1</p>
                <p className="text-sm text-slate-400 mt-1">Recommended action: Recalibrate sensors</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white">Maintenance completed for Assembly Line 3</p>
                <p className="text-sm text-slate-400 mt-1">Ready to resume operations • 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <ScheduleMaintenanceModal open={scheduleMaintenanceOpen} onClose={() => setScheduleMaintenanceOpen(false)} />
      <StartProductionModal open={startProductionOpen} onClose={() => setStartProductionOpen(false)} />
      <StopMachineModal open={stopMachineOpen} onClose={() => setStopMachineOpen(false)} machineName={null} />
      <CalibrateMachineModal open={calibrateOpen} onClose={() => setCalibrateOpen(false)} machineName={null} />
      <CompleteMaintenanceModal open={completeMaintenanceOpen} onClose={() => setCompleteMaintenanceOpen(false)} alert={null} />
      <ExportReportModal open={exportReportOpen} onClose={() => setExportReportOpen(false)} />
    </div>
  );
}
