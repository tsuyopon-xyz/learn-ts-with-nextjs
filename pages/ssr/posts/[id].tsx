import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// ../ssg.tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface SSRProps {
  post: Post;
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

export default function SSR({ post }: SSRProps) {
  const { id, userId, title, body } = post;

  return (
    <div>
      <Head>
        <title>SSRの解説用ページ（Post詳細）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post詳細</h1>
        <div>
          <p>Post ID: {id}</p>
          <p>User ID: {userId}</p>
          <p>Title: {title}</p>
          <p>Body: {body}</p>
        </div>
      </main>
    </div>
  );
}

type SSRParams = {
  id: string;
};
export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context: GetServerSidePropsContext
) => {
  const params = context.params as SSRParams;
  const postId = params.id;

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = (await res.json()) as Post;

  return {
    props: {
      post,
    },
  };
};
