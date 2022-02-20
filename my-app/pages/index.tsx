import type { NextPage } from "next";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { postDataResult } from "../interfaces";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home: NextPage<{ allPostsData: Array<postDataResult> }> = ({
  allPostsData,
}: {
  allPostsData: Array<postDataResult>;
}) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((post) => (
            <li className={utilStyles.listItem} key={post.id}>
              {post.data.title}
              <br />
              {post.id}
              <br />
              {post.data.date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;
