import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, XCircle, Truck, Package, MapPin, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface ApproveShipmentsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ApproveShipmentsModal({ open, onClose }: ApproveShipmentsModalProps) {
  const [selectedShipments, setSelectedShipments] = useState<string[]>([]);

  const pendingShipments = [
    { 
      id: "SHP-3425", 
      route: "China → Factory C", 
      cost: "$8,500", 
      items: "Electronic Components",
      quantity: "500 units",
      priority: "High"
    },
    { 
      id: "SHP-3426", 
      route: "Italy → Warehouse 2", 
      cost: "$6,200", 
      items: "Leather Seats",
      quantity: "200 units",
      priority: "Medium"
    },
    { 
      id: "SHP-3427", 
      route: "Mexico → Factory A", 
      cost: "$12,300", 
      items: "Engine Parts",
      quantity: "150 units",
      priority: "High"
    },
    { 
      id: "SHP-3428", 
      route: "Brazil → Factory B", 
      cost: "$4,800", 
      items: "Rubber Components",
      quantity: "800 units",
      priority: "Low"
    },
    { 
      id: "SHP-3429", 
      route: "South Korea → Factory C", 
      cost: "$15,600", 
      items: "Battery Systems",
      quantity: "100 units",
      priority: "High"
    }
  ];

  const toggleShipment = (id: string) => {
    setSelectedShipments(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedShipments(pendingShipments.map(s => s.id));
  };

  const deselectAll = () => {
    setSelectedShipments([]);
  };

  const handleApprove = () => {
    if (selectedShipments.length === 0) {
      toast.error("No shipments selected", {
        description: "Please select at least one shipment to approve"
      });
      return;
    }

    toast.success(`${selectedShipments.length} shipment(s) approved!`, {
      description: "The selected shipments have been approved and will be processed."
    });
    onClose();
    setSelectedShipments([]);
  };

  const handleReject = () => {
    if (selectedShipments.length === 0) {
      toast.error("No shipments selected", {
        description: "Please select at least one shipment to reject"
      });
      return;
    }

    toast.success(`${selectedShipments.length} shipment(s) rejected`, {
      description: "The selected shipments have been rejected and returned to supplier."
    });
    onClose();
    setSelectedShipments([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-400" />
            Approve Pending Shipments
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Review and approve shipments waiting for authorization ({pendingShipments.length} pending)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              {selectedShipments.length} of {pendingShipments.length} selected
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={selectAll}
                className="border-slate-700 text-slate-300"
              >
                Select All
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={deselectAll}
                className="border-slate-700 text-slate-300"
              >
                Deselect All
              </Button>
            </div>
          </div>

          {/* Shipments List */}
          <div className="space-y-3">
            {pendingShipments.map((shipment) => (
              <div
                key={shipment.id}
                onClick={() => toggleShipment(shipment.id)}
                className={`bg-slate-900/50 border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedShipments.includes(shipment.id)
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                      selectedShipments.includes(shipment.id)
                        ? "bg-teal-500 border-teal-500"
                        : "border-slate-600"
                    }`}>
                      {selectedShipments.includes(shipment.id) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-slate-700 text-white">{shipment.id}</Badge>
                        <Badge
                          className={`${
                            shipment.priority === "High"
                              ? "bg-red-500/20 text-red-400"
                              : shipment.priority === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {shipment.priority} Priority
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Truck className="w-4 h-4 text-teal-400" />
                          <span className="text-slate-400">Route:</span>
                          <span className="text-white">{shipment.route}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-slate-400">Cost:</span>
                          <span className="text-white">{shipment.cost}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-400">Items:</span>
                          <span className="text-white">{shipment.items}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span className="text-slate-400">Quantity:</span>
                          <span className="text-white">{shipment.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {selectedShipments.length > 0 && (
            <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white mb-1">Selection Summary</div>
                  <div className="text-sm text-slate-300">
                    {selectedShipments.length} shipment(s) selected for approval
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400 mb-1">Total Cost</div>
                  <div className="text-xl text-teal-400">
                    ${pendingShipments
                      .filter(s => selectedShipments.includes(s.id))
                      .reduce((sum, s) => sum + parseFloat(s.cost.replace(/[$,]/g, '')), 0)
                      .toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-slate-700 text-slate-300"
          >
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReject}
            disabled={selectedShipments.length === 0}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 disabled:opacity-50"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject Selected
          </Button>
          <Button 
            onClick={handleApprove}
            disabled={selectedShipments.length === 0}
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve Selected ({selectedShipments.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
