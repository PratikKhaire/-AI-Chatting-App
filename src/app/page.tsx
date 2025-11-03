"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { ResponsiveSidebar } from "@/components/responsive-sidebar";
import { ChatSessionContext } from "@/hooks/use-chat-session";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThinkingLoader } from "@/components/thinking-loader";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";
import { useContext, useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { BackgroundDecoration } from "@/components/background-decoration";
import { StickyQuestionHeader } from "@/components/sticky-question-header";

export default function Home() {
  const chatSession = useContext(ChatSessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stickyQuestion] = useState<{isVisible: boolean; question: string}>({
    isVisible: false,
    question: ""
  });
  
  if (!chatSession) {
    throw new Error("ChatSessionContext is not available");
  }
  
  const { sessions, activeSession, createNewSession, switchSession, addMessage, updateMessage, clearHistory } = chatSession;

  const handleSendMessage = (message: Message) => {
    addMessage(message);
    
    // Simulate AI response with streaming
    setIsLoading(true);
    
    const aiResponse: Message = {
      id: `ai-${Date.now()}`,
      role: "ai" as const,
      content: "",
      timestamp: Date.now(),
      isStreaming: true,
    };
    
    addMessage(aiResponse);
    
    // TODO: Replace with real AI API integration
    // This will be replaced with actual API calls to OpenAI, Anthropic, or other AI services
    let fullResponse = "";
    const question = message.content.toLowerCase();
    
    if (question.includes("pi") || question.includes("π")) {
      fullResponse = `The value of pi (π) is approximately **3.14159265359**.

Pi is a mathematical constant representing the ratio of a circle's circumference to its diameter. It's an irrational number, meaning it has an infinite number of decimal places without repeating.

Here are some interesting facts about pi:
- It's been calculated to over 31 trillion digits
- The first 10 digits: 3.1415926535
- Pi Day is celebrated on March 14th (3/14)

In programming, you can use pi like this:

\`\`\`javascript
const pi = Math.PI;
console.log(pi); // 3.141592653589793

// Calculate circle area
const radius = 5;
const area = pi * radius * radius;
console.log(\`Area: \${area}\`); // Area: 78.53981633974483
\`\`\``;
    } else if (question.includes("hello") || question.includes("hi")) {
      fullResponse = `Hello! 👋 I'm your AI assistant. I'm here to help you with:

- Programming and coding questions
- Technical explanations
- Problem solving
- Data analysis
- And much more!

How can I assist you today?`;
    } else if (question.includes("code") || question.includes("function")) {
      fullResponse = `I can help you with coding! Here's an example function:

\`\`\`typescript
function calculateSum(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const total = calculateSum(numbers);
console.log(total); // 15
\`\`\`

This function takes an array of numbers and returns their sum. Would you like me to explain any specific programming concept?`;
    } else {
      fullResponse = `I understand you're asking about: "${message.content}"

This is a simulated response. In a production environment, this would connect to a real AI API like OpenAI's GPT-4, Claude, or similar services.

Here's a code example related to API integration:

\`\`\`typescript
async function callAI(prompt: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: prompt })
  });
  
  return await response.json();
}
\`\`\`

Feel free to ask me anything else!`;
    }
    
    let currentIndex = 0;
    const words = fullResponse.split(' ');
    
    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const updatedContent = words.slice(0, currentIndex + 1).join(' ');
        updateMessage(aiResponse.id, { content: updatedContent });
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        updateMessage(aiResponse.id, { isStreaming: false });
        setIsLoading(false);
      }
    }, 50);
  };

  return (
    <div className="flex h-screen bg-background relative">
      <BackgroundDecoration />
      <StickyQuestionHeader 
        question={stickyQuestion.question} 
        isVisible={stickyQuestion.isVisible} 
      />
      <ResponsiveSidebar
        sessions={sessions}
        activeSession={activeSession}
        createNewSession={createNewSession}
        switchSession={switchSession}
        clearHistory={clearHistory}
      />
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">{/* Header */}
        {/* Header */}
        <header className="flex h-16 items-center gap-3 border-b lovable-border bg-white/80 backdrop-blur-xl px-6 shrink-0 shadow-lovable">
          <div className="md:hidden">
            <ResponsiveSidebar
              sessions={sessions}
              activeSession={activeSession}
              createNewSession={createNewSession}
              switchSession={switchSession}
              clearHistory={clearHistory}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-300 hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground">AI Assistant</h1>
              {activeSession && activeSession.messages.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {activeSession.messages.length} messages
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Chat Area */}
        {activeSession ? (
          <>
            <ScrollArea className="flex-1 overflow-y-auto">
              <ChatMessages 
                messages={activeSession.messages}
                onRegenerate={(id) => console.log("Regenerate:", id)}
                onEdit={(id, content) => console.log("Edit:", id, content)}
              />
              {isLoading && <ThinkingLoader />}
            </ScrollArea>
            <ChatInput addMessage={handleSendMessage} isLoading={isLoading} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 relative overflow-hidden">
            <div className="text-center space-y-8 max-w-lg animate-fade-in-up relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 mb-4 shadow-sm transition-all duration-500 hover:scale-105">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">Welcome to AI Assistant</h2>
                <p className="text-muted-foreground leading-relaxed text-base max-w-md mx-auto">
                  Start a new conversation or select a previous chat from the sidebar.
                  I can help you with coding, analysis, writing, and much more.
                </p>
              </div>
              <div className="pt-2 flex flex-row gap-5  justify-center">
                <Button
                  onClick={createNewSession}
                  size="lg"
                  className="gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 rounded-xl h-12 px-6 font-semibold"
                >
                  <span> Chat Now</span>
                </Button>
                <Button
                  onClick={createNewSession}
                  size="lg"
                  className="gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 rounded-xl h-12 px-6 font-semibold bg-black text-white"
                >
                  <Plus className="h-5 w-5" />
                  <span>Start New Chat</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
