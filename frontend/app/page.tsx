"use client";

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  user: string;
  text: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('message', { user, text: message });
    setMessage('');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-md bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-opacity-20 bg-black flex flex-raw justify-between">
          <h1 className="text-lg font-bold text-white">{user || "User"}</h1>
          <div className='w-[200px]'>
            <Input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
          </div>
        </div>
        <div className="p-4 h-96 overflow-y-scroll scrollbar-hide">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end ${
                msg.user === user ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.user === user
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                } p-2 rounded-lg m-2`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-opacity-20 bg-black flex items-center">
          <textarea
            className="w-full bg-transparent text-white border-none outline-none"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-4 bg-green-500 text-white py-2 px-4 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
