import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Power, AlertTriangle, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface StopMachineModalProps {
  open: boolean;
  onClose: () => void;
  machineName: string | null;
}

export function StopMachineModal({ open, onClose, machineName }: StopMachineModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.warning(`Machine "${machineName}" has been stopped`, {
      description: `Reason: ${reason}. Production halted for safety.`
    });

    setLoading(false);
    setReason("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Power className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Stop Machine</DialogTitle>
              <DialogDescription className="text-slate-400">
                {machineName ? `Stop operation of ${machineName}` : "Stop machine operation"}
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
              <Badge className="bg-green-500/20 text-green-400">
                Currently Running
              </Badge>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-yellow-400 mb-1">Warning</h4>
                <p className="text-sm text-slate-300">
                  Stopping this machine will halt production immediately. Ensure all safety protocols are followed.
                </p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-slate-300">
              Stop Reason *
            </Label>
            <Select value={reason} onValueChange={setReason} required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select reason for stopping" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="emergency" className="text-white">Emergency Stop</SelectItem>
                <SelectItem value="maintenance" className="text-white">Scheduled Maintenance</SelectItem>
                <SelectItem value="quality" className="text-white">Quality Issue Detected</SelectItem>
                <SelectItem value="material" className="text-white">Material Shortage</SelectItem>
                <SelectItem value="shift" className="text-white">End of Shift</SelectItem>
                <SelectItem value="other" className="text-white">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide additional details about the stop..."
              rows={4}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Impact Summary */}
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="text-sm text-red-400 mb-2">Impact of Stopping:</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Production will be paused immediately</li>
              <li>• Current batch may need to be discarded</li>
              <li>• Downtime will be logged for reports</li>
              <li>• Maintenance team will be notified</li>
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
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Stopping Machine...
                </>
              ) : (
                <>
                  <Power className="w-4 h-4 mr-2" />
                  Confirm Stop
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
