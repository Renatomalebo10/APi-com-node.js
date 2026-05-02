const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Senha que definimos no terminal do Ubuntu
  database: 'frota_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection;