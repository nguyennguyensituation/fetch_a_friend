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

  setNextPrev(defaultNextPrev);
  setCurrentPage(1);
  setQueries({
    breeds: selectedBreeds,
    sort: { breed: sortBreeds ? sortBreeds : 'asc'}
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
  const defaultOption = isMin ?'0' : '25';
  const ages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  return (
    <>
      <option value={defaultOption}>Any age</option>
      {ages.map((num, idx) => {
        return <option key={idx} value={num}>{num}</option>;
      })}
    </>
  );
}
