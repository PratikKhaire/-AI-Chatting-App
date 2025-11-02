export interface Artifact {
  id: string;
  type: "code" | "markdown";
  content: string;
  language?: string;
  title?: string;
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isStreaming?: boolean;
  artifacts?: Artifact[];
}
