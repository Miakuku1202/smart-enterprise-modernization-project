import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Shield, AlertTriangle, Lock, Key, Activity, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { Progress } from "../../ui/progress";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

const vulnerabilities = [
  { id: "VUL-001", severity: "medium", title: "Outdated SSL Certificate", component: "api-gateway", status: "open" },
  { id: "VUL-002", severity: "medium", title: "Weak Password Policy", component: "auth-service", status: "open" },
  { id: "VUL-003", severity: "low", title: "Missing Security Headers", component: "web-server", status: "resolved" },
  { id: "VUL-004", severity: "high", title: "SQL Injection Risk", component: "database-api", status: "resolved" },
];

const threatData = [
  { name: "Blocked", value: 856, color: "#10b981" },
  { name: "Suspicious", value: 124, color: "#f59e0b" },
  { name: "Allowed", value: 15420, color: "#3b82f6" },
];

const securityScoreData = [
  { category: "Access Control", score: 95 },
  { category: "Data Encryption", score: 98 },
  { category: "Network Security", score: 88 },
  { category: "Vulnerability Mgmt", score: 82 },
  { category: "Incident Response", score: 91 },
];

export function SecurityPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Security Center</h1>
          <p className="text-slate-400">Monitor and manage security infrastructure</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/20 text-green-400 text-lg px-4 py-2">
            <Shield className="w-5 h-5 mr-2" />
            Security Score: 92/100
          </Badge>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Active Threats</p>
              <p className="text-3xl text-green-400">0</p>
            </div>
            <Shield className="w-10 h-10 text-green-400" />
          </div>
          <p className="text-xs text-slate-400 mt-2">No active threats detected</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Blocked Attempts</p>
              <p className="text-3xl text-yellow-400">856</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-xs text-slate-400 mt-2">Last 24 hours</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Vulnerabilities</p>
              <p className="text-3xl text-blue-400">2</p>
            </div>
            <Lock className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-xs text-slate-400 mt-2">Medium priority</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">SSL Certificates</p>
              <p className="text-3xl text-teal-400">12</p>
            </div>
            <Key className="w-10 h-10 text-teal-400" />
          </div>
          <p className="text-xs text-slate-400 mt-2">All valid</p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Security Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Security Status</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white">SSL Certificates</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Valid</Badge>
              </div>
              <p className="text-sm text-slate-400">All certificates up to date • Expires in 87 days</p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white">Firewall Rules</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <p className="text-sm text-slate-400">145 rules configured • Last updated 2 days ago</p>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Vulnerability Scan</span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400">2 Warnings</Badge>
              </div>
              <p className="text-sm text-slate-400">Medium priority vulnerabilities detected</p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white">Access Control</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Secured</Badge>
              </div>
              <p className="text-sm text-slate-400">Role-based access control enforced</p>
            </div>
          </div>
        </motion.div>

        {/* Threat Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl text-white mb-6">Threat Detection (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={threatData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {threatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl text-green-400 mb-1">856</div>
              <div className="text-xs text-slate-400">Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-yellow-400 mb-1">124</div>
              <div className="text-xs text-slate-400">Suspicious</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-400 mb-1">15.4K</div>
              <div className="text-xs text-slate-400">Allowed</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vulnerabilities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Vulnerability Assessment</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-sm text-slate-400">ID</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Title</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Component</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Severity</th>
                <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                <th className="text-right py-3 px-4 text-sm text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vulnerabilities.map((vuln, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                  <td className="py-4 px-4">
                    <span className="text-teal-400">{vuln.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white">{vuln.title}</span>
                  </td>
                  <td className="py-4 px-4">
                    <code className="text-slate-300 text-sm">{vuln.component}</code>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={`${
                        vuln.severity === "high" ? "bg-red-500/20 text-red-400" :
                        vuln.severity === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {vuln.severity}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={vuln.status === "open" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}>
                      {vuln.status === "open" ? <XCircle className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                      {vuln.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button size="sm" variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10">
                      {vuln.status === "open" ? "Resolve" : "View Details"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Security Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl text-white mb-6">Security Score Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={securityScoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="category" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#94a3b8" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
            />
            <Bar dataKey="score" fill="#14b8a6" name="Score" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
