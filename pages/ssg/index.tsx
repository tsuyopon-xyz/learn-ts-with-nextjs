import Head from 'next/head';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import PostList from 'src/components/posts/PostList';
import PostType from 'src/types/Post';
interface SSGProps {
  posts: PostType[];
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
        <PostList posts={posts} baseUrl={'/ssg'} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<SSGProps> = async (
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
