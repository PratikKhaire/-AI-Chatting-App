"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChatSession } from "@/hooks/use-chat-session";

interface ResponsiveSidebarProps {
  sessions: ChatSession[];
  activeSession: ChatSession | undefined;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
  clearHistory?: () => void;
}

export function ResponsiveSidebar(props: ResponsiveSidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <Sidebar {...props} />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar {...props} />
      </SheetContent>
    </Sheet>
  );
}
