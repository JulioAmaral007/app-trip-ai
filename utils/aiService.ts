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

  return `Create a detailed travel itinerary for ${tripData.tripName} in ${tripData.destination}.

Trip data:
- Traveler type: ${tripData.travelerType}
- Dates: ${startDate} to ${endDate}
- Budget: R$ ${tripData.minBudget} to R$ ${tripData.maxBudget}
- Spending profile: ${tripData.spendingHabit}
- Interests: ${tripData.selectedInterests.join(', ')}

Please return a structured JSON with the following format:

{
  "tripName": "Trip name",
  "destination": "Destination",
  "summary": "Trip summary in 2-3 sentences",
  "itinerary": [
    {
      "day": 1,
      "date": "MM/DD/YYYY",
      "title": "Day title",
      "description": "Description of the day's activities",
      "activities": [
        {
          "time": "09:00",
          "activity": "Activity name",
          "description": "Detailed description",
          "location": "Location",
          "estimatedCost": "R$ 0.00",
          "tips": "Important tips",
          "imageUrl": "URL of the location image (if available)"
        }
      ],
      "estimatedDailyCost": "R$ 0.00"
    }
  ],
  "totalEstimatedCost": "R$ 0.00",
  "recommendations": {
    "accommodation": {
      "description": "Accommodation recommendations",
      "hotels": [
        {
          "name": "Hotel name",
          "description": "Hotel description",
          "priceRange": "Price range (e.g., R$ 200-400/night)",
          "bookingUrl": "Booking.com URL or similar",
          "imageUrl": "Hotel image URL"
        }
      ]
    },
    "transportation": "Transportation recommendations",
    "food": "Gastronomic recommendations",
    "packing": "What to pack"
  },
  "tips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}

Make sure that:
1. The JSON is valid and well-structured
2. Activities are realistic for the destination and period
3. Costs are within the specified budget
4. Activities meet the selected interests
5. Consider the traveler type and spending profile
6. Include practical and useful tips
7. For hotels, include Booking.com links or similar sites when possible
8. For images, use URLs from reliable sites like Booking.com, TripAdvisor, or official tourism websites
9. Include at least 2-3 hotel options with different price ranges`
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
