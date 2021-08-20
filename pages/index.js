import Head from 'next/head'
import {useQuery} from "react-query";
import Link from 'next/link';

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(res => {
    return res.json();
  });
}

function useFetchPosts() {
  const query = useQuery('posts', () => fetchPosts(), {

  });

  return query;
}


export default function Home() {
  const posts = useFetchPosts();

  if(posts.isLoading) {
    return <h1>Loading...</h1>
  }
  if(posts.isError) {
    return <h1>Whoops, error!</h1>
  }

  return (
    <div>
      <Head>
        <title>Man Blog</title>
      </Head>

      <main>
        <h2>Latest Posts</h2>

        {posts.data ? posts.data.map(item => <h3 key={item.id}><Link href={`/posts/${item.id}`}>{item.title}</Link></h3>) : null}
      </main>
    </div>
  )
}
