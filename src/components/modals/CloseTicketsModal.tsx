import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CheckCircle, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CloseTicketsModalProps {
  open: boolean;
  onClose: () => void;
  ticketId: string | null;
}

export function CloseTicketsModal({ open, onClose, ticketId }: CloseTicketsModalProps) {
  const [resolution, setResolution] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(`Ticket ${ticketId} has been closed successfully!`, {
      description: `Resolution recorded and customer notified.`
    });

    setLoading(false);
    setResolution("");
    setRating("");
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
              <DialogTitle className="text-2xl">Close Ticket</DialogTitle>
              <DialogDescription className="text-slate-400">
                {ticketId ? `Closing ticket ${ticketId}` : "Close selected ticket"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Ticket ID Display */}
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Ticket ID</p>
                <p className="text-lg text-teal-400">{ticketId || "No ticket selected"}</p>
              </div>
              <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 text-sm">
                In Progress
              </div>
            </div>
          </div>

          {/* Resolution Notes */}
          <div className="space-y-2">
            <Label htmlFor="resolution" className="text-slate-300">
              Resolution Notes *
            </Label>
            <Textarea
              id="resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="Describe how the issue was resolved..."
              required
              rows={6}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
            <p className="text-xs text-slate-500">
              Provide clear details about the resolution for future reference
            </p>
          </div>

          {/* Customer Satisfaction */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-slate-300">
              Customer Satisfaction (Optional)
            </Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select satisfaction level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="5" className="text-white">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    5 Stars - Excellent
                  </div>
                </SelectItem>
                <SelectItem value="4" className="text-white">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    4 Stars - Good
                  </div>
                </SelectItem>
                <SelectItem value="3" className="text-white">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    3 Stars - Average
                  </div>
                </SelectItem>
                <SelectItem value="2" className="text-white">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-slate-400" />
                    2 Stars - Below Average
                  </div>
                </SelectItem>
                <SelectItem value="1" className="text-white">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-slate-400" />
                    1 Star - Poor
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Summary */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="text-sm text-blue-400 mb-2">Actions that will be performed:</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Ticket status will be set to "Resolved"
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Customer will receive resolution notification
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Resolution notes will be added to ticket history
              </li>
              {rating && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Customer satisfaction rating will be recorded
                </li>
              )}
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
                  Closing Ticket...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Close Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
