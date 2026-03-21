"use client";

import ToolPage from "@/components/ToolPage";
import { PROMPTS } from "@/lib/ai";

export default function ClipsPage() {
  return (
    <ToolPage
      title="Social Clip Generator"
      description="Identify the 5 best moments for short-form video clips"
      placeholder="Paste your podcast transcript here to identify viral-worthy clip moments...

The AI will find the best 60-90 second segments with hooks, titles, and platform recommendations."
      systemPrompt={PROMPTS.clips.system}
      buildUserPrompt={PROMPTS.clips.user}
      icon={
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-2.625 0V7.5c0 .621.504 1.125 1.125 1.125" />
        </svg>
      }
    />
  );
}
