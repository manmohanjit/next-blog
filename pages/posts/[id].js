import {useRouter} from "next/router";
import Link from "next/link";
import {useQuery} from "react-query";
import Head from "next/head";

function fetchPost(id) {
  return fetch('https://jsonplaceholder.typicode.com/posts/'+id).then(res => {
    return res.json();
  });
}

function useFetchPost(id, initialData) {
  const query = useQuery(['posts', id], () => fetchPost(id), {
    initialData: initialData,
  });

  return query;
}

// Primary component
function Post(props) {
  const router = useRouter() // Next router state
  const postId = router.query.id; // Get the ID parameter from the URL

  const post = useFetchPost(postId, props.post); // Fetch a post using the ID parameter using re{item.title}act-query

  // Loading?
  if(post.isLoading) {
    return <h1>Loading...</h1>
  }
  // Error?
  if(post.isError) {
    return <h1>Whoops, error!</h1>
  }

  return (
    <div>
      <Head>
        <title>{post.data ? post.data.title : null}</title>
      </Head>

      <Link href={'/'}>&laquo; back</Link>

      <h2>{post.data ? post.data.title : null}</h2>
      <p>{post.data ? post.data.body : null}</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  // get the id
  const postId = context.query.id;

  // fetch the post
  const post = await fetchPost(postId);

  // next step
  return {
    props: {
      post: post,
    },
  };
}

export default Post;
