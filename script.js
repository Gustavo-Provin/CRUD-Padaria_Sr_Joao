// A Padaria do Sr. João
// O Sr. João é um padeiro que sempre fez tudo à moda antiga. Recentemente, ele percebeu que muitos de seus clientes jovens usam aplicativos para fazer pedidos de pão e doces. Então, ele decidiu que era hora de modernizar sua padaria e criar um sistema online para receber pedidos.
// Ele contratou você, um desenvolvedor web, para criar um sistema simples que permita aos clientes fazerem pedidos online. O Sr. João quer que o sistema seja capaz de:

// Requisitos do Sistema

// 	O produto deve conter: id, nome, estoque e preço

// *Listar Todos os Produtos Disponíveis: O sistema deve ser capaz de exibir uma lista de todos os produtos disponíveis na padaria. João vai poder escolher no momento entre listagem simplificada, por ordem de preço, ou por ordem alfabética.

// *Adicionar um Novo Produto ao Catálogo: O sistema deve permitir que o usuário adicione um novo produto ao catálogo. O produto deve ser adicionado com um nome, preço e estoque.

// *Editar Produto do Catálogo: O sistema deve permitir que o usuário edite as informações de um produto existente no catálogo. Lembre-se que o estoque nunca pode ser menor que 0.

// *Remover um Produto do Catálogo: O sistema deve permitir que o usuário remova um produto do catálogo.

// *Receber Pedidos dos Clientes: O sistema deve permitir que os clientes façam pedidos. Um pedido deve conter um ou mais produtos e a quantidade desejada de cada um. O sistema deve armazenar um histórico de pedidos. 

// *Somar o valor do estoque: João deve poder somar o preço de venda do seu estoque

// *Relatório Diarios: João deve poder fazer um relatório das vendas que aconteceram em um período específico que ele selecionar. Deve conter quantas vendas foram realizadas e qual o faturamento.

let produtos = [{
    id: '1',
    nome: "Pão",
    estoque: 50,
    preco: 2.90
},
{
    id: '2',
    nome: "Queijo",
    estoque: 28,
    preco: 4.80
},
{
    id: '3',
    nome: "Leite",
    estoque: 56,
    preco: 3.70
}]

let pedidos = [{
    cliente: 'Joao',
    produtos: [{id: 3, nome: "Leite", estoque: 56, preco: 3.70}],
    quantidade: 4,
    data: 1700784000000
},
{
    cliente: 'Claudio',
    produtos: [{id: 2, nome: "Queijo", estoque: 28, preco: 4.80}],
    quantidade: 2,
    data: 1700956800000
},
{
    cliente: 'Claudia',
    produtos: [{id: 3, nome: "Leite", estoque: 56, preco: 3.70}],
    quantidade: 4,
    data: 1600784000000
},
{
    cliente: 'Paula',
    produtos: [{id: 3, nome: "Leite", estoque: 56, preco: 3.70}],
    quantidade: 4,
    data: 1800784000000
}
]

function menu() {
    let opcao = prompt("Digite:\n 1 - para adicionar um produto\n 2 - para editar um produto\n 3 - para remover um produto\n 4 - para listar todos os produtos\n 5 - para adicionar um pedido\n 6 - para somar o valor do estoque\n 7 - para gerar um relatório diário\n 8 - qualquer outra tecla para sair:")
    switch(opcao) {
        case '1':
            adicionarProduto()
            break
        case '2':
            editarProduto()
            break 
        case '3':
            removerProduto()
            break
        case '4':
            listarProdutos()
            break
        case '5':
            adicionarPedido()
            break
        case '6':
            somarValorEstoque()
            break
        case '7':
            relatorioDiario()
            break
        default:
            return
    }
    menu()
}

let id = 0

function adicionarProduto() {
    if (produtos.length) {
        produtos.forEach(produto => {
            id = Math.max(id, produto.id)
        })
        id += 1
    } else {
        id = 1
    }
    let nome = prompt("Digite o nome do produto:")
    let estoque = prompt("Digite a quantidade em estoque do produto:")
    let preco = prompt("Digite o preço do produto:")
    produtos.push({id, nome, estoque, preco})
}

