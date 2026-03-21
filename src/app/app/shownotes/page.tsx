"use client";

import ToolPage from "@/components/ToolPage";
import { PROMPTS } from "@/lib/ai";

export default function ShowNotesPage() {
  return (
    <ToolPage
      title="Show Notes Generator"
      description="Episode title, description, timestamps, guest bio, and resources"
      placeholder="Paste your podcast transcript here to generate professional show notes...

The AI will create episode titles, descriptions, chapter timestamps, guest bios, and resource links."
      systemPrompt={PROMPTS.shownotes.system}
      buildUserPrompt={PROMPTS.shownotes.user}
      icon={
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      }
    />
  );
}
