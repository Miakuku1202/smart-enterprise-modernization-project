import { useState } from "react";
import { customerSupportData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { MessageSquare, Search, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { CloseTicketsModal } from "../../modals/CloseTicketsModal";
import { AssignAgentModal } from "../../modals/AssignAgentModal";

export function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [closeTicketsOpen, setCloseTicketsOpen] = useState(false);
  const [assignAgentOpen, setAssignAgentOpen] = useState(false);

  const filteredTickets = customerSupportData.tickets.filter(ticket => {
    const matchesSearch = ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssignClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setAssignAgentOpen(true);
  };

  const handleCloseClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setCloseTicketsOpen(true);
  };

  const ticketStats = {
    total: customerSupportData.tickets.length,
    open: customerSupportData.tickets.filter(t => t.status === "open").length,
    inProgress: customerSupportData.tickets.filter(t => t.status === "in-progress").length,
    resolved: customerSupportData.tickets.filter(t => t.status === "resolved").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Support Tickets</h1>
        <p className="text-slate-400">Manage and track customer support tickets</p>
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
              <p className="text-slate-400 text-sm mb-1">Total Tickets</p>
              <p className="text-3xl text-white">{ticketStats.total}</p>
            </div>
            <MessageSquare className="w-10 h-10 text-blue-400" />
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
              <p className="text-slate-400 text-sm mb-1">Open Tickets</p>
              <p className="text-3xl text-blue-400">{ticketStats.open}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-blue-400" />
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
              <p className="text-slate-400 text-sm mb-1">In Progress</p>
              <p className="text-3xl text-yellow-400">{ticketStats.inProgress}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-400" />
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
              <p className="text-slate-400 text-sm mb-1">Resolved</p>
              <p className="text-3xl text-green-400">{ticketStats.resolved}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-400" />
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
              placeholder="Search tickets by ID, customer, or issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                <SelectItem value="open" className="text-white">Open</SelectItem>
                <SelectItem value="in-progress" className="text-white">In Progress</SelectItem>
                <SelectItem value="resolved" className="text-white">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">All Priority</SelectItem>
                <SelectItem value="high" className="text-white">High</SelectItem>
                <SelectItem value="medium" className="text-white">Medium</SelectItem>
                <SelectItem value="low" className="text-white">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Tickets Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl text-white">All Tickets ({filteredTickets.length})</h3>
          <div className="flex gap-2">
            <Badge className="bg-red-500/20 text-red-400">
              {customerSupportData.tickets.filter(t => t.priority === "high").length} High Priority
            </Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">Ticket ID</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Customer</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Issue</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Created</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Priority</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                <th className="text-right py-3 px-4 text-sm text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-teal-400">{ticket.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        {ticket.customer.charAt(0)}
                      </div>
                      <span className="text-white">{ticket.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-300">{ticket.issue}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-400 text-sm">{ticket.created}</span>
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
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {ticket.status !== "resolved" ? (
                        <>
                          <Button
                            onClick={() => handleAssignClick(ticket.id)}
                            size="sm"
                            className="bg-teal-500 hover:bg-teal-600"
                          >
                            Assign
                          </Button>
                          {ticket.status === "in-progress" && (
                            <Button
                              onClick={() => handleCloseClick(ticket.id)}
                              size="sm"
                              variant="outline"
                              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                            >
                              Close
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button size="sm" variant="ghost" className="text-slate-400">
                          View Details
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No tickets found matching your criteria</p>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <CloseTicketsModal 
        open={closeTicketsOpen} 
        onClose={() => setCloseTicketsOpen(false)}
        ticketId={selectedTicketId}
      />
      <AssignAgentModal 
        open={assignAgentOpen} 
        onClose={() => setAssignAgentOpen(false)}
        ticketId={selectedTicketId}
      />
    </div>
  );
}
