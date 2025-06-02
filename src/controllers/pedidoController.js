// vai ser melhor estruturado quando utilizar o express

const Pedido = require('../models/Pedido.js');

async function criarPedido() {
    const novoPedido = new Pedido({
        cnpj: "00100200304",
        nomePedido: "Pedido Teste",
        email: "teste@Pedido.com",
        senha: "123456",
        telefone: "199",
        dataCadastro: "2025-01-20",
        valorVendido: "2025-01-28",
        numVendas: "100",
        numClientes: "50",
        avaliacaoEstrelas: "5"
    });

    await novoPedido.inserir();
}

module.exports = {
    criarPedido
};
