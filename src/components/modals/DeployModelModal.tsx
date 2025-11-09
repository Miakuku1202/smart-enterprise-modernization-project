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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

interface DeployModelModalProps {
  open: boolean;
  onClose: () => void;
}

export function DeployModelModal({ open, onClose }: DeployModelModalProps) {
  const [selectedModel, setSelectedModel] = useState("");
  const [environment, setEnvironment] = useState("");
  const [autoScale, setAutoScale] = useState(false);

  const handleDeploy = () => {
    console.log("Deploying model:", { selectedModel, environment, autoScale });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Deploy AI Model</DialogTitle>
          <DialogDescription className="text-slate-400">
            Select a model and environment for deployment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Select Model */}
          <div className="space-y-2">
            <Label>Select Model</Label>
            <Select value={selectedModel} onValueChange={(value: string) => setSelectedModel(value)}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="forecast-v3">Production Forecast v3</SelectItem>
                <SelectItem value="quality-ai">Quality Detection AI</SelectItem>
                <SelectItem value="maintenance">Maintenance Predictor</SelectItem>
                <SelectItem value="demand">Demand Forecasting</SelectItem>
                <SelectItem value="energy">Energy Optimizer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deployment Environment */}
          <div className="space-y-2">
            <Label>Deployment Environment</Label>
            <Select value={environment} onValueChange={(value: string) => setEnvironment(value)}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auto Scale */}
          <div className="flex items-center space-x-2 p-4 bg-slate-900 rounded-lg">
            <Checkbox
              id="autoscale"
              checked={autoScale}
              onCheckedChange={(checked: boolean | "indeterminate") =>
                setAutoScale(checked === true)
              }
            />
            <Label htmlFor="autoscale" className="cursor-pointer">
              Enable auto-scaling
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-700 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeploy}
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            >
              Deploy Model
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
