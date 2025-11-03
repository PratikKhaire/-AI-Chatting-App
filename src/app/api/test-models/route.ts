import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // List available models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      models: data.models?.map((m: { name: string; displayName: string; supportedGenerationMethods: string[] }) => ({
        name: m.name,
        displayName: m.displayName,
        supportedMethods: m.supportedGenerationMethods
      })) || []
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
