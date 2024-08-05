import { z } from 'zod'

const responseSchema = z.object({
    selectionProbabilities: z.union([z.literal("Low"), z.literal("Medium"), z.literal("High")]),
    rankingCriteria: z.union([z.literal("Low Priority"), z.literal("Medium Priority"), z.literal("High Priority")]),
    agentResponse: z.string(),
})

type AgentType = z.infer<typeof responseSchema>

const agent_response_structure = {
    selectionProbabilities: "debes elegir la probabilidad de que el aplicante sea seleccionado, hazlo usando: Low, Medium or High",
    rankingCriteria: "debes elegir la probabilidad de que el aplicante sea seleccionado, hazlo usando: Low Priority, Medium Priority or High Priority",
    agentResponse: "Acá debes dar una descripción detallada del porque elegiste los valores en los demás campos"
}


const system = `Tu eres un sistema de recomendación. 
Reciviras la información de una oferta laboral y la información de una persona que incluye sus habilidades y resumen de sus capacidades laborales. 
Debes evaluar que tan viable es esta oferta de acuerdo para el usuario en cuestion. 
El lenguaje debe estar dirigida para el aplicante explicando de forma amable el resultado.
Usa exclusivamente la información que se proporciona en la oferta laboral y que proporciona el usuario.
Tu respuesta debe venir en formato JSON con la siguiente estructura: ${JSON.stringify(agent_response_structure)}
`


export {system, responseSchema}
export default AgentType