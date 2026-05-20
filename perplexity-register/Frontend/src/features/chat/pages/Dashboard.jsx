import React, { useEffect, useState } from 'react';
import { useChat } from '../hooks/useChat';

const Dashboard = () => {
  const { initializeSocketConnection } = useChat();
  const mockChats = ['chat title', 'chat title', 'chat title', 'chat title', 'chat title'];
  const [message, setMessage] = useState('');

  useEffect(() => {
    initializeSocketConnection();
  }, [initializeSocketConnection]);

  return (
    <main className='h-dvh bg-neutral-800 p-4'>
      <section className='mx-auto flex h-[calc(100dvh-2rem)] w-full max-w-7xl flex-col rounded-[2rem] border-[2px] border-white bg-[#07090f] p-4 text-white md:p-7'>
        <div className='flex h-full flex-1 flex-col gap-4 overflow-hidden md:flex-row md:gap-6'>
          <aside className='h-full w-full rounded-[2rem] border-[3px] border-white bg-[#181A1B] p-4 md:w-64 md:overflow-y-auto md:p-5'>
            <h2 className='mb-5 text-3xl font-semibold lowercase tracking-wide text-white'>perplexity</h2>
            <div className='space-y-4'>
              {mockChats.map((title, index) => (
                <button
                  key={`${title}-${index}`}
                  className='w-full rounded-xl border-[3px] border-white px-4 py-2 text-left text-2xl leading-none text-white'
                >
                  {title}
                </button>
              ))}
            </div>
          </aside>

          <div className='flex w-full flex-1 flex-col justify-end'>
            <footer className='rounded-2xl border-[3px] border-white bg-white px-4 py-3'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!message.trim()) return;
                  console.log(message);
                  setMessage('');
                }}
              >
                <div className='flex items-center gap-3'>
                  <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type your message...'
                    className='w-full rounded-xl border-[3px] border-neutral-900 bg-white px-3 py-1 text-xl text-neutral-900 placeholder:text-neutral-500 focus:outline-none'
                  />
                  <button
                    type='submit'
                    className='rounded-xl border-[3px] border-neutral-900 px-4 py-1 text-lg font-medium text-neutral-900'
                  >
                    Send
                  </button>
                </div>
              </form>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
