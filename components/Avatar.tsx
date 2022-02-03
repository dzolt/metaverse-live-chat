import Image from 'next/image';
import React from 'react';
import { useMoralis } from 'react-moralis';

type AvatarProps = {
  username?: string;
  logoutOnPress: boolean;
};

export default function Avatar({ username, logoutOnPress }: AvatarProps) {
  const { user, logout } = useMoralis();

  const getAvatarUrl = (username: string) => {
    return `https://avatars.dicebear.com/api/adventurer/${username}.svg`;
  };

  return (
    <Image
      className="cursor-pointer rounded-full bg-black hover:opacity-75"
      src={getAvatarUrl(username || user!.get('username'))}
      onClick={() => logoutOnPress && logout()}
      layout="fill"
    />
  );
}
