import { NextResponse } from 'next/server';

const mockData = [
  'next.js', 'react', 'typescript', 'tailwindcss', 'shadcn/ui',
  'react query', 'javascript', 'html', 'css', 'web development',
  'components', 'hooks', 'api routes', 'typescript', 'javascript',
  'react hooks', 'context api', 'usestate', 'useeffect', 'custom hooks'
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const results = mockData
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10); // Limit results to 10

  return NextResponse.json(results);
}
