import { useState } from "react";
import { partnerSupplierData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Package, Search, Filter, Truck, FileText } from "lucide-react";
import { motion } from "motion/react";
import { UpdateDeliveryModal } from "../../modals/UpdateDeliveryModal";
import { RequestInvoiceModal } from "../../modals/RequestInvoiceModal";

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [updateDeliveryOpen, setUpdateDeliveryOpen] = useState(false);
  const [requestInvoiceOpen, setRequestInvoiceOpen] = useState(false);

  const filteredOrders = partnerSupplierData.orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    delivered: partnerSupplierData.orders.filter(o => o.status === "delivered").length,
    inTransit: partnerSupplierData.orders.filter(o => o.status === "in-transit").length,
    pending: partnerSupplierData.orders.filter(o => o.status === "pending").length,
    cancelled: partnerSupplierData.orders.filter(o => o.status === "cancelled").length
  };

  const handleUpdateDelivery = (order: any) => {
    setSelectedOrder(order);
    setUpdateDeliveryOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Order Management</h1>
          <p className="text-slate-400">Track and manage your orders</p>
        </div>
        <Button
          onClick={() => setRequestInvoiceOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
        >
          <FileText className="w-4 h-4 mr-2" />
          Request Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Delivered", value: orderStats.delivered, icon: Package, color: "green" },
          { label: "In Transit", value: orderStats.inTransit, icon: Truck, color: "blue" },
          { label: "Pending", value: orderStats.pending, icon: Package, color: "yellow" },
          { label: "Cancelled", value: orderStats.cancelled, icon: Package, color: "red" }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-3xl text-${stat.color}-400`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 text-${stat.color}-400`} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
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
              <SelectItem value="delivered" className="text-white">Delivered</SelectItem>
              <SelectItem value="in-transit" className="text-white">In Transit</SelectItem>
              <SelectItem value="pending" className="text-white">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">Order ID</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Product</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Quantity</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Date</th>
                <th className="text-right py-3 px-4 text-sm text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4"><span className="text-teal-400">{order.id}</span></td>
                  <td className="py-4 px-4"><span className="text-white">{order.product}</span></td>
                  <td className="py-4 px-4"><span className="text-slate-400">{order.quantity}</span></td>
                  <td className="py-4 px-4">
                    <Badge className={`${
                      order.status === "delivered" ? "bg-green-500/20 text-green-400" :
                      order.status === "in-transit" ? "bg-blue-500/20 text-blue-400" :
                      order.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4"><span className="text-slate-400">{order.date}</span></td>
                  <td className="py-4 px-4 text-right">
                    <Button onClick={() => handleUpdateDelivery(order)} size="sm" variant="outline"
                      className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <UpdateDeliveryModal open={updateDeliveryOpen} onClose={() => setUpdateDeliveryOpen(false)} order={selectedOrder} />
      <RequestInvoiceModal open={requestInvoiceOpen} onClose={() => setRequestInvoiceOpen(false)} />
    </div>
  );
}
