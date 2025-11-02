🧠 Frontend Developer Technical Assignment
Deadline: 24 hours

Goal
Build a simple 1–2 page AI Chatting App inspired by Claude and Perplexity AI using:
• Next.js 14+ (App Router) 
• TypeScript
• React Query (TanStack) 
• shadcn/ui only.
Design must be plain black & white, with clean typography and elegant minimalism.


💬 Task 1 — Chat Interface
Build a fully functional chat experience similar to Claude or Perplexity.(watch them closely please - will observe attention to detail here.)
Requirements
Streaming Responses: Mock token-by-token streaming with slight delay.
Claude-style Artifacts: Inline rich blocks (e.g. code preview, markdown) toggleable between inline and expanded view.
Informational Loading States: “Thinking…” animations or skeletons.
Local Persistence: Chat history should persist across reloads.
Sticky Question Header:


When scrolling a long response, the question stays pinned at the top (like on Perplexity).
Test by adding 3–4 long mock Q&A pairs.
To see how this works: visit perplexity.ai, ask multiple questions, and scroll long responses — the question title sticks to the top as you scroll. Replicate that behavior.


Inline Actions: Copy, Regenerate, and Edit prompt.
Sidebar: List and switch between previous chat sessions.



🔍 Task 2 — Prompt area field with Scalable Search
Enhance the chat input bar with intelligent autocomplete.
Requirements
Server-Side Search: Fetch initial results from a mock API route.
Client-Side Caching: Cache results using React Query.
Character Highlighting: Bold the matched substring in results.
Keyboard Navigation: Support ↑ ↓ ↩ Esc keys.
Mentions (@): Typing “@” triggers mock people search (1Million placeholder names thru api only.)



⚙️ Task 3 — System Quality & Architecture
Clean modular folder structure (app/, components/, lib/, hooks/, types/, features/).
Use Server Components, Suspense, and React Query effectively.
Graceful error and empty states.
Command Menu (⌘K) Menu bar: Actions — “New Chat”, “Clear History”, “Settings”.
Fully responsive, performant, and polished (elegance with black& white theme).



🧾 Deliverable
A public GitHub repository that runs with pnpm dev or npm run dev, including a brief README.md (reasoning).

Deployed vercel link.

