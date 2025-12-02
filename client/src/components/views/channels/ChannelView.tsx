import { motion } from "framer-motion";
import { useChannelStore } from "../../../store/useChannelStore";
import { Users, Hash, CheckSquare } from "lucide-react";

export const ChannelView = () => {
    const { channels, activeChannelId, activeSubgroupId, setActiveSubgroup } = useChannelStore();
    const activeChannel = channels.find(c => c.id === activeChannelId);

    if (!activeChannel) {
        return (
            <div className="h-full flex items-center justify-center text-[var(--color-ink)]/40 font-hand text-2xl">
                Select a team to view details.
            </div>
        );
    }

    return (
        <div className="h-full p-8 overflow-y-auto">
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={activeChannel.id}
                >
                    <h1 className="text-6xl font-serif font-bold text-[var(--color-ink)] mb-4 flex items-center gap-4">
                        {activeChannel.name}
                        <span className={`w-4 h-4 rounded-full ${activeChannel.color} border border-[var(--color-ink)]`} />
                    </h1>
                    <p className="text-xl font-hand text-[var(--color-ink)]/60 max-w-2xl">
                        {activeChannel.description}
                    </p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Subgroups Column */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)] flex items-center gap-2">
                        <Hash size={24} /> Subgroups
                    </h3>
                    <div className="space-y-4">
                        {activeChannel.subgroups.map((subgroup) => (
                            <motion.div
                                key={subgroup.id}
                                onClick={() => setActiveSubgroup(subgroup.id)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${activeSubgroupId === subgroup.id
                                        ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                                        : "bg-white text-[var(--color-ink)] border-[var(--color-ink)]/10 hover:border-[var(--color-ink)]"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold font-serif text-lg">{subgroup.name}</span>
                                    <span className="flex items-center gap-1 text-sm opacity-60">
                                        <Users size={14} /> {subgroup.members}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        <button className="w-full py-3 border-2 border-dashed border-[var(--color-ink)]/30 rounded-xl font-hand text-[var(--color-ink)]/60 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-all">
                            + Add Subgroup
                        </button>
                    </div>
                </div>

                {/* Tasks/Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)] flex items-center gap-2">
                        <CheckSquare size={24} /> Active Tasks
                    </h3>

                    <div className="bg-[var(--color-surface)] rounded-2xl p-8 border-2 border-[var(--color-ink)] shadow-[8px_8px_0px_rgba(0,0,0,0.05)] min-h-[400px] flex items-center justify-center">
                        {activeSubgroupId ? (
                            <div className="text-center">
                                <p className="font-hand text-2xl text-[var(--color-ink)]/60 mb-4">
                                    Tasks for <span className="font-bold text-[var(--color-ink)]">
                                        {activeChannel.subgroups.find(s => s.id === activeSubgroupId)?.name}
                                    </span>
                                </p>
                                <button className="px-6 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] font-bold rounded-full hover:scale-105 transition-transform">
                                    Create First Task
                                </button>
                            </div>
                        ) : (
                            <p className="font-hand text-xl text-[var(--color-ink)]/40">
                                Select a subgroup to view tasks.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
