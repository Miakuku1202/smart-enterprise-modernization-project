import { useState } from "react";
import { Star, MapPin, Plus, TrendingUp, Package, DollarSign } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { motion } from "motion/react";
import { supplyChainData } from "../../../data/mockData";
import { AddSupplierModal } from "../../modals/AddSupplierModal";
import { SupplierDetailsModal } from "../../modals/SupplierDetailsModal";

export function SuppliersPage() {
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [supplierDetailsOpen, setSupplierDetailsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const handleViewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setSupplierDetailsOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Supplier Management</h1>
          <p className="text-slate-400">Manage supplier relationships and performance metrics</p>
        </div>
        <Button 
          onClick={() => setAddSupplierOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
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
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <Badge className="bg-yellow-500/20 text-yellow-400">Active</Badge>
          </div>
          <div className="text-3xl text-white mb-1">8</div>
          <div className="text-sm text-slate-400">Total Suppliers</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
          </div>
          <div className="text-3xl text-white mb-1">4.6</div>
          <div className="text-sm text-slate-400">Avg Rating</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <Package className="w-8 h-8 text-teal-400" />
            <Badge className="bg-teal-500/20 text-teal-400">Pending</Badge>
          </div>
          <div className="text-3xl text-white mb-1">43</div>
          <div className="text-sm text-slate-400">Active Orders</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-blue-400" />
            <Badge className="bg-blue-500/20 text-blue-400">YTD</Badge>
          </div>
          <div className="text-3xl text-white mb-1">$8.4M</div>
          <div className="text-sm text-slate-400">Total Spend</div>
        </motion.div>
      </div>

      {/* Supplier Performance Table */}
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
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-slate-400 hover:text-white"
                      onClick={() => handleViewSupplier(supplier)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Top Performing Suppliers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Top Performing Suppliers</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {supplyChainData.suppliers.slice(0, 3).map((supplier, index) => (
            <div
              key={index}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all cursor-pointer"
              onClick={() => handleViewSupplier(supplier)}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white">{supplier.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{supplier.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <MapPin className="w-4 h-4" />
                {supplier.location}
              </div>
              <div className="pt-3 border-t border-slate-600 flex items-center justify-between">
                <span className="text-sm text-slate-400">{supplier.pending} pending orders</span>
                <Badge
                  className={`text-xs ${
                    supplier.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {supplier.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modals */}
      <AddSupplierModal open={addSupplierOpen} onClose={() => setAddSupplierOpen(false)} />
      <SupplierDetailsModal 
        open={supplierDetailsOpen} 
        onClose={() => setSupplierDetailsOpen(false)} 
        supplier={selectedSupplier}
      />
    </div>
  );
}
