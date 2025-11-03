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

  const handleSendMessage = async (message: Message) => {
    addMessage(message);
    
    // Create AI response placeholder
    setIsLoading(true);
    
    const aiResponse: Message = {
      id: `ai-${Date.now()}`,
      role: "ai" as const,
      content: "",
      timestamp: Date.now(),
      isStreaming: true,
    };
    
    addMessage(aiResponse);
    
    try {
      // Call the Gemini API via our backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...(activeSession?.messages || []), message]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullContent = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              
              if (data.done) {
                updateMessage(aiResponse.id, { isStreaming: false });
                setIsLoading(false);
              } else if (data.content) {
                fullContent += data.content;
                updateMessage(aiResponse.id, { content: fullContent });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      updateMessage(aiResponse.id, {
        content: `❌ Error: ${error instanceof Error ? error.message : 'Failed to get response'}. Please check your GEMINI_API_KEY in .env.local file.`,
        isStreaming: false
      });
      setIsLoading(false);
    }
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
