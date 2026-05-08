import dotenv from "dotenv"

dotenv.config()
import { ChatGoogle } from "@langchain/google";

const model=new ChatGoogle({
    apiKey:process.env.GOOGLE_API_KEY,
    model:"gemini-2.5-flash-lite"
})


export async function ask() {
    model.invoke("Hello, how are you?").then((result) => {
      console.log(result.text);
    })
  }


