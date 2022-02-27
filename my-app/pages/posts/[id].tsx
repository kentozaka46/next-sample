import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { postData } from "../../interfaces";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

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
      <Head>{data.title}</Head>
      <article>
        <h1 className={utilStyles.headingXl}>{data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
      </article>
    </Layout>
  );
}
