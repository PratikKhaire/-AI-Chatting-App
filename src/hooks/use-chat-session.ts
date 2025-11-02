"use client";

import { useState, useEffect, createContext } from 'react';
import { Message } from '@/types/chat';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

export interface ChatSessionState {
  sessions: ChatSession[];
  activeSession: ChatSession | undefined;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  clearHistory: () => void;
}

export const ChatSessionContext = createContext<ChatSessionState | null>(null);

export function useChatSessionState() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== 'undefined') {
      const storedSessions = localStorage.getItem('chatSessions');
      if (storedSessions) {
        return JSON.parse(storedSessions);
      }
    }
    return [];
  });

  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeSessionId');
    }
    return null;
  });

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(sessions));
    } else {
      localStorage.removeItem('chatSessions');
    }
  }, [sessions]);

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('activeSessionId', activeSessionId);
    } else {
      localStorage.removeItem('activeSessionId');
    }
  }, [activeSessionId]);

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    };
    setSessions((prevSessions) => [...prevSessions, newSession]);
    setActiveSessionId(newSession.id);
  };

  const switchSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  const clearHistory = () => {
    setSessions([]);
    setActiveSessionId(null);
  };

  const activeSession = sessions.find((session) => session.id === activeSessionId);

  const addMessage = (message: Message) => {
    if (activeSession) {
      const updatedSession = {
        ...activeSession,
        messages: [...activeSession.messages, message],
      };
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === activeSessionId ? updatedSession : session
        )
      );
    } else {
      // If no active session, create one automatically
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [message],
      };
      setSessions((prevSessions) => [...prevSessions, newSession]);
      setActiveSessionId(newSession.id);
    }
  };

  const updateMessage = (messageId: string, updates: Partial<Message>) => {
    if (activeSession) {
      const updatedSession = {
        ...activeSession,
        messages: activeSession.messages.map((msg) =>
          msg.id === messageId ? { ...msg, ...updates } : msg
        ),
      };
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === activeSessionId ? updatedSession : session
        )
      );
    }
  };

  return { sessions, activeSession, createNewSession, switchSession, addMessage, updateMessage, clearHistory };
}
