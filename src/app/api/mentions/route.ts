import { NextResponse } from 'next/server';

const mockData = [
  'John Doe', 'Jane Smith', 'Peter Jones', 'Susan Williams', 'David Brown',
  'Emily Davis', 'Michael Miller', 'Sarah Wilson', 'Robert Moore', 'Jessica Taylor'
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
