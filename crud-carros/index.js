const express = require('express');
const mysql = require('mysql2');
const app = express();

// Configuração para o Express entender JSON no corpo das requisições (POST/PUT)
app.use(express.json());

// 1. Configuração da Conexão
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // <-- COLOQUE A SENHA QUE VOCÊ DEFINIU NO TERMINAL
    database: 'frota_db'
});

// Conectar ao Banco
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados frota_db!');
});

// --- ROTAS DO CRUD ---

// ROTA RAIZ: Para evitar o erro "Cannot GET /"
app.get('/', (req, res) => {
    res.send('<h1>API de Carros Rodando!</h1><p>Use <b>/carros</b> para listar ou <b>/setup</b> para criar a tabela.</p>');
});

// SETUP: Cria a tabela automaticamente
app.get('/setup', (req, res) => {
    const sql = `CREATE TABLE IF NOT EXISTS carros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        modelo VARCHAR(100),
        marca VARCHAR(50),
        ano INT
    )`;
    db.query(sql, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Tabela "carros" verificada/criada com sucesso!');
    });
});

// READ: Listar todos os carros
app.get('/carros', (req, res) => {
    db.query('SELECT * FROM carros', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// CREATE: Adicionar um novo carro
app.post('/carros', (req, res) => {
    const { modelo, marca, ano } = req.body;
    const sql = 'INSERT INTO carros (modelo, marca, ano) VALUES (?, ?, ?)';
    
    db.query(sql, [modelo, marca, ano], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ mensagem: 'Carro cadastrado!', id: result.insertId });
    });
});

// DELETE: Remover um carro pelo ID
app.delete('/carros/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM carros WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: 'Carro removido com sucesso!' });
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});