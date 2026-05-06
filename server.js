const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Configura a porta dinâmica para o Render
const porta = process.env.PORT || 3000;

// 1. Usar Middlewares padrão (logger, static, etc)
app.use(middlewares);
app.use(express.json());

// 2. Servir os arquivos da sua pasta public
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rota para o JSON Server (API)
// Isso faz com que suas requisições fetch('/pessoas') funcionem
app.use(router);

// Inicia o servidor unificado
app.listen(porta, () => {
    console.log(`Servidor unificado rodando na porta ${porta}`);
});
