import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Message } from "@/types/chat";
import { Autocomplete } from "./autocomplete";

export function ChatInput({ addMessage }: { addMessage: (message: Message) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({ id: Date.now().toString(), role: "user", content: input });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <div className="w-full">
        <Autocomplete value={input} onChange={setInput} />
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
}
