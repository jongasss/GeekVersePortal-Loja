create database loja;
use loja;
drop database loja;

create table produtos(
	id int primary key auto_increment,
    nome varchar(45) not null,
    preco float not null,
    img varchar(45) not null
);

insert into produtos(nome, preco, img)
values ("Esfera do Dragão", 3000, "esfera-do-dragão.png"),
("Sabre de Luz", 4500, "sabre-de-luz.png"),
("Anel de Sauron", 10000, "anel-de-sauron.png"),
("Capa da Invisibilidade", 1500, "capa-da-invisibilidade.png"),
("Cogumelo do Mario", 650, "cogumelo.png"),
("Cubo Mágico 1x1x1", 35, "cubo-mágico.png"),
("Death Note", 15000, "death-note.png"),
("Dedo do Sukuna", 9000, "dedo-sukuna.png"),
("Escudo Vibranium", 20000, "escudo-capitão-américa.png"),
("Exodia", 5000, "exodia.png"),
("Exoesqueleto de Ferro", 50000, "homem-de-ferro.png"),
("Lâminas do Caos", 25000, "lamina-do-caos.png"),
("Pokebola", 10000, "pokebola.png"),
("Portal Gun", 6500, "portal-gun.png"),
("Varinha Mágica", 3500, "varinha-mágica.png");

create table usuarios(
	id int primary key auto_increment,
    nome varchar(45) not null,
    sobrenome varchar(45) not null,
    email varchar(45) not null unique,
    senha varchar(45) not null,
    cargo enum("A", "U") default "U"
);

insert into usuarios(nome, sobrenome, email, senha, cargo)
values ("John", "Hennig", "john@gmail.com", "senha-secreta", "A"),
("Lucas", "Kraemer", "lucas@gmail.com", "senha-secreta", "A");

create table favoritos(
    id_usuario int,
    id_produto int,
    primary key(id_usuario, id_produto),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_produto) references produtos(id)
);