import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { useChannelStore } from "../../store/useChannelStore";
import { Send, ArrowLeft, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: string;
  isMe: boolean;
  timestamp: Date;
}

export function GroupChatView() {
  const { setCursorVariant } = useAppStore();
  const { channels } = useChannelStore();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChannel = channels.find(c => c.id === selectedTeam);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedTeam]);

  const sendMessage = () => {
    if (!inputText.trim() || !selectedTeam) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "You",
      isMe: true,
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedTeam]: [...(prev[selectedTeam] || []), newMessage]
    }));
    setInputText("");

    // Simulate a reply after 1 second
    setTimeout(() => {
      const replies = [
        "Got it! 👍",
        "I'll handle that.",
        "Sounds good to me!",
        "Let me check and get back to you.",
        "Perfect, thanks for the update!",
        "On it! 🚀",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        sender: selectedChannel?.name || "Team",
        isMe: false,
        timestamp: new Date(),
      };
      setMessages(prev => ({
        ...prev,
        [selectedTeam]: [...(prev[selectedTeam] || []), replyMessage]
      }));
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Team Selection View
  if (!selectedTeam) {
    return (
      <div className="min-h-screen w-full p-8 md:p-12 md:pl-32 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-12">
            <h2 className="text-6xl font-serif font-bold text-[#1a1a1a] mb-4">
              Team Chat
            </h2>
            <p className="text-xl font-hand text-[#1a1a1a]/60">
              Select a team to start chatting.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedTeam(channel.id)}
                className={`p-6 rounded-2xl border-2 border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] cursor-pointer transition-all hover:shadow-[4px_4px_0px_var(--color-ink)] ${channel.color}/20`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full ${channel.color} border-2 border-[var(--color-ink)] flex items-center justify-center`}>
                    <Users size={24} className="text-[var(--color-ink)]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)]">{channel.name}</h3>
                    <p className="font-hand text-[var(--color-ink)]/60">{channel.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-hand text-[var(--color-ink)]/50">
                  <Users size={14} />
                  {channel.subgroups.reduce((acc, s) => acc + s.members, 0)} members
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Chat View
  const teamMessages = messages[selectedTeam] || [];

  return (
    <div className="min-h-screen w-full p-8 md:p-12 md:pl-32 max-w-5xl mx-auto flex flex-col">
      <header className="mb-4">
        <button
          onClick={() => setSelectedTeam(null)}
          className="flex items-center gap-2 font-hand text-[var(--color-ink)]/60 hover:text-[var(--color-ink)] mb-4 transition-colors"
        >
          <ArrowLeft size={20} /> Back to teams
        </button>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${selectedChannel?.color} border-2 border-[var(--color-ink)] flex items-center justify-center`}>
            <Users size={20} className="text-[var(--color-ink)]" />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#1a1a1a]">
              {selectedChannel?.name}
            </h2>
            <p className="font-hand text-[#1a1a1a]/60">
              {selectedChannel?.subgroups.reduce((acc, s) => acc + s.members, 0)} members
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 bg-[#1a1a1a]/5 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        <div className="flex-1 overflow-y-auto space-y-6 pr-4">
          {teamMessages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full min-h-[300px]">
              <p className="font-hand text-xl text-[#1a1a1a]/40 text-center">
                No messages yet.<br />Start the conversation!
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {teamMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-3 ${message.isMe ? 'justify-end' : ''}`}
                >
                  {!message.isMe && (
                    <div className={`w-10 h-10 rounded-full ${selectedChannel?.color} border-2 border-[var(--color-ink)] flex items-center justify-center font-bold font-serif text-sm`}>
                      {message.sender.charAt(0)}
                    </div>
                  )}
                  <div className={`max-w-md ${message.isMe
                    ? 'bg-[var(--color-ink)] text-[var(--color-paper)] rounded-2xl rounded-br-none'
                    : 'bg-white rounded-2xl rounded-bl-none border border-[#1a1a1a]/10'
                    } p-4 shadow-sm`}>
                    <p className="font-hand text-lg">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isMe ? 'text-white/50' : 'text-[#1a1a1a]/40'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.isMe && (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-ink)] flex items-center justify-center font-bold font-serif text-white text-sm">
                      Y
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-6 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full bg-white rounded-full py-4 px-8 pr-16 font-hand text-xl border-2 border-[#1a1a1a]/10 focus:border-[#1a1a1a] focus:outline-none shadow-sm transition-colors"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="absolute right-2 top-2 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
