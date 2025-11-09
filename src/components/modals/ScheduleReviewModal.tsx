import { X, Calendar, Clock, Users, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface ScheduleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleReviewModal({ isOpen, onClose }: ScheduleReviewModalProps) {
  const [reviewType, setReviewType] = useState("performance");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  const handleSchedule = () => {
    // Simulate scheduling
    alert(`Scheduling ${reviewType} review for ${date} at ${time}...`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white">Schedule Review</h2>
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
            <label className="text-slate-300 text-sm mb-2 block">Review Type</label>
            <select
              value={reviewType}
              onChange={(e) => setReviewType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2"
            >
              <option value="performance">Performance Review</option>
              <option value="quarterly">Quarterly Business Review</option>
              <option value="strategic">Strategic Planning</option>
              <option value="budget">Budget Review</option>
              <option value="project">Project Status Review</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-sm mb-2 block">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-2 block">Duration</label>
            <select className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
              <option>2 hours</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-2 block">Participants</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Add participants by email..."
                className="pl-10 bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {["John Executive", "Jane Manager", "Mike Engineer"].map((name, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full text-slate-300 text-sm"
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    {name.split(" ").map(n => n[0]).join("")}
                  </div>
                  {name}
                  <button className="hover:text-red-400">×</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-300 text-sm mb-2 block">Meeting Notes</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                placeholder="Add agenda items or notes..."
                className="w-full pl-10 pt-2 pb-2 pr-3 bg-slate-900 border border-slate-600 text-white rounded-md resize-none"
                rows={4}
              />
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-white text-sm mb-1">Calendar Integration</div>
                <div className="text-xs text-slate-400">
                  This meeting will be automatically added to your calendar and participants will receive invitations.
                </div>
              </div>
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
            onClick={handleSchedule}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Review
          </Button>
        </div>
      </div>
    </div>
  );
}
