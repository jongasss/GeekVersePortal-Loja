// Código do modal do carrinho, para fechar
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", (e) => { // Se clicar no fundo, fecha o modal
  overlay.style.display = "none";
  modal.style.display = "none";
  modal.innerHTML = "";
});

// Verifica se está na página de login
const login2 = document.querySelector(".formulario-login");
if (login2) {
  if (localStorage.getItem("usuario") !== null) { // Se tiver logado
    location.pathname = "frontend/usuario.html"; // Muda de página
  }
}

// Verifica se está na página de cadastro
const cadastro = document.querySelector(".formulario-cadastro");
if (cadastro) {
  if (localStorage.getItem("usuario") !== null) { // Se tiver logado
    location.pathname = "frontend/login.html"; // Muda de página
  }
}

// Cria a div do produto no HTML dinamicamente
async function criarProduto(produto) {
  let divProdutos = document.querySelector(".produtos");

  const produtoDiv = document.createElement("div");
  produtoDiv.classList.add("produto");

  // Imagem
  const imgProduto = document.createElement("img");
  imgProduto.src = "http://localhost:3000/uploads/" + produto.img;
  imgProduto.alt = produto.nome;
  produtoDiv.appendChild(imgProduto);

  const nomeProduto = document.createElement("h2");
  nomeProduto.classList.add("nome-produto");
  nomeProduto.textContent = produto.nome;
  produtoDiv.appendChild(nomeProduto);

  const precoProduto = document.createElement("p");
  precoProduto.classList.add("preco-produto");
  precoProduto.textContent = "R$ " + produto.preco;
  produtoDiv.appendChild(precoProduto);

  const botoesDiv = document.createElement("div");
  botoesDiv.classList.add("botoes");

  // Botão carrinho
  const botaoCarrinho = document.createElement("button");
  botaoCarrinho.classList.add("carrinho");
  const imgCarrinho = document.createElement("img");
  imgCarrinho.src = "assets/carrinho.png";
  imgCarrinho.alt = "Adicionar ao carrinho";
  botaoCarrinho.appendChild(imgCarrinho);
  botoesDiv.appendChild(botaoCarrinho);
  botaoCarrinho.onclick = function () { // Ao clicar no botão
    let carrinho = JSON.parse(localStorage.getItem("carrinho")); // Pega o carrinho atual
    botaoCarrinho.classList.toggle("adicionado-ao-carrinho"); // Muda o botão para estar ou não adiciona ao carrinho
    if (carrinho.includes(produto.id)) { // Se no carrinho tiver o produto
      carrinho = carrinho.filter((item) => item !== produto.id); // Tira ele
      localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Coloca no localstorage
    } else { // Se não
      carrinho.push(produto.id); // Coloca ele
      localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Coloca no localstorage
    }
  };

  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  if (carrinho.includes(produto.id)) { // Se o produto estiver no carrinho
    botaoCarrinho.classList.add("adicionado-ao-carrinho"); // Muda o botão
  }

  // Botão favoritos
  const botaoFavoritos = document.createElement("button");
  const imgFavoritos = document.createElement("img");
  imgFavoritos.src = "assets/favoritos.png";
  imgFavoritos.alt = "Adicionar aos favoritos";
  botaoFavoritos.appendChild(imgFavoritos);
  botoesDiv.appendChild(botaoFavoritos);
  if (localStorage.getItem("usuario") !== null) { // Se o usuário estiver logado
    const usuario = JSON.parse(localStorage.getItem("usuario")); // Pega usuário

    // Faz a requsição para ver se o produto é favorito
    const response = await fetch(
      `http://localhost:3000/produto/favorito?usuario=${usuario.id}&produto=${produto.id}`
    );
    const results = await response.json();

    if (results.success) { // se não der erro
      if (results.data[0]) {
        botaoFavoritos.classList.add("adicionado-ao-carrinho"); // Caso tenha produto muda o botão
      }
    } else {
      alert(results.message); // Alerta o erro
    }

    botaoFavoritos.onclick = async function () { // Ao clicar
      if (botaoFavoritos.classList.contains("adicionado-ao-carrinho")) { // Se tiver nos favoritos
        // Tira dos favoritos
        const response = await fetch(
          `http://localhost:3000/produto/favorito/remover`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario.id, produto: produto.id }),
          }
        );
        const results = await response.json();

        if (results.success) {
          botaoFavoritos.classList.remove("adicionado-ao-carrinho");
        } else {
          alert(results.message);
        }
      } else {
        // Adiciona aos favoritos
        const response = await fetch(
          `http://localhost:3000/produto/favoritar`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario.id, produto: produto.id }),
          }
        );
        const results = await response.json();

        if (results.success) {
          botaoFavoritos.classList.add("adicionado-ao-carrinho");
        } else {
          alert(results.message);
        }
      }
    };
  }

  produtoDiv.appendChild(botoesDiv);

  divProdutos?.appendChild(produtoDiv);
}

