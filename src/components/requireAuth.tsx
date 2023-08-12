import useAuthStore from '@/store/auth_store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useGlobalStore from '../store';
import { browserStore } from '@/utils';
import authApi from '@/api/authApi';

interface RequireAuthProps {
  // Add any additional props needed for your wrapped component
}

const RequireAuth = <P extends RequireAuthProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const RequireAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();

    const { isLoggedIn, logInSuccess } = useAuthStore();
    const { setFullLoading } = useGlobalStore();

    useEffect(() => {
      if (!isLoggedIn) {
        loginByToken();
      }
      return () => {};
    }, [isLoggedIn]);

    async function loginByToken() {
      setFullLoading(true);
      const token = browserStore.getToken();
      if (token) {
        try {
          const res = await authApi.loginByToken();
          logInSuccess(res.data.user, res.data.token);
          browserStore.addToken(res.data.token);
          setFullLoading(false);
        } catch (error) {
          browserStore.removeToken();
          router.push('/auth');
          setFullLoading(false);
        }
      } else {
        router.push('/auth');
        setFullLoading(false);
      }
    }

    // Render the wrapped component if logged in, or null otherwise
    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return RequireAuthComponent;
};

export default RequireAuth;
