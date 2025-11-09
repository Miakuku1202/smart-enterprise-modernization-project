import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Star, Package, TrendingUp, Phone, Mail, Calendar, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SupplierDetailsModalProps {
  open: boolean;
  onClose: () => void;
  supplier: {
    name: string;
    location: string;
    rating: number;
    pending: number;
    status: string;
  } | null;
}

export function SupplierDetailsModal({ open, onClose, supplier }: SupplierDetailsModalProps) {
  if (!supplier) return null;

  const performanceData = [
    { month: "Jan", quality: 92, onTime: 88, cost: 95 },
    { month: "Feb", quality: 94, onTime: 90, cost: 93 },
    { month: "Mar", quality: 91, onTime: 87, cost: 94 },
    { month: "Apr", quality: 95, onTime: 92, cost: 96 },
    { month: "May", quality: 93, onTime: 89, cost: 94 },
    { month: "Jun", quality: 96, onTime: 94, cost: 97 }
  ];

  const recentOrders = [
    { id: "ORD-4521", date: "2024-11-05", items: "Engine Parts", amount: "$45,200", status: "Delivered" },
    { id: "ORD-4489", date: "2024-11-01", items: "Brake Systems", amount: "$32,100", status: "In Transit" },
    { id: "ORD-4456", date: "2024-10-28", items: "Sensors", amount: "$18,500", status: "Delivered" },
    { id: "ORD-4423", date: "2024-10-25", items: "Electrical Components", amount: "$28,900", status: "Delivered" }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {supplier.name}
          </DialogTitle>
          <DialogDescription className="text-slate-400 flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {supplier.location}
            </span>
            <Badge
              className={`${
                supplier.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {supplier.status}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-yellow-400">Rating</span>
              </div>
              <div className="text-2xl text-white">{supplier.rating}</div>
              <div className="text-xs text-slate-400 mt-1">Out of 5.0</div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-teal-400" />
                <span className="text-sm text-teal-400">Pending</span>
              </div>
              <div className="text-2xl text-white">{supplier.pending}</div>
              <div className="text-xs text-slate-400 mt-1">Active orders</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-400">On-Time</span>
              </div>
              <div className="text-2xl text-white">94%</div>
              <div className="text-xs text-slate-400 mt-1">Delivery rate</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-blue-400">Total Value</span>
              </div>
              <div className="text-2xl text-white">$1.2M</div>
              <div className="text-xs text-slate-400 mt-1">This year</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <h4 className="text-white mb-3">Contact Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400" />
                <div>
                  <div className="text-xs text-slate-400">Phone</div>
                  <div className="text-sm text-white">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="text-sm text-white">contact@{supplier.name.toLowerCase().replace(/\s+/g, '')}.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs text-slate-400">Partnership Since</div>
                  <div className="text-sm text-white">January 2020</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">Total Orders</div>
                  <div className="text-sm text-white">247</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <h4 className="text-white mb-4">Performance Trends (Last 6 Months)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Line type="monotone" dataKey="quality" stroke="#14b8a6" strokeWidth={2} name="Quality Score" />
                <Line type="monotone" dataKey="onTime" stroke="#3b82f6" strokeWidth={2} name="On-Time %" />
                <Line type="monotone" dataKey="cost" stroke="#8b5cf6" strokeWidth={2} name="Cost Efficiency" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <h4 className="text-white mb-4">Recent Orders</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-sm text-slate-400">Order ID</th>
                    <th className="text-left py-2 text-sm text-slate-400">Date</th>
                    <th className="text-left py-2 text-sm text-slate-400">Items</th>
                    <th className="text-left py-2 text-sm text-slate-400">Amount</th>
                    <th className="text-left py-2 text-sm text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-slate-700/50">
                      <td className="py-3 text-sm text-white">{order.id}</td>
                      <td className="py-3 text-sm text-slate-300">{order.date}</td>
                      <td className="py-3 text-sm text-slate-300">{order.items}</td>
                      <td className="py-3 text-sm text-teal-400">{order.amount}</td>
                      <td className="py-3">
                        <Badge
                          className={`text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-slate-700 text-slate-300"
          >
            Close
          </Button>
          <Button 
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            <Package className="w-4 h-4 mr-2" />
            Place Order
          </Button>
          <Button 
            variant="outline"
            className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Supplier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
