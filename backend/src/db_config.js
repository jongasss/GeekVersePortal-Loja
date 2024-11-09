const mysql = require("mysql2") // Importa a biblioteca para conectar ao banco de dados

// Cria a conexão com o banco.
const connection = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10743723",
    password: "bCLCZdyni3",
    database: "sql10743723"
})

// Conecta, jogando um erro se der errado ou mostrando uma mensagem se der certo
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("MySQL Conectado");
    }
})

module.exports = connection // exporta para outro arquivo
