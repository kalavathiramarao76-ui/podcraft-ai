"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "podcraft-onboarding-done";

const steps = [
  {
    title: "Welcome to PodCraft AI",
    description:
      "Your AI-powered podcast repurposing studio. Turn every episode into social posts, newsletters, clips, and more -- automatically.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Paste Your Transcript",
    description:
      "Copy your podcast transcript into any tool. The longer and more detailed the transcript, the better the AI output will be.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Repurpose Everything",
    description:
      "Use Summarize, Clips, Social Posts, Newsletter, Show Notes, and Quotes to turn one episode into dozens of content pieces.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {}
  }, []);

  const finish = useCallback(() => {
    setConfetti(true);
    setTimeout(() => {
      setVisible(false);
      setConfetti(false);
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }, 2000);
  }, []);

  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  };

  const skip = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={skip} />

      {confetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[10001]">
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ["#8b5cf6", "#a78bfa", "#7c3aed", "#fff", "#c4b5fd", "#6d28d9"];
            const color = colors[i % colors.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 1.5 + Math.random() * 1.5;
            const size = 6 + Math.random() * 6;
            const rotation = Math.random() * 360;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: "-10px",
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  transform: `rotate(${rotation}deg)`,
                  animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
                }}
              />
            );
          })}
          <style>{`
            @keyframes confettiFall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      <div className="relative z-[10000] w-full max-w-md mx-4 rounded-2xl border border-white/10 bg-[#111]/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="flex gap-1.5 px-8 pt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                i <= step ? "bg-violet-500" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="px-8 pt-8 pb-2 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-6">
            {current.icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {current.title}
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto">
            {current.description}
          </p>
        </div>

        <div className="text-center py-4">
          <span className="text-xs font-mono text-neutral-600">
            {step + 1} / {steps.length}
          </span>
        </div>

        <div className="flex items-center justify-between px-8 pb-8">
          <button onClick={skip} className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
            Skip tour
          </button>
          <button
            onClick={next}
            className="px-6 py-2.5 rounded-full bg-violet-500 hover:bg-violet-400 text-white text-sm font-semibold transition-colors"
          >
            {step === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
