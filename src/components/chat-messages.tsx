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
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Start a conversation
          </h2>
          <p className="text-muted-foreground">
            Ask me anything. I&apos;m here to help you with information, analysis, coding, and more.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 px-4 py-6 max-w-4xl mx-auto">
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
