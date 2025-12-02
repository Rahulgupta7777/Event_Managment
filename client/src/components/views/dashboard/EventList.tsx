import { motion } from "framer-motion";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";

const events = [
    { id: 1, title: "Summer Gala", date: "Aug 15, 2025", location: "Grand Ballroom", status: "Planning", color: "bg-[#ffcc00]" },
    { id: 2, title: "Tech Conference", date: "Sep 22, 2025", location: "Convention Center", status: "Confirmed", color: "bg-[#ff4d4d]" },
    { id: 3, title: "Team Retreat", date: "Oct 05, 2025", location: "Mountain Lodge", status: "Draft", color: "bg-[#4dffb8]" },
];

export const EventList = () => {
    return (
        <div className="bg-[var(--color-paper)] p-8 rounded-3xl border-2 border-[var(--color-ink)] shadow-[8px_8px_0px_rgba(0,0,0,0.05)] relative">
            {/* Binder Rings */}
            <div className="absolute top-0 left-8 -translate-y-1/2 flex gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-4 h-12 bg-[var(--color-ink)] rounded-full border-2 border-white" />
                ))}
            </div>

            <h2 className="font-serif text-3xl font-bold mb-6 mt-4 text-[var(--color-ink)]">Active Events</h2>

            <div className="space-y-4">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white p-4 rounded-xl border-2 border-[var(--color-ink)]/10 hover:border-[var(--color-ink)] transition-colors cursor-pointer"
                        whileHover={{ x: 5 }}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-serif text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                                    {event.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-2 text-sm font-hand text-[var(--color-ink)]/60">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border border-[var(--color-ink)] ${event.status === 'Planning' ? 'bg-[var(--color-secondary)]' :
                                event.status === 'Confirmed' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface)]'
                                }`}>
                                {event.status}
                            </div>
                        </div>

                        {/* Hover Action */}
                        <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="text-[var(--color-ink)]" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-[var(--color-ink)]/30 rounded-xl font-hand text-[var(--color-ink)]/60 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-all">
                + Create New Event
            </button>
        </div>
    );
};
