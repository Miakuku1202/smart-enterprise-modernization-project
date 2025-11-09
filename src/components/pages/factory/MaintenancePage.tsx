import { useState } from "react";
import { factoryData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Wrench, Search, Filter, CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { ScheduleMaintenanceModal } from "../../modals/ScheduleMaintenanceModal";
import { CompleteMaintenanceModal } from "../../modals/CompleteMaintenanceModal";

// Extended maintenance data
const maintenanceHistory = [
  { id: "MNT-001", machine: "Assembly Line 1", type: "Routine", status: "completed", date: "2025-11-05", duration: "2 hours", technician: "John Doe" },
  { id: "MNT-002", machine: "Assembly Line 3", type: "Scheduled", status: "completed", date: "2025-11-06", duration: "3 hours", technician: "Jane Smith" },
  { id: "MNT-003", machine: "Paint Station 1", type: "Preventive", status: "completed", date: "2025-11-04", duration: "1.5 hours", technician: "Mike Johnson" },
  { id: "MNT-004", machine: "Quality Control", type: "Emergency", status: "completed", date: "2025-11-03", duration: "4 hours", technician: "Sarah Williams" },
];

export function MaintenancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [scheduleMaintenanceOpen, setScheduleMaintenanceOpen] = useState(false);
  const [completeMaintenanceOpen, setCompleteMaintenanceOpen] = useState(false);

  const filteredAlerts = factoryData.maintenanceAlerts.filter(alert => {
    const matchesSearch = alert.machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleCompleteClick = (alert: any) => {
    setSelectedAlert(alert);
    setCompleteMaintenanceOpen(true);
  };

  const alertStats = {
    total: factoryData.maintenanceAlerts.length,
    high: factoryData.maintenanceAlerts.filter(a => a.priority === "high").length,
    medium: factoryData.maintenanceAlerts.filter(a => a.priority === "medium").length,
    low: factoryData.maintenanceAlerts.filter(a => a.priority === "low").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Maintenance Management</h1>
          <p className="text-slate-400">Predictive maintenance alerts and scheduling</p>
        </div>
        <Button
          onClick={() => setScheduleMaintenanceOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Alerts</p>
              <p className="text-3xl text-white">{alertStats.total}</p>
            </div>
            <Wrench className="w-10 h-10 text-teal-400" />
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
              <p className="text-slate-400 text-sm mb-1">High Priority</p>
              <p className="text-3xl text-red-400">{alertStats.high}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-400" />
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
              <p className="text-slate-400 text-sm mb-1">This Month</p>
              <p className="text-3xl text-teal-400">15</p>
            </div>
            <CheckCircle className="w-10 h-10 text-teal-400" />
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
              <p className="text-slate-400 text-sm mb-1">Success Rate</p>
              <p className="text-3xl text-green-400">98%</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search maintenance alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">All Priority</SelectItem>
              <SelectItem value="high" className="text-white">High</SelectItem>
              <SelectItem value="medium" className="text-white">Medium</SelectItem>
              <SelectItem value="low" className="text-white">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Active Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-white">Active Maintenance Alerts ({filteredAlerts.length})</h3>
          <Badge className="bg-red-500/20 text-red-400">
            {alertStats.high} High Priority
          </Badge>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.priority === "high" ? "bg-red-500/20" :
                    alert.priority === "medium" ? "bg-yellow-500/20" :
                    "bg-green-500/20"
                  }`}>
                    <Wrench className={`w-5 h-5 ${
                      alert.priority === "high" ? "text-red-400" :
                      alert.priority === "medium" ? "text-yellow-400" :
                      "text-green-400"
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-white">{alert.machine}</h4>
                    <p className="text-sm text-slate-400 mt-1">{alert.type} Maintenance</p>
                  </div>
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
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled: {alert.date}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCompleteClick(alert)}
                    size="sm"
                    variant="outline"
                    className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                  >
                    Complete Now
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No maintenance alerts found</p>
          </div>
        )}
      </motion.div>

      {/* Maintenance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Recent Maintenance History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">ID</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Machine</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Type</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Date</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Duration</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Technician</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map((item, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-teal-400">{item.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white">{item.machine}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300">{item.type}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-400 text-sm">{item.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300">{item.duration}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300">{item.technician}</span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-500/20 text-green-400">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modals */}
      <ScheduleMaintenanceModal 
        open={scheduleMaintenanceOpen} 
        onClose={() => setScheduleMaintenanceOpen(false)} 
      />
      <CompleteMaintenanceModal 
        open={completeMaintenanceOpen} 
        onClose={() => setCompleteMaintenanceOpen(false)}
        alert={selectedAlert}
      />
    </div>
  );
}
