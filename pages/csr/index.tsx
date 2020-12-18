import Head from 'next/head';
import { useEffect, useState } from 'react';
import PostList from 'src/components/posts/PostList';
import PostType from 'src/types/Post';

export default function CSR() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = (await res.json()) as PostType[];
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
        <PostList posts={posts} baseUrl={'/csr'} />
      </main>
    </div>
  );
}
