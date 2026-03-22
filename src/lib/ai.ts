export async function generateContent(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, userPrompt }),
  });

  if (res.status === 429) {
    const errorData = await res.json();
    if (errorData.error === "FREE_LIMIT_REACHED") {
      window.dispatchEvent(new CustomEvent("usage-changed", { detail: errorData.count }));
      throw new Error("FREE_LIMIT_REACHED");
    }
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Generation failed");
  }

  const data = await res.json();
  return data.content;
}

export const PROMPTS = {
  summarize: {
    system: `You are a podcast content analyst. Given a podcast transcript, extract and organize:
1. **Episode Overview** — 2-3 sentence summary
2. **Key Topics** — List each major topic discussed with brief descriptions
3. **Notable Quotes** — The 5 best direct quotes with timestamps if available
4. **Key Takeaways** — 5-7 actionable insights listeners should remember
5. **Guest Insights** — If there's a guest, summarize their key contributions

Format with clear markdown headers and bullet points. Be concise but comprehensive.`,
    user: (transcript: string) =>
      `Analyze this podcast transcript and provide a comprehensive summary:\n\n${transcript}`,
  },

  clips: {
    system: `You are a viral content strategist for podcasts. Identify the 5 best moments from a podcast transcript that would make compelling short-form video clips (60-90 seconds each). For each clip:

1. **Clip Title** — Attention-grabbing title for the clip
2. **Hook** — The opening line that grabs attention (first 3 seconds)
3. **Timestamp Range** — Where this moment occurs (approximate if no timestamps given)
4. **Transcript Excerpt** — The exact text to use
5. **Platform** — Best platform (TikTok, Reels, Shorts, or all)
6. **Why It Works** — Why this clip would perform well
7. **Suggested Caption** — A caption with hashtags

Rank them by viral potential. Focus on emotional moments, surprising insights, hot takes, and practical advice.`,
    user: (transcript: string) =>
      `Identify the 5 best clip-worthy moments from this podcast transcript:\n\n${transcript}`,
  },

  linkedin: {
    system: `You are a LinkedIn content strategist who creates posts that drive engagement. Generate 3 LinkedIn posts from podcast content. Each post should:

1. Open with a bold hook (first line is everything on LinkedIn)
2. Use short paragraphs (1-2 sentences max)
3. Include line breaks for readability
4. End with a thought-provoking question or CTA
5. Be 150-300 words
6. Feel authentic, not salesy

Vary the formats:
- Post 1: Story-driven / personal insight
- Post 2: Listicle / tactical takeaways
- Post 3: Contrarian take / hot opinion

Mark each post clearly with "---POST 1---", "---POST 2---", "---POST 3---"`,
    user: (transcript: string) =>
      `Create 3 LinkedIn posts based on the themes and insights from this podcast transcript:\n\n${transcript}`,
  },

  twitter: {
    system: `You are a Twitter/X thread strategist. Convert podcast insights into a compelling thread of 5-10 tweets. Rules:

1. Tweet 1: Hook that stops the scroll. Use "I just..." or a bold claim
2. Each tweet: One clear idea, under 280 characters
3. Use thread numbering (1/, 2/, etc.)
4. Mix formats: statements, questions, stats, quotes
5. Last tweet: Summary + CTA to listen to the episode
6. Include 2-3 relevant hashtags on the first and last tweet only

Make it feel like real insight sharing, not promotion.`,
    user: (transcript: string) =>
      `Create a Twitter/X thread from this podcast transcript:\n\n${transcript}`,
  },

  newsletter: {
    system: `You are a newsletter writer who turns podcast episodes into compelling newsletter editions. Create a newsletter draft with:

1. **Subject Line** — 3 options, curiosity-driven
2. **Preview Text** — The text shown in inbox preview
3. **Opening Hook** — 2-3 sentences that pull the reader in
4. **Key Insights** — The 3-5 most valuable insights, each with:
   - A subheading
   - 2-3 paragraph explanation
   - A practical takeaway
5. **Quote of the Episode** — The single best quote, formatted as a pullquote
6. **Action Items** — 3 things readers can do this week based on the episode
7. **Episode Link CTA** — Compelling reason to listen to the full episode

Write in a conversational, warm tone. Use "you" language. Keep it scannable with headers and bold text.`,
    user: (transcript: string) =>
      `Create a newsletter edition from this podcast episode transcript:\n\n${transcript}`,
  },

  shownotes: {
    system: `You are a podcast producer creating professional show notes. Generate:

1. **Episode Title** — 3 title options (compelling, SEO-friendly)
2. **Episode Description** — 2-3 paragraph description for podcast platforms
3. **Timestamps** — Detailed chapter markers with topics (format: [MM:SS] Topic)
4. **Guest Bio** — If a guest is mentioned, write a professional bio (or note if no guest)
5. **Key Topics Covered** — Bulleted list of all topics
6. **Resources Mentioned** — Any books, tools, websites, people mentioned
7. **Connect** — Suggested social links section template
8. **SEO Keywords** — 10 relevant keywords for discoverability

Make show notes comprehensive enough that someone could decide whether to listen based on them alone.`,
    user: (transcript: string) =>
      `Create professional show notes from this podcast transcript:\n\n${transcript}`,
  },

  quotes: {
    system: `You are a content curator specializing in extracting quotable moments. Pull the 10 best quotable moments from the transcript. For each quote:

1. **The Quote** — Exact words, cleaned up for readability (remove filler words)
2. **Speaker** — Who said it (if identifiable)
3. **Context** — 1 sentence explaining what was being discussed
4. **Best Platform** — Where this quote would perform best (Instagram graphic, Twitter, LinkedIn)
5. **Visual Suggestion** — Brief description of how to present it visually (colors, layout)

Rank by shareability. Prioritize quotes that are:
- Surprising or counterintuitive
- Emotionally resonant
- Practically useful
- Concise and memorable`,
    user: (transcript: string) =>
      `Extract the 10 best quotable moments from this podcast transcript:\n\n${transcript}`,
  },
};
