import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface SSRProps {
  posts: Post[];
}

const PostItem: React.FC<Post> = ({ id, title, userId, body }) => {
  return (
    <div key={id}>
      <h2>
        {title}(written by {userId})
      </h2>
      <p>{body}</p>
    </div>
  );
};

export default function SSR({ posts }: SSRProps) {
  return (
    <div>
      <Head>
        <title>SSRの解説用ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post一覧</h1>
        <div>{posts.map((post) => PostItem(post))}</div>
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
