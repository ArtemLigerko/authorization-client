export type LE<T> = T & {
  isLoading?: boolean;
  error?: string | Error;
};

export interface Pagination<T = object> {
  docs: Array<T>;
  // limit: number;
  // hasNextPage?: boolean;
  // page: number;
  // nextPage?: number;
  // init?: boolean;
}
