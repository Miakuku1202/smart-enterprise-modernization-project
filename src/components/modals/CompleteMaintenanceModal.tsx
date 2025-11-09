import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CheckCircle, Wrench, User, Clock, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface CompleteMaintenanceModalProps {
  open: boolean;
  onClose: () => void;
  alert: any;
}

export function CompleteMaintenanceModal({ open, onClose, alert }: CompleteMaintenanceModalProps) {
  const [technician, setTechnician] = useState("");
  const [duration, setDuration] = useState("");
  const [outcome, setOutcome] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(`Maintenance completed for ${alert?.machine || "machine"}!`, {
      description: `Task marked as complete. Machine ready for operation.`
    });

    setLoading(false);
    setTechnician("");
    setDuration("");
    setOutcome("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Complete Maintenance</DialogTitle>
              <DialogDescription className="text-slate-400">
                Log maintenance completion details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Alert Info */}
          {alert && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-slate-400">Machine</p>
                  <p className="text-lg text-white">{alert.machine}</p>
                </div>
                <Badge className={`${
                  alert.priority === "high" ? "bg-red-500/20 text-red-400" :
                  alert.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-green-500/20 text-green-400"
                }`}>
                  {alert.priority} priority
                </Badge>
              </div>
              <div className="pt-3 border-t border-slate-600">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Wrench className="w-4 h-4" />
                  <span>{alert.type} Maintenance</span>
                  <span className="mx-2">•</span>
                  <span>Scheduled: {alert.date}</span>
                </div>
              </div>
            </div>
          )}

          {/* Technician */}
          <div className="space-y-2">
            <Label htmlFor="technician" className="text-slate-300">
              Technician Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="technician"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
                placeholder="Enter technician name"
                required
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-slate-300">
              Duration (hours) *
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="duration"
                type="number"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 2.5"
                required
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Outcome */}
          <div className="space-y-2">
            <Label htmlFor="outcome" className="text-slate-300">
              Maintenance Outcome *
            </Label>
            <Select value={outcome} onValueChange={setOutcome} required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="successful" className="text-white">Successful - Machine Operational</SelectItem>
                <SelectItem value="partial" className="text-white">Partial Success - Needs Follow-up</SelectItem>
                <SelectItem value="parts" className="text-white">Parts Replacement Required</SelectItem>
                <SelectItem value="extended" className="text-white">Extended Maintenance Needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Work Performed */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">
              Work Performed *
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe the maintenance work performed, parts replaced, issues found, etc..."
              required
              rows={5}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Summary */}
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="text-sm text-green-400 mb-2">Completion Actions:</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Maintenance record will be logged in system</li>
              <li>• Machine status will be updated</li>
              <li>• Production team will be notified</li>
              <li>• Downtime will be calculated and recorded</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Maintenance
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
