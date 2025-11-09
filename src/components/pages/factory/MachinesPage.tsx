import { useState } from "react";
import { factoryData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Factory, Search, Filter, Power, Wrench, TrendingUp, Activity } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { StopMachineModal } from "../../modals/StopMachineModal";
import { CalibrateMachineModal } from "../../modals/CalibrateMachineModal";

const STATUS_COLORS = {
  operational: "#10b981",
  warning: "#f59e0b",
  maintenance: "#ef4444"
};

export function MachinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [stopMachineOpen, setStopMachineOpen] = useState(false);
  const [calibrateOpen, setCalibrateOpen] = useState(false);

  const filteredMachines = factoryData.machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         machine.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStopMachine = (machineId: string, machineName: string) => {
    setSelectedMachine(machineName);
    setStopMachineOpen(true);
  };

  const handleCalibrate = (machineId: string, machineName: string) => {
    setSelectedMachine(machineName);
    setCalibrateOpen(true);
  };

  const machineStats = {
    total: factoryData.machines.length,
    operational: factoryData.machines.filter(m => m.status === "operational").length,
    warning: factoryData.machines.filter(m => m.status === "warning").length,
    maintenance: factoryData.machines.filter(m => m.status === "maintenance").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Machine Management</h1>
        <p className="text-slate-400">Monitor and control all production machines</p>
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
              <p className="text-slate-400 text-sm mb-1">Total Machines</p>
              <p className="text-3xl text-white">{machineStats.total}</p>
            </div>
            <Factory className="w-10 h-10 text-teal-400" />
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
              <p className="text-slate-400 text-sm mb-1">Operational</p>
              <p className="text-3xl text-green-400">{machineStats.operational}</p>
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
              <p className="text-slate-400 text-sm mb-1">Warning</p>
              <p className="text-3xl text-yellow-400">{machineStats.warning}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-yellow-400" />
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
              <p className="text-slate-400 text-sm mb-1">In Maintenance</p>
              <p className="text-3xl text-red-400">{machineStats.maintenance}</p>
            </div>
            <Wrench className="w-10 h-10 text-red-400" />
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
              placeholder="Search machines by name or ID..."
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
              <SelectItem value="operational" className="text-white">Operational</SelectItem>
              <SelectItem value="warning" className="text-white">Warning</SelectItem>
              <SelectItem value="maintenance" className="text-white">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Machine Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMachines.map((machine, index) => (
          <motion.div
            key={machine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6 hover:border-teal-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${STATUS_COLORS[machine.status as keyof typeof STATUS_COLORS]}20` }}
                  >
                    <Factory className="w-6 h-6" style={{ color: STATUS_COLORS[machine.status as keyof typeof STATUS_COLORS] }} />
                  </div>
                  <div>
                    <h3 className="text-white">{machine.name}</h3>
                    <p className="text-xs text-slate-400">{machine.id}</p>
                  </div>
                </div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[machine.status as keyof typeof STATUS_COLORS] }}
                ></div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-slate-400">Efficiency</span>
                    <span className="text-teal-400">{machine.efficiency}%</span>
                  </div>
                  <Progress value={machine.efficiency} className="h-2" />
                </div>

                <div className="pt-3 border-t border-slate-700">
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
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">Scheduled maintenance in progress</p>
                </div>
              )}

              {machine.status === "warning" && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">Performance below threshold</p>
                </div>
              )}

              <div className="flex gap-2">
                {machine.status === "operational" && (
                  <>
                    <Button
                      onClick={() => handleStopMachine(machine.id, machine.name)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20"
                    >
                      <Power className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                    <Button
                      onClick={() => handleCalibrate(machine.id, machine.name)}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                    >
                      <Wrench className="w-4 h-4 mr-2" />
                      Calibrate
                    </Button>
                  </>
                )}
                {machine.status === "warning" && (
                  <Button
                    onClick={() => handleCalibrate(machine.id, machine.name)}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    <Wrench className="w-4 h-4 mr-2" />
                    Fix Now
                  </Button>
                )}
                {machine.status === "maintenance" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-400"
                    disabled
                  >
                    Under Maintenance
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMachines.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700">
          <Factory className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No machines found matching your criteria</p>
        </div>
      )}

      {/* Modals */}
      <StopMachineModal 
        open={stopMachineOpen} 
        onClose={() => setStopMachineOpen(false)}
        machineName={selectedMachine}
      />
      <CalibrateMachineModal 
        open={calibrateOpen} 
        onClose={() => setCalibrateOpen(false)}
        machineName={selectedMachine}
      />
    </div>
  );
}