// Cria os produtos no carrinho da página do usuário
async function criarProdutoCarrinhoUsuario(produto) {
  let divProdutos = document.querySelector(".carrinho-conta");

  const produtoDiv = document.createElement("div");
  produtoDiv.classList.add("produto");

  const imgProduto = document.createElement("img");
  imgProduto.src = "http://localhost:3000/uploads/" + produto.img;
  imgProduto.alt = produto.nome;
  produtoDiv.appendChild(imgProduto);

  const nomeProduto = document.createElement("h2");
  nomeProduto.classList.add("nome-produto");
  nomeProduto.textContent = produto.nome;
  produtoDiv.appendChild(nomeProduto);

  const precoProduto = document.createElement("p");
  precoProduto.classList.add("preco-produto");
  precoProduto.textContent = "R$ " + produto.preco;
  produtoDiv.appendChild(precoProduto);

  const botoesDiv = document.createElement("div");
  botoesDiv.classList.add("botoes");

  const botaoCarrinho = document.createElement("button");
  botaoCarrinho.classList.add("carrinho");
  const imgCarrinho = document.createElement("img");
  imgCarrinho.src = "assets/carrinho.png";
  imgCarrinho.alt = "Adicionar ao carrinho";
  botaoCarrinho.appendChild(imgCarrinho);
  botoesDiv.appendChild(botaoCarrinho);
  botaoCarrinho.onclick = function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    botaoCarrinho.classList.toggle("adicionado-ao-carrinho");
    if (carrinho.includes(produto.id)) {
      carrinho = carrinho.filter((item) => item !== produto.id);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    } else {
      carrinho.push(produto.id);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  };

  const botaoFavoritos = document.createElement("button");
  const imgFavoritos = document.createElement("img");
  imgFavoritos.src = "assets/favoritos.png";
  imgFavoritos.alt = "Adicionar aos favoritos";
  botaoFavoritos.appendChild(imgFavoritos);
  botoesDiv.appendChild(botaoFavoritos);
  if (localStorage.getItem("usuario") !== null) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(
      `http://localhost:3000/produto/favorito?usuario=${usuario.id}&produto=${produto.id}`
    );
    const results = await response.json();

    if (results.success) {
      if (results.data[0]) {
        botaoFavoritos.classList.add("adicionado-ao-carrinho");
      }
    } else {
      alert(results.message);
    }

    botaoFavoritos.onclick = async function () {
      if (botaoFavoritos.classList.contains("adicionado-ao-carrinho")) {
        const response = await fetch(
          `http://localhost:3000/produto/favorito/remover`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario.id, produto: produto.id }),
          }
        );
        const results = await response.json();

        if (results.success) {
          botaoFavoritos.classList.remove("adicionado-ao-carrinho");
        } else {
          alert(results.message);
        }
      } else {
        const response = await fetch(
          `http://localhost:3000/produto/favoritar`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario.id, produto: produto.id }),
          }
        );
        const results = await response.json();

        if (results.success) {
          botaoFavoritos.classList.add("adicionado-ao-carrinho");
        } else {
          alert(results.message);
        }
      }
    };
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho"));

  if (carrinho.includes(produto.id)) {
    botaoCarrinho.classList.add("adicionado-ao-carrinho");
  }

  produtoDiv.appendChild(botoesDiv);

  divProdutos?.appendChild(produtoDiv);
}

