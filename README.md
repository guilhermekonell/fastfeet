<center>
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</center>

<h3 align="center">Desafio Final Rocketseat</h3>

<p>Este projeto faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) e é avaliada para emissão do Certificado do Bootcamp da Rocketseat.</p>

## 🚀 Sobre o desafio
<p>A aplicação desenvolvida é um app para uma transportadora fictícia, o FastFeet. </p>
<p>➡️ O Back-end é responsável por gerenciar e prover as informações para o front-end e o mobile.</p>
<p>➡️ O Front-end é utilizado pelo administrador da transportadora, onde é possível vizualizar todo o fluxo de entregas da aplicação, seus problemas, entregadores e destinatários, além de cancelar entregas se necessário.</p>
<p>➡️ O Mobile é de uso do entregador, onde é possível visualizar suas entregas, retirá-las para dar início a entrega e também concluir as entregas, além de cadastrar e visualizar os problemas da entrega.</p>

## 💻 Tecnologias
 - [Node.js](https://nodejs.org/en/)
 - [ReactJS](https://pt-br.reactjs.org/)
 - [React Native](https://reactnative.dev/)
 - [PostgreSQL](https://www.postgresql.org/)
 - [Redis](https://redis.io/)
 
## ▶️ Get Started

**Requisitos:**
   - Um container no docker para o postgres: 
   
   `docker run --name fastfeet-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`

   - Um container no docker para o redis:

   `docker run --name fastfeet-redis -d redis`

➡️ **Back-end**

- Configurar as variáveis de ambiente. Basta copiar o arquivo `.env.example` na pasta backend da pasta raiz do projeto para um novo arquivo `.env` e preencher com as respectivas informações.

1. Acessar a pasta `backend` da pasta raiz do projeto e rodar o comando `yarn` para instalar as dependências.

2. Executar o comando `yarn sequelize db:migrate` para criar a base de dados do postgres.

3. Executar o comando `yarn sequelize db:seed:all` para criar o usuário admin.

4. Executar o comando `yarn dev` para inicializar o backend.

5. Executar o comando `yarn queue` para inicializar a fila de emails.

➡️ **Front-end**

1. Acessar a pasta `frontend` da pasta raiz do projeto e rodar o comando `yarn` para instalar as dependências.

2. Executar o comando `yarn start` para inicializar a aplicação front-end.

➡️ **Mobile**

*Obs: Esta aplicação foi testada somente em ambiente Android.*

- Configurar a variável de ambiente. Basta copiar o arquivo `.env.example` na pasta mobile da pasta raiz do projeto para um novo arquivo `.env` e preencher com a URL onde está sendo executado o backend da aplicação.

1. Acessar a pasta `mobile` da pasta raiz do projeto e rodar o comando `yarn` para instalar as dependências.

2. Abrir o emulador do Android ou conectar seu dispositivo via USB.

3. Executar o comando `yarn react-native run-android` para inicializar o projeto no dispositivo.

4. Executar o comando `yarn react-native start` para executar o bundle da aplicação.

## 📜 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

by [Guilherme Konell](https://www.linkedin.com/in/guilhermekonell) 💜