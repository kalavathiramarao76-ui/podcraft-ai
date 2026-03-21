"use client";

import ToolPage from "@/components/ToolPage";
import { PROMPTS } from "@/lib/ai";

export default function SummarizePage() {
  return (
    <ToolPage
      title="Transcript Summarizer"
      description="Extract key topics, quotes, and timestamps from your episode"
      placeholder="Paste your full podcast transcript here...

Example:
[00:00] Host: Welcome back to the show. Today we have an incredible guest...
[00:15] Guest: Thanks for having me. I'm excited to talk about..."
      systemPrompt={PROMPTS.summarize.system}
      buildUserPrompt={PROMPTS.summarize.user}
      icon={
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      }
    />
  );
}
