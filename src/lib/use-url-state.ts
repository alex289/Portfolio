'use client';

import {
  type ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
  usePathname,
} from 'next/navigation';

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
      params.delete(key);
    }

    router.push(createUrl(pathname, params));
  }

  return [searchParams.get(key), setUrlState];
}
