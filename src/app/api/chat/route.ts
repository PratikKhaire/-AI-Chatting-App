import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content;

    const responseParts = [
      `I understand you're asking about: "${userPrompt}"\n\n`,
      `Let me help you with this. First, let me analyze what you're looking for:\n\n`,
      `Based on your query, here's a comprehensive response:\n\n`,
      `## Key Insights\n\nThe main aspects of your question involve understanding the core concepts and practical applications. Let me break this down for you:\n\n`,
      `### Technical Analysis\n\nHere's a code example that demonstrates the key concepts:\n\n`,
      `\`\`\`typescript
function analyzeQuery(prompt: string): AnalysisResult {
  const keywords = extractKeywords(prompt);
  const intent = determineIntent(prompt);

  return {
    keywords,
    intent,
    confidence: calculateConfidence(keywords, intent),
    suggestions: generateSuggestions(prompt)
  };
}

// Example usage
const result = analyzeQuery("${userPrompt}");
console.log("Analysis result:", result);
\`\`\`\n\n`,
      `### Implementation Details\n\nThis approach helps break down complex queries into manageable components:\n\n1. **Keyword Extraction**: Identifies the main concepts in your query\n2. **Intent Analysis**: Determines what you're trying to achieve\n3. **Confidence Scoring**: Measures how relevant the response is\n4. **Suggestion Generation**: Provides related topics or follow-up questions\n\n`,
      `## Practical Applications\n\nYou can use this pattern in various scenarios:\n\n- **Code Analysis**: Understanding complex codebases\n- **Documentation**: Generating technical documentation\n- **Problem Solving**: Breaking down complex problems\n- **Learning**: Building educational content\n\n`,
      `## Best Practices\n\nWhen working with AI assistants, consider these best practices:\n\n1. **Be Specific**: Clear, specific prompts yield better results\n2. **Iterate**: Refine your questions based on initial responses\n3. **Verify**: Always validate AI-generated code and information\n4. **Learn**: Use responses as learning opportunities\n\n`,
      `## Next Steps\n\nBased on our conversation, you might want to:\n\n- Explore specific technical implementations\n- Dive deeper into particular concepts\n- Try the provided code examples\n- Ask follow-up questions for clarification\n\nLet me know if you'd like me to elaborate on any of these points!\n\nThis should give you a solid foundation for understanding "${userPrompt}". Feel free to ask if you need more specific details or examples!`
    ];

    const responseStream = new ReadableStream({
      async start(controller) {
        await new Promise(resolve => setTimeout(resolve, 500));

        for (const part of responseParts) {
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: part })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
        }

        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ done: true })}\n\n`));
        controller.close();
      }
    });

    return new NextResponse(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}