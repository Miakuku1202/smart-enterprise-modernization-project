import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Brain, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

interface RetrainAllModalProps {
  open: boolean;
  onClose: () => void;
}

export function RetrainAllModal({ open, onClose }: RetrainAllModalProps) {
  const [isRetraining, setIsRetraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRetrain = () => {
    setIsRetraining(true);
    setProgress(0);

    // Simulate retraining progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRetraining(false);
            setProgress(0);
            toast.success("All models retrained successfully!");
            onClose();
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const models = [
    "Predictive Maintenance Model",
    "Quality Inspection Model",
    "Demand Forecasting Model",
    "Supply Chain Optimizer",
    "Anomaly Detection Model"
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Brain className="w-6 h-6 text-purple-400" />
            Retrain All Models
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
                  Retraining all models will use latest production data and may take 2-4 hours. Current models will continue serving requests.
                </p>
              </div>
            </div>
          </div>

          {/* Models List */}
          <div>
            <h4 className="text-white mb-3">Models to be retrained ({models.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {models.map((model, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  {isRetraining && progress > index * 20 ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Brain className="w-5 h-5 text-slate-400" />
                  )}
                  <span className="flex-1 text-slate-300">{model}</span>
                  {isRetraining && progress > index * 20 && progress < (index + 1) * 20 && (
                    <span className="text-xs text-teal-400">Training...</span>
                  )}
                  {isRetraining && progress >= (index + 1) * 20 && (
                    <span className="text-xs text-green-400">Complete</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          {isRetraining && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Training Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-slate-400 mb-1">Estimated Time</div>
              <div className="text-white">2-4 hours</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-slate-400 mb-1">Data Points</div>
              <div className="text-white">~2.8M records</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={isRetraining}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRetrain}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              disabled={isRetraining}
            >
              {isRetraining ? "Retraining..." : "Start Retraining"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
