import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { type BlogPost } from './types';
import readingTime from 'reading-time';

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  return matter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      content,
      slug,
      title: data.title as string,
      translation: data.translation as string,
      publishedAt: data.publishedAt as string,
      summary: data.summary as string,
      language: data.language as string,
      tags: data.tags as string[],
      readingTime: readingTime(content).text,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'src/content'));
}
