"use client";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen w-full grid place-items-center px-6">
      {/* Background icons hinting collaboration and scheduling */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Calendar className="absolute left-[8%] top-[12%] h-32 w-32 text-black/10" />
        <MessageSquare className="absolute right-[10%] top-[22%] h-28 w-28 text-black/10" />
        <Clock className="absolute left-[15%] bottom-[18%] h-28 w-28 text-black/10" />
      </div>

      {/* Pastel glass layers for depth */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-[#FCD5CE]/35 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 right-20 h-64 w-64 rounded-full bg-[#E8E8E4]/30 blur-3xl" />
        <div className="absolute bottom-16 left-24 h-80 w-80 rounded-full bg-[#D8E2DC]/30 blur-3xl" />
      </div>

      {/* Text Stack UI: clean, vertically aligned content */}
      <section className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/40 backdrop-blur-sm shadow-sm">
            <Calendar className="h-6 w-6 text-neutral-800" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Event Manager</h1>
          <p className="mt-2 text-sm text-neutral-600">Plan together. Communicate clearly. Celebrate often.</p>
        </div>

        <div className="rounded-3xl bg-white/50 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="text-sm font-medium text-neutral-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-neutral-900 shadow-sm outline-none transition focus:border-[#FEC89A] focus:ring-2 focus:ring-[#FEC89A]/40"
            />

            <label className="mt-2 text-sm font-medium text-neutral-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-neutral-900 shadow-sm outline-none transition focus:border-[#FEC89A] focus:ring-2 focus:ring-[#FEC89A]/40"
            />

            <button
              type="submit"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-[#FEC89A] px-6 text-base font-semibold text-neutral-900 shadow-[0_10px_20px_rgba(254,200,154,0.45)] transition hover:brightness-105 focus:ring-2 focus:ring-offset-2 focus:ring-[#FEC89A]"
            >
              Login
            </button>
          </form>
        </div>
      </section>

      {/* Responsive grid hints for 768×1503 mobile-tablet vertical look */}
      <div className="fixed inset-0 -z-20 grid grid-cols-6 opacity-[0.03]">
        <div className="border-r border-black/10" />
        <div className="border-r border-black/10" />
        <div className="border-r border-black/10" />
        <div className="border-r border-black/10" />
        <div className="border-r border-black/10" />
        <div />
      </div>
    </main>
  );
}