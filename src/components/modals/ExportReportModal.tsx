import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FileText, Download, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ExportReportModalProps {
  open: boolean;
  onClose: () => void;
}

const reportSections = [
  { id: "production", label: "Production Statistics", description: "Units produced, targets, achievements" },
  { id: "efficiency", label: "Machine Efficiency", description: "Performance metrics by machine" },
  { id: "quality", label: "Quality Metrics", description: "Pass rates, defects, quality trends" },
  { id: "downtime", label: "Downtime Analysis", description: "Maintenance, failures, idle time" },
  { id: "workforce", label: "Workforce Utilization", description: "Shift performance, labor hours" },
  { id: "maintenance", label: "Maintenance History", description: "Completed maintenance, alerts" },
];

export function ExportReportModal({ open, onClose }: ExportReportModalProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>(["production", "efficiency"]);
  const [format, setFormat] = useState("pdf");
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(false);

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleExport = async () => {
    if (selectedSections.length === 0) {
      toast.error("Please select at least one section to export");
      return;
    }

    setLoading(true);

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Report exported successfully!", {
      description: `${selectedSections.length} sections exported as ${format.toUpperCase()}`
    });

    setLoading(false);
    onClose();
  };

  const selectAll = () => {
    setSelectedSections(reportSections.map(s => s.id));
  };

  const deselectAll = () => {
    setSelectedSections([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Export Production Report</DialogTitle>
              <DialogDescription className="text-slate-400">
                Customize and download your production analytics
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Time Range */}
          <div className="space-y-2">
            <Label className="text-slate-300">Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="today" className="text-white">Today</SelectItem>
                <SelectItem value="week" className="text-white">This Week</SelectItem>
                <SelectItem value="month" className="text-white">This Month</SelectItem>
                <SelectItem value="quarter" className="text-white">This Quarter</SelectItem>
                <SelectItem value="year" className="text-white">This Year</SelectItem>
                <SelectItem value="custom" className="text-white">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Format */}
          <div className="space-y-2">
            <Label className="text-slate-300">Export Format</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat("pdf")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  format === "pdf"
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                }`}
              >
                <FileText className={`w-8 h-8 mx-auto mb-2 ${format === "pdf" ? "text-teal-400" : "text-slate-400"}`} />
                <p className={`text-sm ${format === "pdf" ? "text-teal-400" : "text-slate-300"}`}>PDF</p>
              </button>
              <button
                type="button"
                onClick={() => setFormat("excel")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  format === "excel"
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                }`}
              >
                <FileText className={`w-8 h-8 mx-auto mb-2 ${format === "excel" ? "text-teal-400" : "text-slate-400"}`} />
                <p className={`text-sm ${format === "excel" ? "text-teal-400" : "text-slate-300"}`}>Excel</p>
              </button>
              <button
                type="button"
                onClick={() => setFormat("csv")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  format === "csv"
                    ? "border-teal-500 bg-teal-500/10"
                    : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                }`}
              >
                <FileText className={`w-8 h-8 mx-auto mb-2 ${format === "csv" ? "text-teal-400" : "text-slate-400"}`} />
                <p className={`text-sm ${format === "csv" ? "text-teal-400" : "text-slate-300"}`}>CSV</p>
              </button>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Include Sections</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={selectAll}
                  size="sm"
                  variant="ghost"
                  className="text-xs text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  onClick={deselectAll}
                  size="sm"
                  variant="ghost"
                  className="text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-700"
                >
                  Deselect All
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 max-h-80 overflow-y-auto p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              {reportSections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                    className="mt-1 border-slate-500"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={section.id}
                      className="text-white cursor-pointer select-none block"
                    >
                      {section.label}
                    </label>
                    <p className="text-xs text-slate-400 mt-1">
                      {section.description}
                    </p>
                  </div>
                  {selectedSections.includes(section.id) && (
                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {selectedSections.length > 0 && (
              <p className="text-sm text-teal-400 mt-2">
                {selectedSections.length} section(s) selected
              </p>
            )}
          </div>

          {/* Export Summary */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="text-sm text-blue-400 mb-2">Export Summary:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Time Period:</p>
                <p className="text-white capitalize">{timeRange}</p>
              </div>
              <div>
                <p className="text-slate-400">Format:</p>
                <p className="text-white uppercase">{format}</p>
              </div>
              <div>
                <p className="text-slate-400">Sections:</p>
                <p className="text-white">{selectedSections.length} selected</p>
              </div>
              <div>
                <p className="text-slate-400">File Size:</p>
                <p className="text-white">~{selectedSections.length * 0.5}MB</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              disabled={loading || selectedSections.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
