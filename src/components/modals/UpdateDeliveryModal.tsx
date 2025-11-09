import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Truck, Loader2, MapPin, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface UpdateDeliveryModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
}

export function UpdateDeliveryModal({ open, onClose, order }: UpdateDeliveryModalProps) {
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [notes, setNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(`Delivery status updated for ${order?.id || "order"}!`, {
      description: `Status: ${status}. Customer will be notified.`
    });

    setUpdating(false);
    setStatus("");
    setLocation("");
    setEstimatedDelivery("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Truck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Update Delivery Status</DialogTitle>
              <DialogDescription className="text-slate-400">
                Update shipping information for order
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {order && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Order</p>
                  <p className="text-lg text-white">{order.id} - {order.product}</p>
                </div>
                <Badge className={`${
                  order.status === "delivered" ? "bg-green-500/20 text-green-400" :
                  order.status === "in-transit" ? "bg-blue-500/20 text-blue-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {order.status}
                </Badge>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-300">Delivery Status *</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="pending" className="text-white">Pending</SelectItem>
                <SelectItem value="in-transit" className="text-white">In Transit</SelectItem>
                <SelectItem value="out-for-delivery" className="text-white">Out for Delivery</SelectItem>
                <SelectItem value="delivered" className="text-white">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-slate-300">Current Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Distribution Center, New York"
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery" className="text-slate-300">Estimated Delivery</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input id="delivery" type="date" value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">Notes (Optional)</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional delivery information..."
              rows={3}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onClose} variant="outline" 
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800" disabled={updating}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600" disabled={updating}>
              {updating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : <><Truck className="w-4 h-4 mr-2" />Update Status</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
