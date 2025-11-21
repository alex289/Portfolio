import 'server-only';

import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import readingTime from 'reading-time';

import { type BlogPost } from './types';

let cachedBlogPosts: BlogPost[] | null = null;

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  return matter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  try {
    const mdxFiles = getMDXFiles(dir);

    return mdxFiles.map((file) => {
      const { data, content } = readMDXFile(path.join(dir, file));
      const slug = path.basename(file, path.extname(file));

      if (!data.title || !data.publishedAt || !data.summary || !data.language) {
        throw new Error(`Missing required metadata in ${file}`);
      }

      return {
        content,
        slug,
        title: data.title as string,
        translation: data.translation as string,
        summary: data.summary as string,
        publishedAt: data.publishedAt as string,
        language: data.language as string,
        tags: (data.tags as string[]) || [],
        readingTime: Math.round(readingTime(content).minutes),
      };
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getBlogPosts() {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }
  
  cachedBlogPosts = getMDXData(path.join(process.cwd(), 'src/content'));
  return cachedBlogPosts;
}
