// vai ser melhor estruturado quando utilizar o express
const Cliente = require('../models/Cliente.js');

async function criarCliente(clienteData) {
    const novoCliente = new Cliente(clienteData);
    const result = await novoCliente.inserir();

    if (result.insertedId) {
        console.log("Cliente inserido com sucesso:");
        console.log(clienteData);
    } else {
        console.log("Erro ao inserir o cliente");
    }
}

async function buscarClientes(filtro = {}) {
    const result = await Cliente.buscar(filtro);

    // verifica se nao tem nenhum cliente com aquele filtro
    if (result.length === 0) {
        console.log("Nenhum cliente encontrado com o filtro:", filtro);
        return;
    } 

    console.log(`${result.length} Cliente(s) encontrados com filtro: `, filtro);
    console.log(result);
}

async function atualizarClientes(filtro, novosDados) {
    const result = await Cliente.atualizar(filtro, novosDados);

    if (!result) {
        console.log("Erro ao tentar atualizar Clientes, veja os logs");
        return;
    }

    if (result.modifiedCount === 0) {
        console.log("Nenhum Cliente encontrado com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.modifiedCount} Cliente(s) atualizados com filtro: `, filtro);
    console.log(result);
}

async function deletarClientes(filtro) {
    const result = await Cliente.deletar(filtro);

    if (!result) {
        console.log("Erro ao tentar deletar Clientes, veja os logs");
        return;
    }

    if (result.deletedCount === 0) {
        console.log("Nenhum Cliente encontrado com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.deletedCount} Cliente(s) deletados com filtro: `, filtro);
    console.log(result);
}

module.exports = {
    criarCliente,
    buscarClientes,
    atualizarClientes,
    deletarClientes
};
