import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';

// pages/ssg/index.tsxのコードと共通している部分が多いが、
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している。
//
// また、
// この中身のファイルは実質pages/sssg/index.tsxと同じで、
// ISG解説用のサンプルコードのメインはpages/isg/posts/[id].tsxとなる

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface ISGProps {
  posts: Post[];
}

export default function ISG({ posts }: ISGProps) {
  return (
    <div>
      <Head>
        <title>ISGの解説用ページ（Postリンク一覧）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Postのリンク一覧</h1>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/isg/posts/${post.id}`}>{post.title}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ISGProps> = async (
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
