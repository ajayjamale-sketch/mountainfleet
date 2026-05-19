import React, { useState } from "react";
import { MessageSquare, Send, Search, User, Clock, CheckCheck, Plus, Bell } from "lucide-react";
import { cn } from "../../utils/cn";
import toast from "react-hot-toast";

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMine: boolean;
}

const conversations: Conversation[] = [
  { id: "1", name: "Sarah Chen", role: "Driver", lastMessage: "Delivery completed at Aspen Hub. All good!", time: "2m ago", unread: 2, online: true },
  { id: "2", name: "Marcus Rivera", role: "Driver", lastMessage: "Running 15 min behind schedule on Route 7", time: "15m ago", unread: 1, online: true },
  { id: "3", name: "Operations Team", role: "Group", lastMessage: "Schedule for next week has been updated", time: "1h ago", unread: 0, online: false },
  { id: "4", name: "Alex Park", role: "Fleet Manager", lastMessage: "MTN-1045 inspection report is ready", time: "3h ago", unread: 0, online: false },
  { id: "5", name: "System Alerts", role: "Automated", lastMessage: "Maintenance reminder: MTN-1027 brake check", time: "5h ago", unread: 3, online: false },
];

const chatMessages: Record<string, ChatMessage[]> = {
  "1": [
    { id: "m1", sender: "You", content: "Hi Sarah, how's the delivery going?", time: "10:30 AM", isMine: true },
    { id: "m2", sender: "Sarah Chen", content: "Just arrived at the warehouse. Loading now.", time: "10:35 AM", isMine: false },
    { id: "m3", sender: "You", content: "Great, please confirm once you're on the road.", time: "10:36 AM", isMine: true },
    { id: "m4", sender: "Sarah Chen", content: "On my way! ETA to Aspen Hub is 2 hours.", time: "10:45 AM", isMine: false },
    { id: "m5", sender: "Sarah Chen", content: "Delivery completed at Aspen Hub. All good!", time: "12:48 PM", isMine: false },
  ],
  "2": [
    { id: "m1", sender: "Marcus Rivera", content: "Hey, there's traffic on Highway 7. Might be late.", time: "9:15 AM", isMine: false },
    { id: "m2", sender: "You", content: "Thanks for the heads up. Take the alternate route via Valley Road.", time: "9:18 AM", isMine: true },
    { id: "m3", sender: "Marcus Rivera", content: "Running 15 min behind schedule on Route 7", time: "9:45 AM", isMine: false },
  ],
};

const MessagesPage: React.FC = () => {
  const [selectedConv, setSelectedConv] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = chatMessages[selectedConv] || [];
  const currentConv = conversations.find((c) => c.id === selectedConv);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    toast.success("Message sent");
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-160px)] gap-0 overflow-hidden rounded-2xl border border-border bg-card">
      {/* Conversation List */}
      <div className="flex w-80 shrink-0 flex-col border-r border-border hidden sm:flex">
        {/* List Header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Messages</h2>
            <button
              onClick={() => toast.success("New conversation")}
              className="rounded-lg p-2 text-muted-foreground transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800"
              aria-label="New conversation"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary"
              aria-label="Search conversations"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition",
                selectedConv === conv.id
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <div className="relative">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {conv.name.charAt(0)}
                </div>
                {conv.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{conv.name}</p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{conv.time}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {currentConv?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{currentConv?.name}</p>
              <p className="text-xs text-muted-foreground">{currentConv?.role} {currentConv?.online ? "· Online" : ""}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {currentMessages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.isMine ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                msg.isMine
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-slate-100 text-foreground dark:bg-slate-800 rounded-bl-md"
              )}>
                <p>{msg.content}</p>
                <div className={cn("flex items-center gap-1 mt-1", msg.isMine ? "justify-end" : "justify-start")}>
                  <span className={cn("text-[10px]", msg.isMine ? "text-white/60" : "text-muted-foreground")}>{msg.time}</span>
                  {msg.isMine && <CheckCheck size={12} className="text-white/60" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              aria-label="Type a message"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary/90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
