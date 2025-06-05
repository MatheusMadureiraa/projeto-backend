// vai ser melhor estruturado quando utilizar o express
const Produto = require('../models/Produto.js');

async function criarProduto(produtoData) {
    const novoProduto = new Produto(produtoData);
    const result = await novoProduto.inserir();

    if (result.insertedId) {
        console.log("Produto inserido com sucesso:");
        console.log(produtoData);
    } else {
        console.log("Erro ao inserir o produto");
    }
}

async function buscarProdutos(filtro = {}) {
    const result = await Produto.buscar(filtro);

    // verifica se nao tem nenhum Produto com aquele filtro
    if (result.length === 0) {
        console.log("Nenhum Produto encontrado com o filtro:", filtro);
        return;
    } 

    console.log(`${result.length} Produto(s) encontrados com filtro: `, filtro);
    console.log(result);
}

async function atualizarProdutos(filtro, novosDados) {
    const result = await Produto.atualizar(filtro, novosDados);

    if (!result) {
        console.log("Erro ao tentar atualizar Produtos, veja os logs");
        return;
    }

    if (result.modifiedCount === 0) {
        console.log("Nenhum Produto encontrado com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.modifiedCount} Produto(s) atualizados com filtro: `, filtro);
    console.log(result);
}

async function deletarProdutos(filtro) {
    const result = await Produto.deletar(filtro);

    if (!result) {
        console.log("Erro ao tentar deletar Produtos, veja os logs");
        return;
    }

    if (result.deletedCount === 0) {
        console.log("Nenhum Produto encontrado com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.deletedCount} Produto(s) deletados com filtro: `, filtro);
    console.log(result);
}

module.exports = {
    criarProduto,
    buscarProdutos,
    atualizarProdutos,
    deletarProdutos
};
