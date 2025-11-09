import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Database, Download, Calendar } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "sonner";

interface ExportDataModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportDataModal({ open, onClose }: ExportDataModalProps) {
  const [dataType, setDataType] = useState("training-data");
  const [format, setFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("last-30-days");

  const handleExport = () => {
    toast.success(`Exporting ${dataType} as ${format.toUpperCase()}...`);
    setTimeout(() => {
      toast.success("Export completed! Download started.");
      onClose();
    }, 2000);
  };

  const dataTypes = [
    { id: "training-data", name: "Training Data", size: "2.8 GB" },
    { id: "inference-logs", name: "Inference Logs", size: "456 MB" },
    { id: "model-metrics", name: "Model Metrics", size: "125 MB" },
    { id: "pipeline-logs", name: "Pipeline Logs", size: "89 MB" },
    { id: "performance-data", name: "Performance Data", size: "234 MB" }
  ];

  const formats = ["CSV", "JSON", "Parquet", "SQL"];
  const dateRanges = [
    { id: "last-7-days", name: "Last 7 Days" },
    { id: "last-30-days", name: "Last 30 Days" },
    { id: "last-90-days", name: "Last 90 Days" },
    { id: "custom", name: "Custom Range" }
  ];

  const selectedDataType = dataTypes.find(dt => dt.id === dataType);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Database className="w-6 h-6 text-blue-400" />
            Export Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Data Type Selection */}
          <div className="space-y-2">
            <Label className="text-slate-300">Select Data Type</Label>
            <div className="space-y-2">
              {dataTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    dataType === type.id
                      ? "bg-teal-500/10 border-teal-500"
                      : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="dataType"
                      value={type.id}
                      checked={dataType === type.id}
                      onChange={(e) => setDataType(e.target.value)}
                      className="text-teal-500 focus:ring-teal-500"
                    />
                    <div>
                      <div className="text-white">{type.name}</div>
                      <div className="text-xs text-slate-400">Size: {type.size}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-2">
            <Label className="text-slate-300">Export Format</Label>
            <div className="grid grid-cols-4 gap-3">
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt.toLowerCase())}
                  className={`p-3 rounded-lg border transition-all ${
                    format === fmt.toLowerCase()
                      ? "bg-teal-500/20 border-teal-500 text-teal-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>

          {/* Export Summary */}
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <h4 className="text-white mb-3">Export Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Data Type:</span>
                <span className="text-white">{selectedDataType?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Format:</span>
                <span className="text-white">{format.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date Range:</span>
                <span className="text-white">
                  {dateRanges.find(r => r.id === dateRange)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Size:</span>
                <span className="text-teal-400">{selectedDataType?.size}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
