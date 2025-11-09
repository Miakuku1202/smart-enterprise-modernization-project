import { Search, MessageSquare, BookOpen, Video, Mail, Phone, HelpCircle, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Security > Change Password. Enter your current password and set a new one.",
    category: "Account"
  },
  {
    question: "How do I generate a custom report?",
    answer: "Navigate to your dashboard and click the 'Generate Report' button. Select your parameters and export format.",
    category: "Reports"
  },
  {
    question: "How do I add new team members?",
    answer: "Go to Account Settings > Team Management and click 'Invite Member'. Enter their email address.",
    category: "Team"
  },
  {
    question: "What API endpoints are available?",
    answer: "Check our API documentation at /docs/api for a complete list of available endpoints and examples.",
    category: "API"
  },
  {
    question: "How do I configure notifications?",
    answer: "Go to Settings > Notification Preferences to customize email and push notification settings.",
    category: "Settings"
  }
];

const supportArticles = [
  { title: "Getting Started Guide", category: "Basics", readTime: "5 min" },
  { title: "Dashboard Customization", category: "Features", readTime: "8 min" },
  { title: "API Integration Guide", category: "Development", readTime: "15 min" },
  { title: "Security Best Practices", category: "Security", readTime: "10 min" },
  { title: "Team Collaboration", category: "Teams", readTime: "7 min" }
];

export function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === "All" || faq.category === selectedCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-white mb-2">Help & Support</h1>
        <p className="text-slate-400">Find answers, contact support, and learn how to use the platform</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search for help articles, FAQs, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6 text-teal-400" />
          </div>
          <h3 className="text-white mb-1">Documentation</h3>
          <p className="text-sm text-slate-400">Browse guides</p>
        </button>

        <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-white mb-1">Video Tutorials</h3>
          <p className="text-sm text-slate-400">Watch & learn</p>
        </button>

        <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-white mb-1">Live Chat</h3>
          <p className="text-sm text-slate-400">Chat with support</p>
        </button>

        <button className="p-6 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 transition-all group">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-white mb-1">Phone Support</h3>
          <p className="text-sm text-slate-400">Call us now</p>
        </button>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-teal-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h3 className="text-white mb-1">Email Support</h3>
              <p className="text-sm text-slate-400 mb-2">support@automotive.com</p>
              <p className="text-xs text-slate-500">Response within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white mb-1">Phone Support</h3>
              <p className="text-sm text-slate-400 mb-2">+1 (800) 555-0123</p>
              <p className="text-xs text-slate-500">Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white mb-1">Live Chat</h3>
              <p className="text-sm text-slate-400 mb-2">Available 24/7</p>
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-white mb-4">Popular Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportArticles.map((article, idx) => (
            <button
              key={idx}
              className="flex items-center gap-4 p-4 bg-slate-900/50 hover:bg-slate-700/50 rounded-lg transition-all text-left group"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-white mb-1">{article.title}</div>
                <div className="text-xs text-slate-400">{article.category} • {article.readTime}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white">Frequently Asked Questions</h3>
          <div className="flex gap-2">
            {["All", "Account", "Reports", "Team", "API", "Settings"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-4 bg-slate-900/50 rounded-lg hover:bg-slate-700/30 transition-all"
            >
              <summary className="flex items-center gap-3 cursor-pointer list-none">
                <HelpCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-white flex-1">{faq.question}</span>
                <span className="text-xs text-slate-500 px-2 py-1 bg-slate-800 rounded">
                  {faq.category}
                </span>
              </summary>
              <div className="mt-3 ml-8 text-slate-400 text-sm">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No FAQs found matching your search.
          </div>
        )}
      </div>

      {/* Submit a Ticket */}
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h3 className="text-white mb-4">Can't find what you're looking for?</h3>
        <p className="text-slate-400 mb-4">Submit a support ticket and our team will get back to you shortly.</p>
        <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white">
          <MessageSquare className="w-4 h-4 mr-2" />
          Submit a Ticket
        </Button>
      </div>
    </div>
  );
}
