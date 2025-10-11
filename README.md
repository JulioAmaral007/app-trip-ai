# Trip AI - Assistente de Viagem Inteligente

<div align="center">
  <img src="assets/images/icon.png" alt="Trip AI Logo" width="120" height="120">
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-53.0.20-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📱 Sobre o Projeto

**Trip AI** é um aplicativo móvel inovador que utiliza inteligência artificial para criar experiências de viagem personalizadas. O app oferece uma interface moderna e intuitiva para planejar viagens com assistência de IA, permitindo que os usuários definam seus interesses, orçamento e preferências para receber sugestões de destinos e itinerários otimizados.

### ✨ Principais Funcionalidades

- **🎯 Planejamento Inteligente**: Criação de viagens personalizadas com assistência de IA
- **💰 Gerenciamento de Orçamento**: Definição de faixa de preço e hábitos de gastos
- **🎨 Seleção de Interesses**: Escolha entre 8 categorias de interesses (Comida, Urbano, Aventura, Educacional, Praia, Piscina, Relaxamento, Camping)
- **👥 Gestão de Viajantes**: Configuração do número e tipo de viajantes
- **📅 Datas de Viagem**: Seleção de período de viagem com calendário intuitivo
- **📊 Visualização de Dados**: Gráficos e estatísticas de preços em tempo real
- **🎨 Interface Moderna**: Design dark mode com gradientes e animações suaves
- **📱 Multiplataforma**: Suporte para iOS, Android e Web

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React Native** (0.79.5) - Framework para desenvolvimento mobile
- **Expo** (53.0.20) - Plataforma de desenvolvimento e build
- **TypeScript** (5.8.3) - Linguagem de programação tipada
- **Expo Router** (5.1.4) - Sistema de navegação baseado em arquivos

### UI/UX

- **Phosphor Icons** - Biblioteca de ícones modernos
- **React Native Gifted Charts** - Gráficos e visualizações
- **React Native Calendars** - Componente de calendário
- **Expo Linear Gradient** - Gradientes e efeitos visuais
- **Expo Blur** - Efeitos de blur e transparência

### Desenvolvimento

- **ESLint** - Linting e formatação de código
- **Prettier** - Formatação automática
- **Expo Font** - Carregamento de fontes personalizadas (Exo 2)

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (para desenvolvimento iOS)
- Android Studio (para desenvolvimento Android)

### Passos para Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/trip-ai.git
   cd trip-ai
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Execute no dispositivo/simulador**

   ```bash
   # Para iOS
   npm run ios

   # Para Android
   npm run android

   # Para Web
   npm run web
   ```

## 📱 Como Usar

### Fluxo de Criação de Viagem

1. **Tela Inicial**: Acesse o app e clique em "START"
2. **Seleção de Interesses**: Escolha até 3 categorias de interesse
3. **Configuração de Orçamento**: Defina sua faixa de preço e hábitos de gastos
4. **Definição de Viajantes**: Configure o número e tipo de viajantes
5. **Datas de Viagem**: Selecione o período da viagem
6. **Revisão**: Confirme todos os detalhes da viagem
7. **Geração**: O sistema de IA gera sua viagem personalizada

### Funcionalidades Principais

- **Tela de Interesses**: Seleção de categorias com ícones visuais
- **Gerenciamento de Orçamento**: Gráficos interativos e opções de gastos
- **Calendário de Viagem**: Interface intuitiva para seleção de datas
- **Revisão de Viagem**: Resumo completo antes da geração
- **Tela de Geração**: Animação de progresso com IA

## 🎨 Design System

### Cores

- **Primária**: Laranja (#FF6B35)
- **Background**: Dark mode (#1a1a1a)
- **Textos**: Branco (#FFFFFF) e cinzas
- **Status**: Verde (sucesso), Amarelo (aviso), Vermelho (erro)

### Tipografia

- **Fonte**: Exo 2 (Bold, SemiBold, Medium, Regular)
- **Tamanhos**: 14px a 60px

### Componentes

- Botões personalizados com gradientes
- Inputs com validação
- Modais e overlays
- Gráficos interativos
- Navegação por tabs

## 📁 Estrutura do Projeto

```
app-trip-ai/
├── app/                    # Páginas do app (Expo Router)
│   ├── (auth)/            # Rotas de autenticação
│   ├── (tabs)/            # Navegação por tabs
│   ├── create-trip/       # Fluxo de criação de viagem
│   └── index.tsx          # Tela inicial
├── components/            # Componentes reutilizáveis
├── constants/             # Configurações e temas
├── assets/               # Imagens e recursos
├── utils/                # Utilitários e helpers
└── package.json          # Dependências e scripts
```

## 🔧 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa na web
npm run lint       # Executa o linter
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👥 Autores

- **Júlio Cezar** - _Desenvolvimento inicial_ - [JulioAmaral007](https://github.com/Julioamaral007)

## 🙏 Agradecimentos

- [Expo](https://expo.dev/) pela plataforma de desenvolvimento
- [React Native](https://reactnative.dev/) pelo framework
- [Phosphor Icons](https://phosphoricons.com/) pelos ícones
- [React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts) pelos gráficos

---

<div align="center">
  <p>Feito com ❤️ usando React Native e Expo</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>
