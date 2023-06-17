import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

type SSGProps = {
  message: string;
};

// SSG向けのページを実装
// NextPageはNext.jsのPages向けの型
// NextPage<props>でpropsが入るPageであることを明示
const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props;
  return (
    <div>
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>
          このページは静的サイト生成によってビルド時に生成されたページです。
        </p>
      </main>
    </div>
  );
};

// getStaticPropsはビルド時に実行される
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timestamp = new Date().toLocaleString();
  const message = `${timestamp}にgetStaticPropsが実行されました`;
  console.log(message);
  return {
    props: {
      message,
    },
  };
};

export default SSG;
