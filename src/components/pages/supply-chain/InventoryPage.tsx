import { Package, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "../../ui/badge";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { supplyChainData } from "../../../data/mockData";

export function InventoryPage() {
  const inventoryItems = [
    { 
      id: "INV-001", 
      name: "Engine Components", 
      category: "Parts", 
      quantity: 850, 
      reorderPoint: 200,
      status: "In Stock",
      value: "$425,000",
      location: "Warehouse A"
    },
    { 
      id: "INV-002", 
      name: "Brake Systems", 
      category: "Safety", 
      quantity: 120, 
      reorderPoint: 150,
      status: "Low Stock",
      value: "$96,000",
      location: "Warehouse B"
    },
    { 
      id: "INV-003", 
      name: "Electronic Sensors", 
      category: "Electronics", 
      quantity: 450, 
      reorderPoint: 100,
      status: "In Stock",
      value: "$180,000",
      location: "Warehouse A"
    },
    { 
      id: "INV-004", 
      name: "Transmission Parts", 
      category: "Drivetrain", 
      quantity: 320, 
      reorderPoint: 150,
      status: "In Stock",
      value: "$256,000",
      location: "Warehouse C"
    },
    { 
      id: "INV-005", 
      name: "Interior Trim", 
      category: "Interior", 
      quantity: 80, 
      reorderPoint: 100,
      status: "Low Stock",
      value: "$48,000",
      location: "Warehouse B"
    },
    { 
      id: "INV-006", 
      name: "Suspension Components", 
      category: "Chassis", 
      quantity: 600, 
      reorderPoint: 200,
      status: "In Stock",
      value: "$360,000",
      location: "Warehouse A"
    }
  ];

  const categoryData = [
    { category: "Parts", quantity: 850, value: 425 },
    { category: "Safety", quantity: 120, value: 96 },
    { category: "Electronics", quantity: 450, value: 180 },
    { category: "Drivetrain", quantity: 320, value: 256 },
    { category: "Interior", quantity: 80, value: 48 },
    { category: "Chassis", quantity: 600, value: 360 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Inventory Management</h1>
          <p className="text-slate-400">Track stock levels and forecast demand</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
          transition={{ delay: 0.1 }}
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
          transition={{ delay: 0.2 }}
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

      {/* Inventory Demand Forecast */}
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

      {/* Category Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Inventory by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="category" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Bar dataKey="quantity" fill="#14b8a6" name="Quantity" />
            <Bar dataKey="value" fill="#3b82f6" name="Value ($K)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Inventory Items Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Current Inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">Item ID</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Name</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Category</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Quantity</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Location</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Value</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-white">{item.id}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-white">{item.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className="bg-slate-700 text-slate-300">{item.category}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {item.quantity < item.reorderPoint && (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className={item.quantity < item.reorderPoint ? "text-yellow-400" : "text-white"}>
                        {item.quantity}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-400">{item.location}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-teal-400">{item.value}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={`${
                        item.status === "In Stock"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Low Stock Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-white mb-2">Low Stock Alerts</h3>
            <p className="text-sm text-slate-300 mb-3">
              2 items are below their reorder point and need restocking
            </p>
            <div className="space-y-2">
              {inventoryItems.filter(item => item.status === "Low Stock").map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm bg-slate-900/50 rounded p-2">
                  <span className="text-white">{item.name}</span>
                  <span className="text-yellow-400">{item.quantity} units remaining</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
