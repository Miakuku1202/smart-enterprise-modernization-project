import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Star, Search, Filter, ThumbsUp, ThumbsDown, Download } from "lucide-react";
import { motion } from "motion/react";
import { customerSupportData } from "../../data/mockData";

interface ViewFeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

// Extended feedback data
const feedbackData = [
  { 
    id: "FB-001", 
    customer: "AutoMax Dealership", 
    rating: 5, 
    comment: "Excellent service! The team resolved our integration issue quickly and professionally.",
    date: "2025-11-06",
    ticket: "TKT-1024",
    agent: "John Smith",
    helpful: 12,
    category: "Technical Support"
  },
  { 
    id: "FB-002", 
    customer: "DriveRight Motors", 
    rating: 4, 
    comment: "Good experience overall. Response time was great, but the solution could have been more detailed.",
    date: "2025-11-05",
    ticket: "TKT-1023",
    agent: "Sarah Johnson",
    helpful: 8,
    category: "Billing"
  },
  { 
    id: "FB-003", 
    customer: "SpeedTech Solutions", 
    rating: 5, 
    comment: "Outstanding! Very knowledgeable support team. They went above and beyond.",
    date: "2025-11-04",
    ticket: "TKT-1022",
    agent: "Mike Wilson",
    helpful: 15,
    category: "API Access"
  },
  { 
    id: "FB-004", 
    customer: "GlobalAuto Inc", 
    rating: 3, 
    comment: "Average experience. The issue was resolved but took longer than expected.",
    date: "2025-11-03",
    ticket: "TKT-1021",
    agent: "Emily Davis",
    helpful: 5,
    category: "Feature Request"
  },
  { 
    id: "FB-005", 
    customer: "EliteMotors Group", 
    rating: 5, 
    comment: "Fantastic support! Very responsive and thorough in their explanations.",
    date: "2025-11-02",
    ticket: "TKT-1020",
    agent: "John Smith",
    helpful: 18,
    category: "Technical Support"
  },
  { 
    id: "FB-006", 
    customer: "Premier Auto Sales", 
    rating: 2, 
    comment: "Response was slow and the initial solution didn't work. Had to follow up multiple times.",
    date: "2025-11-01",
    ticket: "TKT-1019",
    agent: "Sarah Johnson",
    helpful: 3,
    category: "Integration"
  },
];

export function ViewFeedbackModal({ open, onClose }: ViewFeedbackModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredFeedback = feedbackData.filter(fb => {
    const matchesSearch = fb.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fb.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fb.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === "all" || fb.rating.toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const handleExport = () => {
    console.log("Exporting feedback data...");
    alert("Feedback data exported successfully!");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"
        }`}
      />
    ));
  };

  const avgRating = (feedbackData.reduce((sum, fb) => sum + fb.rating, 0) / feedbackData.length).toFixed(1);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Customer Feedback</DialogTitle>
                <DialogDescription className="text-slate-400">
                  View and analyze customer satisfaction ratings
                </DialogDescription>
              </div>
            </div>
            <Button
              onClick={handleExport}
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogHeader>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
            <p className="text-sm text-slate-400 mb-1">Total Feedback</p>
            <p className="text-2xl text-white">{feedbackData.length}</p>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
            <p className="text-sm text-slate-400 mb-1">Average Rating</p>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <p className="text-2xl text-yellow-400">{avgRating}</p>
            </div>
          </div>
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 text-center">
            <p className="text-sm text-slate-400 mb-1">5-Star Reviews</p>
            <p className="text-2xl text-green-400">
              {feedbackData.filter(fb => fb.rating === 5).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">All Ratings</SelectItem>
              <SelectItem value="5" className="text-white">5 Stars</SelectItem>
              <SelectItem value="4" className="text-white">4 Stars</SelectItem>
              <SelectItem value="3" className="text-white">3 Stars</SelectItem>
              <SelectItem value="2" className="text-white">2 Stars</SelectItem>
              <SelectItem value="1" className="text-white">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Distribution */}
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm text-slate-400 mb-3">Rating Distribution</h4>
          <div className="space-y-2">
            {customerSupportData.feedbackRatings.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-slate-300 w-16">{item.rating}</span>
                <div className="flex-1 bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all"
                    style={{ width: `${(item.count / 288) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-400 w-12 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback List */}
        <div className="mt-6 space-y-4">
          <h4 className="text-lg text-white">Recent Feedback ({filteredFeedback.length})</h4>
          
          {filteredFeedback.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                    {feedback.customer.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white">{feedback.customer}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {renderStars(feedback.rating)}
                      </div>
                      <span className="text-xs text-slate-400">• {feedback.date}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${
                  feedback.rating === 5 ? "bg-green-500/20 text-green-400" :
                  feedback.rating === 4 ? "bg-blue-500/20 text-blue-400" :
                  feedback.rating === 3 ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {feedback.category}
                </Badge>
              </div>

              <p className="text-slate-300 text-sm mb-3 pl-13">
                "{feedback.comment}"
              </p>

              <div className="flex items-center justify-between pl-13 pt-3 border-t border-slate-600">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Ticket: <span className="text-teal-400">{feedback.ticket}</span></span>
                  <span>•</span>
                  <span>Agent: <span className="text-slate-300">{feedback.agent}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-green-400 h-7 px-2">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    <span className="text-xs">{feedback.helpful}</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400 h-7 px-2">
                    <ThumbsDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredFeedback.length === 0 && (
            <div className="text-center py-12 bg-slate-700/30 rounded-lg border border-slate-600">
              <Star className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No feedback found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 mt-4 border-t border-slate-700">
          <Button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
