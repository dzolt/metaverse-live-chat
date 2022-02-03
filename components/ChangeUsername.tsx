import React from 'react';
import { useMoralis } from 'react-moralis';

export default function ChangeUsername() {
  const { user, setUserData, isUserUpdating, userError } = useMoralis();

  const setUsername = () => {
    const username = prompt(
      `Enter your new username (current: ${user!.getUsername()})`
    );

    if (!username) {
      return;
    }

    setUserData({
      username,
    });
  };

  return (
    <div className="absolute top-5 right-5 text-sm">
      <button
        disabled={isUserUpdating}
        onClick={setUsername}
        className="hover:text-pink-700"
      >
        Change your username
      </button>
    </div>
  );
}
