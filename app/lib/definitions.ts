export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export type Query = {
  breeds: string[],
  sort: { breed: string}
}

export type PageNavUrls = {
  next: string,
  prev: string
}