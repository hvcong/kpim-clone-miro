import authApi from '@/api/authApi';
import useGlobalStore from '@/store';
import useAuthStore from '@/store/auth_store';
import { browserStore } from '@/utils';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { emit } from 'process';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';

type FormStateType = {
  email: string;
  password: string;
};

type ErrMessType = {
  email: string;
  password: string;
  error: string;
};
const Auth = () => {
  const { logInSuccess, isLoggedIn } = useAuthStore();
  const { setFullLoading } = useGlobalStore();
  const router = useRouter();

  const [inputFocus, setInputFocus] = useState('');
  const [formInput, setFormInput] = useState<FormStateType>({
    email: 'hvc234',
    password: '123456',
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwrodRef = useRef<HTMLInputElement>(null);

  const [errMess, setErrMess] = useState<ErrMessType>({
    email: '',
    password: '',
    error: '',
  });

  const {
    mutate: loginMutate,
    isLoading,
    isError,
  } = useMutation(
    () => {
      return authApi.login(formInput.email, formInput.password);
    },
    {
      onSuccess: (data) => {
        setFullLoading(true);
        logInSuccess(data.data.user, data.data.token);
      },
      onError: (err) => {
        setErrMess({
          ...errMess,
          error: err?.response?.data?.message,
        });
      },
    },
  );

  useEffect(() => {
    setFullLoading(true);
    if (isLoggedIn) {
      router.back();
    } else {
      loginByToken();
    }
    return () => {
      setFullLoading(false);
    };
  }, [isLoggedIn, router]);

  async function loginByToken() {
    setFullLoading(true);
    const token = browserStore.getToken();
    if (token) {
      try {
        const res = await authApi.loginByToken();
        logInSuccess(res.data.user, res.data.token);
        browserStore.addToken(res.data.token);
      } catch (error) {
        browserStore.removeToken();
      }
    }
    setFullLoading(false);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // validate
    let isCheck = true;
    let _errMess: ErrMessType = {
      email: '',
      password: '',
      error: '',
    };
    if (!formInput.email) {
      _errMess.email = 'Không được bỏ trống!';
      emailRef.current?.focus();
      isCheck = false;
    }

    if (!formInput.password) {
      _errMess.password = 'Không được bỏ trống!';
      if (isCheck) {
        passwrodRef.current?.focus();
      }
      isCheck = false;
    }
    setErrMess(_errMess);
    if (isCheck) {
      loginMutate();
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className=" flex flex-col w-[360px]" onSubmit={onSubmit}>
            {/* email input */}
            <div className=" flex  h-12  relative">
              <svg
                className={`w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 transition-all ${
                  inputFocus === 'email' ? 'text-gray-950' : 'text-gray-600'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 18"
              >
                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <label
                htmlFor="email"
                className={`absolute transition-all text-gray-600 ${
                  inputFocus === 'email' || formInput.email
                    ? '-top-2 bg-white px-2 left-4 text-xs'
                    : 'top-1/2 -translate-y-1/2 left-10 text-sm'
                }`}
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                autoFocus
                ref={emailRef}
                onFocus={() => {
                  setInputFocus('email');
                }}
                onBlur={() => {
                  setInputFocus('');
                }}
                value={formInput.email}
                onChange={(e) => {
                  if (errMess.email) {
                    setErrMess({
                      ...errMess,
                      email: '',
                    });
                  }

                  setFormInput({
                    ...formInput,
                    email: e.target.value,
                  });
                }}
                className={`w-full px-10 rounded-sm text-sm border  ${
                  errMess.email
                    ? 'border-red-600   focus:outline-red-600'
                    : 'border-gray-400   focus:outline-blue-400'
                }`}
              />
            </div>
            {errMess.email && (
              <div className="">
                <span className="text-xs  text-red-600 ">{errMess.email}</span>
              </div>
            )}

            {/* password input */}
            <div className=" flex mt-4  h-12  relative">
              <svg
                className={`w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 transition-all ${
                  inputFocus === 'password' ? 'text-gray-950' : 'text-gray-600'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z" />
              </svg>

              <label
                htmlFor="password"
                className={`absolute transition-all text-gray-600 ${
                  inputFocus === 'password' || formInput.password
                    ? '-top-2 bg-white px-2 left-4 text-xs'
                    : 'top-1/2 -translate-y-1/2 left-10 text-sm'
                }`}
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                ref={passwrodRef}
                onFocus={() => {
                  setInputFocus('password');
                }}
                onBlur={() => {
                  setInputFocus('');
                }}
                value={formInput.password}
                onChange={(e) => {
                  if (errMess.password) {
                    setErrMess({
                      ...errMess,
                      password: '',
                    });
                  }

                  setFormInput({
                    ...formInput,
                    password: e.target.value,
                  });
                }}
                className={`w-full px-10 rounded-sm text-sm border  ${
                  errMess.password
                    ? 'border-red-600   focus:outline-red-600'
                    : 'border-gray-400   focus:outline-blue-400'
                }`}
              />
            </div>

            {errMess.password && (
              <div className="">
                <span className="text-xs  text-red-600 ">
                  {errMess.password}
                </span>
              </div>
            )}

            {errMess.error && (
              <div className="">
                <span className="text-xs  text-red-600 ">{errMess.error}</span>
              </div>
            )}

            <div className="py-3">
              <span className=" underline text-xs cursor-pointer underline-offset-2 decoration-gray-400 hover:no-underline">
                I forgot my password
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 flex w-full  justify-center items-center bg-blue-600 py-2 text-white rounded-sm transition-all hover:bg-blue-700"
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-5  text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
