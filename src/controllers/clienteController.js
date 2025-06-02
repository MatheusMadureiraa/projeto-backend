// vai ser melhor estruturado quando utilizar o express

const Cliente = require('../models/Cliente.js');

async function criarCliente() {
    const novoCliente = new Cliente({
        cnpj: "00100200304",
        nomeCliente: "Cliente Teste",
        email: "teste@Cliente.com",
        senha: "123456",
        telefone: "199",
        dataCadastro: "2025-01-20",
        valorVendido: "2025-01-28",
        numVendas: "100",
        numClientes: "50",
        avaliacaoEstrelas: "5"
    });

    await novoCliente.inserir();
}

module.exports = {
    criarCliente
};
