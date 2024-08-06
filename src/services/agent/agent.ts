import { askOllama, askVercel } from "./agent-manager";
import { system } from "./system";

class Agent {
    agent: "vercel" | "ollama";
    model: "mistral";
    system: string;


    constructor(agent?:"vercel" | "ollama"){
        this.agent = agent ?? "vercel"
        this.system = system;
        this.model = "mistral"
    }

    async askAgent(prompt:string){

        switch (this.agent){
            case "vercel":
                return await askVercel(prompt)
            case "ollama":
                return await askOllama(prompt)
        }
        
    }
}


export default Agent