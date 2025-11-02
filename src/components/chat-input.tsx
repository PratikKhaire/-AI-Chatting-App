"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Message } from "@/types/chat";
import { Autocomplete } from "./autocomplete";
import { Send } from "lucide-react";

export function ChatInput({ addMessage }: { addMessage: (message: Message) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ 
      id: `user-${Date.now()}`, 
      role: "user", 
      content: input 
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 w-full max-w-4xl mx-auto">
      <div className="flex-1">
        <Autocomplete value={input} onChange={setInput} />
      </div>
      <Button 
        type="submit" 
        disabled={!input.trim()}
        className="h-10 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
