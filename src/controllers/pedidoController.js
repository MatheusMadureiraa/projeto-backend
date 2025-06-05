// vai ser melhor estruturado quando utilizar o express
const Pedido = require('../models/Pedido.js');


// CRUD
async function criarPedido(pedidoData) {
    const novoPedido = new Pedido(pedidoData);
    const result = await novoPedido.inserir();

    if (result.insertedId) {
        console.log("pedido inserido com sucesso:");
        console.log(pedidoData);
    } else {
        console.log("Erro ao inserir pedido.");
    }
}

async function buscarPedidos(filtro = {}) {
    const pedidos = await Pedido.buscar(filtro);

    // verifica se nao tem nenhum pedido com aquele filtro
    if (pedidos.length === 0) {
        console.log("Nenhum pedido encontrado com o filtro:", filtro);
        return;
    } 

    console.log(`${pedidos.length} Pedido(s) encontrados com filtro: `, filtro);
    console.log(pedidos);

}

async function atualizarPedidos(filtro, novosDados) {
    const result = await Pedido.atualizar(filtro, novosDados);

    if (!result) {
        console.log("Erro ao tentar atualizar pedidos, veja os logs");
        return;
    }

    if (result.modifiedCount === 0) {
        console.log("Nenhum pedido encontrado com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.modifiedCount} Pedido(s) atualizados com filtro: `, filtro);
    console.log(result);
}

async function deletarPedidos(filtro) {
    const result = await Pedido.deletar(filtro);

    if (!result) {
        console.log("Erro ao tentar deletar pedidos, veja os logs");
        return;
    }

    if (result.deletedCount === 0) {
        console.log("Nenhum pedido encontrado com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.deletedCount} Pedido(s) deletados com filtro: `, filtro);
    console.log(result);
}

module.exports = {
    criarPedido,
    buscarPedidos,
    atualizarPedidos,
    deletarPedidos
};
