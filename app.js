const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

// Configurações essenciais
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota: Listar Carros
app.get('/carros', (req, res) => {
    const sql = 'SELECT * FROM carros';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
});

// Rota: Cadastrar Carro
app.post('/carros', (req, res) => {
    const { marca, modelo, ano, cor } = req.body;
    const sql = 'INSERT INTO carros (marca, modelo, ano, cor) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [marca, modelo, ano, cor], (err, result) => {
        if (err) {
            console.error("Erro no MySQL:", err.message);
            return res.status(500).json({ erro: err.message });
        }
        res.status(201).json({ mensagem: 'Carro salvo!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});