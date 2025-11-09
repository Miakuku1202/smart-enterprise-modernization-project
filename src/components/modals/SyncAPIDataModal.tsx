import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface SyncAPIDataModalProps {
  open: boolean;
  onClose: () => void;
}

const apis = [
  { id: "inventory", name: "Inventory Sync API", status: "connected" },
  { id: "order", name: "Order Management API", status: "connected" },
  { id: "shipping", name: "Shipping Tracker API", status: "error" },
  { id: "invoice", name: "Invoice API", status: "connected" }
];

export function SyncAPIDataModal({ open, onClose }: SyncAPIDataModalProps) {
  const [selectedAPIs, setSelectedAPIs] = useState<string[]>(apis.map(api => api.id));
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    console.log("Syncing APIs:", selectedAPIs);
    setTimeout(() => {
      setSyncing(false);
      onClose();
    }, 2000);
  };

  const toggleAPI = (apiId: string) => {
    setSelectedAPIs(prev => 
      prev.includes(apiId) 
        ? prev.filter(id => id !== apiId)
        : [...prev, apiId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Sync API Data</DialogTitle>
          <DialogDescription className="text-slate-400">
            Select APIs to synchronize data with the system.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            {apis.map((api) => (
              <div 
                key={api.id}
                className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id={api.id}
                    checked={selectedAPIs.includes(api.id)}
                    onCheckedChange={() => toggleAPI(api.id)}
                  />
                  <Label htmlFor={api.id} className="cursor-pointer flex items-center gap-3">
                    <span className="text-white">{api.name}</span>
                    {api.status === "connected" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </Label>
                </div>
                <Badge className={api.status === "connected" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                  {api.status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-slate-300">
              {selectedAPIs.length} API{selectedAPIs.length !== 1 ? 's' : ''} selected for synchronization
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-slate-700 text-slate-300"
              disabled={syncing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSync} 
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              disabled={syncing || selectedAPIs.length === 0}
            >
              {syncing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
