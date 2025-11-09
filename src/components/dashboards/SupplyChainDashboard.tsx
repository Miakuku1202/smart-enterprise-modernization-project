import { useState } from "react";
import { KPICard } from "../shared/KPICard";
import { supplyChainData } from "../../data/mockData";
import { Truck, Package, Star, MapPin, Plus, TrendingUp, CheckCircle } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { AddSupplierModal } from "../modals/AddSupplierModal";
import { OptimizeRoutesModal } from "../modals/OptimizeRoutesModal";
import { TrackShipmentModal } from "../modals/TrackShipmentModal";
import { SupplierDetailsModal } from "../modals/SupplierDetailsModal";
import { ApproveShipmentsModal } from "../modals/ApproveShipmentsModal";
import { GenerateReportModal } from "../modals/GenerateReportModal";

const COLORS = ['#10b981', '#ef4444', '#3b82f6'];

export function SupplyChainDashboard() {
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [optimizeRoutesOpen, setOptimizeRoutesOpen] = useState(false);
  const [trackShipmentOpen, setTrackShipmentOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [supplierDetailsOpen, setSupplierDetailsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [approveShipmentsOpen, setApproveShipmentsOpen] = useState(false);
  const [generateReportOpen, setGenerateReportOpen] = useState(false);

  const handleTrackShipment = (shipment: any) => {
    setSelectedShipment(shipment);
    setTrackShipmentOpen(true);
  };

  const handleViewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setSupplierDetailsOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Supply Chain Management</h1>
          <p className="text-slate-400">Logistics tracking and supplier performance</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setOptimizeRoutesOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Truck className="w-4 h-4 mr-2" />
            Optimize Routes
          </Button>
          <Button 
            onClick={() => setAddSupplierOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supplyChainData.kpis.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend as any}
            icon={index === 0 ? Truck : index === 1 ? Package : index === 2 ? Star : MapPin}
          />
        ))}
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="logistics" className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="logistics" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Truck className="w-4 h-4 mr-2" />
            Logistics
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Star className="w-4 h-4 mr-2" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Package className="w-4 h-4 mr-2" />
            Inventory
          </TabsTrigger>
        </TabsList>

        {/* Logistics Tab */}
        <TabsContent value="logistics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Shipments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Active Shipments</h3>
              <div className="space-y-3">
                {[
                  { id: "SHP-3421", route: "Germany → Factory A", status: "In Transit", eta: "2h 45m" },
                  { id: "SHP-3422", route: "Japan → Factory B", status: "In Transit", eta: "5h 12m" },
                  { id: "SHP-3423", route: "USA → Warehouse 1", status: "Customs", eta: "8h 30m" },
                  { id: "SHP-3424", route: "France → Factory A", status: "Delivered", eta: "Completed" }
                ].map((shipment, index) => (
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
                        <Button size="sm" variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10" onClick={() => handleTrackShipment(shipment)}>
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
              <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left" onClick={() => setApproveShipmentsOpen(true)}>
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-6 h-6 text-teal-400" />
                  <span className="text-xs text-slate-400">Pending: 12</span>
                </div>
                <h4 className="text-white group-hover:text-teal-400 transition-colors">Approve Shipments</h4>
              </button>
              <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left" onClick={() => setGenerateReportOpen(true)}>
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <span className="text-xs text-slate-400">Ready</span>
                </div>
                <h4 className="text-white group-hover:text-teal-400 transition-colors">Generate Reports</h4>
              </button>
              <button className="p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition-all group text-left" onClick={() => setOptimizeRoutesOpen(true)}>
                <div className="flex items-center justify-between mb-2">
                  <Truck className="w-6 h-6 text-purple-400" />
                  <span className="text-xs text-slate-400">AI Powered</span>
                </div>
                <h4 className="text-white group-hover:text-teal-400 transition-colors">Optimize All Routes</h4>
              </button>
            </div>
          </motion.div>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white">Supplier Performance</h3>
              <Button 
                onClick={() => setAddSupplierOpen(true)}
                size="sm" 
                variant="outline" 
                className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Supplier
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Supplier</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Location</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Rating</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Pending</th>
                    <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                    <th className="text-right py-3 px-4 text-sm text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supplyChainData.suppliers.map((supplier, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="text-white">{supplier.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-4 h-4" />
                          {supplier.location}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white">{supplier.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-teal-400">{supplier.pending} orders</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={`${
                            supplier.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {supplier.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => handleViewSupplier(supplier)}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-6">Inventory Demand Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={supplyChainData.inventoryForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#94a3b8" strokeWidth={2} name="Current Level" />
                <Line type="monotone" dataKey="predicted" stroke="#14b8a6" strokeWidth={2} name="Predicted" />
                <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Expected Demand" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Inventory Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <Package className="w-10 h-10 text-teal-400" />
                <Badge className="bg-green-500/20 text-green-400">In Stock</Badge>
              </div>
              <div className="text-3xl text-white mb-2">3,200</div>
              <div className="text-slate-400">Total Units</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-10 h-10 text-blue-400" />
                <Badge className="bg-blue-500/20 text-blue-400">Forecast</Badge>
              </div>
              <div className="text-3xl text-white mb-2">+12%</div>
              <div className="text-slate-400">Expected Growth</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-10 h-10 text-green-400" />
                <Badge className="bg-green-500/20 text-green-400">Optimal</Badge>
              </div>
              <div className="text-3xl text-white mb-2">94%</div>
              <div className="text-slate-400">Stock Health</div>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddSupplierModal open={addSupplierOpen} onClose={() => setAddSupplierOpen(false)} />
      <OptimizeRoutesModal open={optimizeRoutesOpen} onClose={() => setOptimizeRoutesOpen(false)} />
      <TrackShipmentModal open={trackShipmentOpen} onClose={() => setTrackShipmentOpen(false)} shipment={selectedShipment} />
      <SupplierDetailsModal open={supplierDetailsOpen} onClose={() => setSupplierDetailsOpen(false)} supplier={selectedSupplier} />
      <ApproveShipmentsModal open={approveShipmentsOpen} onClose={() => setApproveShipmentsOpen(false)} />
      <GenerateReportModal open={generateReportOpen} onClose={() => setGenerateReportOpen(false)} />
    </div>
  );
}