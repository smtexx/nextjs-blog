import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getStoredPostsData() {
   const fileNames = fs.readdirSync(postsDirectory);
   // Process post files
   const allPostsData = fileNames.map((fileName) => {
      // Get post ID from file name
      const id = fileName.replace(/\.md$/, '');
      // Read post file
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      // Parse data from file content
      const parsedData = matter(fileContent);

      return {
         id,
         ...parsedData.data,
      };
   });

   // Sorting posts by date
   return allPostsData.sort(({ date: a }, { date: b }) => a - b);
}

export function getAllPostIds() {
   const fileNames = fs.readdirSync(postsDirectory);

   return fileNames.map((fileName) => ({
      params: {
         id: fileName.replace(/\.md$/, ''),
      },
   }));
}

export async function getPostData(id) {
   const fullPath = path.join(postsDirectory, `${id}.md`);
   const fileContent = fs.readFileSync(fullPath, 'utf-8');
   const parsedData = matter(fileContent);

   const processedContent = await remark()
      .use(html)
      .process(parsedData.content);
   const contentHtml = processedContent.toString();

   return {
      id,
      contentHtml,
      ...parsedData.data,
   };
}
