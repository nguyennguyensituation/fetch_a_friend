export const BASE_URL = "https://frontend-take-home-service.fetch.com";

export function formatList(list: string[]): string {
  const pluralList = list.map(dog => dog + 's');
  
  if (list.length === 1) {
    return pluralList[0];
  } else if (list.length === 2) {
    return `${pluralList[0]} and ${pluralList[1]}`;
  } else {
    // List formatted with Oxford comma
    return `${pluralList.slice(0, -1).join(', ')}, and ${pluralList[list.length - 1]}`;
  }
}

export function getAgeDisplay(age: number): string {
  if (age < 1) {
    return "Less than a year old"
  } else if (age === 1) {
    return "1 year old"
  } else {
    return `${age} years old`
  }
}

// Returns a grammatically correct 'a' or 'an'
export function getArticle(str: string): string {
  // Vowels or number words that start with vowels
  const chars: { [key: string]: boolean } = {
    'a': true,
    'e': true,
    'i': true,
    'o': true,
    'u': true,
    '8': true,
    '11': true,
    '18': true
  }

  const firstChar = str[0].toLowerCase();
  const firstTwoChars = str.slice(0, 2).toLowerCase();

  return (chars[firstChar] || chars[firstTwoChars]) ? 'an' : 'a';
}
