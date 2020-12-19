import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import PostList from 'src/components/posts/PostList';
import Post from 'src/types/Post';

// pages/csr/index.tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

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
        <PostList posts={posts} baseUrl={'/ssr'} />
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
