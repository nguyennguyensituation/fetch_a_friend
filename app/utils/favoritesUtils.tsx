import { Dog } from '@/app/lib/definitions';

function getRandomString(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}

export function removeFromFavorites(e: React.MouseEvent,
  id: string,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void): void {
  const messages = [
    "Are you sure you want to remove this dog from your favorites?",
    "You would like to condemn this dog to a life on the streets. Please click OK to continue.",
    "Click OK to confirm that you are abandoning this poor, defenseless dog that never hurt nobody.",
    "Do you want to delete this dog from your heart?",
  ]
  
  e.preventDefault();
  if (confirm(getRandomString(messages))) {
    setFavorites(favorites.filter(dog => dog.id !== id));
  }
}
