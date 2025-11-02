"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { ResponsiveSidebar } from "@/components/responsive-sidebar";
import { ChatSessionContext } from "@/hooks/use-chat-session";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThinkingLoader } from "@/components/thinking-loader";
import { Message } from "@/types/chat";
import { useContext, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Home() {
  const chatSession = useContext(ChatSessionContext);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!chatSession) {
    throw new Error("ChatSessionContext is not available");
  }
  
  const { sessions, activeSession, createNewSession, switchSession, addMessage, clearHistory } = chatSession;

  const handleSendMessage = (message: Message) => {
    addMessage(message);
    
    // Simulate AI response with delay
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse = {
        id: `ai-${Date.now()}`,
        role: "ai" as const,
        content: `This is a simulated AI response to: "${message.content}"\n\nHere's an example with code:\n\n\`\`\`typescript\nfunction greet(name: string) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));\n\`\`\`\n\nYou can expand or collapse the code block above.`,
        timestamp: Date.now(),
      };
      addMessage(aiResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background">
      <ResponsiveSidebar
        sessions={sessions}
        activeSession={activeSession}
        createNewSession={createNewSession}
        switchSession={switchSession}
        clearHistory={clearHistory}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center gap-3 border-b bg-card/50 backdrop-blur px-6 shrink-0">
          <div className="md:hidden">
            <ResponsiveSidebar
              sessions={sessions}
              activeSession={activeSession}
              createNewSession={createNewSession}
              switchSession={switchSession}
              clearHistory={clearHistory}
            />
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">AI Assistant</h1>
          </div>
          {activeSession && activeSession.messages.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {activeSession.messages.length} messages
            </span>
          )}
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
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Welcome to AI Assistant</h2>
              <p className="text-muted-foreground leading-relaxed">
                Start a new conversation or select a previous chat from the sidebar.
                I can help you with coding, analysis, writing, and much more.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
