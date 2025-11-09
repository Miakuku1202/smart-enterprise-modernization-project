import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MessageSquare, Send, Paperclip, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface SendMessageModalProps {
  open: boolean;
  onClose: () => void;
  customerName?: string;
}

const messageTemplates = [
  { id: "custom", name: "Custom Message", content: "" },
  { id: "welcome", name: "Welcome Message", content: "Thank you for choosing our service! We're here to help you with any questions or concerns." },
  { id: "follow-up", name: "Follow-up", content: "We wanted to follow up on your recent inquiry. Is there anything else we can assist you with?" },
  { id: "resolution", name: "Resolution Confirmation", content: "Your issue has been resolved. Please let us know if you need any further assistance." },
  { id: "feedback", name: "Request Feedback", content: "We'd love to hear your feedback about our service. Your input helps us improve!" },
];

export function SendMessageModal({ open, onClose, customerName }: SendMessageModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("custom");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    setTemplate(templateId);
    const selectedTemplate = messageTemplates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setMessage(selectedTemplate.content);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(`Message sent successfully!`, {
      description: customerName 
        ? `Your message has been sent to ${customerName}` 
        : "Your message has been delivered"
    });

    setLoading(false);
    setSubject("");
    setMessage("");
    setTemplate("custom");
    setPriority("normal");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Send Message</DialogTitle>
              <DialogDescription className="text-slate-400">
                {customerName ? `Send a message to ${customerName}` : "Compose and send a message"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Recipient */}
          {customerName && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                  {customerName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Recipient</p>
                  <p className="text-white">{customerName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Message Template */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-slate-300">
              Message Template
            </Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {messageTemplates.map((tmpl) => (
                  <SelectItem key={tmpl.id} value={tmpl.id} className="text-white">
                    {tmpl.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-slate-300">
              Priority Level
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="urgent" className="text-white">
                  <Badge className="bg-red-500/20 text-red-400">Urgent</Badge>
                </SelectItem>
                <SelectItem value="high" className="text-white">
                  <Badge className="bg-orange-500/20 text-orange-400">High</Badge>
                </SelectItem>
                <SelectItem value="normal" className="text-white">
                  <Badge className="bg-blue-500/20 text-blue-400">Normal</Badge>
                </SelectItem>
                <SelectItem value="low" className="text-white">
                  <Badge className="bg-slate-500/20 text-slate-400">Low</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-300">
              Subject *
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-300">
              Message *
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              required
              rows={8}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{message.length} characters</span>
              <span>Templates available above</span>
            </div>
          </div>

          {/* Attachments Info */}
          <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600 flex items-center gap-2 text-sm text-slate-400">
            <Paperclip className="w-4 h-4" />
            <span>Attachments can be added after sending via ticket details</span>
          </div>

          {/* Message Preview */}
          {message && (
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h4 className="text-sm text-blue-400 mb-2">Message Preview</h4>
              <div className="text-sm text-slate-300 space-y-2">
                <p><span className="text-slate-400">To:</span> {customerName || "Customer"}</p>
                <p><span className="text-slate-400">Subject:</span> {subject || "(No subject)"}</p>
                <div className="pt-2 border-t border-slate-600">
                  <p className="text-slate-400 text-xs mb-1">Message:</p>
                  <p className="whitespace-pre-wrap">{message}</p>
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
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
