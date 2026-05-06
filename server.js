const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();

// 1. Configurações do JSON Server
// Usamos path.join para garantir que o Render encontre o db.json na raiz
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// 2. Porta dinâmica (Obrigatório para o Render)
const porta = process.env.PORT || 3000;

// 3. Middlewares
app.use(middlewares);
app.use(express.json());

// 4. Servir arquivos estáticos (HTML, CSS, JS das pastas)
// Isso garante que http://seu-site.com/ abra o index.html da /public
app.use(express.static(path.join(__dirname, 'public')));

// 5. Rotas da API (JSON Server)
// O ideal é que as rotas do banco fiquem depois dos estáticos
app.use(router);

// 6. Inicialização do Servidor
app.listen(porta, () => {
    console.log(`🚀 Servidor rodando na porta ${porta}`);
});
