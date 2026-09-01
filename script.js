// ===============================
// DELÍCIAS DA MI 2.0
// SCRIPT.JS - PARTE 1
// ===============================

// Carrinho
let carrinho = [];
let total = 0;

// Atualizar contador
function atualizarContador() {

    const contador = document.getElementById("contador");

    if (!contador) return;

    let quantidade = 0;

    carrinho.forEach(item => {
        quantidade += item.quantidade;
    });

    contador.textContent = quantidade;

}

// Atualizar carrinho
function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const totalTexto = document.getElementById("total");

    if (!lista || !totalTexto) return;

    lista.innerHTML = "";

    total = 0;

    carrinho.forEach((item, indice) => {

        total += item.preco * item.quantidade;

        lista.innerHTML += `
        <div class="item-carrinho">

            <div>

                <strong>${item.nome}</strong><br>

                Quantidade: ${item.quantidade}<br>

                R$ ${(item.preco * item.quantidade).toFixed(2)}

            </div>

            <div class="acoes">

                <button onclick="diminuir(${indice})">➖</button>

                <button onclick="aumentar(${indice})">➕</button>

                <button onclick="remover(${indice})">🗑️</button>

            </div>

        </div>
        `;

    });

    totalTexto.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;

    atualizarContador();

}

// Adicionar produto
function adicionar(nome, preco){

    const produto = carrinho.find(item => item.nome === nome);

    if(produto){

        produto.quantidade++;

    }else{

        carrinho.push({

            nome: nome,
            preco: preco,
            quantidade: 1

        });

    }

    atualizarCarrinho();

}

// Aumentar quantidade
function aumentar(indice){

    carrinho[indice].quantidade++;

    atualizarCarrinho();

}

// Diminuir quantidade
function diminuir(indice){

    carrinho[indice].quantidade--;

    if(carrinho[indice].quantidade <= 0){

        carrinho.splice(indice,1);

    }

    atualizarCarrinho();

}

// Remover produto
function remover(indice){

    carrinho.splice(indice,1);

    atualizarCarrinho();

}

// Abrir carrinho
function abrirCarrinho(){

    document.getElementById("carrinho").classList.add("ativo");

}

// Fechar carrinho
function fecharCarrinho(){

    document.getElementById("carrinho").classList.remove("ativo");

}// ===============================
// FINALIZAR PEDIDO
// ===============================

function finalizarPedido(){

    if(carrinho.length === 0){

        alert("Seu carrinho está vazio!");

        return;

    }

    const nome = prompt("Digite seu nome:");

    if(nome === null || nome.trim() === "") return;

    const telefone = prompt("Digite seu WhatsApp:");

    if(telefone === null || telefone.trim() === "") return;

    const endereco = prompt("Digite seu endereço:");

    if(endereco === null || endereco.trim() === "") return;

    const opcao = prompt(
`Forma de pagamento

1 - Pix
2 - Dinheiro`
    );

    let pagamento = "";

    if(opcao === "1"){

        pagamento = "Pix";

    }else if(opcao === "2"){

        pagamento = "Dinheiro";

    }else{

        alert("Escolha apenas 1 ou 2.");

        return;

    }

    let mensagem = "💙 Delícias da Mi 💙\n\n";

    mensagem += "Olá! Gostaria de fazer um pedido.\n\n";

    mensagem += `Cliente: ${nome}\n`;
    mensagem += `WhatsApp: ${telefone}\n`;
    mensagem += `Endereço: ${endereco}\n`;
    mensagem += `Pagamento: ${pagamento}\n\n`;

    mensagem += "Pedido:\n";

    carrinho.forEach(item => {

        mensagem += `• ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;

    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\n`;

    mensagem += "Obrigado! 💙";

    const numero = "5514996885936";

    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    alert(mensagem);

window.open(link, "_blank");

}// ===============================
// INICIAR SITE
// ===============================

window.onload = function(){

    atualizarCarrinho();

};