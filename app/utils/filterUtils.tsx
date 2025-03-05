import { Query, PageNavUrls } from '@/app/lib/definitions';
import { BASE_URL } from './globalUtils';
import { defaultNextPrev } from '@/app/utils/dogUtils';

export const breedPlaceholder = (<option>Loading breeds...</option>);

// Populates data for breeds dropdown menu
export async function fetchBreeds(setBreeds: (breeds: string[]) => void): Promise<void> {
  const path = "/dogs/breeds";
  const res = await fetch(BASE_URL + path, { credentials: 'include' });

  if (res.ok) {
    const data = await res.json();

    setBreeds(data);
  } else {
    throw new Error("There was an error getting the list of dog breeds");
  }
}

export function handleQuery(event: React.FormEvent,
  setQueries: (queries: Query) => void,
  setNextPrev: (urls: PageNavUrls) => void,
  setCurrentPage: (page: number) => void) {
  const formData = new FormData(event.target as HTMLFormElement);
  const selectedBreeds = formData.getAll('selectedBreeds') as string[];
  const sortBreeds = formData.get('sortBreeds') as string;
  const ageMin = Number(formData.get('ageMin'));
  const ageMax = Number(formData.get('ageMax'));

  setNextPrev(defaultNextPrev);
  setCurrentPage(1);
  setQueries({
    breeds: selectedBreeds,
    sort: { breed: sortBreeds ? sortBreeds : 'asc'},
    ageMin: ageMin,
    ageMax: ageMax
  });
}

export function getBreedOptions(breeds?: string[]) {
  return (
    <>
      <option value='any'>Any breed</option>
      {breeds?.map((breed, idx) => <option key={idx} value={breed}>{breed}</option>)}
    </>
  );
}

export function getAgeOptions(isMin: boolean) {
  const defaultAge = isMin ? '0' : '31';
  // Fun fact: The oldest dog on record was Bobi, a Rafeiro do Alentejo who lived to 31 years old. RIP Bobi.
  const DOG_AGES = Array.from({ length: 32 }, (_, i) => i);

  return (
    <>
      <option value={defaultAge}>Any age</option>
      {DOG_AGES.map((num, idx) => {
        return <option key={idx} value={num}>{num}</option>;
      })}
    </>
  );
}
