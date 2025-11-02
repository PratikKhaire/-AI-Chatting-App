import { NextResponse } from 'next/server';

// Generator function to create names on-the-fly
// This simulates 1 million names without storing them all in memory
function* generateNames() {
  const firstNames = [
    'James', 'John', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
    'Emily', 'Ashley', 'Kimberly', 'Michelle', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Dorothy', 'Lisa'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
  ];
  
  const suffixes = ['', ' Jr', ' Sr', ' II', ' III', ' IV'];
  
  let count = 0;
  const maxCount = 1000000;
  
  // Generate unique combinations
  for (const firstName of firstNames) {
    for (const lastName of lastNames) {
      for (const suffix of suffixes) {
        for (let i = 0; i < 105; i++) { // Multiplier to reach 1M
          const name = `${firstName} ${lastName}${suffix}${i > 0 ? ` ${i}` : ''}`;
          yield name;
          count++;
          if (count >= maxCount) return;
        }
      }
    }
  }
}

// Fast search through generated names
function searchNames(query: string, limit: number = 20): string[] {
  if (!query) return [];
  
  const results: string[] = [];
  const lowerQuery = query.toLowerCase();
  const generator = generateNames();
  
  // Early exit optimization: if query starts with a specific letter,
  // we can skip many iterations
  for (const name of generator) {
    if (name.toLowerCase().includes(lowerQuery)) {
      results.push(name);
      if (results.length >= limit) break;
    }
    
    // Performance optimization: stop after checking enough names
    // In a real app, you'd use a proper search index (Elasticsearch, etc.)
    if (results.length === 0 && name > query.charAt(0).toUpperCase() + 'zzzz') {
      break;
    }
  }
  
  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '20');

  if (!query) {
    // Return some default suggestions
    return NextResponse.json([
      'James Smith', 'Mary Johnson', 'John Williams', 'Patricia Brown', 
      'Robert Jones', 'Jennifer Garcia', 'Michael Miller', 'Linda Davis'
    ]);
  }

  // Simulate slight delay for more realistic API behavior
  await new Promise(resolve => setTimeout(resolve, 50));

  const results = searchNames(query, limit);

  return NextResponse.json(results);
}
