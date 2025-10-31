"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0: none, 1: Let's, 2: happen, 3: event

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep(1), 300));
    timers.push(setTimeout(() => setStep(2), 1100));
    timers.push(setTimeout(() => setStep(3), 1900));
    timers.push(
      setTimeout(() => {
        router.push("/login");
      }, 2800)
    );

    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <main className="min-h-screen w-full grid place-items-center font-sans">
      {/* Glassmorphism center container */}
      <div className="relative z-10 rounded-3xl bg-white/30 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-10 py-12">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 text-[#8d6b5b]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-baseline gap-2 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
              <span
                className={`inline-block transition-all duration-500 ${
                  step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                Let’s
              </span>
              <span
                className={`inline-block transition-all duration-500 ${
                  step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                happen
              </span>
              <span
                className={`inline-block transition-all duration-500 ${
                  step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                event
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Preparing your collaborative event space…
            </p>
          </div>
        </div>
      </div>

      {/* Ambient pastel layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-16 h-64 w-64 rounded-full bg-[#FCD5CE]/40 blur-3xl" />
        <div className="absolute top-1/3 -right-10 h-72 w-72 rounded-full bg-[#E8E8E4]/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-[#D8E2DC]/30 blur-3xl" />
      </div>
    </main>
  );
}
