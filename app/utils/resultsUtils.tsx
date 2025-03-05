import { Dog } from '@/app/lib/definitions';
import { alreadySelected } from '@/app/utils/profileUtils';

export function selectFromCard(e: React.MouseEvent,
  data: Dog,
  selectedDogs: Dog[],
  setSelectedDogs: (selection: Dog[]) => void) {
  e.stopPropagation();

  if (alreadySelected(data.id, selectedDogs)) {
    setSelectedDogs(selectedDogs.filter(dog => dog.id !== data.id));
  } else {
    setSelectedDogs([...selectedDogs, data]);
  }
}
