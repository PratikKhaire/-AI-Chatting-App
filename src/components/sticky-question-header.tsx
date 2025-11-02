"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface StickyQuestionHeaderProps {
  question: string;
  isVisible: boolean;
}

export function StickyQuestionHeader({ question, isVisible }: StickyQuestionHeaderProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isVisible) {
      // Small delay for smooth transition
      timeout = setTimeout(() => setShow(true), 100);
    } else {
      timeout = setTimeout(() => setShow(false), 0);
    }
    return () => clearTimeout(timeout);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 z-40 transition-all duration-300",
        "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm",
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-3 max-w-3xl">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shrink-0">
            <User className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium text-foreground truncate flex-1">
            {question}
          </p>
        </div>
      </div>
    </div>
  );
}
