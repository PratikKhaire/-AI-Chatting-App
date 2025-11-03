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

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content;

    // Use Gemini 2.5 Flash - stable model available with your API key
    const model = 'gemini-2.5-flash';
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: userPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { 
          error: errorData.error?.message || 'Failed to get response from AI'
        },
        { status: geminiResponse.status }
      );
    }

    const data = await geminiResponse.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    // Stream the response word by word
    const words = aiText.split(' ');
    
    const responseStream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? words[i] : ' ' + words[i]);
          controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 30));
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