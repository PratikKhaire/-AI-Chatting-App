"use client";

import { Loader2 } from "lucide-react";

export function ThinkingLoader() {
  return (
    <div className="flex items-center gap-3 px-4 py-6 max-w-4xl mx-auto animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
        AI
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">Thinking...</span>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
