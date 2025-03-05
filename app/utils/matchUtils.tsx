import { Dog } from '@/app/lib/definitions';
import { BASE_URL } from '@/app/utils/globalUtils';

function formatIds(favorites: Dog[]): string {
  const ids = favorites.map(dog => dog.id);
  return JSON.stringify(ids);
}

export async function getMatch(e: React.MouseEvent,
  favorites: Dog[],
  setHeroDog: (dog: Dog) => void ): Promise<void> {
  e.preventDefault();

  try {
    // Get matching Dog ID
    const matchPath = '/dogs/match';
    const matchResponse = await fetch(BASE_URL + matchPath, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: formatIds(favorites)
    });

    if (!matchResponse.ok) {
      throw new Error('Failed to get a match');
    }

    // Get Dog object
    const matchData = await matchResponse.json();
    const heroId = matchData.match;
    const dogsPath = "/dogs";
    const dogResponse = await fetch(BASE_URL + dogsPath, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([heroId])
    })

    if (!dogResponse.ok) {
      throw new Error('Failed to get a match');
    }

    const dogData = await dogResponse.json();
    setHeroDog(dogData[0]);
  } catch {
    throw new Error("Failed to get a match");
  }
}
