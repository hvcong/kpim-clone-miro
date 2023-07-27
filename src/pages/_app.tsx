import Layout from "@/components/Layout";
import useAuthStore from "@/store";
import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuthStore();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Layout isLoggedIn={isLoggedIn}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
