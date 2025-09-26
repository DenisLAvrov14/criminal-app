// next-app-env.d.ts
import type { ParsedUrlQuery } from 'querystring';

// Declare the module that Next’s stub is trying to import
declare module 'next/types/app' {
  // Match Next’s internal PageProps signature
  export type PageProps<
    Params extends ParsedUrlQuery = ParsedUrlQuery,
    SearchParams extends ParsedUrlQuery = ParsedUrlQuery,
  > = {
    // In Next 14+ these can be a promise for async params
    params: Params | Promise<Params>;
    searchParams?: SearchParams;
  };
}
