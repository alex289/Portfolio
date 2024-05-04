'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { ReadonlyURLSearchParams } from 'next/navigation';

const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function useUrlState<T>(
  key: string,
): [string | null, (value?: T) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function setUrlState(value?: T) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value.toString());
    } else {
      // eslint-disable-next-line drizzle/enforce-delete-with-where -- This is not drizzle
      params.delete(key);
    }

    router.push(createUrl(pathname, params));
  }

  return [searchParams.get(key), setUrlState];
}
