import PostList from '@/components/blog/post-list';
import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Blog',
};

const BlogPage = () => {
  return <PostList allBlogs={allBlogs} />;
};

export default BlogPage;
