import { system } from "./system";
import axios from 'axios';

/*----------------------------------------*/
/*----------------OLLAMA------------------*/
/*----------------------------------------*/

interface OllamaMessage {
    model: "mistral",
    stream: boolean,
    prompt: string,
    suffix?: string,
    system: string,
    context?: string,
}

const askOllama = async (prompt:string)=>{
    const ollamaURL = import.meta.env.OLLAMA_API_URL ?? "http://localhost:11434/api/generate/";

    const message:OllamaMessage = {
        model: "mistral",
        stream: false,
        system: system,
        prompt: prompt,
    }

    try {
        const response = await axios.post(ollamaURL, message as any);
        return response.data;
    } catch (error) {
        console.log(error)
    }
    
}

const testOllama = ()=>{
    console.log("Test Ollama")
    const prompt:string = "Soy experto en python, oferta: se necesita a un experto en python"
    const request = askOllama(prompt)
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err));
    return request
}


export {askOllama, testOllama}
