// vai ser melhor estruturado quando utilizar o express

const Produto = require('../models/Produto.js');

async function criarProduto() {
    const novoProduto = new Produto({
        cnpj: "00100200304",
        nomeProduto: "Produto Teste",
        email: "teste@Produto.com",
        senha: "123456",
        telefone: "199",
        dataCadastro: "2025-01-20",
        valorVendido: "2025-01-28",
        numVendas: "100",
        numClientes: "50",
        avaliacaoEstrelas: "5"
    });

    await novoProduto.inserir();
}

module.exports = {
    criarProduto
};
