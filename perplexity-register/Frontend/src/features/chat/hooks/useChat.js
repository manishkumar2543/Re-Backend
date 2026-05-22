import { initializeSocketConnection } from "../services/chat.socket";
import { sendMessage,getChats,getMessages,deleteChat } from "../services/chat.api";
import { setChats,setCurrentChatId,setLoading,setError,createNewChat,addNewMessage,addNewMessages } from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
    const dispatch=useDispatch();

   async function handleSendMessage({message, chatId}) {
        dispatch(setLoading(true));
        const data=await sendMessage({message, chatId});
        const {chat,aiMessage}=data;
        const activeChatId=chat?._id || chatId;
        if(!chatId){
            dispatch(createNewChat(
                {
                  chatId: activeChatId, 
                  title: chat.title
                }));
        }
        dispatch(addNewMessage(
            {
                chatId: activeChatId,
                content: message,
                role:"user"
            }
        ));
        dispatch(addNewMessage(
            {
             chatId: activeChatId,
             content: aiMessage.content,
             role:aiMessage.role

            }));
        dispatch(setCurrentChatId(activeChatId));
        dispatch(setLoading(false));
    }

    async function handleGetChats(){
        dispatch(setLoading(true));
        const data=await getChats();
        const {chats}=data;
        dispatch(setChats(chats.reduce((acc,chat)=>{
            acc[chat._id]=
            {
                id: chat._id,
                title: chat.title,
                message: [],
                lastUpdated: chat.updatedAt
            };
            return acc;
        },{})));
        dispatch(setLoading(false));    
    }

    async function handleOpenChat(chatId){
        const data=await getMessages(chatId);
        const {messages}=data;
        const formatteMessages=messages.map(message=>({
            content: message.content,
            role: message.role
        }));
        dispatch(addNewMessages({
            chatId,
            messages: formatteMessages
        }));
        dispatch(setCurrentChatId(chatId));
    }

    return {
         initializeSocketConnection,
            handleSendMessage,  
            handleGetChats,
            handleOpenChat
    }
};
