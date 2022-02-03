import React, { useEffect, useRef } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { MESAGES_MINS_DURATION, MESSAGES_TABLE } from './Const';
import Message from './Message';
import SendMessage from './SendMessage';

type Props = {};

export default function Messages({}: Props) {
  const { user } = useMoralis();
  const endOfMessagesRef = useRef(null);
  const { data, isLoading, error } = useMoralisQuery(
    MESSAGES_TABLE,
    (query) =>
      query
        .ascending('createdAt')
        .greaterThan(
          'createdAt',
          new Date(Date.now() - 1000 * 60 * MESAGES_MINS_DURATION)
        ),
    [],
    {
      live: true,
    }
  );

  return (
    <div className="pb-56">
      <div className="space-y-10 p-4">
        {data.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div className="flex justify-center">
        <SendMessage endOfMessagesRef={endOfMessagesRef} />
      </div>

      <div ref={endOfMessagesRef} className="mt-5 text-center text-gray-400">
        <p>You're up to date {user!.getUsername()}! 🎉</p>
      </div>
    </div>
  );
}
