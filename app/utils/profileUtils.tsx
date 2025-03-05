import { Dog } from '@/app/lib/definitions';

export function alreadySelected(id: string,
  selectedDogs: Dog[] ): boolean {
  return selectedDogs.some((fave: Dog) => fave.id === id);
}

export function toggleFavoriteDisplay(dog: Dog,
  selectedDogs: Dog[],
  setSelectedDogs: (dogs: Dog[]) => void ): void {
  
  if (alreadySelected(dog.id, selectedDogs)) {
    const updatedFaves = selectedDogs.filter(fave => fave.id !== dog.id);

    setSelectedDogs(updatedFaves)
  } else {
    setSelectedDogs([...selectedDogs, dog]);
  }
}
