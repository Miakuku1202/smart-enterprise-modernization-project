import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Wrench, Settings, Loader2, CheckCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

interface CalibrateMachineModalProps {
  open: boolean;
  onClose: () => void;
  machineName: string | null;
}

const calibrationSteps = [
  { id: "sensors", label: "Sensor Calibration", duration: "5 min" },
  { id: "alignment", label: "Mechanical Alignment", duration: "8 min" },
  { id: "software", label: "Software Updates", duration: "3 min" },
  { id: "testing", label: "Performance Testing", duration: "10 min" },
];

export function CalibrateMachineModal({ open, onClose, machineName }: CalibrateMachineModalProps) {
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [calibrating, setCalibrating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStepToggle = (stepId: string) => {
    setSelectedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSteps.length === 0) {
      toast.error("Please select at least one calibration step");
      return;
    }

    setCalibrating(true);
    setProgress(0);

    // Simulate calibration progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    toast.success(`Machine "${machineName}" calibrated successfully!`, {
      description: `${selectedSteps.length} calibration steps completed.`
    });

    setCalibrating(false);
    setProgress(0);
    setSelectedSteps([]);
    setNotes("");
    onClose();
  };

  const totalDuration = selectedSteps.reduce((total, stepId) => {
    const step = calibrationSteps.find(s => s.id === stepId);
    return total + (parseInt(step?.duration || "0") || 0);
  }, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <Wrench className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Calibrate Machine</DialogTitle>
              <DialogDescription className="text-slate-400">
                {machineName ? `Calibrate ${machineName}` : "Machine calibration wizard"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Machine Info */}
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Machine</p>
                <p className="text-lg text-white">{machineName || "No machine selected"}</p>
              </div>
              <Settings className="w-8 h-8 text-teal-400" />
            </div>
          </div>

          {calibrating ? (
            /* Calibration Progress */
            <div className="space-y-4">
              <div className="p-6 bg-teal-500/10 border border-teal-500/30 rounded-lg text-center">
                <Loader2 className="w-12 h-12 text-teal-400 mx-auto mb-4 animate-spin" />
                <p className="text-lg text-white mb-2">Calibrating Machine...</p>
                <p className="text-sm text-slate-400 mb-4">Please wait while calibration is in progress</p>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-teal-400 mt-2">{progress}% Complete</p>
              </div>
            </div>
          ) : (
            <>
              {/* Calibration Steps */}
              <div className="space-y-2">
                <Label className="text-slate-300">Select Calibration Steps *</Label>
                <div className="space-y-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  {calibrationSteps.map((step) => (
                    <div
                      key={step.id}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={step.id}
                          checked={selectedSteps.includes(step.id)}
                          onCheckedChange={() => handleStepToggle(step.id)}
                          className="border-slate-500"
                        />
                        <div>
                          <label
                            htmlFor={step.id}
                            className="text-white cursor-pointer select-none"
                          >
                            {step.label}
                          </label>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Est. duration: {step.duration}
                          </p>
                        </div>
                      </div>
                      {selectedSteps.includes(step.id) && (
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                      )}
                    </div>
                  ))}
                </div>
                {selectedSteps.length > 0 && (
                  <p className="text-sm text-teal-400">
                    Total estimated time: ~{totalDuration} minutes
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-slate-300">
                  Calibration Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any specific instructions or observations..."
                  rows={3}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Info */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="text-sm text-blue-400 mb-2">Calibration Process:</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• Machine will be paused during calibration</li>
                  <li>• Automated diagnostics will run</li>
                  <li>• Performance metrics will be reset</li>
                  <li>• Calibration log will be generated</li>
                </ul>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={calibrating}
            >
              {calibrating ? "Calibrating..." : "Cancel"}
            </Button>
            {!calibrating && (
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                disabled={selectedSteps.length === 0}
              >
                <Wrench className="w-4 h-4 mr-2" />
                Start Calibration
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
