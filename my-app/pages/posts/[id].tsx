import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { postData } from "../../interfaces";

export async function getStaticProps({ params }: { params: { id: string } }) {
  const data = getPostData(params.id);
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
    </Layout>
  );
}
