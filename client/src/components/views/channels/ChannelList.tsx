import { motion } from "framer-motion";
import { useChannelStore } from "../../../store/useChannelStore";
import { Palette, Truck, Megaphone, Cpu, ChevronRight } from "lucide-react";

const iconMap: Record<string, any> = {
    Palette,
    Truck,
    Megaphone,
    Cpu,
};

export const ChannelList = () => {
    const { channels, activeChannelId, setActiveChannel } = useChannelStore();

    return (
        <div className="h-full bg-[var(--color-paper)] border-r-2 border-[var(--color-ink)]/10 p-6 flex flex-col">
            <h2 className="font-serif text-3xl font-bold mb-8 text-[var(--color-ink)]">Teams</h2>

            <div className="space-y-4 flex-1 overflow-y-auto">
                {channels.map((channel) => {
                    const Icon = iconMap[channel.icon];
                    const isActive = activeChannelId === channel.id;

                    return (
                        <motion.div
                            key={channel.id}
                            onClick={() => setActiveChannel(channel.id)}
                            className={`group relative p-4 rounded-xl border-2 transition-all cursor-pointer ${isActive
                                    ? "bg-[var(--color-surface)] border-[var(--color-ink)] shadow-[4px_4px_0px_var(--color-ink)]"
                                    : "bg-white border-transparent hover:border-[var(--color-ink)]/20 hover:bg-[var(--color-surface)]/50"
                                }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-[var(--color-ink)] ${channel.color}`}>
                                    <Icon className="text-[var(--color-ink)]" size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-lg font-bold text-[var(--color-ink)]">{channel.name}</h3>
                                    <p className="font-hand text-sm text-[var(--color-ink)]/60 line-clamp-1">{channel.description}</p>
                                </div>
                                {isActive && <ChevronRight className="text-[var(--color-ink)]" />}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="pt-6 border-t-2 border-dashed border-[var(--color-ink)]/10">
                <button className="w-full py-3 border-2 border-dashed border-[var(--color-ink)]/30 rounded-xl font-hand text-[var(--color-ink)]/60 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-all">
                    + New Team
                </button>
            </div>
        </div>
    );
};
