const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const porta = process.env.PORT || 3000;

app.use(middlewares);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(porta, () => {
    console.log(`Servidor online na porta ${porta}`);
});
