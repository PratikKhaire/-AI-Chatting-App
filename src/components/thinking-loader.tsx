"use client";

import { Loader2, Sparkles } from "lucide-react";

export function ThinkingLoader() {
  return (
    <div className="py-8 px-4 sm:px-6 animate-fade-in bg-linear-to-br from-purple-50/30 via-white to-blue-50/20">
      <div className="mx-auto max-w-3xl relative z-10">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex items-center justify-center rounded-xl w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br from-accent/20 via-accent/10 to-muted text-foreground lovable-border shadow-lovable shrink-0">
            <Sparkles className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </div>

          {/* Loading content */}
          <div className="flex-1 space-y-3 pt-0.5">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold gradient-text-accent">Assistant</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span className="text-xs gradient-text">Thinking</span>
              </div>
            </div>

            {/* Skeleton lines */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <div className="h-2.5 bg-linear-to-r from-muted/70 to-muted/30 rounded-full animate-shimmer shadow-sm" style={{ width: '85%' }} />
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <div className="h-2.5 bg-linear-to-r from-muted/60 to-muted/20 rounded-full animate-shimmer shadow-sm" style={{ width: '70%', animationDelay: '100ms' }} />
              <div className="h-2.5 bg-linear-to-r from-muted/50 to-muted/10 rounded-full animate-shimmer shadow-sm" style={{ width: '90%', animationDelay: '200ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
