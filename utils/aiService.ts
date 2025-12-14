import { GoogleGenAI } from '@google/genai'
import { TripData } from '../contexts/TripContext'
import { dateUtils } from './dateUtils'

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export const generateTripPrompt = (tripData: TripData): string => {
  const startDate = tripData.startDate
    ? dateUtils.formatDayMonthYearSlash(tripData.startDate.dateString)
    : 'Not specified'
  const endDate = tripData.endDate
    ? dateUtils.formatDayMonthYearSlash(tripData.endDate.dateString)
    : 'Not specified'
  
  const daysCount = tripData.startDate && tripData.endDate
    ? Math.ceil((tripData.endDate.timestamp - tripData.startDate.timestamp) / (1000 * 60 * 60 * 24)) + 1
    : null

  return `Você é um especialista em planejamento de viagens. Crie um roteiro detalhado e personalizado para uma viagem.

## CONTEXTO DA VIAGEM
- Nome da viagem: ${tripData.tripName}
- Destino: ${tripData.destination}
- Tipo de viajante: ${tripData.travelerType}
- Período: ${startDate} até ${endDate}${daysCount ? ` (${daysCount} ${daysCount === 1 ? 'dia' : 'dias'})` : ''}
- Orçamento: R$ ${tripData.minBudget} a R$ ${tripData.maxBudget}
- Perfil de gastos: ${tripData.spendingHabit}
- Interesses: ${tripData.selectedInterests.join(', ')}

## INSTRUÇÕES IMPORTANTES
1. Crie atividades realistas e adequadas ao destino, período e clima
2. Respeite rigorosamente o orçamento especificado
3. Alinhe todas as atividades aos interesses selecionados
4. Considere o tipo de viajante e perfil de gastos ao sugerir opções
5. Distribua as atividades ao longo dos dias de forma equilibrada
6. Inclua tempo adequado para deslocamento entre locais
7. Forneça informações práticas e úteis

## FORMATO DE RESPOSTA
Retorne APENAS um JSON válido, sem texto adicional antes ou depois. O JSON deve seguir EXATAMENTE esta estrutura:

{
  "tripName": "Nome da viagem (use o nome fornecido)",
  "destination": "Destino completo (cidade, país)",
  "summary": "Resumo da viagem em 2-3 frases, destacando os principais atrativos e experiências",
  "itinerary": [
    {
      "day": 1,
      "date": "DD/MM/YYYY",
      "title": "Título do dia (ex: 'Explorando o Centro Histórico')",
      "description": "Descrição geral das atividades do dia em 2-3 frases",
      "activities": [
        {
          "time": "HH:MM",
          "activity": "Nome da atividade",
          "description": "Descrição detalhada da atividade, incluindo o que fazer, ver ou experimentar",
          "location": "Endereço ou localização específica",
          "estimatedCost": "R$ XX.XX",
          "tips": "Dicas práticas e importantes sobre esta atividade",
          "imageUrl": "URL da imagem do local (opcional, mas recomendado)"
        }
      ],
      "estimatedDailyCost": "R$ XX.XX"
    }
  ],
  "totalEstimatedCost": "R$ XX.XX (soma de todos os custos estimados)",
  "recommendations": {
    "accommodation": {
      "description": "Recomendações gerais sobre hospedagem no destino, incluindo melhores áreas e tipos de acomodação",
      "hotels": [
        {
          "name": "Nome do hotel",
          "description": "Descrição do hotel, localização, comodidades e por que é recomendado",
          "priceRange": "Faixa de preço por noite (ex: R$ 200-400/noite)",
          "bookingUrl": "URL do Booking.com, Airbnb ou site oficial (quando disponível)",
          "imageUrl": "URL da imagem do hotel"
        }
      ]
    },
    "transportation": "Recomendações detalhadas sobre transporte: como chegar ao destino, transporte local, melhores opções de mobilidade",
    "food": "Recomendações gastronômicas: pratos típicos, melhores restaurantes, áreas com boa comida, dicas de onde comer",
    "packing": "Lista detalhada do que levar: roupas adequadas ao clima, itens essenciais, documentos necessários, dicas específicas"
  },
  "tips": [
    "Dica prática e útil sobre o destino",
    "Outra dica importante",
    "Mais uma dica relevante"
  ]
}

## REGRAS OBRIGATÓRIAS
- O JSON deve ser válido e bem formatado
- Todos os campos são obrigatórios, exceto "imageUrl" nas atividades (opcional)
- As datas devem estar no formato DD/MM/YYYY
- Os horários devem estar no formato 24h (HH:MM)
- Os custos devem estar no formato "R$ XX.XX" e somar corretamente
- Inclua pelo menos 2-3 opções de hotéis com diferentes faixas de preço
- Para imagens, use URLs de sites confiáveis: Unsplash (unsplash.com), Pexels (pexels.com), sites oficiais de turismo, ou Booking.com
- As atividades devem ser cronologicamente ordenadas e realistas
- O totalEstimatedCost deve ser a soma de todos os estimatedDailyCost
- Inclua pelo menos 3-5 dicas práticas e úteis no array "tips"
- Adapte o número de atividades por dia conforme a duração da viagem e tipo de viajante`
}

export const generateTripWithAI = async (tripData: TripData) => {
  try {
    const prompt = generateTripPrompt(tripData)

    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    })

    const text = response.text

    if (!text) {
      return {
        success: false,
        error: 'Empty response from AI',
      }
    }

    try {
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}') + 1
      const jsonString = text.substring(jsonStart, jsonEnd)
      const parsedData = JSON.parse(jsonString)

      return {
        success: true,
        data: parsedData,
        rawResponse: text,
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      return {
        success: false,
        error: 'Error processing AI response',
        rawResponse: text,
      }
    }
  } catch (error) {
    console.error('Error calling AI:', error)
    return {
      success: false,
      error: 'Error communicating with AI',
    }
  }
}
