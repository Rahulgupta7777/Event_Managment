import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";

export const LoginSignupView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAppStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-12">
                    <h1 className="font-serif text-5xl font-bold mb-4">
                        {isLogin ? "Welcome Back" : "Join the Event"}
                    </h1>
                    <p className="font-hand text-xl opacity-60">
                        {isLogin
                            ? "Ready to plan?"
                            : "Grab a pen. Let's plan."}
                    </p>
                </div>

                <div className="relative bg-white/50 backdrop-blur-sm border-2 border-[var(--color-ink)] p-8 rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-serif text-lg mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-[var(--color-ink)] py-2 px-1 focus:outline-none focus:border-[var(--color-highlight)] transition-colors font-hand text-xl"
                                placeholder="Enter your name..."
                            />
                        </div>

                        <div>
                            <label className="block font-serif text-lg mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-[var(--color-ink)] py-2 px-1 focus:outline-none focus:border-[var(--color-highlight)] transition-colors font-hand text-xl"
                                placeholder="••••••••"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] font-serif font-bold py-3 text-xl mt-8 hover:bg-[var(--color-ink)]/90 transition-colors"
                        >
                            {isLogin ? "Enter" : "Sign Up"}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-hand text-lg underline decoration-wavy decoration-[var(--color-highlight)] hover:text-[var(--color-highlight)] transition-colors"
                        >
                            {isLogin
                                ? "New here? Create an account"
                                : "Already have a pass? Log in"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
