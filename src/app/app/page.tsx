import Link from "next/link";

const tools = [
  {
    href: "/app/summarize",
    title: "Transcript Summarizer",
    desc: "Extract key topics, quotes, and timestamps from your episode transcript.",
    color: "from-violet-500/20 to-purple-600/10",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    href: "/app/clips",
    title: "Social Clip Generator",
    desc: "Identify the 5 best moments for short-form video clips with titles and hooks.",
    color: "from-fuchsia-500/20 to-pink-600/10",
    icon: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-2.625 0V7.5c0 .621.504 1.125 1.125 1.125",
  },
  {
    href: "/app/posts",
    title: "LinkedIn & Twitter",
    desc: "Generate 3 LinkedIn posts and a Twitter thread from your episode themes.",
    color: "from-blue-500/20 to-indigo-600/10",
    icon: "M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z",
  },
  {
    href: "/app/newsletter",
    title: "Newsletter Draft",
    desc: "Generate a full newsletter edition with subject lines, insights, and CTAs.",
    color: "from-emerald-500/20 to-teal-600/10",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    href: "/app/shownotes",
    title: "Show Notes Generator",
    desc: "Episode title, description, timestamps, guest bio, and resources.",
    color: "from-amber-500/20 to-orange-600/10",
    icon: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  },
  {
    href: "/app/quotes",
    title: "Quote Extractor",
    desc: "Pull the 10 best quotable moments, optimized for each social platform.",
    color: "from-rose-500/20 to-red-600/10",
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
  },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted mt-2">
          Choose a tool to start repurposing your podcast content.
        </p>
      </div>

      {/* Quick start */}
      <div className="mb-10 p-6 rounded-2xl border border-border bg-gradient-to-br from-accent/5 to-transparent">
        <h2 className="text-lg font-semibold mb-2">Quick Start</h2>
        <p className="text-sm text-muted mb-4">
          Have a transcript ready? Start with the Summarizer to get an overview,
          then use specialized tools for each content type.
        </p>
        <Link
          href="/app/summarize"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          Start with Summarizer
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="card-hover group p-6 rounded-2xl border border-border bg-bg-card relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">{tool.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{tool.desc}</p>
              <div className="mt-4 text-xs text-accent font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Open tool
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
