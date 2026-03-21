import Link from "next/link";

const tools = [
  {
    num: "01",
    href: "/app/summarize",
    title: "Summarize",
    desc: "Extract key topics, quotes, and timestamps from your episode transcript.",
  },
  {
    num: "02",
    href: "/app/clips",
    title: "Clips",
    desc: "Identify the 5 best moments for short-form video clips with titles and hooks.",
  },
  {
    num: "03",
    href: "/app/posts",
    title: "Posts",
    desc: "Generate 3 LinkedIn posts and a Twitter thread from your episode themes.",
  },
  {
    num: "04",
    href: "/app/posts",
    title: "Threads",
    desc: "Turn episode insights into viral Twitter threads with hooks and formatting.",
  },
  {
    num: "05",
    href: "/app/newsletter",
    title: "Newsletter",
    desc: "Full newsletter edition with subject lines, key insights, and CTAs.",
  },
  {
    num: "06",
    href: "/app/shownotes",
    title: "Show Notes",
    desc: "Episode title, description, timestamps, guest bio, and resources.",
  },
  {
    num: "07",
    href: "/app/quotes",
    title: "Quotes",
    desc: "Pull the 10 best quotable moments, optimized for each social platform.",
  },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Creator Studio
          </h1>
          <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold tracking-[0.15em] uppercase">
            Workspace
          </span>
        </div>
        <p className="text-zinc-500 text-lg max-w-xl">
          Repurpose every episode into a content empire.
        </p>
      </div>

      {/* Tool rows */}
      <div className="space-y-0">
        {tools.map((tool, i) => (
          <Link
            key={i}
            href={tool.href}
            className="group flex items-start gap-8 py-8 border-t border-white/[0.06] last:border-b hover:bg-white/[0.01] transition-colors -mx-8 px-8 lg:-mx-12 lg:px-12"
          >
            {/* Number */}
            <span className="font-mono text-sm text-violet-500/40 pt-1 shrink-0 w-8 tabular-nums">
              {tool.num}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-semibold tracking-tight text-white group-hover:text-violet-400 transition-colors mb-2">
                {tool.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
                {tool.desc}
              </p>
            </div>

            {/* Arrow */}
            <div className="pt-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
