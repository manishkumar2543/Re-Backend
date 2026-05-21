import React, { useEffect, useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const chat=useChat()
  const [chatInput,setChatInput]=useState("");
  const {userMessage,setUserMessage}=useState("");

  const chats=useSelector((state)=>state.chat.chats);
  const currentChatId=useSelector((state)=>state.chat.currentChatId);
  
  const { initializeSocketConnection } = useChat();
  const mockChats = ['chat title', 'chat title', 'chat title', 'chat title', 'chat title'];
  const dummyMessages = [
    { id: 1, role: 'ai', content: 'Hi! I am your AI assistant. What would you like to explore today?' },
    { id: 2, role: 'user', content: 'Can you show me the latest product updates?' },
    { id: 3, role: 'ai', content: 'Sure. I can summarize release highlights, bug fixes, and roadmap notes.' },
    { id: 4, role: 'user', content: 'Great, start with the highlights please.' },
  ];
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

          <div className=' relative  flex max-w-3/5 h-full flex-1 gap-4 mx-auto min-w-0  flex-col justify-end'>
            <div className='message w-full flex-1  space-y-7 overflow-y-auto pr-1 pb-30'>
              {chats[currentChatId]?.message.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`w-fit max-w-[80%] rounded-2xl border-[2px] px-3 py-1.5 text-sm  md:text-base ${
                      message.role === 'user'
                        ? 'border-blue-300 bg-blue-500 text-white '
                        : 'border-white bg-[#181A1B] text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <footer className='rounded-2xl border-[3px] border-white bg-white px-4 py-3'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                 const trimMessage=chatInput.trim();
                  if(!trimMessage){
                    return;
                  }
                  chat.handleSendMessage({message: trimMessage,chatId:currentChatId});
                  setChatInput("");
                }}
              >
                <div className='flex items-center gap-3'>
                  <input
                    type='text'
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
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
