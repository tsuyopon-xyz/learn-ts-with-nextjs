import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';

// pages/csr/index.tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface SSRProps {
  posts: Post[];
}

export default function SSR({ posts }: SSRProps) {
  return (
    <div>
      <Head>
        <title>SSRの解説用ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post一覧(SSR)</h1>
        <ul>
          {posts.map(({ id, title }) => {
            const postDetailPath = `/ssr/posts/${id}`;

            return (
              <li key={id}>
                <Link href={postDetailPath}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  _context: GetServerSidePropsContext
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await res.json()) as Post[];

  return {
    props: {
      posts,
    },
  };
};
