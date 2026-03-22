"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Reduced motion check ─────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ── Letter-by-letter hero reveal ─────────────────────────────────────
function LetterReveal({ text, className = "", stagger = 30, delay = 0 }: { text: string; className?: string; stagger?: number; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter-reveal-char"
          style={{
            transitionDelay: visible ? `${i * stagger}ms` : "0ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(0.3em)",
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ── Stats counter animation ──────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduced) {
      if (started) setCount(value);
      return;
    }
    let frame: number;
    const duration = 800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, reduced]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Scroll fade-up via IntersectionObserver ───────────────────────────
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-up-section ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const features = [
  {
    title: "Transcript Summarizer",
    desc: "Key topics, quotes, and timestamps — extracted in seconds.",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    title: "Social Clip Generator",
    desc: "5 viral-worthy moments identified with titles and hooks.",
    icon: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-2.625 0V7.5c0 .621.504 1.125 1.125 1.125",
  },
  {
    title: "LinkedIn Posts",
    desc: "3 engagement-optimized posts from your episode themes.",
    icon: "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
  },
  {
    title: "Twitter Threads",
    desc: "5-10 tweet threads that convert listeners into followers.",
    icon: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z",
  },
  {
    title: "Newsletter Draft",
    desc: "Full newsletter edition with subject lines and CTAs.",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    title: "Show Notes",
    desc: "Timestamps, guest bio, resources — production-ready.",
    icon: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  },
  {
    title: "Quote Extractor",
    desc: "10 most shareable moments, platform-optimized.",
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight">
              PodCraft <span className="text-accent">AI</span>
            </span>
          </div>
          <Link
            href="/app"
            className="px-5 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Waveform animation */}
          <div className="flex items-center justify-center gap-[3px] mb-8" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="waveform-bar"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-bg-card text-xs text-muted mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            AI-powered podcast repurposing
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]">
            <LetterReveal text="Turn one episode" stagger={30} />
            <br />
            <span className="gradient-text"><LetterReveal text="into ten pieces." stagger={30} delay={500} /></span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Paste your podcast transcript. Get summaries, social clips, LinkedIn
            posts, Twitter threads, newsletters, and show notes — all generated
            by AI in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
            <Link
              href="/app"
              className="px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 text-base"
            >
              Start Repurposing
            </Link>
            <a
              href="#features"
              className="px-8 py-3.5 border border-border hover:border-zinc-600 text-zinc-400 hover:text-white rounded-xl transition-all text-base"
            >
              See Features
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-delay-2">
            <div>
              <div className="text-3xl font-bold gradient-text"><AnimatedCounter value={7} /></div>
              <div className="text-sm text-muted mt-1">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text"><AnimatedCounter value={1} /></div>
              <div className="text-sm text-muted mt-1">Transcript</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text"><AnimatedCounter value={10} suffix="+" /></div>
              <div className="text-sm text-muted mt-1">Content Pieces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Every tool a podcaster needs
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              One transcript in, seven types of content out. Each tool is
              fine-tuned for its specific platform and format.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="card-hover p-6 rounded-2xl border border-border bg-bg-card group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#8b5cf6"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={f.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-base mb-1">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16">
            Three steps. Infinite content.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Paste transcript",
                desc: "Copy your episode transcript from any source — Descript, Otter, Riverside, or manual.",
              },
              {
                step: "02",
                title: "Choose your tool",
                desc: "Select from 7 specialized AI tools, each optimized for a specific content format.",
              },
              {
                step: "03",
                title: "Copy & publish",
                desc: "Get polished, ready-to-post content. Copy it, tweak if needed, and publish everywhere.",
              },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-bold text-accent/10 mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Stop leaving content
            <br />
            <span className="gradient-text">on the table.</span>
          </h2>
          <p className="mt-6 text-muted text-lg max-w-xl mx-auto">
            Every episode is a goldmine. PodCraft AI extracts every piece of
            value so you can focus on what you do best — creating great
            conversations.
          </p>
          <Link
            href="/app"
            className="inline-block mt-8 px-10 py-4 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-accent/20 text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted">
          <span>PodCraft AI</span>
          <span>Built for podcasters who mean business.</span>
        </div>
      </footer>
    </div>
  );
}
