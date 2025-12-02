import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { Sparkles, Calendar, Users, CheckSquare, ArrowRight } from "lucide-react";

export const LoginSignupView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { login } = useAppStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
        }
    };

    const floatingIcons = [
        { Icon: Calendar, color: "bg-[#ffcc00]", delay: 0, x: "10%", y: "20%" },
        { Icon: Users, color: "bg-[#ff4d4d]", delay: 0.2, x: "85%", y: "15%" },
        { Icon: CheckSquare, color: "bg-[#4dffb8]", delay: 0.4, x: "15%", y: "75%" },
        { Icon: Sparkles, color: "bg-[#4d94ff]", delay: 0.6, x: "80%", y: "70%" },
    ];

    return (
        <div className="relative flex min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden">
            {floatingIcons.map(({ Icon, color, delay, x, y }, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${color} w-16 h-16 rounded-2xl border-2 border-[var(--color-ink)] flex items-center justify-center shadow-[4px_4px_0px_var(--color-ink)]`}
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0,
                        y: [0, -10, 0],
                    }}
                    transition={{ 
                        delay,
                        duration: 0.6,
                        y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: delay + 0.6 }
                    }}
                >
                    <Icon size={28} className="text-[var(--color-ink)]" />
                </motion.div>
            ))}

            <div className="hidden lg:flex flex-1 items-center justify-center p-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-lg"
                >
                    <h1 className="font-serif text-7xl font-bold leading-tight mb-6">
                        Plan Events<br />
                        <span className="text-[var(--color-accent)]">Like Magic</span>
                    </h1>
                    <p className="font-hand text-2xl text-[var(--color-ink)]/60 mb-8">
                        Organize, collaborate, and create unforgettable moments with your team.
                    </p>
                    <div className="flex gap-4">
                        {["Weddings", "Corporate", "Birthdays", "Festivals"].map((tag, i) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="px-4 py-2 bg-white border-2 border-[var(--color-ink)] rounded-full font-hand text-sm shadow-[2px_2px_0px_var(--color-ink)]"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="font-serif text-4xl font-bold mb-2">
                            Plan Events <span className="text-[var(--color-accent)]">Like Magic</span>
                        </h1>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-full h-full bg-[var(--color-accent)] rounded-3xl border-2 border-[var(--color-ink)]" />
                        
                        <div className="relative bg-white border-2 border-[var(--color-ink)] p-8 rounded-3xl shadow-[8px_8px_0px_var(--color-ink)]">
                            <div className="flex gap-2 mb-8">
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className={`flex-1 py-3 font-serif font-bold text-lg rounded-xl transition-all ${
                                        isLogin 
                                            ? "bg-[var(--color-ink)] text-white" 
                                            : "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)]/5"
                                    }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className={`flex-1 py-3 font-serif font-bold text-lg rounded-xl transition-all ${
                                        !isLogin 
                                            ? "bg-[var(--color-ink)] text-white" 
                                            : "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)]/5"
                                    }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.form
                                    key={isLogin ? "login" : "signup"}
                                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block font-hand text-sm text-[var(--color-ink)]/60 mb-2">Username</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-ink)]/20 rounded-xl py-3 px-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-serif text-lg"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <label className="block font-hand text-sm text-[var(--color-ink)]/60 mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-ink)]/20 rounded-xl py-3 px-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-serif text-lg"
                                                placeholder="you@example.com"
                                            />
                                        </motion.div>
                                    )}

                                    <div>
                                        <label className="block font-hand text-sm text-[var(--color-ink)]/60 mb-2">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-ink)]/20 rounded-xl py-3 px-4 focus:outline-none focus:border-[var(--color-ink)] transition-colors font-serif text-lg"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    {isLogin && (
                                        <div className="text-right">
                                            <button type="button" className="font-hand text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-accent)] transition-colors">
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-[var(--color-ink)] text-white font-serif font-bold py-4 text-lg rounded-xl flex items-center justify-center gap-2 group"
                                    >
                                        {isLogin ? "Let's Go" : "Create Account"}
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.form>
                            </AnimatePresence>

                            <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--color-ink)]/20">
                                <p className="text-center font-hand text-sm text-[var(--color-ink)]/50 mb-4">Or continue with</p>
                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 border-2 border-[var(--color-ink)]/20 rounded-xl font-serif hover:border-[var(--color-ink)] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all">
                                        Google
                                    </button>
                                    <button className="flex-1 py-3 border-2 border-[var(--color-ink)]/20 rounded-xl font-serif hover:border-[var(--color-ink)] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all">
                                        GitHub
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
