import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Cloud, TrendingUp, Loader2, Info } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface ScaleResourcesModalProps {
  open: boolean;
  onClose: () => void;
  service: any;
}

export function ScaleResourcesModal({ open, onClose, service }: ScaleResourcesModalProps) {
  const [instances, setInstances] = useState([2]);
  const [cpuLimit, setCpuLimit] = useState([50]);
  const [memoryLimit, setMemoryLimit] = useState([70]);
  const [scalingStrategy, setScalingStrategy] = useState("manual");
  const [scaling, setScaling] = useState(false);

  const handleScale = async (e: React.FormEvent) => {
    e.preventDefault();
    setScaling(true);

    // Simulate scaling process
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success(`Resources scaled successfully!`, {
      description: `${service?.name || "Service"} scaled to ${instances[0]} instances with ${cpuLimit[0]}% CPU and ${memoryLimit[0]}% memory limits.`
    });

    setScaling(false);
    onClose();
  };

  const estimatedCost = (instances[0] * 0.08 * 24 * 30).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <Cloud className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Scale Resources</DialogTitle>
              <DialogDescription className="text-slate-400">
                {service ? `Configure scaling for ${service.name}` : "Configure resource scaling"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleScale} className="space-y-6 mt-4">
          {/* Service Info */}
          {service && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Service</p>
                  <p className="text-lg text-white">{service.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Current Resources</p>
                  <p className="text-white">CPU: {service.cpu}% • Memory: {service.memory}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Scaling Strategy */}
          <div className="space-y-2">
            <Label className="text-slate-300">Scaling Strategy</Label>
            <Select value={scalingStrategy} onValueChange={setScalingStrategy}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="manual" className="text-white">Manual Scaling</SelectItem>
                <SelectItem value="auto" className="text-white">Auto-Scaling</SelectItem>
                <SelectItem value="scheduled" className="text-white">Scheduled Scaling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Instances */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Number of Instances</Label>
              <Badge className="bg-teal-500/20 text-teal-400">{instances[0]} instances</Badge>
            </div>
            <Slider
              value={instances}
              onValueChange={setInstances}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 instance</span>
              <span>10 instances</span>
            </div>
          </div>

          {/* CPU Limit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">CPU Limit per Instance</Label>
              <Badge className="bg-blue-500/20 text-blue-400">{cpuLimit[0]}%</Badge>
            </div>
            <Slider
              value={cpuLimit}
              onValueChange={setCpuLimit}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Memory Limit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Memory Limit per Instance</Label>
              <Badge className="bg-purple-500/20 text-purple-400">{memoryLimit[0]}%</Badge>
            </div>
            <Slider
              value={memoryLimit}
              onValueChange={setMemoryLimit}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Cost Estimate */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm text-blue-400 mb-2">Resource Allocation Summary:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div>
                    <p className="text-slate-400">Total Instances:</p>
                    <p className="text-white">{instances[0]}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Scaling Mode:</p>
                    <p className="text-white capitalize">{scalingStrategy}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Total CPU:</p>
                    <p className="text-white">{instances[0] * cpuLimit[0]}% cores</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Total Memory:</p>
                    <p className="text-white">{instances[0] * memoryLimit[0] / 100} GB</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-blue-500/30">
                    <p className="text-slate-400">Estimated Monthly Cost:</p>
                    <p className="text-xl text-teal-400">${estimatedCost}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning for high resource usage */}
          {(instances[0] > 5 || cpuLimit[0] > 80 || memoryLimit[0] > 80) && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 mb-1">High Resource Configuration</h4>
                  <p className="text-sm text-slate-300">
                    You're requesting significant resources. This may increase costs. Ensure this is necessary for your workload.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={scaling}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              disabled={scaling}
            >
              {scaling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Scaling...
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4 mr-2" />
                  Apply Scaling
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
