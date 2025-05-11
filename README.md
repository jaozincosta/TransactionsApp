Tecnologias Utilizadas
Backend (.NET Core C#)
✅ .NET Core 7+
✅ Dapper (Acesso ao banco de dados)
✅ CQRS (Separação de leitura e escrita)
✅ Oracle Database (Armazenamento de dados)
✅ FluentValidation (Validação de dados)
✅ XUnit (Testes unitários)
Frontend (React + TypeScript)
✅ React 18+
✅ React Router Dom (Roteamento)
✅ Styled Components (Estilização)
✅ Axios (Requisições HTTP)
✅ WebSockets (Atualização em tempo real)
✅ Context API (Gerenciamento de estado)

Configuração & Execução
Backend
Clone o repositório
git clone https://github.com/seu-usuario/TransactionsApp
cd projeto/backend

Configurar o banco de dados (MySQL)
No arquivo appsettings.json, configure a conexão com Oracle:
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=seu-server;Database=transactionsdb;User=root;Password=sua-senha;"
  }
}

Restaurar pacotes e rodar a API
dotnet restore
dotnet run
Testar a API no Swagger
Acesse: http://localhost:5010/swagger

Rodar os testes unitários
dotnet test

Frontend
Acesse a pasta do frontend
cd ../frontend

Instale as dependências
npm install
Inicie o servidor
npm run dev
Acesse: http://localhost:55727
Rodar os testes
npm test

Funcionalidades
Backend (API de Transações)
✅ Criar transações (POST /api/transactions)
✅ Listar todas as transações (GET /api/transactions)
✅ Buscar por ID (GET /api/transactions/{id})
✅ Atualizar uma transação (PUT /api/transactions/{id})
✅ Deletar uma transação (DELETE /api/transactions/{id})

Frontend (Binance WebSocket Tracker)
✅ Buscar símbolos da Binance (GET https://api.binance.com/api/v3/exchangeInfo)
✅ Adicionar símbolos à Watchlist
✅ Atualização em tempo real via WebSockets
✅ Exibir último preço, best bid, best ask e variação %
✅ Interface responsiva
