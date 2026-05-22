
import { gentrateResponse,generateChatTittle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

function normalizeTitle(title, message) {
    const cleaned = (title || "").replace(/["'\n\r]/g, " ").trim()
    const lower = cleaned.toLowerCase()
    if (!cleaned || lower === "demo" || lower === "new chat" || lower === "chat") {
        return message.trim().split(/\s+/).slice(0, 5).join(" ")
    }
    return cleaned
}


export async function sendMessage(req,res) {
 
    const {message,chat:legacyChatId,chatId}=req.body
    const activeChatId=chatId || legacyChatId

    
    // const result=await gentrateResponse(message);
    let title=null, chat=null
    if(!activeChatId){
         try{
            title=await generateChatTittle(message);
            title=normalizeTitle(title, message);
         }catch(error){
            title=message.trim().split(/\s+/).slice(0, 5).join(" ")
         }
         chat=await chatModel.create({
            user:req.user.id,
            title
        })
    } else {
        chat = await chatModel.findOne({
            _id: activeChatId,
            user: req.user.id
        })
        if(!chat){
            return res.status(404).json({
                message:"Chat not found"
            })
        }
    }

    const userMessage=await messageModel.create({
        chat:activeChatId || chat._id, 
        content: message,
        role: "user"
    })
     const messages= await messageModel.find({chat:activeChatId || chat._id});
       

    let result=""
    try{
        result=await gentrateResponse(messages)
    }catch(error){
        result="Sorry, I am unable to respond right now. Please try again."
    }
    if(!result || !result.trim()){
        result="Sorry, I am unable to respond right now. Please try again."
    }
    const aiMessage=await messageModel.create({
        chat:activeChatId || chat._id,
        content:result,
        role:"ai"
    })

    console.log(messages);
    res.status(200).json({
      title,
      chat,
      aiMessage
        
    })
}

export async function getChats(req,res) {
    const user=req.user
    const chats=await chatModel.find({
        user:user.id
    })
    res.status(200).json({
        message:"Chats fetched successfully",
        chats
    })
}

export async function getMessages(req,res) {
    const {chatId}=req.params
    const chat=await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })
    if(!chat){
        return res.status(404).json({
            message:"Chat not found"
        })
    }
    const messages=await messageModel.find({
        chat:chatId
    })
    res.status(200).json({
        message:"Messages fetched successfully",
        messages
    })
}

export async function deleteChat(req,res) {
    const {chatId}=req.params
    const chat=await chatModel.findOneAndDelete({
        _id:chatId,
        user:req.user.id
    })
    await messageModel.deleteMany({
        chat:chatId
    })
    if(!chat){
        return res.status(404).json({
            message:"Chat not found"
        })
    }
    res.status(200).json({
        message:"Chat deleted successfully",
        
    })
}