// Função para criar o HTML do produto no modal do carrinho
function criarProdutoCarrinho(produto) {
  const produtoCarrinhoDiv = document.createElement("div");
  produtoCarrinhoDiv.classList.add("produto-carrinho");

  const imgProduto = document.createElement("img");
  imgProduto.src = "http://localhost:3000/uploads/" + produto.img;
  imgProduto.alt = produto.nome;
  produtoCarrinhoDiv.appendChild(imgProduto);

  const informacoesCarrinhoDiv = document.createElement("div");
  informacoesCarrinhoDiv.classList.add("informacoes-carrinho");

  const nomeProduto = document.createElement("h2");
  nomeProduto.textContent = produto.nome;
  informacoesCarrinhoDiv.appendChild(nomeProduto);

  const precoProduto = document.createElement("p");
  precoProduto.textContent = "R$ " + produto.preco;
  informacoesCarrinhoDiv.appendChild(precoProduto);

  produtoCarrinhoDiv.appendChild(informacoesCarrinhoDiv);

  modal.appendChild(produtoCarrinhoDiv);
}

// Pega os produtos
async function pegarProdutos() {
  // Pega os produtos
  const response = await fetch("http://localhost:3000/get/produtos");
  const results = await response.json();

  if (results.success) {
    results.data.forEach(async (produto) => {
      await criarProduto(produto);
    }); // Cria um HTML de produto para cada produto

    // Pega o botão do modal e cria um evento para abrir o modal
    const botaoModal = document.querySelector(".carrinho-header");
    botaoModal.onclick = function () {
      modal.style.display = "flex";
      overlay.style.display = "flex";

      const carrinho = JSON.parse(localStorage.getItem("carrinho"));
      if (carrinho.length === 0) { // Se o carrinho estiver vazio, mostra uma mensagem
        const mensagem = document.createElement("p");
        mensagem.textContent = "Sem nenhum item no carrinho";
        modal.appendChild(mensagem);
      } else { // Se não
        const titulo = document.createElement("h2");
        titulo.textContent = "Carrinho";
        modal.appendChild(titulo); // Título do carrinho

        results.data.forEach((produto) => {
          if (carrinho.includes(produto.id)) {
            criarProdutoCarrinho(produto); // Cria um HTML de produto para cada produto pego na requisição
          }
        });

        // Botão de finalizar compra
        const aComprar = document.createElement("a");
        aComprar.classList.add("botao-comprar");
        aComprar.textContent = "Finalizar Compra";
        aComprar.href = "finalizar-compra.html";
        modal.appendChild(aComprar);
      }
    };
    const carrinho = JSON.parse(localStorage.getItem("carrinho"));
    if (carrinho.length === 0) {
      let divProdutos = document.querySelector(".carrinho-conta");
      const p = document.createElement("p");
      p.textContent = "Carrinho Vazio";
      divProdutos.appendChild(p);
    } else {
      results.data.forEach((produto) => {
        if (carrinho.includes(produto.id)) {
          criarProdutoCarrinhoUsuario(produto); // Cria um HTML de produto para cada produto pego na requisição (na página da conta do usuário)
        }
      });
    }
  } else {
    alert(results.message); // Se der erro, mostra
  }
}
pegarProdutos(); // Executa a função

if (!localStorage.getItem("carrinho")) {
  localStorage.setItem("carrinho", "[]"); // Se não tiver carrinho, cria um vazio, evitando erros
}

