# AI Chat Application# AI Chatting App



A modern, minimalist AI chatting application inspired by Claude and Perplexity AI, built with Next.js 14+ and TypeScript.This is a simple 1-2 page AI Chatting App inspired by Claude and Perplexity AI.



## 🎯 Features## Tech Stack



### Chat Interface* **Next.js 14+ (App Router)**: The foundation of the application, providing server-side rendering, routing, and a great developer experience.

- **Token-by-Token Streaming**: Mock AI responses stream word-by-word with smooth animations* **TypeScript**: For type safety and improved code quality.

- **Claude-style Artifacts**: Inline rich blocks for code and markdown with expandable views* **React Query (TanStack)**: For managing server state, caching, and data fetching.

- **Sticky Question Headers**: Questions stay pinned at the top while scrolling (Perplexity-style)* **shadcn/ui**: A collection of beautifully designed, accessible, and customizable components.

- **Message Actions**: Copy, regenerate, and edit functionality for all messages* **Tailwind CSS**: For styling the application with a utility-first approach.

- **Local Persistence**: Chat history persists across page reloads

- **Multiple Sessions**: Create and switch between different chat sessions## Features



### Intelligent Autocomplete* **Chat Interface**: A fully functional chat experience with streaming responses, inline artifacts, loading states, and local persistence.

- **Server-Side Search**: Fetch results from mock API routes* **Scalable Search**: An enhanced chat input with intelligent autocomplete, server-side search, client-side caching, and keyboard navigation.

- **Client-Side Caching**: React Query integration for optimal performance* **System Quality**: A clean, modular folder structure, effective use of modern React and Next.js features, and a responsive, polished design.

- **Character Highlighting**: Matched substrings are bolded in results

- **Keyboard Navigation**: Full support for ↑ ↓ ↩ Esc keys## How to Run

- **Mentions (@)**: Type "@" to search through 1 million+ mock names efficiently

1. **Install dependencies**:

### System Quality

- **Clean Architecture**: Modular folder structure with clear separation of concerns   ```bash

- **Error Boundaries**: Graceful error handling with user-friendly messages   pnpm install

- **Command Menu (⌘K)**: Quick access to actions like new chat, clear history   ```

- **Responsive Design**: Fully responsive with mobile-optimized sidebar

- **Black & White Theme**: Elegant minimalist design with clean typography2. **Run the development server**:

- **Performance Optimized**: React Query caching, memoization, and optimized re-renders

   ```bash

## 🏗️ Architecture   pnpm dev

   ```

```

src/Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main chat page
│   └── api/                 # API routes
│       ├── search/          # Search autocomplete API
│       └── mentions/        # Mentions autocomplete API (1M names)
├── components/              # React components
│   ├── chat-input.tsx       # Message input with autocomplete
│   ├── chat-message.tsx     # Individual message with artifacts
│   ├── chat-messages.tsx    # Messages list with sticky headers
│   ├── autocomplete.tsx     # Smart autocomplete component
│   ├── sidebar.tsx          # Chat history sidebar
│   ├── responsive-sidebar.tsx # Mobile-responsive sidebar wrapper
│   ├── command-menu.tsx     # ⌘K command palette
│   ├── error-boundary.tsx   # Error boundary component
│   ├── query-provider.tsx   # React Query provider
│   └── ui/                  # shadcn/ui components
├── hooks/                   # Custom React hooks
│   ├── use-chat-session.ts  # Chat session management with context
│   ├── use-chat.ts          # Legacy chat hook
│   └── use-media-query.ts   # Responsive design hook
├── types/                   # TypeScript type definitions
│   └── chat.ts              # Message and Artifact types
└── lib/                     # Utility functions
    └── utils.ts             # Helper utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd super-30

# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm start
```

## 🎨 Design Philosophy

### Minimalism
- Pure black & white color scheme
- No unnecessary colors or decorations
- Focus on content and readability
- Clean typography with proper hierarchy

### User Experience
- Smooth animations and transitions
- Instant feedback on all interactions
- Keyboard-first navigation
- Persistent state across sessions

### Performance
- React Query for efficient data fetching
- Memoization to prevent unnecessary re-renders
- Lazy loading where appropriate
- Optimized streaming for real-time feel

## 🔑 Key Technical Decisions

### 1. Context API for State Management
Instead of prop drilling, I used React Context to share the chat session state across the application. This provides:
- Single source of truth for all chat data
- Cleaner component interfaces
- Better scalability for future features

### 2. React Query for API Calls
React Query handles:
- Automatic caching of search results
- Background refetching
- Loading and error states
- Request deduplication

### 3. Generator Functions for 1M Names
The mentions API uses JavaScript generator functions to simulate 1 million names without storing them all in memory:
- Memory efficient
- Fast search performance
- Realistic API behavior

### 4. Word-by-Word Streaming
AI responses stream word-by-word (not character-by-character) for:
- More natural reading experience
- Better performance
- Closer to real AI chat interfaces

### 5. Sticky Headers with Scroll Detection
Custom scroll detection logic identifies which question is being viewed:
- Tracks user scroll position
- Shows relevant question context
- Smooth transitions between questions

## 🧪 Testing the Features

### Test Streaming & Artifacts
1. Create a new chat
2. Type: "Show me some code"
3. Observe: Streaming response with a code artifact block
4. Click the expand icon to see full-screen view

### Test Sticky Headers
1. Ask multiple questions (try "long detailed response")
2. Scroll through the long answers
3. Observe: The question stays pinned at the top

### Test Mentions
1. In the chat input, type "@"
2. Type any name (e.g., "@John")
3. Use arrow keys to navigate
4. Press Enter to select

### Test Command Menu
1. Press ⌘K (Mac) or Ctrl+K (Windows/Linux)
2. Select actions like "New Chat" or "Clear History"

## 📦 Dependencies

### Core
- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5**: Type safety

### UI & Styling
- **Tailwind CSS 4**: Utility-first CSS
- **shadcn/ui**: High-quality component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon set

### Data Management
- **TanStack React Query 5**: Server state management
- **localStorage**: Client-side persistence

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Deploy with default settings

### Other Platforms
The app works on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted

## 📝 Environment Variables

No environment variables required! The app uses mock APIs for demonstration purposes.

## 🔮 Future Enhancements

- [ ] Real AI integration (OpenAI, Anthropic, etc.)
- [ ] User authentication
- [ ] Cloud sync for chat history
- [ ] Export conversations
- [ ] Markdown rendering in messages
- [ ] Syntax highlighting in code artifacts
- [ ] Voice input support
- [ ] Multi-language support

## 📄 License

MIT

## 👤 Author

Created as part of a technical assessment to demonstrate modern React development practices, TypeScript proficiency, and attention to detail in UI/UX design.

---

**Note**: This is a demonstration project with mock AI responses. For production use, integrate with a real AI API service.
