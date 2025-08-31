# Configuração da IA - Google Gemini

## Configuração da API

Para usar a funcionalidade de geração de roteiros com IA, você precisa configurar a API do Google Gemini:

### 1. Obter a Chave da API

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### 2. Configurar a Variável de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY=sua_chave_api_aqui
```

**Importante:** Substitua `sua_chave_api_aqui` pela chave real que você obteve no passo anterior.

### 3. Reiniciar o App

Após configurar a variável de ambiente, reinicie o app para que as mudanças tenham efeito:

```bash
npm start
```

## Como Funciona

Quando o usuário chega na tela de "Generating", o app:

1. Coleta todos os dados da viagem do contexto (TripContext)
2. Gera um prompt estruturado em português
3. Envia o prompt para o Google Gemini
4. Recebe um JSON estruturado com o roteiro completo
5. Processa e exibe o resultado

## Estrutura do JSON Retornado

A IA retorna um JSON com a seguinte estrutura:

```json
{
  "tripName": "Nome da viagem",
  "destination": "Destino",
  "summary": "Resumo da viagem",
  "itinerary": [
    {
      "day": 1,
      "date": "DD/MM/YYYY",
      "title": "Título do dia",
      "description": "Descrição das atividades",
      "activities": [
        {
          "time": "09:00",
          "activity": "Nome da atividade",
          "description": "Descrição detalhada",
          "location": "Local",
          "estimatedCost": "R$ 0,00",
          "tips": "Dicas importantes",
          "imageUrl": "URL da imagem do local (opcional)"
        }
      ],
      "estimatedDailyCost": "R$ 0,00"
    }
  ],
  "totalEstimatedCost": "R$ 0,00",
  "recommendations": {
    "accommodation": {
      "description": "Recomendações gerais de hospedagem",
      "hotels": [
        {
          "name": "Nome do hotel",
          "description": "Descrição do hotel",
          "priceRange": "Faixa de preço (ex: R$ 200-400/noite)",
          "bookingUrl": "URL do Booking.com ou similar",
          "imageUrl": "URL da imagem do hotel"
        }
      ]
    },
    "transportation": "Recomendações de transporte",
    "food": "Recomendações gastronômicas",
    "packing": "O que levar na mala"
  },
  "tips": ["Dica 1", "Dica 2", "Dica 3"]
}
```

### Novas Funcionalidades

- **Imagens dos Locais**: Cada atividade pode incluir uma URL de imagem do local
- **Hotéis com Links**: Lista de hotéis recomendados com links diretos para Booking.com
- **Imagens dos Hotéis**: Cada hotel inclui uma imagem e informações detalhadas
- **Links Diretos**: Botões para acessar diretamente as páginas de reserva

## Tratamento de Erros

O app inclui tratamento de erros para:

- Dados da viagem incompletos
- Erro na comunicação com a IA
- Erro no processamento da resposta JSON
- Timeout na requisição

## Custos

O Google Gemini tem um modelo de cobrança baseado em uso. Consulte a [documentação oficial](https://ai.google.dev/pricing) para mais detalhes sobre preços.
