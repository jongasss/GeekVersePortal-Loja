const mysql = require("mysql2") // Importa a biblioteca para conectar ao banco de dados

// Cria a conexão com o banco.
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja"
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