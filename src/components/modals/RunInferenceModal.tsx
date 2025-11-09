import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Activity, Play, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "sonner";

interface RunInferenceModalProps {
  open: boolean;
  onClose: () => void;
}

export function RunInferenceModal({ open, onClose }: RunInferenceModalProps) {
  const [selectedModel, setSelectedModel] = useState("predictive-maintenance");
  const [inputData, setInputData] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const models = [
    { id: "predictive-maintenance", name: "Predictive Maintenance Model", version: "v2.3.1" },
    { id: "quality-inspection", name: "Quality Inspection Model", version: "v1.8.4" },
    { id: "demand-forecasting", name: "Demand Forecasting Model", version: "v3.1.0" },
    { id: "anomaly-detection", name: "Anomaly Detection Model", version: "v1.5.9" }
  ];

  const handleRunInference = () => {
    setIsRunning(true);
    
    // Simulate inference
    setTimeout(() => {
      const mockResults = {
        "predictive-maintenance": {
          prediction: "Maintenance Required",
          confidence: 87.3,
          riskLevel: "Medium",
          estimatedTimeToFailure: "72 hours",
          recommendations: ["Schedule inspection", "Order replacement parts"]
        },
        "quality-inspection": {
          prediction: "Pass",
          confidence: 96.8,
          defectProbability: 3.2,
          inspectionScore: 9.4,
          recommendations: ["Continue production", "Monitor closely"]
        },
        "demand-forecasting": {
          prediction: "High Demand",
          confidence: 88.5,
          forecastedUnits: 12500,
          timeframe: "Next 30 days",
          recommendations: ["Increase inventory", "Alert suppliers"]
        },
        "anomaly-detection": {
          prediction: "Normal Operation",
          confidence: 92.7,
          anomalyScore: 0.12,
          status: "Healthy",
          recommendations: ["No action needed"]
        }
      };

      setResult(mockResults[selectedModel as keyof typeof mockResults]);
      setIsRunning(false);
      toast.success("Inference completed successfully!");
    }, 2000);
  };

  const handleReset = () => {
    setResult(null);
    setInputData("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Activity className="w-6 h-6 text-teal-400" />
            Run Model Inference
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Model Selection */}
          <div className="space-y-2">
            <Label className="text-slate-300">Select Model</Label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              disabled={isRunning || result !== null}
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} ({model.version})
                </option>
              ))}
            </select>
          </div>

          {/* Input Data */}
          <div className="space-y-2">
            <Label className="text-slate-300">Input Data (JSON)</Label>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder='{"temperature": 85, "vibration": 0.5, "runtime_hours": 1250}'
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
              rows={4}
              disabled={isRunning || result !== null}
            />
            <p className="text-xs text-slate-400">
              Enter JSON formatted input data for the model
            </p>
          </div>

          {/* Results */}
          {result && (
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h4 className="text-white">Inference Results</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/50 rounded">
                  <div className="text-xs text-slate-400 mb-1">Prediction</div>
                  <div className="text-white">{result.prediction}</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded">
                  <div className="text-xs text-slate-400 mb-1">Confidence</div>
                  <div className="text-teal-400">{result.confidence}%</div>
                </div>
                {Object.entries(result).map(([key, value]) => {
                  if (key === "prediction" || key === "confidence" || key === "recommendations") return null;
                  return (
                    <div key={key} className="p-3 bg-slate-900/50 rounded">
                      <div className="text-xs text-slate-400 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-white">{String(value)}</div>
                    </div>
                  );
                })}
              </div>

              {result.recommendations && (
                <div className="mt-4">
                  <div className="text-sm text-slate-400 mb-2">Recommendations</div>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-slate-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Close
            </Button>
            {result ? (
              <Button
                onClick={handleReset}
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
              >
                Run Another Test
              </Button>
            ) : (
              <Button
                onClick={handleRunInference}
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                disabled={isRunning}
              >
                {isRunning ? (
                  <>Running Inference...</>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Inference
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
