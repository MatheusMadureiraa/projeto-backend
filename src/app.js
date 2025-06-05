const { criarEmpresa, buscarEmpresas, atualizarEmpresas, deletarEmpresas } = require("./controllers/empresaController.js");
const { criarPedido, buscarPedidos, atualizarPedidos, deletarPedidos} = require("./controllers/pedidoController.js");
const { criarCliente, buscarClientes, atualizarClientes, deletarClientes} = require('./controllers/clienteController.js');


// aqui pode chamar qualquer function para testar o crud através 
// dos controllers: empresaController.js, clienteController.js, etc.
async function executar() {

    /* CRUD CLIENTE */
    // await criarCliente({
    //     cpf: "123.456.789-00",
    //     nomeCliente: "Teste",
    //     email: "teste@teste.com",
    //     senha: "senha123",
    //     telefone: "98888-7777",
    //     enderecos: [
    //         {
    //             cep: "17040-987",
    //             cidade: "Bauru",
    //             rua: "Rua teste",
    //             numero: "123",
    //             complemento: ""
    //         }
    //     ],
    //     dataCadastro: new Date(),
    //     cartoes: "",
    //     pontuacao: ""
    // });
    // await buscarClientes({ cpf: "123.456.789-00"});
    // await atualizarClientes( { cpf: "123.456.789-00"}, { email: "atualizandoEmail@mail.com" });
    // await deletarClientes({ email: "atualizandoEmail@mail.com" })


    /* CRUD EMPRESA */
    // await criarEmpresa({
    //     cnpj: "012021000000123",
    //     nomeEmpresa: "Criando empresa teste",
    //     email: "teste@empresa.com",
    //     senha: "123456",
    //     telefone: "199",
    //     dataCadastro: "2025-01-20",
    //     valorVendido: "",
    //     numVendas: "100",
    //     numClientes: "50",
    //     avaliacaoEstrelas: "5"
    // });
    // await buscarEmpresas( { senha: "123456"});
    // await atualizarEmpresas( {senha: "123456"}, { nomeEmpresa: "Empresa Atualizada" });
    // await deletarEmpresas( {nomeEmpresa: "Empresa Atualizada" });

    /* CRUD PEDIDO */
    // await criarPedido({
    //     cpfCliente: "500.989.637-90",
    //     frete: 19.90,
    //     formaPagamento: "pix",
    //     dataPedido: new Date(),
    //     dataEntrega: "12/jun",
    //     itens: [
    //         {
    //             produtoId: "abc123",
    //             nome: "garrafinha",
    //             preco: 89.90,
    //             quantidade: 2
    //         },
    //         {
    //             produtoId: "def123",
    //             nome: "Teclado Mecânico",
    //             preco: 199.90,
    //             quantidade: 1
    //         }
    //     ],
    //     endereco: [
    //         {
    //             cep: "17040-987",
    //             cidade: "Bauru",
    //             rua: "Rua Teste",
    //             numero: "2-75",
    //             complemento: ""
    //         }
    //     ],
    //     status: -1
    // });
    // await buscarPedidos( {cpfCliente: "500.989.637-90"});
    // await atualizarPedidos({cpfCliente: "500.989.637-90"}, { formaPagamento: "boleto" });
    // await deletarPedidos ( {formaPagamento: "boleto"} );


    /* CRUD PRODUTO */
    
}

executar();