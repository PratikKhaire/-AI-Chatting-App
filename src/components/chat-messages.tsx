"use client";

import { Message } from "@/types/chat";
import { ChatMessage } from "./chat-message";
import { useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: Message[];
  onRegenerate?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
}

export function ChatMessages({ messages, onRegenerate, onEdit }: ChatMessagesProps) {
  const [stickyQuestion, setStickyQuestion] = useState<Message | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerTop = container.getBoundingClientRect().top;
      
      // Find all user messages
      const userMessages = messages.filter(msg => msg.role === "user");
      
      // Find the topmost visible user message
      let currentSticky: Message | null = null;
      
      for (const userMsg of userMessages) {
        const element = messageRefs.current.get(userMsg.id);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const relativeTop = rect.top - containerTop;
        
        // If the message is scrolled past the top (above viewport)
        if (relativeTop < 80) {
          currentSticky = userMsg;
        } else {
          // Once we find a message that's not scrolled past, stop
          break;
        }
      }
      
      setStickyQuestion(currentSticky);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [messages]);

  const setMessageRef = (id: string, el: HTMLDivElement | null) => {
    if (el) {
      messageRefs.current.set(id, el);
    } else {
      messageRefs.current.delete(id);
    }
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto relative"
    >
      {/* Sticky Question Header */}
      {stickyQuestion && (
        <div className="sticky top-0 z-20 bg-black border-b border-neutral-800 shadow-lg">
          <div className="max-w-4xl mx-auto py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-medium">
                U
              </div>
              <p className="text-sm text-neutral-300 line-clamp-1">
                {stickyQuestion.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="divide-y divide-neutral-900">
        {messages.map((message) => (
          <div
            key={message.id}
            ref={(el) => setMessageRef(message.id, el)}
          >
            <ChatMessage
              message={message}
              onRegenerate={
                message.role === "ai" && onRegenerate
                  ? () => onRegenerate(message.id)
                  : undefined
              }
              onEdit={
                message.role === "user" && onEdit
                  ? () => onEdit(message.id)
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
