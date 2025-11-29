import {
  QueryClient,
  type DefaultError,
  type EnsureQueryDataOptions,
  type QueryKey,
} from '@tanstack/react-query';
import { QUERIES_DEFAULT_STALE_TIME } from '~/constants';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: QUERIES_DEFAULT_STALE_TIME } },
});

export function ensureQueryData<
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: EnsureQueryDataOptions<TQueryFnData, TError, TData, TQueryKey>) {
  queryClient.ensureQueryData(options).catch((error) => {
    console.error('Error prefetching query data', error);
  });
}
