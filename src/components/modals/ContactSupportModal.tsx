import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MessageSquare, Loader2, User, Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ContactSupportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactSupportModal({ open, onClose }: ContactSupportModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Support ticket created successfully!", {
      description: "Our team will respond within 24 hours."
    });

    setSending(false);
    setName("");
    setEmail("");
    setSubject("");
    setCategory("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Contact Support</DialogTitle>
              <DialogDescription className="text-slate-400">
                Get help from our support team
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required
                  placeholder="Your name"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="your.email@company.com"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-slate-300">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="technical" className="text-white">Technical Issue</SelectItem>
                <SelectItem value="billing" className="text-white">Billing Question</SelectItem>
                <SelectItem value="delivery" className="text-white">Delivery Issue</SelectItem>
                <SelectItem value="api" className="text-white">API Integration</SelectItem>
                <SelectItem value="other" className="text-white">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-slate-300">Subject *</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required
              placeholder="Brief description of your issue"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-300">Message *</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required
              placeholder="Describe your issue in detail..."
              rows={5}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-slate-300">
              Our support team typically responds within 24 hours during business days. For urgent issues, please call our hotline at <span className="text-teal-400">1-800-SUPPORT</span>.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onClose} variant="outline" 
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800" disabled={sending}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600" disabled={sending}>
              {sending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><MessageSquare className="w-4 h-4 mr-2" />Send Message</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
