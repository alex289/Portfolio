import { MDXRemote } from 'next-mdx-remote';
import components from '@/components/blog/MDXComponents';
import BlogLayout from '@/components/blog/Layout';

import { postQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { sanityClient, getClient } from '@/lib/sanity/sanity-server';
import { mdxToHtml } from 'lib/mdx';
import { Post } from 'lib/types';

export default function Post({ post }: { post: Post }) {
  return (
    <BlogLayout post={post}>
      <MDXRemote
        {...post.content}
        components={
          {
            ...components,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any
        }
      />
    </BlogLayout>
  );
}

type Paths = {
  params: {
    slug: string;
  };
  locale: string;
};

// DONT FORGET I18N
export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, preview = false }: any) {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });
  const { html, readingTime } = await mdxToHtml(post.content);

  return {
    props: {
      post: {
        ...post,
        content: html,
        readingTime,
      },
    },
  };
}
