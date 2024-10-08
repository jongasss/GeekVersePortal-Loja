const express = require("express"); // Importa o express, que permite criar rotas
const cors = require("cors"); // Permite que outros domínios acessem o servidor

const port = 3000;
const app = express(); // Cria uma instância do express

app.use(cors()); // Usa a função vista acima
app.use(express.json()); // Permite enviar objetos JSON

app.listen(port, () => console.log(`Rodando na porta ${port}`)); // Testa a porta

const connection = require("./db_config"); // Importa a conexão com o banco de dados
const upload = require("./multer"); // Importa o negócio que deixa colocar imagens no servidor

// Rotas de pegar todos os produtos
app.get("/get/produtos", (request, response) => {
    let query = "SELECT * FROM produtos;"; // Query pro banco de dados

    // Faz a query para o banco
    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                }); // Responde com sucesso
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                }); // Responde com erro
        }
    });
});

app.post("/produto/cadastrar", upload.single("img"), (request, response) => { // O upload.single é para passar uma imagem
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.file.filename
    ) // Parâmetros para a query para o banco de dados

    let query = "INSERT INTO produtos(nome, preco, img) VALUES (?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.use('/uploads', express.static(__dirname + "\\public")) // Permite que vejamos a imagem através da rota uploads

app.put("/produto/atualizar/:id", upload.single("img"), (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.file.filename,
        request.params.id
    )

    let query = "UPDATE produtos SET nome = ?, preco = ?, img = ? WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

app.delete("/produto/deletar/:id", (request, response) => {
    let params = Array(
        request.params.id
    )

    let query = "DELETE FROM produtos WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

// Usuários
app.post("/usuario/cadastrar", (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.sobrenome,
        request.body.email,
        request.body.senha,
    )

    let query = "INSERT INTO usuarios(nome, sobrenome, email, senha) VALUES (?,?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

app.get("/usuario/login", (request, response) => {
    let params = Array(
        request.query.email,
        request.query.senha,
    )

    let query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.put("/usuario/editar/:usuario", (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.sobrenome,
        request.body.email,
        request.body.senha,
        request.params.usuario
    )

    let query = "UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, senha = ? WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

// Favoritar
app.post("/produto/favoritar", (request, response) => { // Favorita
    let params = Array(
        request.body.usuario,
        request.body.produto
    )

    let query = "INSERT INTO favoritos(id_usuario, id_produto) VALUES (?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.get("/produto/favorito", (request, response) => { // Vê se o produto está como favorito
    let params = Array(
        request.query.usuario,
        request.query.produto
    )

    let query = "SELECT * FROM favoritos WHERE id_usuario = ? AND id_produto = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.delete("/produto/favorito/remover", (request, response) => { // Remove o produto dos favoritos
    let params = Array(
        request.body.usuario,
        request.body.produto
    )

    let query = "DELETE FROM favoritos WHERE id_usuario = ? AND id_produto = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.get("/produto/favoritos/:usuario", (request, response) => { // Seleciona todos os favoritos do usuário
    let params = Array(
        request.params.usuario
    )

    let query = "SELECT * FROM favoritos INNER JOIN produtos ON id_produto = id WHERE id_usuario = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});