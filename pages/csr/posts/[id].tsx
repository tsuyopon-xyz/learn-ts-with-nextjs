import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// pages/csr/posts/[id].tsxと共通するコードが複数あるが
// 解説が1ファイルで完結できるようにあえて
// 別ファイルに用意しない形で記述している

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function CSRPostsId() {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    async function fetchPost() {
      if (postId) {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const post = (await res.json()) as Post;
        setPost(post);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>読込中...</p>;
  }

  return (
    <div>
      <Head>
        <title>CSRの解説用ページ（Post詳細）</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Post詳細(CSR)</h1>
        <div>
          <p>Post ID: {post.id}</p>
          <p>User ID: {post.userId}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      </main>
    </div>
  );
}
