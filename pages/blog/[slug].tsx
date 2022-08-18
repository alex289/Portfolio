import { MDXRemote } from 'next-mdx-remote';

import components from '@/components/blog/MDXComponents';
import BlogLayout from '@/components/blog/Layout';

import { postQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { sanityClient, getClient } from '@/lib/sanity/sanity-server';
import { mdxToHtml } from '@/lib/mdx';

import type { GetStaticProps } from 'next';
import type { Post } from '@/lib/types';

export default function BlogPosts({ post }: { post: Post }) {
  return (
    <BlogLayout post={post}>
      <MDXRemote
        {...post.content}
        components={{
          ...components,
        }}
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postSlugsQuery);
  return {
    paths: paths.map(
      ({ slug, language }: { slug: string; language: string }) => ({
        params: { slug },
        locale: language,
      })
    ),
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview = false,
}) => {
  const { post } = await getClient(preview).fetch(postQuery, {
    slug: params?.slug,
  });

  if (!post || post.language !== locale) {
    return {
      notFound: true,
    };
  }

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
};
