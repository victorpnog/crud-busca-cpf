const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

// Define o caminho absoluto para o db.json
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Define o caminho absoluto para a pasta public
const middlewares = jsonServer.defaults({
    static: path.join(__dirname, 'public')
});

const porta = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
    console.log(`Páginas estáticas servidas da pasta: ${path.join(__dirname, 'public')}`);
});