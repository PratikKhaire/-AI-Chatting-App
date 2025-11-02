"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useMemo } from "react";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
}

export function Autocomplete({ value, onChange }: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchType = useMemo(() => {
    return value.startsWith('@') ? 'mentions' : 'search';
  }, [value]);

  const query = searchType === 'mentions' ? value.substring(1) : value;

  const { data: results, isLoading, error } = useQuery({
    queryKey: [searchType, query],
    queryFn: () => fetchSearchResults(query, searchType),
    enabled: query.length > 0,
    staleTime: 60000, // Cache for 1 minute
  });

  // Compute if dropdown should be open (removed unused variable)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const hasResults = !!(results && results.length > 0);
    if (!hasResults || !isOpen || !results) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case "Enter":
        if (activeIndex !== -1) {
          e.preventDefault();
          const selectedValue = searchType === 'mentions' ? `@${results[activeIndex]}` : results[activeIndex];
          onChange(selectedValue);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
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
        <strong className="font-bold text-white">{match}</strong>
        {after}
      </>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask anything or type @ for mentions..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-neutral-950 border-neutral-800 focus:border-neutral-700 text-white placeholder:text-neutral-500"
        />
      </PopoverTrigger>
      <PopoverContent 
        className="w-[--radix-popover-trigger-width] p-0 bg-neutral-950 border-neutral-800"
        align="start"
      >
        {isLoading && (
          <div className="p-3 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
              Searching...
            </div>
          </div>
        )}
        {error && (
          <div className="p-3 text-sm text-red-400">
            Error loading results
          </div>
        )}
        {results && results.length > 0 && (
          <ul className="max-h-60 overflow-y-auto">
            {results.map((result: string, index: number) => (
              <li
                key={result}
                className={`p-3 cursor-pointer transition-colors border-b border-neutral-900 last:border-b-0 ${
                  index === activeIndex 
                    ? "bg-neutral-900" 
                    : "hover:bg-neutral-900/50"
                }`}
                onClick={() => {
                  const selectedValue = searchType === 'mentions' ? `@${result}` : result;
                  onChange(selectedValue);
                  setIsOpen(false);
                }}
              >
                <span className="text-sm text-neutral-300">
                  {highlightMatch(result, query)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
