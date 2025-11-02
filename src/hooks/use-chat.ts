"use client";

import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    if (message.role === 'user') {
      mockAIResponse(message.content);
    }
  };

  const mockAIResponse = (userInput: string) => {
    const aiResponse: Message = {
      id: Date.now().toString(),
      role: 'ai',
      content: '',
    };
    setMessages((prevMessages) => [...prevMessages, aiResponse]);

    const responseText = `This is a streamed response to: "${userInput}"`;
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < responseText.length) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiResponse.id
              ? { ...msg, content: msg.content + responseText[currentIndex] }
              : msg
          )
        );
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  return { messages, addMessage };
}
