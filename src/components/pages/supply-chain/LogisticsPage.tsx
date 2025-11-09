import { useState } from "react";
import { Truck, MapPin, CheckCircle, TrendingUp } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { supplyChainData } from "../../../data/mockData";
import { TrackShipmentModal } from "../../modals/TrackShipmentModal";
import { ApproveShipmentsModal } from "../../modals/ApproveShipmentsModal";
import { GenerateReportModal } from "../../modals/GenerateReportModal";
import { OptimizeRoutesModal } from "../../modals/OptimizeRoutesModal";

const COLORS = ['#10b981', '#ef4444', '#3b82f6'];

export function LogisticsPage() {
  const [trackShipmentOpen, setTrackShipmentOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [approveShipmentsOpen, setApproveShipmentsOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);
  const [optimizeRoutesOpen, setOptimizeRoutesOpen] = useState(false);

  const handleTrackShipment = (shipment: any) => {
    setSelectedShipment(shipment);
    setTrackShipmentOpen(true);
  };

  const shipments = [
    { id: "SHP-3421", route: "Germany → Factory A", status: "In Transit", eta: "2h 45m" },
    { id: "SHP-3422", route: "Japan → Factory B", status: "In Transit", eta: "5h 12m" },
    { id: "SHP-3423", route: "USA → Warehouse 1", status: "Customs", eta: "8h 30m" },
    { id: "SHP-3424", route: "France → Factory A", status: "Delivered", eta: "Completed" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Logistics Management</h1>
          <p className="text-slate-400">Real-time shipment tracking and route optimization</p>
        </div>
        <Button 
          onClick={() => setOptimizeRoutesOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
        >
          <Truck className="w-4 h-4 mr-2" />
          Optimize Routes
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Truck className="w-8 h-8 text-teal-400" />
            <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
          </div>
          <div className="text-3xl text-white mb-1">24</div>
          <div className="text-sm text-slate-400">Active Shipments</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <Badge className="bg-green-500/20 text-green-400">On Time</Badge>
          </div>
          <div className="text-3xl text-white mb-1">94%</div>
          <div className="text-sm text-slate-400">Delivery Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <Badge className="bg-purple-500/20 text-purple-400">Improved</Badge>
          </div>
          <div className="text-3xl text-white mb-1">$12K</div>
          <div className="text-sm text-slate-400">Cost Saved</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <MapPin className="w-8 h-8 text-yellow-400" />
            <Badge className="bg-yellow-500/20 text-yellow-400">Global</Badge>
          </div>
          <div className="text-3xl text-white mb-1">15</div>
          <div className="text-sm text-slate-400">Routes Active</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Shipments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Active Shipments</h3>
          <div className="space-y-3">
            {shipments.map((shipment, index) => (
              <div
                key={index}
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white">{shipment.id}</h4>
                    <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {shipment.route}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      shipment.status === "Delivered"
                        ? "bg-green-500/20 text-green-400"
                        : shipment.status === "In Transit"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {shipment.status}
                  </Badge>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-600 flex items-center justify-between">
                  <span className="text-sm text-slate-400">ETA: {shipment.eta}</span>
                  {shipment.status !== "Delivered" && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
                      onClick={() => handleTrackShipment(shipment)}
                    >
                      Track
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Delivery Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Delivery Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={supplyChainData.deliveryMetrics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {supplyChainData.deliveryMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {supplyChainData.deliveryMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-slate-300">{metric.category}</span>
                </div>
                <span className="text-slate-400">{metric.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button 
            onClick={() => setApproveShipmentsOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-teal-400" />
              <span className="text-xs text-slate-400">Pending: 12</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Approve Shipments</h4>
          </button>
          <button 
            onClick={() => setGenerateReportOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-xs text-slate-400">Ready</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Generate Reports</h4>
          </button>
          <button 
            onClick={() => setOptimizeRoutesOpen(true)}
            className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <Truck className="w-6 h-6 text-purple-400" />
              <span className="text-xs text-slate-400">AI Powered</span>
            </div>
            <h4 className="text-white group-hover:text-teal-400 transition-colors">Optimize All Routes</h4>
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <TrackShipmentModal 
        open={trackShipmentOpen} 
        onClose={() => setTrackShipmentOpen(false)} 
        shipment={selectedShipment}
      />
      <ApproveShipmentsModal 
        open={approveShipmentsOpen} 
        onClose={() => setApproveShipmentsOpen(false)} 
      />
      <GenerateReportModal 
        isOpen={generateReportOpen} 
        onClose={() => setGenerateReportOpen(false)} 
      />
      <OptimizeRoutesModal 
        open={optimizeRoutesOpen} 
        onClose={() => setOptimizeRoutesOpen(false)} 
      />
    </div>
  );
}
