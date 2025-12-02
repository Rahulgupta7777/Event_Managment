import { motion } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { Send } from "lucide-react";

export function GroupChatView() {
  const { setCursorVariant } = useAppStore();

  return (
    <div className="min-h-screen w-full p-8 md:p-12 md:pl-32 max-w-5xl mx-auto flex flex-col">
      <header className="mb-8">
        <h2 className="text-6xl font-serif font-bold text-[#1a1a1a] mb-4">
          Team Chat
        </h2>
        <p className="text-xl font-hand text-[#1a1a1a]/60">
          Collaborate with your team in real-time.
        </p>
      </header>

      <div className="flex-1 bg-[#1a1a1a]/5 rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        <div className="flex-1 overflow-y-auto space-y-8 pr-4">
          {/* Message Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-end gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] border-2 border-[var(--color-ink)] flex items-center justify-center font-bold font-serif">A</div>
            <div className="bg-white p-6 rounded-2xl rounded-bl-none shadow-sm border border-[#1a1a1a]/10 max-w-md rotate-1">
              <p className="font-hand text-lg">Hey! Did anyone order the balloons? 🎈</p>
            </div>
          </motion.div>

          {/* Message Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-end gap-4 justify-end"
          >
            <div className="bg-[var(--color-ink)] text-[var(--color-paper)] p-6 rounded-2xl rounded-br-none shadow-sm max-w-md -rotate-1">
              <p className="font-hand text-lg">On it! I ordered 500. Is that enough?</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-ink)] flex items-center justify-center font-bold font-serif text-white">M</div>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="mt-8 relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-white rounded-full py-4 px-8 pr-16 font-hand text-xl border-2 border-[#1a1a1a]/10 focus:border-[#1a1a1a] focus:outline-none shadow-sm transition-colors"
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          />
          <button
            className="absolute right-2 top-2 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
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
