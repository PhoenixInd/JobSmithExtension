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

        if(agent == "vercel"){

        }
    }

    askAgent(prompt:string){

        switch (this.agent){
            case "vercel":
                askVercel(prompt)
                break;
            case "ollama":
                askOllama(prompt)
                break;
        }
    }
}


export default Agent