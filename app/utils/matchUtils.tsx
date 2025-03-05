import { Dog } from '@/app/lib/definitions';
import { BASE_URL } from '@/app/utils/globalUtils';
import { getDogData } from './dogUtils';

function formatIds(selectedDogs: Dog[]): string {
  const ids = selectedDogs.map(dog => dog.id);

  return JSON.stringify(ids);
}

export async function getMatch(e: React.MouseEvent,
  selectedDogs: Dog[],
  setHeroDog: (dog: Dog) => void ): Promise<void> {
  e.preventDefault();

  try {
    // Get Hero dog ID
    const path = '/dogs/match';
    const response = await fetch(BASE_URL + path, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: formatIds(selectedDogs)
    });

    if (!response.ok) {
      throw new Error('Failed to get a match');
    }

    // Get Hero Dog object
    const matchData = await response.json();
    const heroId = matchData.match;
    const dogData = await getDogData([heroId]);

    setHeroDog(dogData[0]);
  } catch {
    throw new Error("Failed to get a match");
  }
}
