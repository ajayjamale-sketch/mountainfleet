import React, { useState, useRef, useEffect } from "react";
import { BrainCircuit, X, Send, Sparkles, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const aiResponses: Record<string, string> = {
  fuel: "📊 Based on fleet data, vehicles on Route 7 show 12% higher fuel consumption than average. Consider optimizing idle times and switching to eco-mode during mountain descents. Estimated savings: $2,400/month.",
  maintenance: "🔧 3 vehicles are approaching scheduled maintenance. MTN-1027 (brake pads at 15% life), MTN-1045 (oil change overdue by 200km), MTN-1032 (tire rotation due). I recommend prioritizing MTN-1027 for safety compliance.",
  revenue: "💰 Revenue is trending 8.3% above last quarter. Top performing routes: North Corridor ($48K), Mountain Express ($32K), Valley Link ($28K). Suggestion: Increase capacity on North Corridor by 2 vehicles to capture unmet demand.",
  driver: "👤 Driver performance summary: 92% on-time delivery rate across the fleet. Top performers: Sarah Chen (98.5%), Marcus Rivera (97.2%). Recommendation: Recognize top performers and provide additional route training for drivers below 85%.",
  route: "🗺️ Route optimization analysis: Current routes have 14% overlap in the downtown corridor. Consolidating Routes 3 and 7 during off-peak hours could save 45 minutes per cycle and reduce fuel costs by $1,800/month.",
  default: "🤖 I'm your MountainFleet AI Operations Assistant. I can help with fleet optimization, fuel efficiency analysis, maintenance predictions, driver performance insights, route suggestions, and revenue forecasting. What would you like to know?"
};

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("fuel") || q.includes("consumption") || q.includes("gas")) return aiResponses.fuel;
  if (q.includes("maintenance") || q.includes("repair") || q.includes("service")) return aiResponses.maintenance;
  if (q.includes("revenue") || q.includes("money") || q.includes("income") || q.includes("profit")) return aiResponses.revenue;
  if (q.includes("driver") || q.includes("performance") || q.includes("team")) return aiResponses.driver;
  if (q.includes("route") || q.includes("path") || q.includes("optimization")) return aiResponses.route;
  return aiResponses.default;
}

const quickPrompts = [
  "Show fuel efficiency tips",
  "Maintenance predictions",
  "Revenue insights",
  "Route optimization",
  "Driver performance summary",
];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: aiResponses.default, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-2xl shadow-sky-500/30 transition-all hover:scale-105 hover:shadow-sky-500/40 active:scale-95"
          aria-label="Open AI Assistant"
        >
          <BrainCircuit size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-3 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Fleet AI Assistant</p>
                <p className="text-[10px] text-sky-100">Powered by intelligence engine</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="Close assistant">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-bl-md"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
                  <Loader2 size={14} className="animate-spin text-primary" />
                  <span className="text-xs text-slate-500">Analyzing fleet data...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Quick Prompts</p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-primary"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 p-3 dark:border-slate-700">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your fleet..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary/90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
