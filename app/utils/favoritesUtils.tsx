import { Dog } from '@/app/lib/definitions';

export function removeFromFavorites(e: React.MouseEvent,
  id: string,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void) {
  e.preventDefault();

  const updatedFaves = favorites.filter(dog => dog.id !== id);
  setFavorites(updatedFaves);
}