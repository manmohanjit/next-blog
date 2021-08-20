import '../styles/globals.css'
import {QueryClientProvider, QueryClient} from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Man Blog</h1>

      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp
