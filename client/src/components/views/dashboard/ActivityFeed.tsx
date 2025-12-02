import { motion } from "framer-motion";
import { MessageSquare, CheckSquare, FileText, UserPlus } from "lucide-react";

const activities = [
    { id: 1, user: "Alice", action: "commented on", target: "Catering Menu", time: "2m ago", icon: MessageSquare },
    { id: 2, user: "Bob", action: "completed task", target: "Venue Deposit", time: "1h ago", icon: CheckSquare },
    { id: 3, user: "Charlie", action: "uploaded", target: "Floor Plan v2.pdf", time: "3h ago", icon: FileText },
    { id: 4, user: "Diana", action: "joined", target: "Marketing Team", time: "5h ago", icon: UserPlus },
];

export const ActivityFeed = () => {
    return (
        <div className="bg-[var(--color-surface)] p-8 rounded-3xl border-2 border-[var(--color-ink)] shadow-[8px_8px_0px_rgba(0,0,0,0.05)] h-full">
            <h2 className="font-serif text-3xl font-bold mb-6 text-[var(--color-ink)]">Recent Activity</h2>

            <div className="relative pl-4 border-l-2 border-dashed border-[var(--color-ink)]/20 space-y-8">
                {activities.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[var(--color-ink)] rounded-full border-2 border-[var(--color-surface)]" />

                        <div className="flex items-start gap-3">
                            <div className="mt-1 p-1.5 bg-white rounded-lg border border-[var(--color-ink)]/10">
                                <item.icon size={14} className="text-[var(--color-ink)]" />
                            </div>
                            <div>
                                <p className="font-hand text-lg leading-tight text-[var(--color-ink)]">
                                    <span className="font-bold">{item.user}</span> {item.action} <span className="underline decoration-[var(--color-accent)] decoration-2">{item.target}</span>
                                </p>
                                <span className="text-xs font-sans text-[var(--color-ink)]/40 uppercase tracking-wider">{item.time}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
