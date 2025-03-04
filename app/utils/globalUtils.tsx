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
