import { useState } from "react";
import { KPICard } from "../shared/KPICard";
import { customerSupportData } from "../../data/mockData";
import { Headphones, CheckCircle, Clock, Star, UserPlus, MessageSquare, Users, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "motion/react";
import { NewTicketModal } from "../modals/NewTicketModal";
import { AddCustomerModal } from "../modals/AddCustomerModal";
import { CloseTicketsModal } from "../modals/CloseTicketsModal";
import { AssignAgentModal } from "../modals/AssignAgentModal";
import { SendMessageModal } from "../modals/SendMessageModal";
import { ViewFeedbackModal } from "../modals/ViewFeedbackModal";

const RATING_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export function CustomerSupportDashboard() {
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [closeTicketsOpen, setCloseTicketsOpen] = useState(false);
  const [assignAgentOpen, setAssignAgentOpen] = useState(false);
  const [sendMessageOpen, setSendMessageOpen] = useState(false);
  const [viewFeedbackOpen, setViewFeedbackOpen] = useState(false);

  const ticketStats = {
    open: customerSupportData.tickets.filter(t => t.status === "open").length,
    inProgress: customerSupportData.tickets.filter(t => t.status === "in-progress").length,
    resolved: customerSupportData.tickets.filter(t => t.status === "resolved").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Customer Support Dashboard</h1>
          <p className="text-slate-400">Ticket management and customer satisfaction</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setAddCustomerOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
          <Button 
            onClick={() => setNewTicketOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Open Tickets"
          value={ticketStats.open.toString()}
          change="Needs attention"
          trend="neutral"
          icon={Headphones}
        />
        <KPICard
          title="In Progress"
          value={ticketStats.inProgress.toString()}
          change="Being handled"
          trend="neutral"
          icon={Clock}
        />
        <KPICard
          title="Resolved Today"
          value={ticketStats.resolved.toString()}
          change="This period"
          trend="up"
          icon={CheckCircle}
        />
        <KPICard
          title="Avg Rating"
          value="4.5/5"
          change="Customer satisfaction"
          trend="up"
          icon={Star}
        />
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <MessageSquare className="w-4 h-4 mr-2" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <Users className="w-4 h-4 mr-2" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ticket Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">Support Tickets</h3>
                <div className="flex gap-2">
                  <Badge className="bg-red-500/20 text-red-400">
                    {customerSupportData.tickets.filter(t => t.priority === "high").length} High Priority
                  </Badge>
                  <Button 
                    onClick={() => setNewTicketOpen(true)}
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Ticket ID</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Customer</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Issue</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Priority</th>
                      <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                      <th className="text-right py-3 px-4 text-sm text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerSupportData.tickets.map((ticket, index) => (
                      <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                        <td className="py-4 px-4">
                          <span className="text-teal-400">{ticket.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-white">{ticket.customer}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-400">{ticket.issue}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`${
                              ticket.priority === "high"
                                ? "bg-red-500/20 text-red-400"
                                : ticket.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={`${
                              ticket.status === "open"
                                ? "bg-blue-500/20 text-blue-400"
                                : ticket.status === "in-progress"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {ticket.status !== "resolved" ? (
                            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                              Assign
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" className="text-slate-400">
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Response Time</h3>
              <div className="space-y-4">
                {customerSupportData.responseTime.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">{item.category}</span>
                      <span className="text-teal-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="text-3xl text-green-400 mb-1">68%</div>
                  <div className="text-sm text-slate-400">Responded within 1 hour</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Ticket Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-6">Ticket Overview</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="text-4xl text-blue-400 mb-2">{ticketStats.open}</div>
                <div className="text-slate-400">Open Tickets</div>
                <p className="text-xs text-slate-500 mt-2">Awaiting assignment</p>
              </div>
              <div className="text-center p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <div className="text-4xl text-yellow-400 mb-2">{ticketStats.inProgress}</div>
                <div className="text-slate-400">In Progress</div>
                <p className="text-xs text-slate-500 mt-2">Currently being handled</p>
              </div>
              <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="text-4xl text-green-400 mb-2">{ticketStats.resolved}</div>
                <div className="text-slate-400">Resolved</div>
                <p className="text-xs text-slate-500 mt-2">Closed successfully</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white">Customer Directory</h3>
              <Button 
                onClick={() => setAddCustomerOpen(true)}
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customerSupportData.tickets.map((ticket, index) => (
                <div 
                  key={index}
                  className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                        {ticket.customer.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white">{ticket.customer}</h4>
                        <p className="text-xs text-slate-400">{ticket.issue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                    <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                      {ticket.status}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-teal-400 hover:text-teal-300 text-xs">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-xl text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {customerSupportData.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600"
                >
                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Feedback Ratings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl text-white mb-6">Customer Feedback Ratings</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerSupportData.feedbackRatings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="rating" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#f1f5f9' }}
                  />
                  <Bar dataKey="count" fill="#14b8a6" name="Number of Ratings" />
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
              <h3 className="text-xl text-white mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Resolution Rate</span>
                    <span className="text-green-400">94.2%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full" style={{ width: '94.2%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Customer Satisfaction</span>
                    <span className="text-blue-400">4.5/5.0</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">First Response Time</span>
                    <span className="text-yellow-400">45 min</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Avg Resolution Time</span>
                    <span className="text-purple-400">3.2 hours</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
            onClick={() => setCloseTicketsOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Close Tickets
          </Button>
          <Button 
            onClick={() => setAssignAgentOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Agent
          </Button>
          <Button 
            onClick={() => setSendMessageOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button 
            onClick={() => setViewFeedbackOpen(true)}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 justify-start"
          >
            <Star className="w-4 h-4 mr-2" />
            View Feedback
          </Button>
        </div>
      </motion.div>

      {/* Modals */}
      <NewTicketModal open={newTicketOpen} onClose={() => setNewTicketOpen(false)} />
      <AddCustomerModal open={addCustomerOpen} onClose={() => setAddCustomerOpen(false)} />
      <CloseTicketsModal open={closeTicketsOpen} onClose={() => setCloseTicketsOpen(false)} ticketId={null} />
      <AssignAgentModal open={assignAgentOpen} onClose={() => setAssignAgentOpen(false)} ticketId={null} />
      <SendMessageModal open={sendMessageOpen} onClose={() => setSendMessageOpen(false)} />
      <ViewFeedbackModal open={viewFeedbackOpen} onClose={() => setViewFeedbackOpen(false)} />
    </div>
  );
}
