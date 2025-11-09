import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { BarChart3, TrendingUp, Package, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "../ui/badge";

interface ViewPartnerAnalyticsModalProps {
  open: boolean;
  onClose: () => void;
}

const revenueData = [
  { month: "Jul", revenue: 38500, orders: 98 },
  { month: "Aug", revenue: 41200, orders: 105 },
  { month: "Sep", revenue: 43800, orders: 112 },
  { month: "Oct", revenue: 45200, orders: 125 },
];

const categoryData = [
  { category: "Electronics", value: 15200 },
  { category: "Automotive", value: 12800 },
  { category: "Industrial", value: 9500 },
  { category: "Consumer Goods", value: 7700 },
];

export function ViewPartnerAnalyticsModal({ open, onClose }: ViewPartnerAnalyticsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Partner Analytics</DialogTitle>
              <DialogDescription className="text-slate-400">
                Comprehensive performance metrics and insights
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <Package className="w-6 h-6 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">125</div>
              <div className="text-xs text-slate-400">Total Orders</div>
              <Badge className="mt-2 bg-green-500/20 text-green-400">+12%</Badge>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">$45.2K</div>
              <div className="text-xs text-slate-400">Revenue</div>
              <Badge className="mt-2 bg-green-500/20 text-green-400">+8%</Badge>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">96%</div>
              <div className="text-xs text-slate-400">On-Time Rate</div>
              <Badge className="mt-2 bg-green-500/20 text-green-400">+2%</Badge>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <BarChart3 className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">4.8</div>
              <div className="text-xs text-slate-400">Customer Rating</div>
              <Badge className="mt-2 bg-green-500/20 text-green-400">Excellent</Badge>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="bg-slate-700/30 rounded-lg border border-slate-600 p-6">
            <h3 className="text-lg text-white mb-4">Revenue & Orders Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={2} name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance */}
          <div className="bg-slate-700/30 rounded-lg border border-slate-600 p-6">
            <h3 className="text-lg text-white mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#14b8a6" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Insights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h4 className="text-green-400 mb-2">Strengths</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Consistently high on-time delivery rate</li>
                <li>• Strong customer satisfaction scores</li>
                <li>• Growing order volume month-over-month</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <h4 className="text-yellow-400 mb-2">Areas for Improvement</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Reduce average delivery time by 0.3 days</li>
                <li>• Expand product category offerings</li>
                <li>• Improve API integration reliability</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
