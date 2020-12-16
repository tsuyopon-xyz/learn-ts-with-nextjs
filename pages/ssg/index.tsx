import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';

// ./posts/[id].tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface SSGProps {
  posts: Post[];
}

export default function SSG({ posts }: SSGProps) {
  return (
    <div>
      <Head>
        <title>SSGの解説用ページ（Postリンク一覧）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Postのリンク一覧</h1>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/ssg/posts/${post.id}`}>{post.title}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<SSGProps> = async (
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
