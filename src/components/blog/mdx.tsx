/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import Image, { type ImageProps } from 'next/image';

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import {
  type ReactNode,
  type AnchorHTMLAttributes,
  createElement,
} from 'react';
import { highlight } from 'sugar-high';

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
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
  const { alt, ...rest } = props;
  return <Image alt={alt} className="rounded-lg" {...rest} />;
}

function Code({ children, ...props }: { children: ReactNode }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Table({ data }: { data: { headers: string[]; rows: unknown[][] } }) {
  const headers = data.headers.map((header: string, index: number) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map(
    (row: unknown[], index: React.Key | null | undefined) => (
      <tr key={index}>
        {row.map((cell: any, cellIndex) => (
          <td key={cellIndex}>{cell}</td>
        ))}
      </tr>
    ),
  );

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function slugify(str: ReactNode) {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return (
    str!
      .toString()
      .toLowerCase()
      .trim() // Remove whitespace from both ends of a string
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
      // eslint-disable-next-line no-useless-escape
      .replace(/\-\-+/g, '-')
  ); // Replace multiple - with single -
}

function createHeading(level: number) {
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => {
    const slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children,
    );
  };
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  // Callout,
  // ProsCard,
  // ConsCard,
  code: Code,
  Table,
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  );
}
