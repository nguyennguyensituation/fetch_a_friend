export const BASE_URL = "https://frontend-take-home-service.fetch.com";

export function formatList(list: string[]): string {
  if (list.length === 1) {
    return list[0];
  } else if (list.length === 2) {
    return `${list[0]} and ${list[1]}}`;
  } else {
    // List formatted with Oxford comma
    return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
  }
}

export function getAgeDisplay(age: number): string {
  if (age < 1) {
    return "Under a year old"
  } else if (age === 1) {
    return "1 year old"
  } else {
    return `${age} years old`
  }
}

export function getArticle(str: string): string {
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
