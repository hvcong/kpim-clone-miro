import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuthStore from '@/store/auth_store';
import LoadingFullPage from '@/components/loading/LoadingFullPage';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingFullPage />
      <Layout isLoggedIn={isLoggedIn}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
