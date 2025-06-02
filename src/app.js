const { criarEmpresa, buscarEmpresas, atualizarEmpresas, deletarEmpresas } = require("./controllers/empresaController.js");

// aqui pode chamar qualquer function para testar o crud através 
// dos controllers: empresaController.js, clienteController.js, etc.
async function executar() {
    /* CRUD CLIENTE */


    /* CRUD EMPRESA */
    await criarEmpresa({
        cnpj: "012021000000123",
        nomeEmpresa: "Criando empresa teste",
        email: "teste@empresa.com",
        senha: "123456",
        telefone: "199",
        dataCadastro: "2025-01-20",
        valorVendido: "2025-01-28",
        numVendas: "100",
        numClientes: "50",
        avaliacaoEstrelas: "5"
    });
    await buscarEmpresas( { senha: "123456"});
    await atualizarEmpresas( {senha: "123456"}, { nomeEmpresa: "Empresa Atualizada" });
    await deletarEmpresas( {nomeEmpresa: "Empresa Atualizada" });

    /* CRUD PEDIDO */


    /* CRUD PRODUTO */
    
}

executar();