async function cadastrar(event) { // Cadastro de usuários
  event.preventDefault();

  // Informações enviadas no formulário
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = { nome, sobrenome, email, senha }; // Cria um objeto para mandar tudo junto

  for (let pos in data) { // Em cada informação
    if (!data[pos]) { // Caso ela esteja vazia
      alert("Valor " + pos + " inválido"); // Mostra que o valor está inválido
      return; // Para de executar o código
    }
  }

  // Se tudo estiver correto, faz o cadastro no banco
  const response = await fetch("http://localhost:3000/usuario/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const results = await response.json();

  if (results.success) { // Se deu certo o cadastro
    const id = results.data.insertId; // Pega o id
    localStorage.setItem("usuario", JSON.stringify({ ...data, id })); // Coloca no localstorage
    location.pathname = "frontend/index.html"; // Volta a página principal
  } else {
    alert(results.message); // Se deu erro mostra o erro
  }
}

// Faz o login
async function login(event) {
  event.preventDefault();

  // Informações enviadas no formulário
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = { email, senha }; // Cria um objeto para mandar tudo junto

  for (let pos in data) { // Em cada informação
    if (!data[pos]) { // Caso ela esteja vazia
      alert("Valor " + pos + " inválido"); // Mostra que o valor está inválido
      return; // Para de executar o código
    }
  }

  // Tenta fazer o login
  const response = await fetch(
    `http://localhost:3000/usuario/login?email=${email}&senha=${senha}`
  );

  const results = await response.json();

  if (results.data.length === 0) {
    alert("Usuário não encontrado"); // Se não tiver usuário, mostra que não tem
  } else if (results.success) { // Se tiver
    localStorage.setItem("usuario", JSON.stringify(results.data[0])); // Coloca no localstorage
    location.pathname = "frontend/index.html"; // Muda de página
  } else {
    alert(results.message); // Se deu erro mostra
  }
}

// Faz a cinora
async function comprar(event) {
  event.preventDefault();

  localStorage.setItem("carrinho", "[]"); // Limpa o carrinho
  alert("Compra concluída");
  location.pathname = "frontend/index.html"; // Muda de página
}

// Se estiver na página de finalizar compra
const finalizar_compra = document.querySelector(".formulario-finalizar-compra");
if (finalizar_compra) {
  if (localStorage.getItem("usuario") === null) { // Caso não esteja logado
    location.pathname = "frontend/login.html"; // Muda a página
  }

  // Preenche informações automaticamente
  document.getElementById("nome").value = JSON.parse(
    localStorage.getItem("usuario")
  ).nome;
  document.getElementById("sobrenome").value = JSON.parse(
    localStorage.getItem("usuario")
  ).sobrenome;
}

// Se estiver na página de criar produto
const criarProduto2 = document.querySelector(".formulario-criar-produto");
if (criarProduto2) {
  // Caso não esteja logado ou não seja admin
  if (
    localStorage.getItem("usuario") === null ||
    JSON.parse(localStorage.getItem("usuario"))?.cargo === "U"
  ) {
    location.pathname = "frontend/index.html"; // Muda a página
  }
}

// Se estiver na página de editar produto
const editarProduto2 = document.querySelector(".formulario-gerenciar-produto");
if (editarProduto2) {
  // Caso não esteja logado ou não seja admin
  if (
    localStorage.getItem("usuario") === null ||
    JSON.parse(localStorage.getItem("usuario"))?.cargo === "U"
  ) {
    location.pathname = "frontend/index.html"; // Muda a página
  }
}

// Faz o cadastro de produtos
async function cadastrarProduto(event) {
  event.preventDefault(); // Previne o padrão de formulários, resetar a página

  // Informações enviadas no formulário
  const nome = document.getElementById("nome").value;
  const preco = Number(document.getElementById("preco").value);
  const img = document.getElementById("img").files[0];

  // Cria um formdata, que envia dados, incluindo imagens
  let formData = new FormData();
  formData.append("nome", nome);
  formData.append("preco", preco);
  formData.append("img", img);

  const data = { nome, preco, img }; // Cria um objeto para validação

  for (let pos in data) { // Verifica se o objeto está válido
    if (!data[pos]) {
      alert("Valor " + pos + " inválido");
      return;
    }
  }

  // Tenta fazer o cadastro
  const response = await fetch("http://localhost:3000/produto/cadastrar", {
    method: "POST",
    body: formData,
  });

  const results = await response.json();

  // Mostra se deu certo ou não
  if (results.success) {
    alert("Produto criado");
  } else {
    alert(results.message);
  }
}

// Edita o produto
async function editarProduto(event) {
  event.preventDefault();

  // Informações enviadas no formulário
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const preco = document.getElementById("preco").value;
  const img = document.getElementById("img").files[0];

  // Cria um formdata, que envia dados, incluindo imagens
  let formData = new FormData();
  formData.append("id", id);
  formData.append("nome", nome);
  formData.append("preco", preco);
  formData.append("img", img);

  const data = { nome, preco, img }; // Cria um objeto para validação

  for (let pos in data) { // Verifica se o objeto está válido
    if (!data[pos]) {
      alert("Valor " + pos + " inválido");
      return;
    }
  }

  // Tenta editar
  const response = await fetch(
    "http://localhost:3000/produto/atualizar/" + id,
    {
      method: "PUT",
      body: formData,
    }
  );

  const results = await response.json();

  // Informa se foi possível editar ou não
  if (results.success) {
    alert("Produto alterado");
  } else {
    alert(results.message);
  }
}

// Deleta produto
async function deletarProduto(event) {
  event.preventDefault();

  const id = document.getElementById("id").value; // Pega o id

  // Tenta deletar
  const response = await fetch("http://localhost:3000/produto/deletar/" + id, {
    method: "DELETE",
  });

  const results = await response.json();

  // Informa se foi possível deletar
  if (results.success) {
    alert("Produto deletado");
  } else {
    alert(results.message);
  }
}

// Verifica se o usuário é admin
if (JSON.parse(localStorage.getItem("usuario"))?.cargo === "A") {
  // Cria link para ir para página de edição
  const a = document.createElement("a");
  a.href = "gerenciar-produto.html";
  a.classList.add("engrenagem");

  const img = document.createElement("img");
  img.src = "assets/engrenagem.png";

  a.appendChild(img);
  const nav = document.querySelector("nav");
  nav.appendChild(a);
}

// Caso esteja na página do usuário
const nomeUsuario = document.querySelector(".nomeUsuario");
const emailUsuario = document.querySelector(".emailUsuario");
if (nomeUsuario && emailUsuario) {
  // Mostra o nome do usuário
  nomeUsuario.innerHTML =
    "<b>Nome:</b> " +
    JSON.parse(localStorage.getItem("usuario")).nome +
    " " +
    JSON.parse(localStorage.getItem("usuario")).sobrenome;
  
  // Mostra o email do usuário
  emailUsuario.innerHTML =
    "<b>Email:</b> " + JSON.parse(localStorage.getItem("usuario")).email;
}

// Desloga
async function deslogar(event) {
  event.preventDefault();
  localStorage.removeItem("usuario");
  location.pathname = "frontend/login.html";
}

// Cria HTML do produto, mostrando os favoritos
const favoritos = document.querySelector(".favoritos-conta");
async function criarProdutoFavoritosUsuario(produto) {
  let divProdutos = document.querySelector(".favoritos-conta");

  const produtoDiv = document.createElement("div");
  produtoDiv.classList.add("produto");

  const imgProduto = document.createElement("img");
  imgProduto.src = "http://localhost:3000/uploads/" + produto.img;
  imgProduto.alt = produto.nome;
  produtoDiv.appendChild(imgProduto);

  const nomeProduto = document.createElement("h2");
  nomeProduto.classList.add("nome-produto");
  nomeProduto.textContent = produto.nome;
  produtoDiv.appendChild(nomeProduto);

  const precoProduto = document.createElement("p");
  precoProduto.classList.add("preco-produto");
  precoProduto.textContent = "R$ " + produto.preco;
  produtoDiv.appendChild(precoProduto);

  const botoesDiv = document.createElement("div");
  botoesDiv.classList.add("botoes");

  const botaoCarrinho = document.createElement("button");
  botaoCarrinho.classList.add("carrinho");
  const imgCarrinho = document.createElement("img");
  imgCarrinho.src = "assets/carrinho.png";
  imgCarrinho.alt = "Adicionar ao carrinho";
  botaoCarrinho.appendChild(imgCarrinho);
  botoesDiv.appendChild(botaoCarrinho);
  botaoCarrinho.onclick = function () {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    botaoCarrinho.classList.toggle("adicionado-ao-carrinho");
    if (carrinho.includes(produto.id)) {
      carrinho = carrinho.filter((item) => item !== produto.id);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    } else {
      carrinho.push(produto.id);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  };

  const botaoFavoritos = document.createElement("button");
  const imgFavoritos = document.createElement("img");
  imgFavoritos.src = "assets/favoritos.png";
  imgFavoritos.alt = "Adicionar aos favoritos";
  botaoFavoritos.appendChild(imgFavoritos);
  botoesDiv.appendChild(botaoFavoritos);
  if (localStorage.getItem("usuario") !== null) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const response = await fetch(
      `http://localhost:3000/produto/favorito?usuario=${usuario.id}&produto=${produto.id}`
    );
    const results = await response.json();

    if (results.success) {
      if (results.data[0]) {
        botaoFavoritos.classList.add("adicionado-ao-carrinho");
      }
    } else {
      alert(results.message);
    }

    botaoFavoritos.onclick = async function () {
      if (botaoFavoritos.classList.contains("adicionado-ao-carrinho")) {
        const response = await fetch(
          `http://localhost:3000/produto/favorito/remover`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario.id, produto: produto.id }),
          }
        );
        const results = await response.json();

        if (results.success) {
          botaoFavoritos.classList.remove("adicionado-ao-carrinho");
        } else {
          alert(results.message);
        }
      } else {
        const response = await fetch(
          `http://localhost:3000/produto/favoritar`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario: usuario.id, produto: produto.id }),
          }
        );
        const results = await response.json();

        if (results.success) {
          botaoFavoritos.classList.add("adicionado-ao-carrinho");
        } else {
          alert(results.message);
        }
      }
    };
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho"));

  if (carrinho.includes(produto.id)) {
    botaoCarrinho.classList.add("adicionado-ao-carrinho");
  }

  produtoDiv.appendChild(botoesDiv);

  divProdutos?.appendChild(produtoDiv);
}

