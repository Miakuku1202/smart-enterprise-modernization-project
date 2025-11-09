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
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface DeployServiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function DeployServiceModal({ open, onClose }: DeployServiceModalProps) {
  const [formData, setFormData] = useState({
    service: "",
    environment: "",
    version: "",
    instances: "3",
    healthCheck: true,
  });

  const handleDeploy = () => {
    console.log("Deploying service:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Deploy Service</DialogTitle>
          <DialogDescription className="text-slate-400">
            Configure and deploy a service to the selected environment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Service */}
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Select
              value={formData.service}
              onValueChange={(value: string) =>
                setFormData({ ...formData, service: value })
              }
            >
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="api-gateway">API Gateway</SelectItem>
                <SelectItem value="auth-service">Auth Service</SelectItem>
                <SelectItem value="payment-api">Payment API</SelectItem>
                <SelectItem value="inventory-service">
                  Inventory Service
                </SelectItem>
                <SelectItem value="notification-service">
                  Notification Service
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Environment */}
          <div className="space-y-2">
            <Label>Environment</Label>
            <Select
              value={formData.environment}
              onValueChange={(value: string) =>
                setFormData({ ...formData, environment: value })
              }
            >
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

          {/* Version */}
          <div className="space-y-2">
            <Label htmlFor="version">Version Tag</Label>
            <Input
              id="version"
              value={formData.version}
              onChange={(e) =>
                setFormData({ ...formData, version: e.target.value })
              }
              placeholder="e.g., v2.4.1"
              className="bg-slate-900 border-slate-700 text-white"
            />
          </div>

          {/* Instances */}
          <div className="space-y-2">
            <Label htmlFor="instances">Number of Instances</Label>
            <Input
              id="instances"
              type="number"
              value={formData.instances}
              onChange={(e) =>
                setFormData({ ...formData, instances: e.target.value })
              }
              min="1"
              max="10"
              className="bg-slate-900 border-slate-700 text-white"
            />
          </div>

          {/* Health Check */}
          <div className="flex items-center space-x-2 p-4 bg-slate-900 rounded-lg">
            <Checkbox
              id="healthCheck"
              checked={formData.healthCheck}
              onCheckedChange={(checked: boolean | "indeterminate") =>
                setFormData({ ...formData, healthCheck: checked === true })
              }
            />
            <Label htmlFor="healthCheck" className="cursor-pointer">
              Enable health checks
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
              Deploy
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
