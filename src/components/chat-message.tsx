"use client";

import { Message, Artifact } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Edit, Maximize2, Minimize2, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
}

export function ChatMessage({ message, onCopy, onRegenerate, onEdit }: ChatMessageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedArtifacts, setExpandedArtifacts] = useState<Set<string>>(new Set());

  const handleCopy = useCallback(async (text: string, id?: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id || message.id);
    onCopy?.();
    setTimeout(() => setCopiedId(null), 2000);
  }, [message.id, onCopy]);

  const toggleArtifact = useCallback((artifactId: string) => {
    setExpandedArtifacts(prev => {
      const next = new Set(prev);
      if (next.has(artifactId)) {
        next.delete(artifactId);
      } else {
        next.add(artifactId);
      }
      return next;
    });
  }, []);

  const isUser = message.role === "user";

  return (
    <div className={cn(
      "group relative py-6 px-4 hover:bg-neutral-950/50 transition-colors",
      isUser ? "bg-neutral-950/30" : "bg-black"
    )}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium",
              isUser ? "bg-white text-black" : "bg-neutral-800 text-white"
            )}>
              {isUser ? "U" : "AI"}
            </div>
            <span className="font-medium text-sm">
              {isUser ? "You" : "Assistant"}
            </span>
          </div>

          {/* Actions */}
          {!message.isStreaming && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(message.content)}
                title="Copy message"
              >
                {copiedId === message.id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              {!isUser && onRegenerate && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onRegenerate}
                  title="Regenerate"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              {isUser && onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onEdit}
                  title="Edit message"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pl-11">
          <div className="prose prose-invert max-w-none">
            {message.isStreaming && message.content === "" ? (
              <div className="flex items-center gap-2 text-neutral-500">
                <div className="flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                </div>
                <span className="text-sm">Thinking...</span>
              </div>
            ) : (
              <p className="whitespace-pre-wrap text-neutral-200 leading-relaxed">
                {message.content}
                {message.isStreaming && <span className="inline-block w-1 h-4 bg-white animate-pulse ml-0.5" />}
              </p>
            )}
          </div>

          {/* Artifacts */}
          {message.artifacts && message.artifacts.length > 0 && (
            <div className="mt-6 space-y-4">
              {message.artifacts.map((artifact) => (
                <ArtifactBlock
                  key={artifact.id}
                  artifact={artifact}
                  isExpanded={expandedArtifacts.has(artifact.id)}
                  onToggle={() => toggleArtifact(artifact.id)}
                  onCopy={() => handleCopy(artifact.content, artifact.id)}
                  isCopied={copiedId === artifact.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ArtifactBlockProps {
  artifact: Artifact;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

function ArtifactBlock({ artifact, isExpanded, onToggle, onCopy, isCopied }: ArtifactBlockProps) {
  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950">
      {/* Artifact Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400">
            {artifact.type === "code" ? artifact.language || "code" : "markdown"}
          </span>
          {artifact.title && (
            <>
              <span className="text-neutral-600">•</span>
              <span className="text-sm text-neutral-300">{artifact.title}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onCopy}
          >
            {isCopied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onToggle}
          >
            {isExpanded ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Artifact Content */}
      <div className={cn(
        "transition-all duration-200",
        isExpanded ? "max-h-[600px]" : "max-h-[200px]"
      )}>
        <pre className="overflow-auto p-4 text-sm">
          <code className="text-neutral-300 font-mono">
            {artifact.content}
          </code>
        </pre>
      </div>
    </div>
  );
}
