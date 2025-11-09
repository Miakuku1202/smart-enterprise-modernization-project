import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

interface RequestInvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function RequestInvoiceModal({ open, onClose }: RequestInvoiceModalProps) {
  const [formData, setFormData] = useState({
    orderId: "",
    format: "pdf",
    includeDetails: true
  });

  const handleRequest = () => {
    console.log("Requesting invoice:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Request Invoice</DialogTitle>
          <DialogDescription className="text-slate-400">
            Select an order to generate and download the invoice.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Order</Label>
            <Select value={formData.orderId} onValueChange={(value) => setFormData({ ...formData, orderId: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Choose an order" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="ORD-2845">ORD-2845 - Engine Components</SelectItem>
                <SelectItem value="ORD-2846">ORD-2846 - Brake Systems</SelectItem>
                <SelectItem value="ORD-2847">ORD-2847 - Electrical Wiring</SelectItem>
                <SelectItem value="ORD-2848">ORD-2848 - Suspension Parts</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Invoice Format</Label>
            <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 p-4 bg-slate-900 rounded-lg">
            <Checkbox 
              id="includeDetails" 
              checked={formData.includeDetails} 
              onCheckedChange={(checked) => setFormData({ ...formData, includeDetails: checked as boolean })}
            />
            <Label htmlFor="includeDetails" className="cursor-pointer">
              Include detailed line items
            </Label>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-slate-300">
              Invoice will be generated and sent to your registered email address.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button onClick={handleRequest} className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
              Request Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
