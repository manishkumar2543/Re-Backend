import "dotenv/config";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const mistralModel=new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey:process.env.MISTRAL_API_KEY

})
console.log("KEY =", process.env.MISTRAL_API_KEY);
const  geminiModel=new ChatGoogleGenerativeAI({
  apiKey:process.env.GEMINI_API_KEY,
  model:"gemini-2.5-flash-lite"

});

export async function gentrateResponse(message) {
  const chatMessages=message.map(msg=>{
    if(msg.role==="user"){
       {
      return new HumanMessage(msg.content)
     }
    }
    else if(msg.role== "ai"){
      return new AIMessage(msg.content)
    }
  }).filter(Boolean)

  try {
    const response=await geminiModel.invoke(chatMessages);
    return response.text
  } catch (error) {
    const fallbackResponse=await mistralModel.invoke(chatMessages);
    return fallbackResponse.text
  }
}

export async function generateChatTittle(message) {
  const response=await mistralModel.invoke([
    new SystemMessage(`
      Your are helpful assistant that gentrates concise and discriptive title for conversations.

     User will provide you with the first message of a chat conversations, and you will gentrate a title that capture
     the essence of the conversation in 2-3 words. The title should be clear, relevant, and engaging, giving user a quick understanding of the chats topic.
    

      `)
    ,
    new HumanMessage(`
      Generate a title for this conversation based on the following message:
      ${message}
    `
    )
  ])

  return response.text
}

