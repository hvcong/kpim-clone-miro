import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (router.route === '/') {
      router.push('/dashboard');
    }
    return () => {};
  }, [router]);

  return null;
}
