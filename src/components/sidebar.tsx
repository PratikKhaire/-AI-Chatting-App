"use client";

import { ChatSession } from "@/hooks/use-chat-session";
import { Button } from "./ui/button";
import { Plus, MessageSquare, Trash2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface SidebarProps {
  sessions: ChatSession[];
  activeSession: ChatSession | undefined;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
  clearHistory?: () => void;
}

export function Sidebar({ 
  sessions, 
  activeSession, 
  createNewSession, 
  switchSession,
  clearHistory 
}: SidebarProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Group sessions by date
  const groupedSessions = sessions.reduce((acc, session) => {
    const label = formatDate(session.id);
    if (!acc[label]) acc[label] = [];
    acc[label].push(session);
    return acc;
  }, {} as Record<string, ChatSession[]>);

  return (
    <div className="w-[280px] h-full border-r bg-card/50 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-linear-to-b from-background/80 to-transparent">
        <Button 
          onClick={createNewSession} 
          className={cn(
            "w-full gap-2 font-medium shadow-sm",
            "bg-primary hover:bg-primary/90",
            "transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
          )}
          size="lg"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-6">
          {sessions.length === 0 ? (
            <div className="px-3 py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 mb-3">
                <MessageSquare className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No chats yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Start a new conversation
              </p>
            </div>
          ) : (
            Object.entries(groupedSessions).map(([label, groupSessions]) => (
              <div key={label} className="space-y-1">
                <h3 className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {label}
                </h3>
                <div className="space-y-0.5">
                  {groupSessions.map((session) => (
                    <button
                      key={session.id}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                        "hover:bg-accent/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        activeSession?.id === session.id
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-foreground/70 hover:text-foreground"
                      )}
                      onClick={() => switchSession(session.id)}
                    >
                      <div className="flex items-start gap-2.5">
                        <MessageSquare className={cn(
                          "h-4 w-4 mt-0.5 shrink-0 transition-colors",
                          activeSession?.id === session.id 
                            ? "text-accent-foreground" 
                            : "text-muted-foreground group-hover:text-foreground"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-[13px] font-medium truncate leading-tight",
                            activeSession?.id === session.id && "font-semibold"
                          )}>
                            {session.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {session.messages.length} {session.messages.length === 1 ? 'message' : 'messages'}
                          </p>
                        </div>
                        <ChevronRight className={cn(
                          "h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                          activeSession?.id === session.id && "opacity-100"
                        )} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      {sessions.length > 0 && clearHistory && (
        <div className="p-3 border-t bg-linear-to-t from-background/80 to-transparent">
          <Button 
            onClick={clearHistory}
            variant="ghost" 
            className={cn(
              "w-full gap-2 text-muted-foreground hover:text-destructive",
              "hover:bg-destructive/10 transition-all duration-200"
            )}
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Chats
          </Button>
        </div>
      )}
    </div>
  );
}
