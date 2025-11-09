import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Truck, MapPin, Clock, Package, User, Phone, CheckCircle2 } from "lucide-react";

interface TrackShipmentModalProps {
  open: boolean;
  onClose: () => void;
  shipment: {
    id: string;
    route: string;
    status: string;
    eta: string;
  } | null;
}

export function TrackShipmentModal({ open, onClose, shipment }: TrackShipmentModalProps) {
  if (!shipment) return null;

  const trackingSteps = [
    { 
      status: "Picked Up", 
      location: shipment.route.split(" → ")[0], 
      time: "2 hours ago", 
      completed: true 
    },
    { 
      status: "In Transit", 
      location: "Distribution Center - Munich", 
      time: "45 mins ago", 
      completed: true 
    },
    { 
      status: shipment.status === "Customs" ? "At Customs" : "In Transit", 
      location: shipment.status === "Customs" ? "Customs Facility" : "En Route", 
      time: "Current", 
      completed: shipment.status === "Customs" || shipment.status === "In Transit"
    },
    { 
      status: "Out for Delivery", 
      location: shipment.route.split(" → ")[1], 
      time: `ETA: ${shipment.eta}`, 
      completed: shipment.status === "Delivered" 
    },
    { 
      status: "Delivered", 
      location: shipment.route.split(" → ")[1], 
      time: shipment.status === "Delivered" ? "Completed" : "Pending", 
      completed: shipment.status === "Delivered" 
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal-400" />
            Track Shipment: {shipment.id}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Real-time tracking and delivery status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Status */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-slate-400 mb-1">Current Status</div>
                <Badge
                  className={`${
                    shipment.status === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : shipment.status === "In Transit"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {shipment.status}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 mb-1">ETA</div>
                <div className="text-white">{shipment.eta}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <div>
                  <div className="text-xs text-slate-400">Route</div>
                  <div className="text-sm text-white">{shipment.route}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">Package Type</div>
                  <div className="text-sm text-white">Auto Parts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div>
            <h4 className="text-white mb-4">Tracking History</h4>
            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-teal-500/20 border-2 border-teal-500"
                          : "bg-slate-700 border-2 border-slate-600"
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.completed ? "bg-teal-500" : "bg-slate-700"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between mb-1">
                      <div className={`${step.completed ? "text-white" : "text-slate-400"}`}>
                        {step.status}
                      </div>
                      <div className="text-xs text-slate-400">{step.time}</div>
                    </div>
                    <div className="text-sm text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {step.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver Information */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <h4 className="text-white mb-3">Driver Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" />
                <div>
                  <div className="text-xs text-slate-400">Driver Name</div>
                  <div className="text-sm text-white">Michael Schmidt</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">Contact</div>
                  <div className="text-sm text-white">+49 123 456 789</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-slate-700 text-slate-300"
          >
            Close
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Driver
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
