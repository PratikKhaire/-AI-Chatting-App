"use client";

import { ChatSession } from "@/hooks/use-chat-session";
import { Button } from "./ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  sessions: ChatSession[];
  activeSession: ChatSession | undefined;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
}

export function Sidebar({ sessions, activeSession, createNewSession, switchSession }: SidebarProps) {
  return (
    <div className="hidden md:flex md:w-64 bg-neutral-950 border-r border-neutral-800 flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <Button 
          onClick={createNewSession} 
          className="w-full bg-white text-black hover:bg-neutral-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-2">
        {sessions.length === 0 ? (
          <div className="p-4 text-center text-neutral-500 text-sm">
            No chats yet. Start a new conversation!
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors group",
                  "hover:bg-neutral-900",
                  activeSession?.id === session.id 
                    ? "bg-neutral-900 border border-neutral-700" 
                    : "border border-transparent"
                )}
                onClick={() => switchSession(session.id)}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-neutral-400" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">
                      {session.title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {session.messages.length} {session.messages.length === 1 ? 'message' : 'messages'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800">
        <p className="text-xs text-neutral-600 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-xs">⌘K</kbd> for commands
        </p>
      </div>
    </div>
  );
}
