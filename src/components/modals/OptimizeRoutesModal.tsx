import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Truck, MapPin, Clock, TrendingDown, Zap, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface OptimizeRoutesModalProps {
  open: boolean;
  onClose: () => void;
}

export function OptimizeRoutesModal({ open, onClose }: OptimizeRoutesModalProps) {
  const [optimizing, setOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const routes = [
    { 
      id: "RT-001", 
      from: "Germany", 
      to: "Factory A", 
      current: "450 km", 
      optimized: "380 km",
      saving: "70 km (15.6%)",
      fuelSaving: "$85"
    },
    { 
      id: "RT-002", 
      from: "Japan", 
      to: "Factory B", 
      current: "890 km", 
      optimized: "820 km",
      saving: "70 km (7.9%)",
      fuelSaving: "$95"
    },
    { 
      id: "RT-003", 
      from: "USA", 
      to: "Warehouse 1", 
      current: "1200 km", 
      optimized: "1050 km",
      saving: "150 km (12.5%)",
      fuelSaving: "$180"
    },
    { 
      id: "RT-004", 
      from: "France", 
      to: "Factory A", 
      current: "320 km", 
      optimized: "290 km",
      saving: "30 km (9.4%)",
      fuelSaving: "$40"
    }
  ];

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
      toast.success("Routes optimized successfully!", {
        description: "Total savings: 320 km and $400 in fuel costs"
      });
    }, 2000);
  };

  const handleApply = () => {
    toast.success("Optimized routes applied!", {
      description: "All shipments will now use the optimized routes"
    });
    onClose();
    setTimeout(() => setOptimized(false), 500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal-400" />
            AI-Powered Route Optimization
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Optimize delivery routes using AI to reduce distance, time, and fuel consumption.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Summary Cards */}
          {optimized && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400">Distance Saved</span>
                </div>
                <div className="text-2xl text-white">320 km</div>
              </div>
              <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-teal-400" />
                  <span className="text-sm text-teal-400">Fuel Savings</span>
                </div>
                <div className="text-2xl text-white">$400</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-blue-400">Time Saved</span>
                </div>
                <div className="text-2xl text-white">4.2 hrs</div>
              </div>
            </div>
          )}

          {/* Routes List */}
          <div className="space-y-3">
            <h4 className="text-white">Active Routes</h4>
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-teal-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-slate-700 text-slate-300">{route.id}</Badge>
                      <span className="text-slate-400 text-sm">→</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4 text-teal-400" />
                      <span>{route.from}</span>
                      <span className="text-slate-400">→</span>
                      <span>{route.to}</span>
                    </div>
                  </div>
                  {optimized && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-700">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Current Distance</div>
                    <div className="text-white">{route.current}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Optimized Distance</div>
                    <div className={optimized ? "text-teal-400" : "text-white"}>
                      {route.optimized}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Distance Saved</div>
                    <div className={optimized ? "text-green-400" : "text-white"}>
                      {route.saving}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Fuel Cost Saved</div>
                    <div className={optimized ? "text-green-400" : "text-white"}>
                      {route.fuelSaving}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          {!optimized && (
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="text-white mb-1">AI Optimization Engine</h4>
                  <p className="text-sm text-slate-300">
                    Our AI analyzes traffic patterns, weather conditions, road closures, and historical data 
                    to find the most efficient routes. Click "Optimize Now" to apply ML-powered route suggestions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-700">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-slate-700 text-slate-300"
          >
            Cancel
          </Button>
          {!optimized ? (
            <Button 
              onClick={handleOptimize}
              disabled={optimizing}
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            >
              {optimizing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  Optimizing Routes...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Optimize Now
                </>
              )}
            </Button>
          ) : (
            <Button 
              onClick={handleApply}
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Apply Optimized Routes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
