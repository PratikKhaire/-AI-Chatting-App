"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PlusCircle, Trash2, Settings } from "lucide-react";

interface CommandMenuProps {
  createNewSession: () => void;
  clearHistory: () => void;
}

export function CommandMenu({ createNewSession, clearHistory }: CommandMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." className="border-b border-neutral-800" />
      <CommandList className="bg-neutral-950">
        <CommandEmpty className="py-6 text-center text-sm text-neutral-500">
          No results found.
        </CommandEmpty>
        <CommandGroup heading="Actions" className="text-neutral-400">
          <CommandItem onSelect={() => runCommand(createNewSession)} className="cursor-pointer">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Chat</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(clearHistory)} className="cursor-pointer">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Clear History</span>
          </CommandItem>
          <CommandItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
