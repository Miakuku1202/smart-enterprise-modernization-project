import { useState } from "react";
import { partnerSupplierData } from "../../../data/mockData";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Server, RefreshCw, MessageSquare, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { SyncAPIDataModal } from "../../modals/SyncAPIDataModal";
import { ContactSupportModal } from "../../modals/ContactSupportModal";

export function IntegrationPage() {
  const [syncAPIOpen, setSyncAPIOpen] = useState(false);
  const [contactSupportOpen, setContactSupportOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">API Integration</h1>
          <p className="text-slate-400">Manage API connections and data synchronization</p>
        </div>
        <Button onClick={() => setSyncAPIOpen(true)} className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync All APIs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Connected APIs", value: partnerSupplierData.apiIntegrations.filter(a => a.status === "connected").length, icon: Server, color: "green" },
          { label: "Failed APIs", value: partnerSupplierData.apiIntegrations.filter(a => a.status === "error").length, icon: Server, color: "red" },
          { label: "Uptime", value: "99.2%", icon: CheckCircle, color: "blue" }
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

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-white">API Integrations</h3>
            <Server className="w-5 h-5 text-teal-400" />
          </div>
          <div className="space-y-3">
            {partnerSupplierData.apiIntegrations.map((api, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white text-sm">{api.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">Last sync: {api.lastSync}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${api.status === "connected" ? "bg-green-400" : "bg-red-400"}`}></div>
                </div>
                {api.status === "error" && (
                  <Button onClick={() => setSyncAPIOpen(true)} size="sm" variant="outline" 
                    className="w-full mt-2 border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <RefreshCw className="w-3 h-3 mr-2" />
                    Retry Connection
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button onClick={() => setSyncAPIOpen(true)} className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All APIs
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-white">Recent Communications</h3>
            <MessageSquare className="w-5 h-5 text-teal-400" />
          </div>
          <div className="space-y-3">
            {partnerSupplierData.communications.map((comm, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-teal-500/50 transition-all">
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
          <Button onClick={() => setContactSupportOpen(true)} variant="outline" className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </motion.div>
      </div>

      <SyncAPIDataModal open={syncAPIOpen} onClose={() => setSyncAPIOpen(false)} />
      <ContactSupportModal open={contactSupportOpen} onClose={() => setContactSupportOpen(false)} />
    </div>
  );
}
