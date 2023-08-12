import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import LoadingFullPage from './loading/LoadingFullPage';
import useGlobalStore from '@/store';
import useAuthStore from '@/store/auth_store';

type Props = {
  children: ReactNode;
  isLoggedIn: boolean;
};

export default function Layout({ children, isLoggedIn }: Props) {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('/dashboard');
  //   return () => {};
  // }, []);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
