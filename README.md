# TransactionsApp

Uma aplicação full stack para gerenciamento e visualização de transações, com integração de preços em tempo real da Binance via WebSocket.

## Visão Geral

Este projeto é dividido em duas partes:

- **Backend (.NET Core + Dapper + Oracle):** CRUD de transações com validações e acesso via Dapper, seguindo padrões CQRS.
- **Frontend (React + Vite + TypeScript):** Interface moderna para consultar transações e monitorar ativos da Binance em tempo real.

---

## Estrutura do Projeto
```bash
TransactionsApp/
├── transactionsapp.client/ # Frontend React
└── transactionsapp.server/ # Backend .NET Core
```
---

## Como Rodar o Projeto

### Pré-requisitos

- [.NET 6+](https://dotnet.microsoft.com/download)
- [Node.js + npm](https://nodejs.org/)
- Banco Oracle configurado e acessível (pode usar Oracle Cloud Free Tier ou Local)

---

### 1. Backend (.NET + Oracle)

1. Acesse a pasta do backend:
   ```sh
   cd transactionsapp.server
 
2. Configure a string de conexão do Oracle no appsettings.json:
    ```sh
      {  
        "ConnectionStrings": {
        "DefaultConnection": "User Id=SEU_USUARIO;Password=SUA_SENHA;Data Source=SEU_SERVIDOR"
        }
      }

3. Execute o projeto:
    ```sh
    dotnet run

4. Acesse o Swagger:
   ```sh
    http://localhost:5010/swagger

### 2. Frontend (React + Vite)

1. Acesse a pasta do frontend:
  ```sh
    cd transactionsapp.client
  ```
2. Instale as dependências:
   ```sh
    npm install
   ```

3. Rode o servidor:
  ```sh
  npm run dev
  ```

4. Acesse:
  ```sh
  https://localhost:55727
  ```  

## Funcionalidades
### Transações (Back e Front)

- GET /api/transactions – Listar todas
- GET /api/transactions/{id} – Buscar por ID
- POST /api/transactions – Criar nova 
- PUT /api/transactions/{id} – Atualizar
- DELETE /api/transactions/{id} – Remover

### Binance Tracker (Frontend)
- Busca de pares via API REST
- Seleção de ativos
- Visualização em tempo real:
   - Último preço (lastPrice)
   - Melhor bid/ask
   - Variação percentual (%)

## Tecnologias Utilizadas
### Backend
- .NET 6
- Dapper
- Oracle Database
- Swagger (Swashbuckle)
- CQRS Pattern

### Frontend
- React 18
- Vite
- Styled-components
- WebSocket API Binance
- TypeScrip

## Exemplo de Tela
- Listagem de transações
- Monitoramento ao vivo de ativos como ETHBTC, BNBBTC
- Responsivo
