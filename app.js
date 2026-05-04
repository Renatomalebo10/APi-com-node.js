const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Listar todos os carros
app.get('/carros', (req, res) => {
    const sql = 'SELECT * FROM carros';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
});

// Ler um carro específico
app.get('/carros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM carros WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!results.length) return res.status(404).json({ erro: 'Carro não encontrado' });
        res.json(results[0]);
    });
});

// Cadastrar novo carro
app.post('/carros', (req, res) => {
    const { marca, modelo, ano, cor } = req.body;
    if (!marca || !modelo || !ano || !cor) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO carros (marca, modelo, ano, cor) VALUES (?, ?, ?, ?)';
    db.query(sql, [marca, modelo, ano, cor], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ mensagem: 'Carro cadastrado com sucesso', id: result.insertId });
    });
});

// Atualizar carro existente
app.put('/carros/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, cor } = req.body;
    if (!marca || !modelo || !ano || !cor) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const sql = 'UPDATE carros SET marca = ?, modelo = ?, ano = ?, cor = ? WHERE id = ?';
    db.query(sql, [marca, modelo, ano, cor, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ erro: 'Carro não encontrado' });
        res.json({ mensagem: 'Carro atualizado com sucesso' });
    });
});

// Excluir carro
app.delete('/carros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM carros WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ erro: 'Carro não encontrado' });
        res.json({ mensagem: 'Carro excluído com sucesso' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
