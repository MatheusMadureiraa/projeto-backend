// vai ser melhor estruturado quando utilizar o express

const Empresa = require('../models/Empresa.js');


// CRUD
async function criarEmpresa(empresaData) {
    const novaEmpresa = new Empresa(empresaData);
    const result = await novaEmpresa.inserir();

    if (result.insertedId) {
        console.log("Empresa inserida com sucesso:");
        console.log(empresaData);
    } else {
        console.log("Erro ao inserir empresa.");
    }
}

async function buscarEmpresas(filtro = {}) {
    const empresas = await Empresa.buscar(filtro);

    // verifica se nao tem nenhuma empresa com aquele filtro
    if (empresas.length === 0) {
        console.log("Nenhuma empresa encontrada com o filtro:", filtro);
        return;
    } 

    console.log(`${empresas.length} Empresa(s) encontradas com filtro: `, filtro);
    console.log(empresas);

}

async function atualizarEmpresas(filtro, novosDados) {
    const result = await Empresa.atualizar(filtro, novosDados);

    if (!result) {
        console.log("Erro ao tentar atualizar empresas, veja os logs");
        return;
    }

    if (result.modifiedCount === 0) {
        console.log("Nenhuma empresa encontrada com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.modifiedCount} Empresa(s) atualizadas com filtro: `, filtro);
    console.log(result);
}

async function deletarEmpresas(filtro) {
    const result = await Empresa.deletar(filtro);

    if (!result) {
        console.log("Erro ao tentar deletar empresas, veja os logs");
        return;
    }

    if (result.deletedCount === 0) {
        console.log("Nenhuma empresa encontrada com o filtro fornecido:", filtro);
        return;
    }

    console.log(`${result.deletedCount} Empresa(s) deletadas com filtro: `, filtro);
    console.log(result);
}

module.exports = {
    criarEmpresa,
    buscarEmpresas,
    atualizarEmpresas,
    deletarEmpresas
};
