import { NextResponse } from 'next/server';

// Generate mock user data - simulating 1 million users
const generateMockUsers = (count: number = 1000000) => {
  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage', 'Drew'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'dev.com'];

  return Array.from({ length: Math.min(count, 1000) }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[i % lastNames.length].toLowerCase()}@${domains[i % domains.length]}`
  }));
};

const mockUsers = generateMockUsers();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  // Simulate search delay for large dataset
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10); // Limit to 10 results

  return NextResponse.json(filteredUsers);
}