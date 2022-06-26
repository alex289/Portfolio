import Image from 'next/future/image';

import { useTheme } from 'next-themes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImageWithTheme(props: any) {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      alt={props.alt}
      src={resolvedTheme === 'light' ? props.light : props.dark}
      {...props}
    />
  );
}
