import Head from 'next/head';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  GetStaticPathsContext,
} from 'next';

// ../ssg.tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface SSGProps {
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

export default function SSR({ post }: SSGProps) {
  const { id, userId, title, body } = post;

  return (
    <div>
      <Head>
        <title>SSGの解説用ページ（Post詳細）</title>
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

type SSGParams = {
  id: string;
};
export const getStaticPaths: GetStaticPaths<SSGParams> = async (
  _context: GetStaticPathsContext
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = (await res.json()) as Post[];

  /**
   * const paths = [
   *   { params: { id: '1' } }, // ここの "id" は "[id].tsx" の "[id]" と紐づく。
   *   { params: { id: '2' } }, // もし "[postId].tsx" というファイル名であれば、 "{ params: { postId: '1' } }" とする。
   *   { params: { id: '3' } }, // プロパティ値は "string型"、もしくは "string[]型" を指定しないと、getStaticPaths関数でコンパイルエラが起きる
   *   ...
   * ]
   */
  const paths = posts.map(({ id }) => {
    const stringId = id.toString();

    return {
      params: {
        id: stringId,
      },
    };
  });

  return {
    // https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
    paths,

    // https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
    //
    // fallbackにfalseを設定した状態で、
    // クライアントからリクエストされたURLに対する
    // リソース(SSGで生成したHTML)がない場合は404を返す
    // （false以外の値に関しては、また別で解説する予定）
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SSGProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as SSGParams;
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
