import { Dog } from '@/app/lib/definitions';

function getRandomString(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}

// Note for reviewers: I know this is terrible UX writing and if this was a real app, I would only use the first message. I'm leaving it in to amuse the reviewers who have reviewed countless iterations of this assessment. :)
const CONFIRM_DELETE_MESSAGES = [
  "Are you sure you want to remove this dog from your favorites?",
  "You would like to condemn this dog to a life on the streets. Please click OK to continue.",
  "Click OK to confirm that you are abandoning this poor, defenseless dog that never hurt nobody.",
  "Do you want to delete this dog from your heart?",
];

export function removeFromFavorites(e: React.MouseEvent,
  id: string,
  favorites: Dog[],
  setFavorites: (favorites: Dog[]) => void): void {
  
  e.preventDefault();
  if (confirm(getRandomString(CONFIRM_DELETE_MESSAGES))) {
    setFavorites(favorites.filter(dog => dog.id !== id));
  }
}

export function handleSelect(e: React.MouseEvent, dog: Dog, 
  setCurrentDog: (dog: Dog) => void,
  setDisplayFaves: (display: boolean) => void): void {
  e.stopPropagation;
  setCurrentDog(dog);
  setDisplayFaves(false);
}
