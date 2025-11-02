"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

async function fetchSearchResults(query: string, type: 'search' | 'mentions') {
  if (!query) return [];
  const endpoint = type === 'search' ? 'search' : 'mentions';
  const res = await fetch(`/api/${endpoint}?q=${query}`);
  return res.json();
}

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export function Autocomplete({ value, onChange }: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchType, setSearchType] = useState<'search' | 'mentions'>('search');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.startsWith('@')) {
      setSearchType('mentions');
    } else {
      setSearchType('search');
    }
  }, [value]);

  const query = searchType === 'mentions' ? value.substring(1) : value;

  const { data: results, isLoading } = useQuery({
    queryKey: [searchType, query],
    queryFn: () => fetchSearchResults(query, searchType),
    enabled: query.length > 0,
  });

  useEffect(() => {
    if (results && results.length > 0) {
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setIsOpen(false);
    }
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || !results) return;

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
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <strong className="font-bold">{match}</strong>
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
        />
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {isLoading && <div className="p-2">Loading...</div>}
        {results && results.length > 0 && (
          <ul className="max-h-60 overflow-y-auto">
            {results.map((result: string, index: number) => (
              <li
                key={result}
                className={`p-2 cursor-pointer ${
                  index === activeIndex ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
                onClick={() => {
                  const selectedValue = searchType === 'mentions' ? `@${result}` : result;
                  onChange(selectedValue);
                  setIsOpen(false);
                }}
              >
                {highlightMatch(result, query)}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
