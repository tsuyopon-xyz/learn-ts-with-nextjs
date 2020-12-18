import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import PostList from 'src/components/posts/PostList';
import PostType from 'src/types/Post';
interface SSRProps {
  posts: PostType[];
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
  const posts = (await res.json()) as PostType[];

  return {
    props: {
      posts,
    },
  };
};
