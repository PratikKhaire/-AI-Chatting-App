"use client";

import { Message } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Copy, RotateCw, Edit2, Check, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
  onEdit?: (content: string) => void;
}

export function ChatMessage({ message, onRegenerate, onEdit }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isUser = message.role === "user";
  const hasCodeBlock = message.content.includes("```");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Enhanced markdown-like rendering for code blocks
  const renderContent = () => {
    if (!hasCodeBlock) {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap leading-7 text-[15px]">{message.content}</p>
        </div>
      );
    }

    const parts = message.content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```(\w+)?\n?/g, "").replace(/```$/g, "");
        const language = part.match(/```(\w+)/)?.[1] || "text";
        
        return (
          <div key={index} className="my-4 group/code relative">
            <div className={cn(
              "rounded-xl border overflow-hidden transition-all backdrop-blur-sm glass",
              "border-border/50",
              isExpanded ? "shadow-xl ring-2 ring-primary/10 shadow-glow" : "shadow-sm"
            )}>
              <div className="flex items-center justify-between bg-muted/50 px-4 py-2.5 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm shadow-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm shadow-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm shadow-green-500/50" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2 tracking-wide">{language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-7 px-2 text-xs"
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 text-xs"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <pre className={cn(
                "p-4 overflow-x-auto bg-card/50 text-sm font-mono",
                isExpanded ? "max-h-[600px]" : "max-h-[400px]"
              )}>
                <code className="text-foreground/90">{code}</code>
              </pre>
            </div>
          </div>
        );
      }
      return (
        <div key={index} className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap leading-7 text-[15px]">{part}</p>
        </div>
      );
    });
  };

  return (
    <div className={cn(
      "group relative py-8 px-4 sm:px-6 animate-fade-in-up transition-colors duration-300",
      isUser ? "bg-transparent" : "bg-linear-to-br from-purple-50/30 via-white to-blue-50/20"
    )}>
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Avatar and Name */}
        <div className="flex items-start gap-4">
          <div className={cn(
            "flex items-center justify-center rounded-xl shrink-0 transition-all duration-300",
            "w-9 h-9 sm:w-10 sm:h-10",
            isUser 
              ? "bg-linear-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lovable-lg hover:shadow-glow" 
              : "bg-linear-to-br from-accent/20 via-accent/10 to-muted text-foreground lovable-border hover:shadow-lovable"
          )}>
            {isUser ? (
              <User className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            ) : (
              <Sparkles className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            )}
          </div>

          <div className="flex-1 space-y-2 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <span className={cn(
                "text-sm font-bold tracking-tight",
                isUser ? "gradient-text-primary" : "gradient-text-accent"
              )}>
                {isUser ? "You" : "Assistant"}
              </span>
              {message.timestamp && (
                <span className="text-xs text-muted-foreground/70">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="text-foreground/90">
              {message.isStreaming ? (
                <span className="inline-flex items-center gap-1">
                  <span className="text-[15px] leading-7">{message.content}</span>
                  <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5" />
                </span>
              ) : (
                renderContent()
              )}
            </div>

            {/* Action Buttons - Only for AI messages */}
            {!isUser && !message.isStreaming && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-3 text-xs gap-1.5 hover:bg-accent/10 rounded-lg transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-primary" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </Button>
                {onRegenerate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRegenerate}
                    className="h-8 px-3 text-xs gap-1.5 hover:bg-accent/10 rounded-lg transition-all duration-200"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    Regenerate
                  </Button>
                )}
              </div>
            )}

            {/* Edit Button - Only for User messages */}
            {isUser && !message.isStreaming && onEdit && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(message.content)}
                  className="h-8 px-3 text-xs gap-1.5 hover:bg-muted"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
