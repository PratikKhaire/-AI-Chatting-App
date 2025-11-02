"use client";

import { Message } from "@/types/chat";
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  messages: Message[];
  onRegenerate?: (messageId: string) => void;
  onEdit?: (messageId: string, content: string) => void;
}

export function ChatMessages({ messages, onRegenerate, onEdit }: ChatMessagesProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onRegenerate={onRegenerate ? () => onRegenerate(message.id) : undefined}
          onEdit={onEdit ? (content) => onEdit(message.id, content) : undefined}
        />
      ))}
    </div>
  );
}
