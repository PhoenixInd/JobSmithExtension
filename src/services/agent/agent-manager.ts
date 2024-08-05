import { responseSchema, system } from "./system";
import { createMistral } from '@ai-sdk/mistral';
import { generateObject } from "ai";
import axios from 'axios';

interface AgentMessage {
    model: "mistral" |  any,
    stream?: boolean,
    prompt: string,
    suffix?: string,
    system: string,
    context?: string,
    tools?: Array<object>
}


/*----------------------------------------*/
/*-----------------OLLAMA-----------------*/
/*----------------------------------------*/

const askOllama = async (prompt:string)=>{
    const ollamaURL = import.meta.env.VITE_OLLAMA_API_URL ?? "http://localhost:11434/api/generate/";

    const message:AgentMessage = {
        model: "mistral",
        stream: false,
        system: system,
        prompt: prompt
    }

    try {
        const response = await axios.post(ollamaURL, message as any);
        return response.data;
    } catch (error) {
        console.log(error)
    }
    
}

const testOllama = ()=>{
    const prompt:string = "Aplicante: Soy experto en python. Oferta: se necesita a un experto en python"
    const request = askOllama(prompt)
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err));
    return request
}


/*----------------------------------------*/
/*-----------------Vercel-----------------*/
/*----------------------------------------*/

const askVercel = async (prompt:string)=>{

    const mistral_api_key:string = import.meta.env.VITE_MISTRAL_API_KEY

    const mistral = createMistral({
        apiKey: mistral_api_key
      });

    const model = mistral('open-mistral-7b', {
        safePrompt: true,
    })

    const { object } =  await generateObject({
        model: model,
        system: system,
        prompt: prompt,
        schema: responseSchema,
    });
    console.log(object)
    return object
}

const testVercel = ()=>{
    const prompt:string = "Aplicante: Soy experto en python. Oferta: se necesita a un experto en python"
    const request = askVercel(prompt)
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err));
    return request
}


export {askOllama, testOllama, askVercel, testVercel}
