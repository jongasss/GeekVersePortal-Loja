# Geekverse Portal

## Instruções

Está seção irá trazer um passo a passo para que nossa aplicação funcione corretamente.


Para a criação do banco de dados, deve ser feito:

- Verifique se o MySQL e o MySQL Workbench estão instalados na sua máquina, caso não estejam, instale.
- Pegue o código db.sql na pasta de backend
- Rode esse código no MySQL Workbench

Para rodar o servidor, é necessário:

- Abra o Git Bash na pasta Backend e rode o codigo "npm install"
- Com as dependencias instaladas, rode o codigo "npm start"
- Confirme se está tudo de acordo com a mensagem "Rodando na porta ####"
- Se não aparecer a devida mensagem, volte no passo a passo

## Requisitos

Esta seção mostra as funcionalidades que o site precisa ter.

- Cadastro de Produtos
- Registro e Autenticação de Usuários
- Funcionalidade de Favoritar Produtos
- Adicionar produtos ao carrinho
- Interface de administração
- Backend funcional, usando MySQL e Node
- Formulário de compra de produtos

## Objetivos

O objetivo é a criação de uma loja virtual, com backend e frontend funcional. Busca a aprimoração das habilidades de HTML, CSS, JS, Node e MySQL.

## Linguagens Utilizadas

-   HTML
-   CSS
-   JavaScript

## Rotas

### Listar produtos

Método GET

Rota /get/produtos

### Cadastrar produto

Método POST

Rota /produto/cadastrar

Corpo {
    "nome": "Nome do Produto",
    "preco": 99.99
}

É necessário enviar uma imagem junto.

### Alterar produto

Método put

Rota /produto/atualizar/:id

Corpo {
    "nome": "Novo Nome",
    "preco": 59.99
}

É necessário enviar uma imagem junto.

### Deletar produto

Método delete

Rota /produto/deletar/:id

### Cadastrar usuário

Método post

Rota /usuario/cadastrar

Corpo: {
    "nome": "John"
    "sobrenome": "Hennig",
    "email": "john@gmail.com",
    "senha": "senha-secreta"
}

### LOgin

Método GET

Rota /usuario/login

Obs: É necessário colocar uma query string com email e senha

### Editar usuário

Método PUT

Rota /usuario/editar/:usuario

Corpo: {
    "nome": "John123"
    "sobrenome": "Hennig",
    "email": "john@gmail.com",
    "senha": "nova-senha-secreta"
}

### Favoritar

Método POST

Rota /produto/favoritar

Corpo: {
    "usuario": "1",
    "produto": "1"
}

### Verificar se está nos favoritos

Método get

Rota /produto/favorito

Obs: É necessário colocar uma query string com usuario e produto

### Remover dos favoritos

Método DELETE

Rota /produto/favorito/remover

Corpo:  {
    "usuario": "1",
    "produto": "1"
}

### Pegar todos os favoritos de um usuário

Método GET

Rota /produto/favoritos/:usuario

Componentes: John Hennig, Lucas Kraemer e Luisa Johanna