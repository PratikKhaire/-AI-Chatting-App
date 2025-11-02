"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Message } from "@/types/chat";
import { Autocomplete } from "./autocomplete";
import { Send, Loader2, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  addMessage: (message: Message) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ addMessage, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;

    addMessage({ 
      id: `user-${Date.now()}`, 
      role: "user", 
      content: input.trim(),
      timestamp: Date.now()
    });
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="border-t bg-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className={cn(
            "relative flex items-end gap-3 rounded-2xl border-2 bg-card/50 shadow-lg transition-all duration-200",
            "focus-within:border-primary/50 focus-within:shadow-xl focus-within:shadow-primary/5",
            "hover:border-border/80"
          )}>
            {/* Attach button */}
            <div className="p-3 pb-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl hover:bg-muted/80 transition-colors"
                disabled={disabled || isLoading}
              >
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>

            {/* Input */}
            <div className="flex-1 min-w-0 py-3">
              <Autocomplete 
                value={input} 
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                textareaRef={textareaRef}
                disabled={disabled || isLoading}
                placeholder={
                  isLoading 
                    ? "Waiting for response..." 
                    : "Ask anything... (@ to mention)"
                }
              />
            </div>

            {/* Send button */}
            <div className="p-3 pb-3">
              <Button 
                type="submit" 
                disabled={!input.trim() || isLoading || disabled}
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-xl transition-all duration-200",
                  input.trim() && !isLoading && !disabled
                    ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105"
                    : "bg-muted"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </form>
        
        {/* Helper text */}
        <div className="flex items-center justify-between mt-3 px-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-2 py-1 text-[10px] font-mono bg-muted/50 border rounded">Enter</kbd>
            <span>to send</span>
            <span className="text-muted-foreground/50">•</span>
            <kbd className="px-2 py-1 text-[10px] font-mono bg-muted/50 border rounded">Shift + Enter</kbd>
            <span>for new line</span>
          </div>
          {input.length > 0 && (
            <span className="text-muted-foreground/70">
              {input.length} characters
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
