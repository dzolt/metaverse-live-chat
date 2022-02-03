import React, { Attributes } from 'react';
import { useMoralis } from 'react-moralis';
import Avatar from './Avatar';
import TimeAgo from 'timeago-react';

type MessageProps = {
  message: any;
};

export default function Message({ message }: MessageProps) {
  const { user } = useMoralis();

  const isCurrentUserMessage =
    message.get('ethAddress') === user!.get('ethAddress');

  return (
    <div
      className={`relative flex items-end space-x-2 ${
        isCurrentUserMessage && 'justify-end'
      }`}
    >
      <div
        className={`relative h-8 w-8 ${
          isCurrentUserMessage && 'order-last ml-2'
        }`}
      >
        <Avatar username={message.get('username')} logoutOnPress={false} />
      </div>
      <div
        className={`flex space-x-4 rounded-lg p-3 ${
          isCurrentUserMessage
            ? 'rounded-br-none bg-pink-300'
            : 'rounded-bl-none bg-blue-400'
        }`}
      >
        <p>{message.get('message')}</p>
      </div>

      <TimeAgo
        className={`text-[10px] italic text-gray-400 ${
          isCurrentUserMessage && 'order-first pr-1 '
        }`}
        datetime={message.createdAt}
      />

      <p
        className={`absolute -bottom-5 text-xs ${
          isCurrentUserMessage ? 'text-pink-300' : 'text-blue-400'
        }`}
      >
        {message.get('username')}
      </p>
    </div>
  );
}
