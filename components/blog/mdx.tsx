import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLink = (props: any) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image className="rounded-lg" {...props} />;
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return <Component components={{ ...components }} />;
}
