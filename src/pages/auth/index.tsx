import authApi from "@/api/authApi";
import useAuthStore from "@/store";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";

type FormStateType = {
  username: string;
  password: string;
};

type ErrMessType = {
  username: string;
  password: string;
  error: string;
};
const Auth = () => {
  const { logInSuccess, isLoggedIn } = useAuthStore();
  const router = useRouter();

  const [inputFocus, setInputFocus] = useState("");
  const [formInput, setFormInput] = useState<FormStateType>({
    username: "hvcong",
    password: "hvcong",
  });

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwrodRef = useRef<HTMLInputElement>(null);

  const [errMess, setErrMess] = useState<ErrMessType>({
    username: "",
    password: "",
    error: "",
  });

  const {
    mutate: loginMutate,
    isLoading,
    isError,
  } = useMutation(
    () => {
      return authApi.login(formInput.username, formInput.password);
    },
    {
      onSuccess: (data) => {
        console.log("oke", data);
        // logInSuccess()
      },
      onError: (err: AxiosError) => {
        setErrMess({
          ...errMess,
          error: err.message,
        });
      },
    }
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
    return () => {};
  }, [isLoggedIn, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // validate
    let isCheck = true;
    let _errMess: ErrMessType = {
      username: "",
      password: "",
      error: "",
    };
    if (!formInput.username) {
      _errMess.username = "Please fill out this field!";
      usernameRef.current?.focus();
      isCheck = false;
    }

    if (!formInput.password) {
      _errMess.password = "Please fill out this field!";
      if (isCheck) {
        passwrodRef.current?.focus();
      }
      isCheck = false;
    }
    setErrMess(_errMess);
    if (isCheck) {
      // loginMutate();
      setTimeout(() => {
        logInSuccess({
          id: 123,
          name: "hvcong",
        });
      }, 1000);
    }
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in
          </h2>
        </div>

        <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm '>
          <form className=' flex flex-col w-[360px]' onSubmit={onSubmit}>
            {/* username input */}
            <div className=' flex  h-12  relative'>
              <svg
                className={`w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 transition-all ${
                  inputFocus === "username" ? "text-gray-950" : "text-gray-600"
                }`}
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 14 18'
              >
                <path d='M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
              </svg>
              <label
                htmlFor='username'
                className={`absolute transition-all text-gray-600 ${
                  inputFocus === "username" || formInput.username
                    ? "-top-2 bg-white px-2 left-4 text-xs"
                    : "top-1/2 -translate-y-1/2 left-10 text-sm"
                }`}
              >
                Username
              </label>

              <input
                id='username'
                name='username'
                type='username'
                autoFocus
                ref={usernameRef}
                onFocus={() => {
                  setInputFocus("username");
                }}
                onBlur={() => {
                  setInputFocus("");
                }}
                value={formInput.username}
                onChange={(e) => {
                  if (errMess.username) {
                    setErrMess({
                      ...errMess,
                      username: "",
                    });
                  }

                  setFormInput({
                    ...formInput,
                    username: e.target.value,
                  });
                }}
                className={`w-full px-10 rounded-sm text-sm border  ${
                  errMess.username
                    ? "border-red-600   focus:outline-red-600"
                    : "border-gray-400   focus:outline-blue-400"
                }`}
              />
            </div>
            {errMess.username && (
              <div className=''>
                <span className='text-xs  text-red-600 '>{errMess.username}</span>
              </div>
            )}

            {/* password input */}
            <div className=' flex mt-4  h-12  relative'>
              <svg
                className={`w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 transition-all ${
                  inputFocus === "password" ? "text-gray-950" : "text-gray-600"
                }`}
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 16 20'
              >
                <path d='M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Zm1.5-8h-5V4.5a2.5 2.5 0 1 1 5 0V7Z' />
              </svg>

              <label
                htmlFor='password'
                className={`absolute transition-all text-gray-600 ${
                  inputFocus === "password" || formInput.password
                    ? "-top-2 bg-white px-2 left-4 text-xs"
                    : "top-1/2 -translate-y-1/2 left-10 text-sm"
                }`}
              >
                Password
              </label>

              <input
                id='password'
                name='password'
                type='password'
                ref={passwrodRef}
                onFocus={() => {
                  setInputFocus("password");
                }}
                onBlur={() => {
                  setInputFocus("");
                }}
                value={formInput.password}
                onChange={(e) => {
                  if (errMess.password) {
                    setErrMess({
                      ...errMess,
                      password: "",
                    });
                  }

                  setFormInput({
                    ...formInput,
                    password: e.target.value,
                  });
                }}
                className={`w-full px-10 rounded-sm text-sm border  ${
                  errMess.password
                    ? "border-red-600   focus:outline-red-600"
                    : "border-gray-400   focus:outline-blue-400"
                }`}
              />
            </div>

            {errMess.password && (
              <div className=''>
                <span className='text-xs  text-red-600 '>{errMess.password}</span>
              </div>
            )}

            {errMess.error && (
              <div className=''>
                <span className='text-xs  text-red-600 '>{errMess.error}</span>
              </div>
            )}

            <div className='py-3'>
              <span className=' underline text-xs cursor-pointer underline-offset-2 decoration-gray-400 hover:no-underline'>
                I forgot my password
              </span>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='h-12 flex w-full  justify-center items-center bg-blue-500 py-2 text-white rounded-sm transition-all hover:bg-blue-600'
            >
              {isLoading ? (
                <svg
                  aria-hidden='true'
                  role='status'
                  className='inline w-5 h-5  text-white animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
