import { Query, PageNavUrls } from '@/app/lib/definitions';

export const defaultQuery: Query = {
  breeds: ['any'],
  sort: { breed: 'asc'}
}

export const defaultNextPrev: PageNavUrls = {
  next: '',
  prev: ''
}
