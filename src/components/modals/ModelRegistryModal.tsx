import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Brain, Download, Upload, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface ModelRegistryModalProps {
  open: boolean;
  onClose: () => void;
}

export function ModelRegistryModal({ open, onClose }: ModelRegistryModalProps) {
  const registryModels = [
    {
      name: "Predictive Maintenance v2.3.1",
      type: "Classification",
      framework: "TensorFlow",
      size: "124 MB",
      accuracy: 94.2,
      status: "Production",
      downloads: 342,
      rating: 4.8
    },
    {
      name: "Quality Inspection v1.8.4",
      type: "Object Detection",
      framework: "PyTorch",
      size: "256 MB",
      accuracy: 96.8,
      status: "Production",
      downloads: 289,
      rating: 4.9
    },
    {
      name: "Demand Forecasting v3.1.0",
      type: "Time Series",
      framework: "XGBoost",
      size: "45 MB",
      accuracy: 88.5,
      status: "Production",
      downloads: 198,
      rating: 4.5
    },
    {
      name: "Supply Chain Optimizer v2.0.2",
      type: "Optimization",
      framework: "TensorFlow",
      size: "187 MB",
      accuracy: 91.3,
      status: "Staging",
      downloads: 156,
      rating: 4.6
    },
    {
      name: "Anomaly Detection v1.5.9",
      type: "Anomaly Detection",
      framework: "Scikit-learn",
      size: "32 MB",
      accuracy: 92.7,
      status: "Production",
      downloads: 421,
      rating: 4.7
    }
  ];

  const handleDownload = (modelName: string) => {
    toast.success(`Downloading ${modelName}...`);
  };

  const handleUpload = () => {
    toast.success("Model upload initiated. This may take a few minutes.");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Brain className="w-6 h-6 text-blue-400" />
              Model Registry
            </DialogTitle>
            <Button
              onClick={handleUpload}
              size="sm"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Model
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Total Models</div>
              <div className="text-xl text-white">{registryModels.length}</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">In Production</div>
              <div className="text-xl text-green-400">4</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Total Downloads</div>
              <div className="text-xl text-teal-400">1.4K</div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Avg Rating</div>
              <div className="text-xl text-yellow-400">4.7</div>
            </div>
          </div>

          {/* Models List */}
          <div className="space-y-3">
            {registryModels.map((model, index) => (
              <div
                key={index}
                className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-teal-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white">{model.name}</h4>
                      <Badge
                        className={`${
                          model.status === "Production"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{model.type}</span>
                      <span>•</span>
                      <span>{model.framework}</span>
                      <span>•</span>
                      <span>{model.size}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => handleDownload(model.name)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-700">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Accuracy</div>
                    <div className="text-white">{model.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Downloads</div>
                    <div className="text-teal-400">{model.downloads}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Rating</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{model.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
