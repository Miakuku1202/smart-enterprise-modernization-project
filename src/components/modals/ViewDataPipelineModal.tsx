import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Database, CheckCircle, AlertCircle, Play } from "lucide-react";

interface ViewDataPipelineModalProps {
  open: boolean;
  onClose: () => void;
}

const pipelineStages = [
  { name: "Data Ingestion", status: "healthy", throughput: "15.2K/min", latency: "12ms" },
  { name: "Data Validation", status: "healthy", throughput: "14.8K/min", latency: "8ms" },
  { name: "Data Transformation", status: "healthy", throughput: "12.8K/min", latency: "45ms" },
  { name: "Feature Engineering", status: "warning", throughput: "8.5K/min", latency: "120ms" },
  { name: "Model Training", status: "healthy", throughput: "2.1K/min", latency: "350ms" },
  { name: "Model Validation", status: "healthy", throughput: "2.0K/min", latency: "85ms" },
  { name: "Inference Pipeline", status: "healthy", throughput: "18.9K/min", latency: "15ms" }
];

export function ViewDataPipelineModal({ open, onClose }: ViewDataPipelineModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle>Data Pipeline Status</DialogTitle>
          <DialogDescription className="text-slate-400">
            Real-time monitoring of all data pipeline stages
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {pipelineStages.map((stage, index) => (
            <div 
              key={index}
              className="p-4 bg-slate-900 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Database className={`w-5 h-5 ${stage.status === "healthy" ? "text-green-400" : "text-yellow-400"}`} />
                  <h4 className="text-white">{stage.name}</h4>
                </div>
                <Badge className={stage.status === "healthy" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                  {stage.status === "healthy" ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Healthy
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Warning
                    </>
                  )}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Throughput:</span>
                  <span className="text-teal-400 ml-2">{stage.throughput}</span>
                </div>
                <div>
                  <span className="text-slate-400">Latency:</span>
                  <span className="text-blue-400 ml-2">{stage.latency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
            <Play className="w-4 h-4 mr-2" />
            Restart Pipeline
          </Button>
          <Button onClick={onClose} className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
