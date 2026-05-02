const express = require('express');
const db = require('./db');
const path = require('path');
const app = express();

app.use(express.json());
// Esta linha faz o Node servir os arquivos da pasta public (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para Listar
app.get('/carros', (req, res) => {
    db.query('SELECT * FROM carros', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Rota para Cadastrar
app.post('/carros', (req, res) => {
    const { marca, modelo, ano, cor } = req.body;
    const sql = 'INSERT INTO carros (marca, modelo, ano, cor) VALUES (?, ?, ?, ?)';
    db.query(sql, [marca, modelo, ano, cor], (err, result) => {
        if (err) return res.status(500).json(err);
        res.send('Carro cadastrado com sucesso!');
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});