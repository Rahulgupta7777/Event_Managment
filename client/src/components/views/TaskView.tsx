import { motion } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { CheckSquare, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "../../lib/api";

export function TaskView() {
  const { setCursorVariant } = useAppStore();
  // TODO: Get actual event ID. For now, hardcoding or getting from store if available.
  // Since we don't have a selected event context yet, we might need to fetch all tasks or just show a placeholder.
  // Let's assume we want to show tasks for the first event for now, or just handle the empty state.
  const eventId = "1"; // Placeholder

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', eventId],
    queryFn: () => tasksApi.getAll(eventId),
    enabled: !!eventId
  });

  return (
    <div className="min-h-screen w-full p-8 md:p-12 md:pl-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-6xl font-serif font-bold text-[#1a1a1a] mb-4">
              Task Management
            </h2>
            <p className="text-xl font-hand text-[#1a1a1a]/60">
              Track progress and deadlines.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-[var(--color-paper)] shadow-[4px_4px_0px_var(--color-ink)] border-2 border-[var(--color-ink)]"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <Plus size={32} />
          </motion.button>
        </header>

        {/* The Clipboard */}
        <div className="relative bg-white p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] rotate-1 border border-[#e5e5e5]">
          {/* Clip */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-[#1a1a1a] rounded-t-xl flex items-center justify-center">
            <div className="w-24 h-4 bg-[#333] rounded-full" />
          </div>

          <div className="space-y-6 mt-4">
            {isLoading ? (
              <div className="text-center font-hand text-[#1a1a1a]/60">Loading tasks...</div>
            ) : tasks?.length === 0 ? (
              <div className="text-center font-hand text-[#1a1a1a]/60">No tasks found.</div>
            ) : (
              tasks?.map((task: any, i: number) => (
                <motion.div
                  key={task.id}
                  className="flex items-center gap-4 p-4 border-b-2 border-dashed border-[#1a1a1a]/10 group hover:bg-[#1a1a1a]/5 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-8 h-8 border-2 border-[var(--color-ink)] rounded-md flex items-center justify-center cursor-pointer hover:bg-[var(--color-accent)]/20 transition-colors">
                    {task.status === 'done' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-[#1a1a1a] rounded-sm" />}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-serif text-xl ${task.status === 'done' ? 'line-through opacity-50' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="font-hand text-sm text-[#1a1a1a]/40">
                      {task.dueDate ? `Due ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border border-white shadow-sm" />
                </motion.div>
              )))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
