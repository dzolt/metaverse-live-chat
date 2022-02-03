import React from 'react';
import Image from 'next/image';
import loginImage from '../public/login.png';
import { useMoralis } from 'react-moralis';

export default function Login() {
  const { authenticate, isAuthenticating } = useMoralis();

  if (isAuthenticating) {
    return (
      <div className="z-999 flex justify-center align-middle">
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black">
      <h1>I am login</h1>

      <div className="absolute z-50 flex h-4/6 w-full flex-col items-center justify-center space-y-4">
        <Image
          src={loginImage}
          width={200}
          height={200}
          className="rounded-md"
        />

        <button
          className="animate-pulse rounded-lg bg-yellow-500 p-5 font-bold"
          onClick={() => authenticate()}
        >
          Login to the METAVERSE
        </button>
      </div>

      <div className="h-screen w-full">
        <Image
          src="https://links.papareact.com/55n/"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
