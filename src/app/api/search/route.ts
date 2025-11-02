import { NextResponse } from 'next/server';

const mockData = [
  'next.js', 'react', 'typescript', 'tailwindcss', 'shadcn/ui',
  'react query', 'javascript', 'html', 'css', 'web development'
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const results = mockData.filter(item => item.toLowerCase().includes(query.toLowerCase()));

  return NextResponse.json(results);
}
