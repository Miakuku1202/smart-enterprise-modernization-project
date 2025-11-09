import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RefreshCw, AlertTriangle, Loader2 } from "lucide-react";
import { Progress } from "../ui/progress";
import { toast } from "sonner";

interface RestartServiceModalProps {
  open: boolean;
  onClose: () => void;
  service: any;
}

export function RestartServiceModal({ open, onClose, service }: RestartServiceModalProps) {
  const [gracefulShutdown, setGracefulShutdown] = useState(true);
  const [clearCache, setClearCache] = useState(false);
  const [notes, setNotes] = useState("");
  const [restarting, setRestarting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRestart = async (e: React.FormEvent) => {
    e.preventDefault();
    setRestarting(true);
    setProgress(0);

    // Simulate restart progress
    const steps = [0, 25, 50, 75, 100];
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setProgress(step);
    }

    toast.success(`Service "${service?.name || "service"}" restarted successfully!`, {
      description: "All health checks passed. Service is operational.",
    });

    setRestarting(false);
    setProgress(0);
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <RefreshCw className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Restart Service</DialogTitle>
              <DialogDescription className="text-slate-400">
                {service ? `Restart ${service.name}` : "Restart a service or container"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleRestart} className="space-y-6 mt-4">
          {/* Service Info */}
          {service && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Service</p>
                  <p className="text-lg text-white">{service.name}</p>
                  {service.id && <p className="text-xs text-slate-400">{service.id}</p>}
                </div>
                <div className="text-right">
                  {service.uptime && (
                    <>
                      <p className="text-sm text-slate-400">Uptime</p>
                      <p className="text-white">{service.uptime}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {restarting ? (
            // Restart Progress
            <div className="space-y-4">
              <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                <Loader2 className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-spin" />
                <p className="text-lg text-white mb-2">Restarting Service...</p>
                <p className="text-sm text-slate-400 mb-4">
                  {progress === 0 && "Stopping service..."}
                  {progress === 25 && "Cleaning up resources..."}
                  {progress === 50 && "Starting service..."}
                  {progress === 75 && "Running health checks..."}
                  {progress === 100 && "Service ready!"}
                </p>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-yellow-400 mt-2">{progress}% Complete</p>
              </div>
            </div>
          ) : (
            <>
              {/* Warning */}
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-400 mb-1">Service Restart Warning</h4>
                    <p className="text-sm text-slate-300">
                      Restarting this service may cause temporary downtime. Active
                      connections will be terminated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <Label className="text-slate-300">Restart Options</Label>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="graceful"
                    checked={gracefulShutdown}
                    onCheckedChange={(checked: boolean | "indeterminate") =>
                      setGracefulShutdown(checked === true)
                    }
                    className="border-slate-500"
                  />
                  <div>
                    <label htmlFor="graceful" className="text-white cursor-pointer select-none">
                      Graceful Shutdown
                    </label>
                    <p className="text-xs text-slate-400">
                      Wait for active requests to complete before shutting down
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="cache"
                    checked={clearCache}
                    onCheckedChange={(checked: boolean | "indeterminate") =>
                      setClearCache(checked === true)
                    }
                    className="border-slate-500"
                  />
                  <div>
                    <label htmlFor="cache" className="text-white cursor-pointer select-none">
                      Clear Cache
                    </label>
                    <p className="text-xs text-slate-400">
                      Clear application cache during restart
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-slate-300">
                  Reason for Restart (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter reason for restarting this service..."
                  rows={3}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Impact Summary */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="text-sm text-blue-400 mb-2">Restart Process:</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• Service will be stopped {gracefulShutdown && "(gracefully)"}</li>
                  {clearCache && <li>• Application cache will be cleared</li>}
                  <li>• Service will be restarted with latest configuration</li>
                  <li>• Health checks will run automatically</li>
                  <li>
                    • Estimated downtime:{" "}
                    {gracefulShutdown ? "10–30 seconds" : "5–15 seconds"}
                  </li>
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
              disabled={restarting}
            >
              {restarting ? "Restarting..." : "Cancel"}
            </Button>
            {!restarting && (
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Restart Service
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
