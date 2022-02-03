import React, { MutableRefObject, Ref, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { MESSAGES_TABLE } from './Const';

type Message = {
  message: string;
  username: string;
  ethAddress: string;
};

type SendMessageProps = {
  endOfMessagesRef: React.MutableRefObject<any>;
};

export default function SendMessage({ endOfMessagesRef }: SendMessageProps) {
  const { user, Moralis } = useMoralis();
  const [message, setMessage] = useState('');

  const sendMessage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    const Messages = Moralis.Object.extend(MESSAGES_TABLE);
    const messages = new Messages();

    messages
      .save({
        message: message,
        username: user!.getUsername(),
        ethAddress: user!.get('ethAddress'),
      })
      .then(
        (message: Message) => {},
        (error: Error) => {
          console.log(error);
        }
      );

    endOfMessagesRef.current.scrollIntoView({ behaviour: 'smooth' });

    setMessage('');
  };

  return (
    <form
      action=""
      className="fixed bottom-10 flex w-11/12 max-w-2xl rounded-full 
        border-4 border-blue-400 bg-black py-4 px-6 opacity-80 shadow-xl"
    >
      <input
        className="flex-grow border-blue-400 bg-transparent pr-5 text-white
         placeholder-gray-500 outline-none"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Enter a Message ${user!.getUsername()}...`}
      />
      <button
        onClick={sendMessage}
        type="submit"
        className="font-bold text-pink-500"
      >
        Send
      </button>
    </form>
  );
}
