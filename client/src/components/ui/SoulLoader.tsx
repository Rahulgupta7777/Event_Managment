import { motion } from "framer-motion";

export const SoulLoader = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-paper)]">
            <div className="relative flex flex-col items-center">
                {/* The Ink Pot / Circle */}
                <svg width="100" height="100" viewBox="0 0 100 100" className="mb-8">
                    {/* Hand-drawn circle outline */}
                    <motion.path
                        d="M50 10 C 20 10 10 20 10 50 C 10 80 20 90 50 90 C 80 90 90 80 90 50 C 90 20 80 10 50 10"
                        fill="transparent"
                        stroke="#1a1a1a"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Ink filling up */}
                    <motion.path
                        d="M50 90 C 20 90 10 80 10 50 C 10 20 20 10 50 10 C 80 10 90 20 90 50 C 90 80 80 90 50 90"
                        fill="#1a1a1a"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 0.8, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: "backOut" }}
                        style={{ transformOrigin: "center" }}
                    />
                </svg>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="font-hand text-4xl font-bold text-[#1a1a1a]/80"
                >
                    let's happen event
                </motion.p>
            </div>
        </div>
    );
};
