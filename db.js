const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Deve ser a mesma senha do comando SQL acima
  database: 'frota_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado ao MySQL com sucesso!');
});

module.exports = connection;