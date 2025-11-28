# 🌦️ Weather App (Previsão do Tempo)

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

<p align="center">
  </p>

</div>

## 📋 Sobre o Projeto

Aplicativo móvel de previsão do tempo desenvolvido em **React Native** com **Expo**. O objetivo do projeto é consumir uma API externa para exibir dados meteorológicos em tempo real, com uma interface moderna e agradável utilizando conceitos de **Glassmorphism** e **Gradientes**.

O app permite buscar qualquer cidade do mundo e visualizar temperatura, clima, umidade e velocidade do vento.

## ✨ Funcionalidades

- 🔍 **Busca de Cidades:** Pesquisa global utilizando a API OpenWeatherMap.
- 🌡️ **Dados em Tempo Real:** Temperatura atualizada, descrição do clima, umidade e vento.
- 🎨 **UI Moderna:** - Fundo com **Linear Gradient** dinâmico.
  - Cartão de informações com efeito **Glassmorphism** (transparência).
  - Ícones vetoriais (**Feather Icons**) para melhor visualização.
- ⚡ **Feedback Visual:** Indicadores de carregamento (Loading) e tratamento de erros (cidade não encontrada).

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 📦 Como rodar o projeto

Siga os passos abaixo para executar o aplicativo em sua máquina.

### Pré-requisitos

Você precisa ter o [Node.js](https://nodejs.org/) instalado e o aplicativo **Expo Go** no seu celular.

### Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/CaioJotta/WeatherApp.git](https://github.com/CaioJotta/WeatherApp.git)
   Entre na pasta do projeto:

2. Entre na pasta do projeto:
   ```bash
    cd WeatherApp

3. Instale as dependências:
   ```bash
    npm install

4. Execute o projeto:
   ```bash
   npx expo start
   ```

5. Leia o QR Code exibido no terminal com o app Expo Go.

🔑 Configuração da API
O projeto utiliza uma chave de API da OpenWeatherMap. Para fins de teste, uma chave já consta no código (App.js). Caso ela expire ou você queira usar a sua própria:

Cadastre-se em openweathermap.org.

Gere uma chave gratuita.

No arquivo App.js, substitua o valor da variável API_KEY.

<div align="center"> <sub>Desenvolvido por Caio Jotta</sub> </div>
