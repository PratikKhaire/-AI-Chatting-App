"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { cn } from "@/lib/utils";

async function fetchSearchResults(query: string, type: 'search' | 'mentions') {
  if (!query) return [];
  const endpoint = type === 'search' ? 'search' : 'mentions';
  const res = await fetch(`/api/${endpoint}?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  disabled?: boolean;
  placeholder?: string;
}

export function Autocomplete({ 
  value, 
  onChange, 
  onKeyDown,
  textareaRef,
  disabled,
  placeholder = "Ask anything or type @ for mentions..."
}: AutocompleteProps) {
  const [manuallyOpen, setManuallyOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract @ mention query
  const mentionMatch = value.match(/@(\w*)$/);
  const searchType = mentionMatch ? 'mentions' : 'search';
  const query = mentionMatch ? mentionMatch[1] : value.trim();

  const { data: results, isLoading } = useQuery({
    queryKey: [searchType, query],
    queryFn: () => fetchSearchResults(query, searchType),
    enabled: query.length > 0 && (searchType === 'mentions' || value.length > 2),
    staleTime: 60000, // Cache for 1 minute
  });

  const hasResults = !!(results && results.length > 0 && query.length > 0);
  const isOpen = hasResults && manuallyOpen;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const hasResults = !!(results && results.length > 0);
    
    if (hasResults && isOpen) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % results.length);
          return;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
          return;
        case "Enter":
          if (activeIndex !== -1) {
            e.preventDefault();
            if (searchType === 'mentions') {
              const selectedValue = value.replace(/@\w*$/, `@${results[activeIndex]} `);
              onChange(selectedValue);
            } else {
              onChange(results[activeIndex]);
            }
            setManuallyOpen(false);
            return;
          }
          break;
        case "Escape":
          e.preventDefault();
          setManuallyOpen(false);
          return;
      }
    }
    
    // Pass through to parent handler
    onKeyDown?.(e);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <strong className="font-semibold text-foreground">{match}</strong>
        {after}
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        className={cn(
          "w-full resize-none rounded-md bg-transparent px-4 py-3",
          "text-sm leading-relaxed",
          "placeholder:text-muted-foreground",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "max-h-[200px] overflow-y-auto"
        )}
      />
      
      {isOpen && results && results.length > 0 && (
        <Popover open={isOpen} onOpenChange={setManuallyOpen}>
          <PopoverContent 
            className="w-full p-1 max-w-md"
            align="start"
            side="top"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="text-xs text-muted-foreground px-3 py-2 border-b">
              {isLoading ? "Searching..." : `${results.length} result${results.length === 1 ? '' : 's'}`}
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {results.map((result: string, index: number) => (
                <li
                  key={result}
                  className={cn(
                    "px-3 py-2 cursor-pointer transition-colors text-sm rounded-md mx-1 my-0.5",
                    index === activeIndex 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent/50"
                  )}
                  onClick={() => {
                    if (searchType === 'mentions') {
                      const selectedValue = value.replace(/@\w*$/, `@${result} `);
                      onChange(selectedValue);
                    } else {
                      onChange(result);
                    }
                    setManuallyOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {searchType === 'mentions' && <span className="text-muted-foreground mr-1">@</span>}
                  {highlightMatch(result, query)}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
