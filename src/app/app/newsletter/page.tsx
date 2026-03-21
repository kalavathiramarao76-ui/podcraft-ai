"use client";

import ToolPage from "@/components/ToolPage";
import { PROMPTS } from "@/lib/ai";

export default function NewsletterPage() {
  return (
    <ToolPage
      title="Newsletter Draft"
      description="Generate a full newsletter edition from your episode"
      placeholder="Paste your podcast transcript here to generate a newsletter edition...

The AI will create subject lines, an opening hook, key insights, action items, and a compelling CTA."
      systemPrompt={PROMPTS.newsletter.system}
      buildUserPrompt={PROMPTS.newsletter.user}
      icon={
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      }
    />
  );
}
