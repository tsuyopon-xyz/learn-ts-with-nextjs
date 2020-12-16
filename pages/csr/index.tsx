import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// pages/ssr/index.tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
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
        <title>CSRの解説用ページ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post一覧(CSR)</h1>
        <ul>
          {posts.map(({ id, title }) => {
            const postDetailPath = `/csr/posts/${id}`;

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
