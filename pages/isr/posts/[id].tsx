import Head from 'next/head';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPathsContext,
} from 'next';

// pages/isg/posts/[id].tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface ISRProps {
  post: Post;
  timestamp: number; // ISR確認用のタイムスタンプ
}

export default function ISRPostsId({ post, timestamp }: ISRProps) {
  return (
    <div>
      <Head>
        <title>ISRの解説用ページ（Post詳細）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post詳細（ISR）</h1>
        <div>
          <p>Post ID: {post?.id}</p>
          <p>User ID: {post?.userId}</p>
          <p>Title: {post?.title}</p>
          <p>Body: {post?.body}</p>
          <p>ISR確認用のtimestamp値: {timestamp}</p>
        </div>
      </main>
    </div>
  );
}

type ISRParams = {
  id: string;
};
export const getStaticPaths: GetStaticPaths<ISRParams> = async (
  _context: GetStaticPathsContext
) => {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true, // or 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ISRProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as ISRParams;
  const postId = params.id;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = (await res.json()) as Post;

  return {
    props: {
      post,
      timestamp: Date.now(),
    },

    /**
     * https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
     *
     * SSG、もしくはISGでHTMLファイルを生成済みだとしても、
     * revalidateに指定した秒数が経過したあとに再度アクセスがあったときに、
     * HTMLファイルの中身を現在の情報を元に更新をする。
     *
     * revalidateに3をセットした場合の再生成の流れ
     *
     * 1. HTMLファイルが生成された3秒経過するまでは、どんなにアクセスがあっても生成済みのHTMLを返す
     * 2. 3秒経過後の初回アクセスでは、クライアントには現時点での生成済みのHTMLを返しつつ、サーバー側では再生成の処理が行われる
     * 3. HTMLが再生成されたあとは（3秒経過後の2回目以降のアクセス）、再生成後のHTMLがクライアントに返される
     * 4. 1, 2, 3を繰り返す
     */
    revalidate: 3,
  };
};
