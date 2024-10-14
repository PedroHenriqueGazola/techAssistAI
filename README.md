# TechAssist AI

TechAssist AI é uma solução inteligente para diagnóstico e suporte técnico que utiliza tecnologias de Inteligência Artificial (IA), como processamento de linguagem natural (NLP) e classificação de imagens para auxiliar técnicos em campo durante ordens de serviço, fornecendo diagnósticos rápidos e precisos para diversos tipos de equipamentos. Através da análise de descrições dos problemas e busca semântica em manuais, o sistema facilita o trabalho dos técnicos, fornecendo orientações detalhadas e eficazes.

## Visão Geral

Este projeto visa facilitar a vida dos técnicos de campo que trabalham com manutenção. Ao utilizar a plataforma TechAssist AI, o técnico pode cadastrar um equipamento e inserir seus documentos (manuais). Posteriormente, quando realizar uma ordem de serviço, ele poderá descrever o problema encontrado no equipamento e o sistema realizará uma busca semântica no banco de dados para retornar a solução mais relevante, utilizando técnicas de IA.

## Tecnologias Utilizadas

- **TypeScript** e **Express**: para criação do servidor backend.
- **Weaviate**: como banco de dados vetorial para armazenamento e recuperação dos manuais técnicos.
- **OpenAI API**: integração para geração de respostas inteligentes com base nos manuais técnicos e descrições de problemas fornecidos pelos técnicos.

## Configuração do Ambiente

1. **Clone o repositório**:

   ```sh
   git clone https://github.com/PedroHenriqueGazola/techAssistAI.git
   cd techAssistAI
   ```

2. **Defina a versão do Node**:

   ```sh
   nvm use
   ```

3. **Instale as dependências**:

   ```sh
   npm install
   ```

4. **Configure o arquivo `.env`**:

   Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis de ambiente:

   ```
   PORT=3000
   OPENAI_API_KEY=<sua-chave-openai>
   JWT_SECRET=<seu-segredo-jwt>
   WEAVIATE_HOST=http://localhost:8080
   ```

5. **Suba o Weaviate com Docker**:
   Certifique-se de que você tem o Docker instalado e execute o comando abaixo para subir o Weaviate:

   ```sh
   docker-compose up -d
   ```

6. **Execute o projeto**:
   ```sh
   npm run start
   ```

## Uso do Projeto

### Autenticação

- **Login**: A rota `/auth/sign-in` está disponível para que os usuários façam login, sem a necessidade de um token de autenticação. O login é necessário para obter o token JWT, que será utilizado para acessar outras rotas protegidas.

### Gestão de Equipamentos e Documentos

- **Criar Equipamento**: Através da rota `POST /equipments`, é possível criar novos equipamentos, fornecendo os detalhes como `name`, `serialNumber`, etc.

- **Upload de Documentos**: A rota `POST /documents` permite fazer upload dos manuais dos equipamentos, associando-os aos equipamentos específicos.

### Diagnóstico de Problemas

- **Diagnóstico**: A rota `POST /tech-assist/diagnose` permite que os técnicos descrevam um problema e forneçam o `equipmentId`. O sistema realiza uma busca semântica no banco de dados para localizar informações relevantes no manual técnico, utilizando a OpenAI para formatar uma solução apropriada.

## Scripts Disponíveis

- **`npm run start`**: Executa o servidor em modo de desenvolvimento.
- **`npm run recreate:db`**: Recria o banco de dados localmente utilizando o script `recreate-db.ts`.

## Segurança

O projeto utiliza **JWT** para autenticação dos usuários. Para acessar a maioria das rotas, é necessário fornecer um token JWT válido, que pode ser obtido através do login na rota `/auth/sign-in`.

## Melhorias Futuras

- **Melhoria na extração de informações**: Aprimorar a extração de trechos relevantes dos manuais com NLP para aumentar a precisão e relevância das respostas geradas.
- **Adicionar suporte a imagens**: Adicionar a funcionalidade de processar as imagens dos manuais e integrá-las ao fluxo de diagnóstico para gerar respostas mais precisas.
