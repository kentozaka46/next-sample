import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { postDataResult } from "../interfaces";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = (): postDataResult => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult,
    };
  });
  return JSON.parse(
    JSON.stringify(
      allPostsData.sort((a, b) => {
        if (a.data.date < b.data.date) {
          return 1;
        } else {
          return -1;
        }
      })
    )
  );
};
