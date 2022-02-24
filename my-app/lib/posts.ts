import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { postDataResult } from "../interfaces";

// nodeコマンド実行時のワーキングディレクトリパスを取得して正規化する
const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = (): postDataResult => {
  // ディレクトリの内容を読み取る
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    // パスを正規化する
    const fullPath = path.join(postsDirectory, fileName);
    // ファイルの内容全体を非同期的に読み取る
    const fileContents = fs.readFileSync(fullPath, "utf8");
    // 投稿されたデータをパースする
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult,
    };
  });
  // 日付順に並び替えてリターン
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

// posts配下のファイル名一覧を返す関数
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// idをもとに投稿ブログをレンダリングする
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // マークダウンのコンテンツをHTMLに変換
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // データをidとHTMLコンテンツと組み合わせて返す
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
