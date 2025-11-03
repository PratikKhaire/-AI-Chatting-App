# AI Chatting App 🤖💬# AI Chat Application# AI Chatting App



A modern, production-ready AI chatting application powered by **Google Gemini 2.5**, inspired by Claude and Perplexity AI. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.



## 🌟 Live Demo# AI Chatting App 🤖💬



🚀 **[View Live Application](#)** _(Add your Vercel deployment URL here after deployment)_A modern, production-ready AI chatting application powered by **Google Gemini 2.5**, inspired by Claude and Perplexity AI. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.



---## 🌟 Live Demo



## 🚀 Quick Start (For Cloning)🚀 **[View Live Application](#)** _(Add your Vercel deployment URL here)_



### Prerequisites![AI Chat App Screenshot](https://via.placeholder.com/800x400?text=AI+Chat+App+Screenshot)



Before you begin, ensure you have the following installed:---

- **Node.js 18+** ([Download here](https://nodejs.org/))

- **pnpm** (recommended) or npm

- **Git** ([Download here](https://git-scm.com/))

- **Google Gemini API Key** ([Get yours free](https://ai.google.dev/))---



### Step 1: Clone the Repository## 🚀 Quick Start (For Cloning)



```bash### Prerequisites

# Clone the repository

git clone https://github.com/PratikKhaire/-AI-Chatting-App.gitBefore you begin, ensure you have the following installed:

- **Node.js 18+** ([Download here](https://nodejs.org/))

# Navigate to the project directory- **pnpm** (recommended) or npm

cd -AI-Chatting-App- **Git** ([Download here](https://git-scm.com/))

```- **Google Gemini API Key** ([Get yours free](https://ai.google.dev/))



### Step 2: Install Dependencies### Step 1: Clone the Repository



```bash```bash

# Using pnpm (recommended)# Clone the repository

pnpm installgit clone https://github.com/PratikKhaire/-AI-Chatting-App.git



# OR using npm# Navigate to the project directory

npm installcd -AI-Chatting-App

```

# OR using yarn

yarn install### Step 2: Install Dependencies

```

```bash

### Step 3: Set Up Environment Variables# Using pnpm (recommended)

pnpm install

Create a `.env.local` file in the root directory:

# OR using npm

```bashnpm install

# Create the environment file

cp .env.example .env.local# OR using yarn

```yarn install

```

Open `.env.local` and add your Google Gemini API key:

### Step 3: Set Up Environment Variables

```env

GEMINI_API_KEY=your_api_key_hereCreate a `.env.local` file in the root directory:

```

```bash

**How to get a Gemini API Key:**# Create the environment file

1. Visit [Google AI Studio](https://ai.google.dev/)cp .env.example .env.local

2. Click "Get API Key" ```

3. Sign in with your Google account

4. Create a new API keyOpen `.env.local` and add your Google Gemini API key:

5. Copy and paste it into your `.env.local` file

```env

### Step 4: Run the Development ServerGEMINI_API_KEY=your_api_key_here

```

```bash

# Start the development server**How to get a Gemini API Key:**

pnpm dev1. Visit [Google AI Studio](https://ai.google.dev/)

2. Click "Get API Key"

# OR using npm3. Create a new API key

npm run dev4. Copy and paste it into your `.env.local` file



# OR using yarn### Step 4: Run the Development Server

yarn dev

``````bash

# Start the development server

The application will open at **[http://localhost:3000](http://localhost:3000)** 🎉pnpm dev



### Step 5: Build for Production (Optional)# OR using npm

npm run dev

```bash

# Create an optimized production build# OR using yarn

pnpm buildyarn dev

```

# Start the production server

pnpm startThe application will open at **[http://localhost:3000](http://localhost:3000)** 🎉

```

### Step 5: Build for Production (Optional)

---

```bash

## 🎯 Features# Create an optimized production build

pnpm build

### 🤖 Real AI Integration

- **Google Gemini 2.5 Flash**: Real-time AI responses powered by Google's latest model# Start the production server

- **Streaming Responses**: Token-by-token streaming for a natural conversation feelpnpm start

- **Smart Context**: Multi-message context handling for coherent conversations```



### 💬 Chat Interface---

- **Multiple Sessions**: Create and switch between different chat sessions

- **Message Actions**: Copy, regenerate, and edit functionality for all messages## 🎯 Features## Tech Stack

- **Local Persistence**: Chat history persists across page reloads

- **Thinking Animation**: Visual feedback while AI is generating responses

- **Smooth Animations**: Lovable-style shadows and transitions

### Chat Interface* **Next.js 14+ (App Router)**: The foundation of the application, providing server-side rendering, routing, and a great developer experience.

### 🔍 Intelligent Autocomplete

- **Server-Side Search**: Fetch results from API routes- **Token-by-Token Streaming**: Mock AI responses stream word-by-word with smooth animations* **TypeScript**: For type safety and improved code quality.

- **Client-Side Caching**: React Query integration for optimal performance

- **Character Highlighting**: Matched substrings are highlighted in results- **Claude-style Artifacts**: Inline rich blocks for code and markdown with expandable views* **React Query (TanStack)**: For managing server state, caching, and data fetching.

- **Keyboard Navigation**: Full support for ↑ ↓ ↩ Esc keys

- **Mentions (@)**: Type "@" to search through users and mentions- **Sticky Question Headers**: Questions stay pinned at the top while scrolling (Perplexity-style)* **shadcn/ui**: A collection of beautifully designed, accessible, and customizable components.



### 🎨 System Quality- **Message Actions**: Copy, regenerate, and edit functionality for all messages* **Tailwind CSS**: For styling the application with a utility-first approach.

- **Clean Architecture**: Modular folder structure with clear separation of concerns

- **Error Boundaries**: Graceful error handling with user-friendly messages- **Local Persistence**: Chat history persists across page reloads

- **Command Menu (⌘K)**: Quick access to actions like new chat, clear history

- **Responsive Design**: Fully responsive with mobile-optimized sidebar- **Multiple Sessions**: Create and switch between different chat sessions## Features

- **Elegant Theme**: Clean, minimalist design with glassmorphism effects

- **Performance Optimized**: React Query caching, memoization, and optimized re-renders



---### Intelligent Autocomplete* **Chat Interface**: A fully functional chat experience with streaming responses, inline artifacts, loading states, and local persistence.



## 🏗️ Tech Stack- **Server-Side Search**: Fetch results from mock API routes* **Scalable Search**: An enhanced chat input with intelligent autocomplete, server-side search, client-side caching, and keyboard navigation.



### Core Framework- **Client-Side Caching**: React Query integration for optimal performance* **System Quality**: A clean, modular folder structure, effective use of modern React and Next.js features, and a responsive, polished design.

- **Next.js 16** - React framework with App Router and Turbopack

- **React 19** - Latest React with improved hooks- **Character Highlighting**: Matched substrings are bolded in results

- **TypeScript 5** - Type safety and improved DX

- **Keyboard Navigation**: Full support for ↑ ↓ ↩ Esc keys## How to Run

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework- **Mentions (@)**: Type "@" to search through 1 million+ mock names efficiently

- **shadcn/ui** - High-quality, accessible component library

- **Radix UI** - Unstyled, accessible component primitives1. **Install dependencies**:

- **Lucide React** - Beautiful, consistent icon set

### System Quality

### State & Data

- **TanStack React Query v5** - Server state management and caching- **Clean Architecture**: Modular folder structure with clear separation of concerns   ```bash

- **React Context API** - Global state management

- **localStorage** - Client-side persistence- **Error Boundaries**: Graceful error handling with user-friendly messages   pnpm install



### AI Integration- **Command Menu (⌘K)**: Quick access to actions like new chat, clear history   ```

- **Google Gemini API** - Advanced AI language model

- **Server-Sent Events (SSE)** - Real-time streaming responses- **Responsive Design**: Fully responsive with mobile-optimized sidebar



---- **Black & White Theme**: Elegant minimalist design with clean typography2. **Run the development server**:



## 📁 Project Structure- **Performance Optimized**: React Query caching, memoization, and optimized re-renders



```   ```bash

src/

├── app/                      # Next.js App Router## 🏗️ Architecture   pnpm dev

│   ├── layout.tsx           # Root layout with providers

│   ├── page.tsx             # Main chat page   ```

│   ├── globals.css          # Global styles

│   └── api/                 # API routes```

│       ├── chat/            # Chat API with Gemini integration

│       ├── search/          # Search autocomplete APIsrc/Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

│       ├── mentions/        # Mentions autocomplete API├── app/                      # Next.js App Router

│       └── users/           # Users API│   ├── layout.tsx           # Root layout with providers

├── components/              # React components│   ├── page.tsx             # Main chat page

│   ├── chat-input.tsx       # Message input with autocomplete│   └── api/                 # API routes

│   ├── chat-message.tsx     # Individual message component│       ├── search/          # Search autocomplete API

│   ├── chat-messages.tsx    # Messages list container│       └── mentions/        # Mentions autocomplete API (1M names)

│   ├── autocomplete.tsx     # Smart autocomplete component├── components/              # React components

│   ├── sidebar.tsx          # Chat history sidebar│   ├── chat-input.tsx       # Message input with autocomplete

│   ├── responsive-sidebar.tsx # Mobile-responsive sidebar│   ├── chat-message.tsx     # Individual message with artifacts

│   ├── command-menu.tsx     # ⌘K command palette│   ├── chat-messages.tsx    # Messages list with sticky headers

│   ├── error-boundary.tsx   # Error boundary wrapper│   ├── autocomplete.tsx     # Smart autocomplete component

│   ├── query-provider.tsx   # React Query provider│   ├── sidebar.tsx          # Chat history sidebar

│   ├── thinking-loader.tsx  # AI thinking animation│   ├── responsive-sidebar.tsx # Mobile-responsive sidebar wrapper

│   └── ui/                  # shadcn/ui components│   ├── command-menu.tsx     # ⌘K command palette

│       ├── button.tsx│   ├── error-boundary.tsx   # Error boundary component

│       ├── input.tsx│   ├── query-provider.tsx   # React Query provider

│       ├── dialog.tsx│   └── ui/                  # shadcn/ui components

│       └── ...├── hooks/                   # Custom React hooks

├── hooks/                   # Custom React hooks│   ├── use-chat-session.ts  # Chat session management with context

│   ├── use-chat-session.ts  # Chat session management│   ├── use-chat.ts          # Legacy chat hook

│   ├── use-chat.ts          # Chat utilities│   └── use-media-query.ts   # Responsive design hook

│   └── use-media-query.ts   # Responsive design hook├── types/                   # TypeScript type definitions

├── types/                   # TypeScript type definitions│   └── chat.ts              # Message and Artifact types

│   └── chat.ts              # Chat-related types└── lib/                     # Utility functions

└── lib/                     # Utility functions    └── utils.ts             # Helper utilities

    └── utils.ts             # Helper utilities```

```

## 🚀 Getting Started

---

### Prerequisites

## 🎨 Design Philosophy- Node.js 18+ 

- pnpm (recommended) or npm

### Minimalism & Elegance

- Clean, modern interface inspired by Claude and Perplexity### Installation

- Glassmorphism effects with subtle shadows

- Smooth animations and transitions```bash

- Focus on content and readability# Clone the repository

git clone <repository-url>

### User Experience Firstcd super-30

- Instant feedback on all interactions

- Keyboard-first navigation (⌘K, ↑↓←→, Esc)# Install dependencies

- Persistent state across sessionspnpm install

- Mobile-optimized responsive design# or

npm install

### Performance Optimized

- React Query for efficient data fetching and caching# Run development server

- Memoization to prevent unnecessary re-renderspnpm dev

- Lazy loading and code splitting# or

- Optimized streaming for real-time responsesnpm run dev

```

---

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Key Technical Decisions

### Build for Production

### 1. Context API for State Management

React Context provides a clean way to share chat session state across the application:```bash

- Single source of truth for all chat data# Create production build

- No prop drillingpnpm build

- Better scalability for future features# or

npm run build

### 2. React Query for API Calls

TanStack React Query handles:# Start production server

- Automatic caching of search resultspnpm start

- Background refetching# or

- Loading and error statesnpm start

- Request deduplication```



### 3. Google Gemini 2.5 Flash## 🎨 Design Philosophy

Latest stable Gemini model offering:

- 1M token context window### Minimalism

- 65K token output- Pure black & white color scheme

- Advanced reasoning capabilities- No unnecessary colors or decorations

- Fast response times- Focus on content and readability

- Clean typography with proper hierarchy

### 4. Server-Sent Events (SSE) for Streaming

Real-time streaming provides:### User Experience

- Natural reading experience- Smooth animations and transitions

- Better perceived performance- Instant feedback on all interactions

- Ability to stop generation mid-stream- Keyboard-first navigation

- Persistent state across sessions

### 5. Functional State Updates

Prevents React closure bugs:### Performance

```typescript- React Query for efficient data fetching

// ✅ Correct - functional update- Memoization to prevent unnecessary re-renders

setSessions((prevSessions) => {- Lazy loading where appropriate

  const current = prevSessions.find(...);- Optimized streaming for real-time feel

  // Always uses latest state

});## 🔑 Key Technical Decisions



// ❌ Wrong - closure problem### 1. Context API for State Management

if (activeSession) {Instead of prop drilling, I used React Context to share the chat session state across the application. This provides:

  // May use stale state- Single source of truth for all chat data

}- Cleaner component interfaces

```- Better scalability for future features



---### 2. React Query for API Calls

React Query handles:

## 🧪 Testing the Features- Automatic caching of search results

- Background refetching

### Test Real AI Chat- Loading and error states

1. Start the application- Request deduplication

2. Type a question: "Explain quantum computing in simple terms"

3. Watch the AI response stream in real-time### 3. Generator Functions for 1M Names

4. Continue the conversation to test context handlingThe mentions API uses JavaScript generator functions to simulate 1 million names without storing them all in memory:

- Memory efficient

### Test Multiple Sessions- Fast search performance

1. Click "New Chat" (or press ⌘K → New Chat)- Realistic API behavior

2. Have different conversations in different sessions

3. Switch between sessions from the sidebar### 4. Word-by-Word Streaming

4. Reload the page - sessions persist!AI responses stream word-by-word (not character-by-character) for:

- More natural reading experience

### Test Autocomplete- Better performance

1. In the chat input, start typing- Closer to real AI chat interfaces

2. See search suggestions appear

3. Use arrow keys to navigate### 5. Sticky Headers with Scroll Detection

4. Press Enter to selectCustom scroll detection logic identifies which question is being viewed:

- Tracks user scroll position

### Test Mentions- Shows relevant question context

1. Type "@" in the chat input- Smooth transitions between questions

2. Type a name (e.g., "@John")

3. Navigate with keyboard## 🧪 Testing the Features

4. Select a user

### Test Streaming & Artifacts

### Test Command Menu1. Create a new chat

1. Press ⌘K (Mac) or Ctrl+K (Windows/Linux)2. Type: "Show me some code"

2. See available commands3. Observe: Streaming response with a code artifact block

3. Use arrow keys to navigate4. Click the expand icon to see full-screen view

4. Execute commands like "New Chat" or "Clear History"

### Test Sticky Headers

---1. Ask multiple questions (try "long detailed response")

2. Scroll through the long answers

## 🚀 Deployment3. Observe: The question stays pinned at the top



### Deploy to Vercel (Recommended)### Test Mentions

1. In the chat input, type "@"

1. **Push your code to GitHub**2. Type any name (e.g., "@John")

   ```bash3. Use arrow keys to navigate

   git add .4. Press Enter to select

   git commit -m "Initial commit"

   git push origin main### Test Command Menu

   ```1. Press ⌘K (Mac) or Ctrl+K (Windows/Linux)

2. Select actions like "New Chat" or "Clear History"

2. **Import to Vercel**

   - Go to [vercel.com](https://vercel.com)## 📦 Dependencies

   - Click "New Project"

   - Import your GitHub repository### Core

   - Vercel will auto-detect Next.js- **Next.js 16**: React framework with App Router

- **React 19**: UI library

3. **Add Environment Variable**- **TypeScript 5**: Type safety

   - In Vercel dashboard, go to Settings → Environment Variables

   - Add: `GEMINI_API_KEY` with your API key### UI & Styling

   - Redeploy the application- **Tailwind CSS 4**: Utility-first CSS

- **shadcn/ui**: High-quality component library

4. **Done!** Your app is now live 🎉- **Radix UI**: Accessible component primitives

- **Lucide React**: Beautiful icon set

### Deploy to Other Platforms

### Data Management

The app works on any platform supporting Next.js:- **TanStack React Query 5**: Server state management

- **Netlify**: Connect GitHub repo, add environment variables- **localStorage**: Client-side persistence

- **Railway**: One-click deploy, add env vars

- **AWS Amplify**: Connect repo, configure build settings## 🚀 Deployment

- **Self-hosted**: Build with `pnpm build`, serve with `pnpm start`

### Vercel (Recommended)

---1. Push code to GitHub

2. Import project in Vercel dashboard

## 📝 Environment Variables3. Deploy with default settings



| Variable | Description | Required |### Other Platforms

|----------|-------------|----------|The app works on any platform that supports Next.js:

| `GEMINI_API_KEY` | Google Gemini API key | Yes |- Netlify

- AWS Amplify

Get your API key from [Google AI Studio](https://ai.google.dev/)- Digital Ocean

- Self-hosted

---

## 📝 Environment Variables

## 🐛 Troubleshooting

No environment variables required! The app uses mock APIs for demonstration purposes.

### API Key Issues

- **Error**: "GEMINI_API_KEY not configured"## 🔮 Future Enhancements

  - **Solution**: Ensure `.env.local` exists with valid API key

  - Restart dev server after adding env variables- [ ] Real AI integration (OpenAI, Anthropic, etc.)

- [ ] User authentication

### Port Already in Use- [ ] Cloud sync for chat history

- **Error**: "Port 3000 is already in use"- [ ] Export conversations

  - **Solution**: Use a different port: `PORT=3001 pnpm dev`- [ ] Markdown rendering in messages

- [ ] Syntax highlighting in code artifacts

### Build Errors- [ ] Voice input support

- **Error**: TypeScript errors during build- [ ] Multi-language support

  - **Solution**: Run `pnpm install` to ensure all dependencies are installed

  - Check Node.js version (requires 18+)## 📄 License



### Streaming Not WorkingMIT

- **Error**: Messages not streaming

  - **Solution**: Check browser console for errors## 👤 Author

  - Ensure API key has proper permissions

  - Verify network connectionCreated as part of a technical assessment to demonstrate modern React development practices, TypeScript proficiency, and attention to detail in UI/UX design.



------



## 🔮 Future Enhancements**Note**: This is a demonstration project with mock AI responses. For production use, integrate with a real AI API service.


- [ ] User authentication (Auth.js / Clerk)
- [ ] Cloud sync for chat history (Supabase / Firebase)
- [ ] Export conversations (PDF, Markdown)
- [ ] Code syntax highlighting in messages
- [ ] Image support in chat
- [ ] Voice input support
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Markdown rendering improvements
- [ ] File upload and analysis

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 👤 Author

**Pratik Khaire**
- GitHub: [@PratikKhaire](https://github.com/PratikKhaire)

---

## 🙏 Acknowledgments

- Inspired by [Claude](https://claude.ai) and [Perplexity AI](https://perplexity.ai)
- Built with [shadcn/ui](https://ui.shadcn.com)
- Powered by [Google Gemini](https://ai.google.dev)

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [issue](https://github.com/PratikKhaire/-AI-Chatting-App/issues)
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

---

**⭐ If you find this project helpful, please give it a star on GitHub!**
