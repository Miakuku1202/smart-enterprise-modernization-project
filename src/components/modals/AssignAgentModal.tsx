import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { UserPlus, Star, Users, Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface AssignAgentModalProps {
  open: boolean;
  onClose: () => void;
  ticketId: string | null;
}

const agents = [
  { id: "agent-1", name: "John Smith", tickets: 12, rating: 4.8, status: "available", specialization: "Technical Support" },
  { id: "agent-2", name: "Sarah Johnson", tickets: 8, rating: 4.6, status: "available", specialization: "Billing" },
  { id: "agent-3", name: "Mike Wilson", tickets: 15, rating: 4.7, status: "busy", specialization: "Integration" },
  { id: "agent-4", name: "Emily Davis", tickets: 10, rating: 4.5, status: "available", specialization: "General Support" },
  { id: "agent-5", name: "David Brown", tickets: 18, rating: 4.9, status: "busy", specialization: "Technical Support" },
];

export function AssignAgentModal({ open, onClose, ticketId }: AssignAgentModalProps) {
  const [selectedAgent, setSelectedAgent] = useState("");
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const agent = agents.find(a => a.id === selectedAgent);
    toast.success(`Ticket ${ticketId} assigned to ${agent?.name}!`, {
      description: `Priority level: ${priority}. Agent will be notified immediately.`
    });

    setLoading(false);
    setSelectedAgent("");
    setPriority("");
    setNotes("");
    onClose();
  };

  const selectedAgentData = agents.find(a => a.id === selectedAgent);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <UserPlus className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Assign Agent</DialogTitle>
              <DialogDescription className="text-slate-400">
                {ticketId ? `Assigning agent to ticket ${ticketId}` : "Assign an agent to handle this ticket"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Ticket Info */}
          <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Ticket ID</p>
                <p className="text-lg text-teal-400">{ticketId || "No ticket selected"}</p>
              </div>
              <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-sm">
                Open
              </div>
            </div>
          </div>

          {/* Select Agent */}
          <div className="space-y-2">
            <Label htmlFor="agent" className="text-slate-300">
              Select Agent *
            </Label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent} required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Choose an agent" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id} className="text-white">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white">{agent.name}</p>
                          <p className="text-xs text-slate-400">{agent.specialization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge className={`text-xs ${
                          agent.status === "available" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Agent Details */}
          {selectedAgentData && (
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 space-y-3">
              <h4 className="text-sm text-slate-400 mb-3">Agent Details</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <p className="text-xl text-teal-400">{selectedAgentData.tickets}</p>
                  <p className="text-xs text-slate-400 mt-1">Active Tickets</p>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-xl text-yellow-400">{selectedAgentData.rating}</p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Rating</p>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <Badge className={`${
                    selectedAgentData.status === "available" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {selectedAgentData.status}
                  </Badge>
                  <p className="text-xs text-slate-400 mt-1">Status</p>
                </div>
              </div>
              <div className="text-sm text-slate-300 pt-2 border-t border-slate-600">
                <span className="text-slate-400">Specialization:</span> {selectedAgentData.specialization}
              </div>
            </div>
          )}

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-slate-300">
              Priority Level *
            </Label>
            <Select value={priority} onValueChange={setPriority} required>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Set priority level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="high" className="text-white">
                  <Badge className="bg-red-500/20 text-red-400">High Priority</Badge>
                </SelectItem>
                <SelectItem value="medium" className="text-white">
                  <Badge className="bg-yellow-500/20 text-yellow-400">Medium Priority</Badge>
                </SelectItem>
                <SelectItem value="low" className="text-white">
                  <Badge className="bg-green-500/20 text-green-400">Low Priority</Badge>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assignment Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300">
              Assignment Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or context for the agent..."
              rows={4}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
            />
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
              type="submit"
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Assigning...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign Agent
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
