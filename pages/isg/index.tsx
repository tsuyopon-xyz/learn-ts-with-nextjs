import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import PostList from 'src/components/posts/PostList';
import PostType from 'src/types/Post';
interface ISGProps {
  posts: PostType[];
}

export default function ISG({ posts }: ISGProps) {
  return (
    <div>
      <Head>
        <title>ISGの解説用ページ（Postリンク一覧）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Postのリンク一覧(ISG)</h1>
        <PostList posts={posts} baseUrl={'/isg'} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ISGProps> = async (
  _context: GetStaticPropsContext
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await res.json()) as PostType[];

  return {
    props: {
      posts,
    },
  };
};
