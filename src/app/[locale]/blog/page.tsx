import PostList from '@/components/blog/post-list';
import { getBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Blog',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

const BlogPage = () => {
  return <PostList allBlogs={getBlogPosts()} />;
};

export default BlogPage;
