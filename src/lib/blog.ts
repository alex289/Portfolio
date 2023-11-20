import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { BlogPost } from './types';

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  return matter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: {
        ...data,
      },
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  const posts = getMDXData(path.join(process.cwd(), 'src/content'));

  const formattedPosts: BlogPost[] = posts.map((post) => {
    return {
      content: post.content,
      title: post.metadata.title,
      translation: post.metadata.translation,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      language: post.metadata.language,
      tags: post.metadata.tags,
      slug: post.slug,
      readingTime: '',
    };
  });

  return formattedPosts;
}
