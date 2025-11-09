import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { RefreshCw, AlertTriangle, CheckCircle, Play } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

interface RestartPipelineModalProps {
  open: boolean;
  onClose: () => void;
}

export function RestartPipelineModal({ open, onClose }: RestartPipelineModalProps) {
  const [isRestarting, setIsRestarting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPipelines, setSelectedPipelines] = useState<string[]>(["supply-chain-analytics"]);

  const pipelines = [
    {
      id: "production-ingestion",
      name: "Production Data Ingestion",
      status: "Running",
      lastRun: "2 min ago"
    },
    {
      id: "quality-metrics",
      name: "Quality Metrics ETL",
      status: "Running",
      lastRun: "15 min ago"
    },
    {
      id: "predictive-training",
      name: "Predictive Model Training",
      status: "Completed",
      lastRun: "1 hour ago"
    },
    {
      id: "supply-chain-analytics",
      name: "Supply Chain Analytics",
      status: "Failed",
      lastRun: "3 hours ago"
    }
  ];

  const handleRestart = () => {
    setIsRestarting(true);
    setProgress(0);

    // Simulate restart progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRestarting(false);
            setProgress(0);
            toast.success("Pipelines restarted successfully!");
            onClose();
          }, 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  const togglePipeline = (id: string) => {
    setSelectedPipelines(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <RefreshCw className="w-6 h-6 text-teal-400" />
            Restart Pipelines
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning */}
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-white mb-1">Important Notice</h4>
                <p className="text-sm text-slate-300">
                  Restarting pipelines will clear current progress and restart from the last checkpoint. Active data processing will be interrupted.
                </p>
              </div>
            </div>
          </div>

          {/* Pipeline Selection */}
          <div>
            <h4 className="text-white mb-3">Select Pipelines to Restart</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {pipelines.map((pipeline) => (
                <label
                  key={pipeline.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedPipelines.includes(pipeline.id)
                      ? "bg-teal-500/10 border-teal-500"
                      : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedPipelines.includes(pipeline.id)}
                      onChange={() => togglePipeline(pipeline.id)}
                      className="text-teal-500 focus:ring-teal-500 rounded"
                      disabled={isRestarting}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white">{pipeline.name}</span>
                        <Badge
                          className={`${
                            pipeline.status === "Running"
                              ? "bg-blue-500/20 text-blue-400"
                              : pipeline.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {pipeline.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400">Last run: {pipeline.lastRun}</div>
                    </div>
                  </div>
                  {isRestarting && selectedPipelines.includes(pipeline.id) && progress === 100 && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Progress */}
          {isRestarting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Restart Progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-slate-400">
                {progress < 100 ? "Restarting pipelines..." : "All pipelines restarted successfully!"}
              </p>
            </div>
          )}

          {/* Restart Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-slate-400 mb-1">Selected Pipelines</div>
              <div className="text-white">{selectedPipelines.length} of {pipelines.length}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-slate-400 mb-1">Estimated Time</div>
              <div className="text-white">~{selectedPipelines.length * 2} minutes</div>
            </div>
          </div>

          {/* Selected Pipelines Summary */}
          {selectedPipelines.length > 0 && !isRestarting && (
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <h4 className="text-sm text-slate-400 mb-2">Will be restarted:</h4>
              <ul className="space-y-1">
                {selectedPipelines.map(id => {
                  const pipeline = pipelines.find(p => p.id === id);
                  return (
                    <li key={id} className="text-sm text-white flex items-center gap-2">
                      <Play className="w-3 h-3 text-teal-400" />
                      {pipeline?.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={isRestarting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRestart}
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
              disabled={isRestarting || selectedPipelines.length === 0}
            >
              {isRestarting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Restarting...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restart {selectedPipelines.length > 1 ? "Pipelines" : "Pipeline"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
