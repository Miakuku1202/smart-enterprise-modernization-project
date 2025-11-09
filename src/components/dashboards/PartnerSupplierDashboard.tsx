import { useState } from "react";
import { KPICard } from "../shared/KPICard";
import { partnerSupplierData } from "../../data/mockData";
import { Package, TrendingUp, MessageSquare, Server, RefreshCw, FileText, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { RequestInvoiceModal } from "../modals/RequestInvoiceModal";
import { SyncAPIDataModal } from "../modals/SyncAPIDataModal";
import { UpdateDeliveryModal } from "../modals/UpdateDeliveryModal";
import { ContactSupportModal } from "../modals/ContactSupportModal";
import { ViewPartnerAnalyticsModal } from "../modals/ViewPartnerAnalyticsModal";

export function PartnerSupplierDashboard() {
  const [requestInvoiceOpen, setRequestInvoiceOpen] = useState(false);
  const [syncAPIOpen, setSyncAPIOpen] = useState(false);
  const [updateDeliveryOpen, setUpdateDeliveryOpen] = useState(false);
  const [contactSupportOpen, setContactSupportOpen] = useState(false);
  const [viewAnalyticsOpen, setViewAnalyticsOpen] = useState(false);

  const orderStats = {
    delivered: partnerSupplierData.orders.filter(o => o.status === "delivered").length,
    inTransit: partnerSupplierData.orders.filter(o => o.status === "in-transit").length,
    pending: partnerSupplierData.orders.filter(o => o.status === "pending").length,
    cancelled: partnerSupplierData.orders.filter(o => o.status === "cancelled").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Partner & Supplier Portal</h1>
          <p className="text-slate-400">Order management and API integration</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setRequestInvoiceOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <FileText className="w-4 h-4 mr-2" />
            Request Invoice
          </Button>
          <Button 
            onClick={() => setSyncAPIOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync API Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Orders"
          value={partnerSupplierData.orders.length.toString()}
          change="This month"
          trend="neutral"
          icon={Package}
        />
        <KPICard
          title="Delivered"
          value={orderStats.delivered.toString()}
          change="On time"
          trend="up"
          icon={TrendingUp}
        />
        <KPICard
          title="In Transit"
          value={orderStats.inTransit.toString()}
          change="Active shipments"
          trend="neutral"
          icon={Package}
        />
        <KPICard
          title="API Integrations"
          value={partnerSupplierData.apiIntegrations.filter(a => a.status === "connected").length.toString()}
          change="Connected"
          trend="up"
          icon={Server}
        />
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="orders" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Package className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="integration" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Server className="w-4 h-4 mr-2" />
            Integration
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">Order Overview</h3>
                <Button 
                  onClick={() => setRequestInvoiceOpen(true)}
                  size="sm"
                  variant="outline"
                  className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Request Invoice
                </Button>
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
                    {partnerSupplierData.orders.map((order, index) => (
                      <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-4">
                          <span className="text-teal-400">{order.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white">{order.product}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-400">{order.quantity}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`${
                              order.status === "delivered"
                                ? "bg-green-500/20 text-green-400"
                                : order.status === "in-transit"
                                ? "bg-blue-500/20 text-blue-400"
                                : order.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-400">{order.date}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Order Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Order Statistics</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-3xl text-green-400 mb-1">{orderStats.delivered}</div>
                  <div className="text-sm text-slate-400">Delivered</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-3xl text-blue-400 mb-1">{orderStats.inTransit}</div>
                  <div className="text-sm text-slate-400">In Transit</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="text-3xl text-yellow-400 mb-1">{orderStats.pending}</div>
                  <div className="text-sm text-slate-400">Pending</div>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                  <div className="text-3xl text-red-400 mb-1">{orderStats.cancelled}</div>
                  <div className="text-sm text-slate-400">Cancelled</div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* API Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">API Integrations</h3>
                <Server className="w-5 h-5 text-teal-400" />
              </div>
              <div className="space-y-3">
                {partnerSupplierData.apiIntegrations.map((api, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white text-sm">{api.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">Last sync: {api.lastSync}</p>
                      </div>
                      <div 
                        className={`w-2 h-2 rounded-full ${
                          api.status === "connected" ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                    </div>
                    {api.status === "error" && (
                      <Button 
                        onClick={() => setSyncAPIOpen(true)}
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-2 border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <RefreshCw className="w-3 h-3 mr-2" />
                        Retry Connection
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setSyncAPIOpen(true)}
                className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync All APIs
              </Button>
            </motion.div>

            {/* Communication Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">Recent Communications</h3>
                <MessageSquare className="w-5 h-5 text-teal-400" />
              </div>
              <div className="space-y-3">
                {partnerSupplierData.communications.map((comm, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white text-sm">{comm.from}</h4>
                          <span className="text-xs text-slate-500">{comm.time}</span>
                        </div>
                        <p className="text-sm text-slate-400">{comm.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800">
                View All Messages
              </Button>
            </motion.div>
          </div>

          {/* Integration Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-6">Integration Health</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="text-4xl text-green-400 mb-2">
                  {partnerSupplierData.apiIntegrations.filter(a => a.status === "connected").length}
                </div>
                <div className="text-slate-400">Connected APIs</div>
                <p className="text-xs text-slate-500 mt-2">Healthy connections</p>
              </div>
              <div className="text-center p-6 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="text-4xl text-red-400 mb-2">
                  {partnerSupplierData.apiIntegrations.filter(a => a.status === "error").length}
                </div>
                <div className="text-slate-400">Failed APIs</div>
                <p className="text-xs text-slate-500 mt-2">Requires attention</p>
              </div>
              <div className="text-center p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="text-4xl text-blue-400 mb-2">99.2%</div>
                <div className="text-slate-400">Uptime</div>
                <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Delivery Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Delivery Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={partnerSupplierData.performance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Bar dataKey="delivered" fill="#10b981" name="On Time %" stackId="a" />
                  <Bar dataKey="delayed" fill="#ef4444" name="Delayed %" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Key Performance Indicators</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">On-Time Delivery Rate</span>
                    <span className="text-green-400">96%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Customer Satisfaction</span>
                    <span className="text-blue-400">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Order Accuracy</span>
                    <span className="text-purple-400">98.5%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Quality Score</span>
                    <span className="text-teal-400">95%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Monthly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-6">Monthly Performance Trends</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                <div className="text-2xl text-teal-400 mb-2">125</div>
                <div className="text-sm text-slate-400">Total Orders</div>
                <div className="text-xs text-green-400 mt-1">+12% from last month</div>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                <div className="text-2xl text-blue-400 mb-2">$45.2K</div>
                <div className="text-sm text-slate-400">Revenue</div>
                <div className="text-xs text-green-400 mt-1">+8% from last month</div>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                <div className="text-2xl text-purple-400 mb-2">2.3 days</div>
                <div className="text-sm text-slate-400">Avg Delivery Time</div>
                <div className="text-xs text-green-400 mt-1">-0.5 days improved</div>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg text-center">
                <div className="text-2xl text-green-400 mb-2">98.5%</div>
                <div className="text-sm text-slate-400">Quality Rate</div>
                <div className="text-xs text-green-400 mt-1">+1.5% improvement</div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <Button 
            onClick={() => setUpdateDeliveryOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Package className="w-4 h-4 mr-2" />
            Update Delivery
          </Button>
          <Button 
            onClick={() => setRequestInvoiceOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          <Button 
            onClick={() => setContactSupportOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button 
            onClick={() => setViewAnalyticsOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </motion.div>

      {/* Modals */}
      <RequestInvoiceModal open={requestInvoiceOpen} onClose={() => setRequestInvoiceOpen(false)} />
      <SyncAPIDataModal open={syncAPIOpen} onClose={() => setSyncAPIOpen(false)} />
      <UpdateDeliveryModal open={updateDeliveryOpen} onClose={() => setUpdateDeliveryOpen(false)} order={null} />
      <ContactSupportModal open={contactSupportOpen} onClose={() => setContactSupportOpen(false)} />
      <ViewPartnerAnalyticsModal open={viewAnalyticsOpen} onClose={() => setViewAnalyticsOpen(false)} />
    </div>
  );
}
