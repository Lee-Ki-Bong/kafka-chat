"use client";

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface Message {
  user: string;
  text: string;
}

export default function Home() {
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
  }, []);

  const sendMessage = () => {
    socket.emit('message', { user, text: message });
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div>
        <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
        <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
