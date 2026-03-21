"use client";

import { useState } from "react";
import ToolPage from "@/components/ToolPage";
import { PROMPTS } from "@/lib/ai";

export default function PostsPage() {
  const [mode, setMode] = useState<"linkedin" | "twitter">("linkedin");

  const config = mode === "linkedin" ? PROMPTS.linkedin : PROMPTS.twitter;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("linkedin")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "linkedin"
              ? "bg-accent/15 text-accent-light border border-accent/30"
              : "bg-bg-card text-muted border border-border hover:text-zinc-300"
          }`}
        >
          LinkedIn Posts
        </button>
        <button
          onClick={() => setMode("twitter")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "twitter"
              ? "bg-accent/15 text-accent-light border border-accent/30"
              : "bg-bg-card text-muted border border-border hover:text-zinc-300"
          }`}
        >
          Twitter Thread
        </button>
      </div>

      <ToolPage
        key={mode}
        title={mode === "linkedin" ? "LinkedIn Post Writer" : "Twitter Thread Creator"}
        description={
          mode === "linkedin"
            ? "Generate 3 engagement-optimized LinkedIn posts"
            : "Convert insights into a 5-10 tweet thread"
        }
        placeholder={`Paste your podcast transcript here to generate ${
          mode === "linkedin" ? "LinkedIn posts" : "a Twitter thread"
        }...`}
        systemPrompt={config.system}
        buildUserPrompt={config.user}
        icon={
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        }
      />
    </div>
  );
}
