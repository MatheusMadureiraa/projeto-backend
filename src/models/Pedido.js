const { connect } = require('../database');
const Logger = require ('../logs/logger.js')

class Pedido {
    constructor({ cpfCliente, frete, valorTotal, formaPagamento, dataPedido, dataEntrega, itens, endereco, status }) {
        this.cpfCliente = cpfCliente;
        this.frete = frete;
        this.valorTotal = valorTotal;
        this.formaPagamento = formaPagamento;
        this.dataPedido = dataPedido;
        this.dataEntrega = dataEntrega;
        this.itens = itens;
        this.endereco = endereco;
        this.status = status;
    }

    // function auxiliares
    validarCamposObrigatoriosPedido(){
        if (!this.cpfCliente || !Array.isArray(this.endereco)  ){
            throw new Error("Todos os campo obrigatórios devem ser preenchidos: cpfCliente, itens e endereco");
        }

        if(typeof this.cpfCliente !== "string"){
            throw new Error("CPF do cliente deve ser string/texto")
        }

        // verifica se os itens são um array de itens
        if (!Array.isArray(this.itens) || this.itens.length === 0) {
            throw new Error("O campo 'itens' deve ser uma lista com pelo menos um item");
        }

        // verifica se TODOS os 'itens' tem o campo 'preco'
        for (let i = 0; i < this.itens.length; i++) {
            const item = this.itens[i];
            if (typeof item.preco !== "number" || isNaN(item.preco)) {
                throw new Error(`Item na posição ${i}: 'preco' é obrigatório e deve ser um número.`);
            }
        }
    }

    calcularValorTotalCompra(itens, frete) {
        let valorTotalSemFrete = 0;

        for (const item of itens) {
            const preco = item.preco ? item.preco : 0;
            const quantidade = item.quantidade ? item.quantidade : 1;
            valorTotalSemFrete += preco * quantidade;
        }

        // verifica se tem frete e é um num
        const freteFinal = Number(frete) || 0;
        return valorTotalSemFrete + freteFinal;
    }

    //  ----- CRUD -----
    async inserir() {
        try {
            this.validarCamposObrigatoriosPedido()
            this.valorTotal = this.calcularValorTotalCompra(this.itens, this.frete)

            const { db, client } = await connect();
            const result = await db.collection("pedido").insertOne({
                cpfCliente: this.cpfCliente,
                frete: this.frete || 0,
                valorTotal: this.valorTotal,
                formaPagamento: this.formaPagamento,
                dataPedido: this.dataPedido || new Date(),
                dataEntrega: this.dataEntrega,
                itens: this.itens,
                endereco: this.endereco,
                status: this.status
            });

            console.log("Pedido inserido/realizado:", result.insertedId);
            client.close();
            return result;
        } catch (error) {
            Logger.log("[PEDIDO]: Erro ao inserir/realizar um pedido na loja: " + error);
            return null;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedido").find(filtro).toArray();
            
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao buscar pedidos! " + error);
            return null;
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedido").updateMany(filtro, {
            $set: novosDados,
            });

            console.log("pedidos atualizados:", result.modifiedCount);
            client.close();
            return result;
        } catch (error) {
            Logger.log("[PEDIDO]: Erro ao atualizar pedidos: " + error);
            return null;
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("pedido").deleteMany(filtro);
            
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao deletar pedidos " + error);
            return null;
        }
    }
    
}

module.exports = Pedido;