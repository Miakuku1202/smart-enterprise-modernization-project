import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ViewMetricsModalProps {
  open: boolean;
  onClose: () => void;
  endpoint: any;
}

const mockMetricsData = {
  hourly: [
    { time: "00:00", requests: 450, latency: 45, errors: 2 },
    { time: "04:00", requests: 280, latency: 38, errors: 1 },
    { time: "08:00", requests: 820, latency: 52, errors: 3 },
    { time: "12:00", requests: 1200, latency: 68, errors: 8 },
    { time: "16:00", requests: 980, latency: 58, errors: 5 },
    { time: "20:00", requests: 640, latency: 48, errors: 2 },
  ],
  statusCodes: [
    { code: "200", count: 4850 },
    { code: "400", count: 45 },
    { code: "500", count: 12 },
    { code: "503", count: 3 },
  ]
};

export function ViewMetricsModal({ open, onClose, endpoint }: ViewMetricsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">API Metrics</DialogTitle>
              <DialogDescription className="text-slate-400">
                {endpoint ? `Performance metrics for ${endpoint.endpoint}` : "Detailed API performance metrics"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Endpoint Info */}
          {endpoint && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Badge variant="outline" className="border-slate-500 text-slate-300 mb-2">
                    {endpoint.method}
                  </Badge>
                  <code className="block text-white font-mono">{endpoint.endpoint}</code>
                </div>
                <Badge className={endpoint.status === "healthy" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                  {endpoint.status}
                </Badge>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <Activity className="w-6 h-6 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">{endpoint?.requests || "4.2K"}</div>
              <div className="text-xs text-slate-400">Total Requests</div>
              <div className="text-xs text-green-400 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12%
              </div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">{endpoint?.latency || "45ms"}</div>
              <div className="text-xs text-slate-400">Avg Latency</div>
              <div className="text-xs text-green-400 mt-1">
                <TrendingDown className="w-3 h-3 inline mr-1" />
                -5ms
              </div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <Activity className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">99.8%</div>
              <div className="text-xs text-slate-400">Success Rate</div>
              <div className="text-xs text-green-400 mt-1">Excellent</div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
              <BarChart3 className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">{endpoint?.errorRate || "0.02%"}</div>
              <div className="text-xs text-slate-400">Error Rate</div>
              <div className="text-xs text-slate-400 mt-1">Within SLA</div>
            </div>
          </div>

          {/* Request Volume Chart */}
          <div className="bg-slate-700/30 rounded-lg border border-slate-600 p-6">
            <h3 className="text-lg text-white mb-4">Request Volume (24h)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockMetricsData.hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="requests" stroke="#14b8a6" strokeWidth={2} name="Requests" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Latency Chart */}
          <div className="bg-slate-700/30 rounded-lg border border-slate-600 p-6">
            <h3 className="text-lg text-white mb-4">Response Time (24h)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockMetricsData.hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} name="Latency (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Codes */}
          <div className="bg-slate-700/30 rounded-lg border border-slate-600 p-6">
            <h3 className="text-lg text-white mb-4">HTTP Status Codes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockMetricsData.statusCodes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="code" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#14b8a6" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
