import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SoulLoader } from "./components/ui/SoulLoader";
import { SketchDock } from "./components/layout/SketchDock";
import { CanvasDashboard } from "./components/views/CanvasDashboard";
import { CreateEventView } from "./components/views/CreateEventView";
import { TaskView } from "./components/views/TaskView";
import { GroupChatView } from "./components/views/GroupChatView";
import { ChannelList } from "./components/views/channels/ChannelList";
import { ChannelView } from "./components/views/channels/ChannelView";
import { LoginSignupView } from "./components/views/LoginSignupView";
import { useAppStore } from "./store/useAppStore";
import "./App.css";

function App() {
  const { activeView, isAuthenticated } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fake loading time
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden selection:bg-[var(--color-highlight)]">
      {/* InkCursor removed for performance */}

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SoulLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        Leo's Diary:
        The "Studio" is messy. It's real.
        We use AnimatePresence to ensure that even the exit of a view is felt.
      */}
      {!isLoading && !isAuthenticated && <LoginSignupView />}

      {!isLoading && isAuthenticated && (
        <>
          <main className="relative w-full h-screen overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full min-h-full"
              >
                {activeView === "dashboard" && <CanvasDashboard />}
                {activeView === "create-event" && <CreateEventView />}
                {activeView === "tasks" && <TaskView />}
                {activeView === "messages" && <GroupChatView />}
                {activeView === "channels" && (
                  <div className="flex h-screen pt-12 pb-12 max-w-7xl mx-auto">
                    <div className="w-80 h-full">
                      <ChannelList />
                    </div>
                    <div className="flex-1 h-full">
                      <ChannelView />
                    </div>
                  </div>
                )}

                {/* Placeholder for other views */}
                {["team", "settings", "canvas"].includes(activeView) && (
                  <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                    <motion.h2
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="text-6xl font-serif font-bold mb-6 text-[#1a1a1a]"
                    >
                      Under Construction
                    </motion.h2>
                    <p className="font-hand text-2xl text-[#1a1a1a]/60 max-w-md">
                      I haven't drawn this part yet. <br />
                      Need more coffee.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <SketchDock />
        </>
      )}
    </div>
  );
}

export default App;