// Pega todos os favoritos
async function pegarFavoritos() {
  const id = JSON.parse(localStorage.getItem("usuario")).id; // Pega o usuário

  // Verifica os favoritos
  const response = await fetch("http://localhost:3000/produto/favoritos/" + id);

  const results = await response.json();

  for (let produto of results.data) {
    criarProdutoFavoritosUsuario(produto); // Cria um HTML para cada produto
  }
}

if (favoritos) {
  pegarFavoritos(); // Se tiver a div onde mostra os favoritos, pega eles
}

// Editar conta
async function alterarConta(event) {
  event.preventDefault();

  // Pega informações do formulário
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = { nome, sobrenome, email, senha }; // Cria objeto para enviar informações

  for (let pos in data) { // Em cada informação
    if (!data[pos]) { // Se não tiver
      alert("Valor " + pos + " inválido"); // Mostra que está errado
      return; // Para o código
    }
  }

  // Pega informações usuários
  const id = JSON.parse(localStorage.getItem("usuario")).id;
  const cargo = JSON.parse(localStorage.getItem("usuario")).cargo;

  // Tenta editar
  const response = await fetch("http://localhost:3000/usuario/editar/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const results = await response.json();

  // Se deu certo
  if (results.success) {
    localStorage.setItem("usuario", JSON.stringify({ ...data, id, cargo  })); // Muda informações
    location.pathname = "frontend/index.html"; // Muda página
  } else { // Se deu errado
    alert(results.message); // Mostra erro
  }
}
