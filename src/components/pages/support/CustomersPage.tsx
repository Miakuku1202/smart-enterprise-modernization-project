import { useState } from "react";
import { customerSupportData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { Users, Search, Mail, Phone, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import { SendMessageModal } from "../../modals/SendMessageModal";

// Extended customer data based on tickets
const customers = customerSupportData.tickets.map((ticket, index) => ({
  id: `CUST-${1000 + index}`,
  name: ticket.customer,
  email: `${ticket.customer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
  phone: `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
  location: ["New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA", "Phoenix, USA"][index % 5],
  ticketCount: Math.floor(Math.random() * 15) + 1,
  status: ticket.status,
  rating: (Math.random() * 2 + 3).toFixed(1),
  lastContact: ticket.created,
  tags: ["Enterprise", "Premium", "Active", "VIP"][Math.floor(Math.random() * 4)]
}));

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [sendMessageOpen, setSendMessageOpen] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setSendMessageOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Customer Directory</h1>
        <p className="text-slate-400">Manage customer information and communication</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Customers</p>
              <p className="text-3xl text-white">{customers.length}</p>
            </div>
            <Users className="w-10 h-10 text-teal-400" />
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
              <p className="text-slate-400 text-sm mb-1">Active Tickets</p>
              <p className="text-3xl text-blue-400">
                {customers.filter(c => c.status !== "resolved").length}
              </p>
            </div>
            <Mail className="w-10 h-10 text-blue-400" />
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
              <p className="text-slate-400 text-sm mb-1">Avg Rating</p>
              <p className="text-3xl text-yellow-400">4.5</p>
            </div>
            <Star className="w-10 h-10 text-yellow-400" />
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
              <p className="text-slate-400 text-sm mb-1">VIP Customers</p>
              <p className="text-3xl text-purple-400">
                {customers.filter(c => c.tags === "VIP").length}
              </p>
            </div>
            <Star className="w-10 h-10 text-purple-400 fill-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search customers by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
      </motion.div>

      {/* Customer Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6 hover:border-teal-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white">{customer.name}</h3>
                    <p className="text-xs text-slate-400">{customer.id}</p>
                  </div>
                </div>
                <Badge className={`${
                  customer.tags === "VIP" ? "bg-purple-500/20 text-purple-400" :
                  customer.tags === "Premium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>
                  {customer.tags}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{customer.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-slate-700">
                <div className="text-center">
                  <p className="text-xl text-teal-400">{customer.ticketCount}</p>
                  <p className="text-xs text-slate-400">Tickets</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-xl text-yellow-400">{customer.rating}</p>
                  </div>
                  <p className="text-xs text-slate-400">Rating</p>
                </div>
                <div className="text-center">
                  <Badge className={`${
                    customer.status === "resolved" ? "bg-green-500/20 text-green-400" :
                    customer.status === "in-progress" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {customer.status}
                  </Badge>
                  <p className="text-xs text-slate-400 mt-1">Status</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleSendMessage(customer)}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                  size="sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  size="sm"
                >
                  View Profile
                </Button>
              </div>

              <p className="text-xs text-slate-500 mt-3 text-center">
                Last contact: {customer.lastContact}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No customers found matching your search</p>
        </div>
      )}

      {/* Modal */}
      <SendMessageModal 
        open={sendMessageOpen} 
        onClose={() => setSendMessageOpen(false)}
        customerName={selectedCustomer?.name}
      />
    </div>
  );
}