function editarProduto() {
    let id = prompt("Digite o ID do produto que você deseja editar:")
    for(let i = 0; i < produtos.length; i++) {
        if(produtos[i].id === id) {
            produtos[i].nome = prompt("Digite o novo nome do produto:")
            produtos[i].estoque = prompt("Digite a nova quantidade em estoque do produto:")
            produtos[i].preco = prompt("Digite o novo preço do produto:")
            break
        }
    }
}

function removerProduto() {
    let id = prompt("Digite o ID do produto que você deseja remover:")
    produtos = produtos.filter(produto => produto.id !== id)
}

function listarProdutos() {
    let opcao = prompt("Digite 1 para uma listagem simplificada, 2 para listar por ordem de preço, ou 3 para listar por ordem alfabética:");
    switch(opcao) {
        case '1':
            produtos.forEach(produto => alert(`ID: ${produto.id}, Nome: ${produto.nome}, Estoque: ${produto.estoque}, Preço: ${produto.preco}`));
            break;
        case '2':
            let produtosOrdenadosPorPreco = produtos.slice().sort((a, b) => a.preco - b.preco);
            produtosOrdenadosPorPreco.forEach(produto => alert(`ID: ${produto.id}, Nome: ${produto.nome}, Estoque: ${produto.estoque}, Preço: ${produto.preco}`));
            break;
        case '3':
            let produtosOrdenadosPorNome = produtos.slice().sort((a, b) => {
                if(a.nome < b.nome) return -1;
                if(a.nome > b.nome) return 1;
                return 0;
            });
            produtosOrdenadosPorNome.forEach(produto => alert(`ID: ${produto.id}, Nome: ${produto.nome}, Estoque: ${produto.estoque}, Preço: ${produto.preco}`));
            break;
        default:
            alert("Opção inválida.");
            break;
    }
}


function adicionarPedido() {
    let cliente = prompt("Digite o nome do cliente:")
    let data = new Date() 
    let pedido = {cliente, produtos: [], data: data.getTime()} 
    
    while (true) {
        let idProduto = prompt("Digite o ID do produto que você deseja adicionar ao pedido, ou 'sair' para finalizar o pedido:")
        if (idProduto === 'sair') {
            break
        }
        let quantidade = parseInt(prompt("Digite a quantidade desejada do produto:"))
        let produto = produtos.find(produto => produto.id === idProduto)
        if (produto) {
            if (produto.estoque >= quantidade) {
                produto.estoque -= quantidade
                pedido.produtos.push({produto, quantidade})
            } else {
                alert("Estoque insuficiente para este produto.")
            }
        } else {
            alert("Produto não encontrado.")
        }
    }
    pedidos.push(pedido)
    
}

function somarValorEstoque() {
    let valorTotal = produtos.reduce((acc, produto) => {
        return acc + (produto.estoque * produto.preco)
    }, 0)
    alert("Valor total do estoque: " + valorTotal.toFixed(2))
}

function relatorioDiario() {
    let dataInicio = new Date(prompt("Digite a data de início do período (formato: AAAA-MM-DD):")).getTime()
    let dataFim = new Date(prompt("Digite a data de fim do período (formato: AAAA-MM-DD):")).getTime()
    let pedidosPeriodo = pedidos.filter(pedido => pedido.data >= dataInicio && pedido.data <= dataFim)
    let totalVendas = pedidosPeriodo.length
    let faturamento = 0
    pedidosPeriodo.forEach(pedidos => {
        let preco = 0
        pedidos.produtos.forEach(pedido => {
         preco = pedido.preco
        })
        let multipli = preco * pedidos.quantidade
        faturamento += multipli 
    })
    
    alert("Total de vendas no período: " + totalVendas)
    alert("Faturamento no período: " + faturamento)
}

menu()