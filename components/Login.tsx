import React from 'react';
import Image from 'next/image';
import loginImage from '../public/login.png';
import { useMoralis } from 'react-moralis';
import Loader from 'react-ts-loaders';

export default function Login() {
  const { authenticate, isAuthenticating } = useMoralis();

  return (
    <div className="relative bg-black">
      <div className="absolute z-50 flex h-4/6 w-full flex-col items-center justify-center space-y-4">
        {isAuthenticating ? (
          <Loader type="ripple" color="rgb(131 24 67)" size={150} />
        ) : (
          <Image
            src={loginImage}
            width={200}
            height={200}
            className="rounded-md"
          />
        )}

        <button
          className="animate-pulse rounded-lg bg-yellow-500 p-5 font-bold"
          onClick={() => authenticate()}
          disabled={isAuthenticating}
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
