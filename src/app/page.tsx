"use client";

import { ChatInput } from "@/components/chat-input";
import { ChatMessages } from "@/components/chat-messages";
import { ResponsiveSidebar } from "@/components/responsive-sidebar";
import { useChatSession } from "@/hooks/use-chat-session";

export default function Home() {
  const { sessions, activeSession, createNewSession, switchSession, addMessage, regenerateResponse } = useChatSession();

  return (
    <div className="flex h-screen bg-black text-white">
      <ResponsiveSidebar
        sessions={sessions}
        activeSession={activeSession}
        createNewSession={createNewSession}
        switchSession={switchSession}
      />
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-neutral-800 px-6">
          <div className="md:hidden">
            <ResponsiveSidebar
              sessions={sessions}
              activeSession={activeSession}
              createNewSession={createNewSession}
              switchSession={switchSession}
            />
          </div>
          <h1 className="text-lg font-semibold">AI Chat</h1>
        </header>
        {activeSession ? (
          <>
            <ChatMessages 
              messages={activeSession.messages} 
              onRegenerate={regenerateResponse}
            />
            <div className="border-t border-neutral-800 p-4">
              <ChatInput addMessage={addMessage} />
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to AI Chat</h2>
              <p className="text-neutral-400 mb-6">Select a chat or create a new one to start.</p>
              <button
                onClick={createNewSession}
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
