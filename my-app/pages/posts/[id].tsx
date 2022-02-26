import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { postData } from "../../interfaces";

export async function getStaticProps({ params }: { params: { id: string } }) {
  // 非同期で実行できるようにawaitを追加
  const data = await getPostData(params.id);
  return {
    props: {
      data,
    },
  };
}
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ data }: { data: postData }) {
  return (
    <Layout>
      {data.title}
      <br />
      {data.id}
      <br />
      {data.date}
      <br />
      {/* dangerouslySetInnerHTMLを使用してcontentHtmlをレンダリングすることにより、Reactから安全にHTMLを生成する */}
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </Layout>
  );
}
