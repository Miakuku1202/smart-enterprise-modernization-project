import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Code, Download } from "lucide-react";

interface ViewLogsModalProps {
  open: boolean;
  onClose: () => void;
}

const logEntries = [
  { timestamp: "2025-11-06 14:45:23", level: "ERROR", service: "Payment API", message: "Connection timeout after 30s" },
  { timestamp: "2025-11-06 14:42:15", level: "WARN", service: "Auth Service", message: "Rate limit approaching threshold (85%)" },
  { timestamp: "2025-11-06 14:38:52", level: "INFO", service: "API Gateway", message: "Health check passed successfully" },
  { timestamp: "2025-11-06 14:35:10", level: "ERROR", service: "Inventory DB", message: "Connection pool exhausted" },
  { timestamp: "2025-11-06 14:30:44", level: "INFO", service: "Load Balancer", message: "Traffic distributed across 5 instances" },
  { timestamp: "2025-11-06 14:28:19", level: "WARN", service: "Notification Service", message: "Queue size exceeding 10000 messages" },
  { timestamp: "2025-11-06 14:25:02", level: "INFO", service: "Cache Layer", message: "Cache hit ratio: 94.2%" },
  { timestamp: "2025-11-06 14:20:37", level: "DEBUG", service: "API Gateway", message: "Request processed in 45ms" },
  { timestamp: "2025-11-06 14:15:21", level: "ERROR", service: "Order Service", message: "Validation failed for request ID: ORD-2851" },
  { timestamp: "2025-11-06 14:12:08", level: "INFO", service: "Deployment", message: "New version deployed: v2.4.1" }
];

export function ViewLogsModal({ open, onClose }: ViewLogsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>System Logs</DialogTitle>
          <DialogDescription className="text-slate-400">
            Real-time system logs and error tracking
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {logEntries.map((log, index) => (
              <div 
                key={index}
                className="p-3 bg-slate-900 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-all font-mono text-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-slate-500">{log.timestamp}</span>
                      <Badge 
                        className={
                          log.level === "ERROR" ? "bg-red-500/20 text-red-400" :
                          log.level === "WARN" ? "bg-yellow-500/20 text-yellow-400" :
                          log.level === "INFO" ? "bg-blue-500/20 text-blue-400" :
                          "bg-slate-500/20 text-slate-400"
                        }
                      >
                        {log.level}
                      </Badge>
                      <span className="text-teal-400">{log.service}</span>
                    </div>
                    <p className="text-slate-300">{log.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
            <Code className="w-4 h-4 mr-2" />
            Filter Logs
          </Button>
          <Button onClick={onClose} className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
