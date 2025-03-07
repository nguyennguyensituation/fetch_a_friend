import { Dog } from '@/app/lib/definitions';

export function removeFromFavorites(e: React.MouseEvent,
  id: string,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void): void {
  
  e.preventDefault();
  if (confirm("Are you sure you want to remove this dog from your favorites?")) {
    setFavorites(favorites.filter(dog => dog.id !== id));
  }
}

export function handleSelect(e: React.MouseEvent, dog: Dog, 
  setCurrentDog: (dog: Dog) => void,
  setDisplayFaves: (display: boolean) => void): void {
  e.stopPropagation();
  setCurrentDog(dog);
  setDisplayFaves(false);
}
