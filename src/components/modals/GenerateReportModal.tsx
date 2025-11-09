import { X, FileText, Calendar, Download } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GenerateReportModal({ isOpen, onClose }: GenerateReportModalProps) {
  const [reportType, setReportType] = useState("executive");
  const [dateRange, setDateRange] = useState("last-month");
  const [format, setFormat] = useState("pdf");

  if (!isOpen) return null;

  const handleGenerate = () => {
    // Simulate report generation
    alert(`Generating ${reportType} report for ${dateRange} in ${format.toUpperCase()} format...`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white">Generate Report</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="text-slate-300 text-sm mb-2 block">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2"
            >
              <option value="executive">Executive Summary</option>
              <option value="financial">Financial Analysis</option>
              <option value="operations">Operations Performance</option>
              <option value="sustainability">Sustainability Metrics</option>
              <option value="custom">Custom Report</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-2 block">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2"
            >
              <option value="today">Today</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-2 block">Export Format</label>
            <div className="grid grid-cols-3 gap-3">
              {["pdf", "excel", "csv"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`p-3 rounded-lg border transition-all ${
                    format === fmt
                      ? "bg-teal-500/20 border-teal-500 text-teal-400"
                      : "bg-slate-900 border-slate-600 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="text-white mb-2">Report Contents</div>
            <div className="space-y-2">
              {[
                "Executive Summary",
                "Key Performance Indicators",
                "Financial Metrics",
                "Operational Data",
                "Charts and Visualizations"
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-600 text-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
}
