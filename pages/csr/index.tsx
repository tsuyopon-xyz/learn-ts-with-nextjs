import Head from 'next/head';
import { useEffect, useState } from 'react';

// pages/ssr/index.tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

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

export default function CSR() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = (await res.json()) as Post[];
      setPosts(posts);
    }

    fetchPosts();
  }, []);

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
