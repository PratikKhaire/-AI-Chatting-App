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

export default function Home() {
  const chatSession = useContext(ChatSessionContext);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    // Mock response text
    const fullResponse = `This is a simulated AI response to: "${message.content}"\n\nHere's an example with code:\n\n\`\`\`typescript\nfunction greet(name: string) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));\n\`\`\`\n\nYou can expand or collapse the code block above. This is a longer response to demonstrate the streaming effect token by token.`;
    
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
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lovable-lg shadow-glow-accent transition-all duration-300 hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight gradient-text-accent">AI Assistant</h1>
              {activeSession && activeSession.messages.length > 0 && (
                <p className="text-xs text-muted-foreground/70">
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
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-primary/15 via-primary/10 to-primary/5 mb-4 shadow-lovable-lg shadow-glow-accent transition-all duration-500 hover:scale-105 hover:shadow-glow">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight gradient-text-accent">Welcome to AI Assistant</h2>
                <p className="text-muted-foreground/80 leading-relaxed text-base max-w-md mx-auto">
                  Start a new conversation or select a previous chat from the sidebar.
                  I can help you with coding, analysis, writing, and much more.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  onClick={createNewSession}
                  size="lg"
                  className="gap-2.5 shadow-lovable-lg shadow-glow hover:shadow-glow-accent transition-all duration-300 hover:scale-105 rounded-xl h-12 px-6 font-semibold"
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
