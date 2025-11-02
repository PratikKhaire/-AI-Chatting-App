"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";
import { CommandMenu } from "@/components/command-menu";
import { ChatSessionContext, useChatSessionState } from "@/hooks/use-chat-session";
import React from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatSession = useChatSessionState();

  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <QueryProvider>
          {/* create a single shared chat session instance and provide it */}
          <ChatSessionContext.Provider value={chatSession}>
            {children}
            <CommandMenu
              createNewSession={chatSession.createNewSession}
              clearHistory={chatSession.clearHistory}
            />
          </ChatSessionContext.Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
