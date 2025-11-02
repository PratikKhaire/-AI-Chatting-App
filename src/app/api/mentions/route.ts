import { NextResponse } from 'next/server';

// Generator function to simulate 1 million users efficiently
function* generateMockUsers(query: string, limit: number = 10) {
  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 
    'William', 'Jennifer', 'James', 'Mary', 'Richard', 'Patricia', 'Charles',
    'Linda', 'Joseph', 'Barbara', 'Thomas', 'Elizabeth', 'Christopher', 'Susan',
    'Daniel', 'Jessica', 'Matthew', 'Karen', 'Anthony', 'Nancy', 'Mark', 'Betty'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
  ];
  
  const queryLower = query.toLowerCase();
  let count = 0;
  
  // Generate combinations to simulate 1M users (30 * 30 * 1111 ≈ 1M)
  for (let i = 0; i < 1111 && count < limit; i++) {
    for (const firstName of firstNames) {
      if (count >= limit) break;
      
      for (const lastName of lastNames) {
        if (count >= limit) break;
        
        const suffix = i > 0 ? ` ${i}` : '';
        const fullName = `${firstName} ${lastName}${suffix}`;
        
        // Check if name matches query
        if (fullName.toLowerCase().includes(queryLower)) {
          count++;
          yield fullName;
          
          if (count >= limit) break;
        }
      }
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 1) {
    return NextResponse.json([]);
  }

  // Simulate slight delay for realism
  await new Promise(resolve => setTimeout(resolve, 50));

  const results = Array.from(generateMockUsers(query, 20));

  return NextResponse.json(results);
}
