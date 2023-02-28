import PostList from '@/components/blog/post-list';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Blog',
};

const BlogPage = () => {
  return <PostList />;
};

export default BlogPage;
