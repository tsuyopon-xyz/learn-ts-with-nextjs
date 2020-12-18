import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';

// pages/isg/index.tsxのコードと共通している部分が多いが、
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している。
//
// また、
// この中身のファイルは実質pages/isr/index.tsxと同じで、
// ISR解説用のサンプルコードのメインはpages/isr/posts/[id].tsxとなる

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface ISRProps {
  posts: Post[];
}

export default function ISR({ posts }: ISRProps) {
  return (
    <div>
      <Head>
        <title>ISRの解説用ページ（Postリンク一覧）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Postのリンク一覧</h1>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link
                  // https://nextjs.org/docs/api-reference/next/link
                  // "next/link" はデフォルトでリンク先のデータの取得(prefetch)やISGを実行させてしまう
                  // ISGの動作確認がわかりやすいように、ここではprefetchの機能をオフにしている
                  prefetch={false}
                  href={`/isr/posts/${post.id}`}
                >
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ISRProps> = async (
  _context: GetStaticPropsContext
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await res.json()) as Post[];

  return {
    props: {
      posts,
    },
  };
};
