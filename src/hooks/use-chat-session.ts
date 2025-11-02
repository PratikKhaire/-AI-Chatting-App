"use client";

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Message, Artifact } from '@/types/chat';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

// Internal hook that manages the chat session state
export function useChatSessionState() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedSessions = localStorage.getItem('chatSessions');
    const storedActiveSessionId = localStorage.getItem('activeSessionId');
    
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
    if (storedActiveSessionId) {
      setActiveSessionId(storedActiveSessionId);
    }
  }, []);

  // Persist sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
    } else {
      localStorage.removeItem('chatSessions');
    }
  }, [sessions]);

  // Persist active session ID
  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('activeSessionId', activeSessionId);
    } else {
      localStorage.removeItem('activeSessionId');
    }
  }, [activeSessionId]);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    };
    setSessions((prevSessions) => [...prevSessions, newSession]);
    setActiveSessionId(newSession.id);
  }, []);

  const switchSession = useCallback((sessionId: string) => {
    setActiveSessionId(sessionId);
  }, []);

  const clearHistory = useCallback(() => {
    setSessions([]);
    setActiveSessionId(null);
  }, []);

  const activeSession = sessions.find((session) => session.id === activeSessionId);

  const streamResponse = useCallback((messageId: string, response: { text: string; artifacts?: Artifact[] }) => {
    const words = response.text.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        const newContent = words.slice(0, currentIndex + 1).join(' ');
        
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === activeSessionId
              ? {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === messageId
                      ? { ...msg, content: newContent }
                      : msg
                  ),
                }
              : session
          )
        );
        
        currentIndex++;
      } else {
        // Streaming complete
        clearInterval(interval);
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.id === activeSessionId
              ? {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === messageId
                      ? { 
                          ...msg, 
                          isStreaming: false,
                          artifacts: response.artifacts 
                        }
                      : msg
                  ),
                }
              : session
          )
        );
      }
    }, 50); // 50ms delay between words for smooth streaming
  }, [activeSessionId]);

  const generateAIResponse = useCallback((userInput: string) => {
    if (!activeSessionId) return;

    // Create AI message with streaming state
    const aiMessageId = `ai-${Date.now()}`;
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'ai',
      content: '',
      isStreaming: true,
    };

    // Add the AI message
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId
          ? { ...session, messages: [...session.messages, aiMessage] }
          : session
      )
    );

    // Generate response with artifacts based on keywords
    const response = generateMockResponse(userInput);
    
    // Stream the response
    streamResponse(aiMessageId, response);
  }, [activeSessionId, streamResponse]);

  const addMessage = useCallback((message: Message) => {
    if (!activeSessionId) return;

    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, message],
              title: session.messages.length === 0 ? message.content.slice(0, 50) : session.title,
            }
          : session
      )
    );

    // If it's a user message, trigger AI response
    if (message.role === 'user') {
      generateAIResponse(message.content);
    }
  }, [activeSessionId, generateAIResponse]);

  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    if (!activeSessionId) return;

    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: session.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
              ),
            }
          : session
      )
    );
  }, [activeSessionId]);

  const deleteMessage = useCallback((messageId: string) => {
    if (!activeSessionId) return;

    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: session.messages.filter((msg) => msg.id !== messageId),
            }
          : session
      )
    );
  }, [activeSessionId]);

  const regenerateResponse = useCallback((messageId: string) => {
    if (!activeSessionId) return;

    // Find the message and the previous user message
    const session = sessions.find(s => s.id === activeSessionId);
    if (!session) return;

    const messageIndex = session.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    // Find the previous user message
    let userMessage: Message | undefined;
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (session.messages[i].role === 'user') {
        userMessage = session.messages[i];
        break;
      }
    }

    if (!userMessage) return;

    // Delete the old AI message
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: session.messages.filter((msg) => msg.id !== messageId),
            }
          : session
      )
    );

    // Generate a new response
    setTimeout(() => {
      generateAIResponse(userMessage!.content);
    }, 100);
  }, [activeSessionId, sessions, generateAIResponse]);

  return { 
    sessions, 
    activeSession, 
    createNewSession, 
    switchSession, 
    addMessage, 
    updateMessage,
    deleteMessage,
    regenerateResponse,
    clearHistory 
  };
}

// Generate mock response with artifacts based on input
function generateMockResponse(input: string): { text: string; artifacts?: Artifact[] } {
  const lowerInput = input.toLowerCase();
  
  // Check for code-related keywords
  if (lowerInput.includes('code') || lowerInput.includes('function') || lowerInput.includes('implement')) {
    return {
      text: `Here's a solution to your request. I've created a code example that demonstrates the concept you're asking about. The implementation follows best practices and includes proper error handling. You can toggle the code view to see it in full screen or inline mode.`,
      artifacts: [
        {
          id: `artifact-${Date.now()}`,
          type: 'code',
          language: 'typescript',
          title: 'Example Implementation',
          content: `function exampleFunction(param: string): string {
  // Process the input
  const result = param.toUpperCase();
  
  // Add some validation
  if (!result) {
    throw new Error('Invalid input');
  }
  
  return result;
}

// Usage example
const output = exampleFunction('hello world');
console.log(output); // HELLO WORLD`,
        },
      ],
    };
  }

  // Check for markdown/documentation keywords
  if (lowerInput.includes('explain') || lowerInput.includes('how to') || lowerInput.includes('guide')) {
    return {
      text: `I'll explain this concept in detail. Let me break it down into clear sections to make it easier to understand. I've also created a markdown document with additional resources and examples.`,
      artifacts: [
        {
          id: `artifact-${Date.now()}`,
          type: 'markdown',
          title: 'Detailed Guide',
          content: `# Understanding the Concept

## Overview
This is a comprehensive guide to help you understand the topic.

## Key Points
1. First important point
2. Second important point
3. Third important point

## Examples
Here are some practical examples to illustrate the concept.

## Resources
- Documentation link
- Tutorial link
- Related articles`,
        },
      ],
    };
  }

  // Generate a long response for testing sticky headers
  if (lowerInput.includes('long') || lowerInput.includes('detailed')) {
    return {
      text: `This is a comprehensive response to demonstrate the sticky question header feature. ${Array(20).fill('I will provide detailed information about your query, including multiple aspects and considerations that need to be addressed.').join(' ')} This extensive answer allows you to see how the question stays pinned at the top as you scroll through the response, similar to how Perplexity AI handles long answers. The sticky header ensures you always have context about what question is being answered, which significantly improves the user experience when dealing with lengthy explanations.`,
    };
  }

  // Default response
  return {
    text: `Thank you for your question about "${input}". I understand what you're asking, and I'm here to help. This is a simulated response that demonstrates the streaming capability of the chat interface. Each word appears with a slight delay to create a natural typing effect, similar to how Claude and Perplexity AI display their responses. The streaming provides better user feedback and makes the interaction feel more dynamic and engaging.`,
  };
}

// Context to provide the single session instance to the app
export const ChatSessionContext = React.createContext<ReturnType<typeof useChatSessionState> | null>(null);

// Consumer hook — components (pages, UI) call this to access the shared session
export function useChatSession() {
  const ctx = useContext(ChatSessionContext);
  if (!ctx) {
    throw new Error('useChatSession must be used within a ChatSessionContext provider');
  }
  return ctx;
}
