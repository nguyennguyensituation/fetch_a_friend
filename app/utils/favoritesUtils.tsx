import { Dog } from '@/app/lib/definitions';

export function removeFromFavorites(e: React.MouseEvent,
  id: string,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void): void {
  e.preventDefault();
  setFavorites(favorites.filter(dog => dog.id !== id));
}