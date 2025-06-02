const { connect } = require("../database");

class Cliente {
    constructor(cpf, nomeCliente, email, senha, telefone, enderecos, dataCadastro, cartoes, pontuacao) {
        this.cpf = cpf;
        this.nomeCliente = nomeCliente;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.enderecos = enderecos;
        this.dataCadastro = dataCadastro;
        this.cartoes = cartoes;
        this.pontuacao = pontuacao;
    }
    
    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").insertOne({
                cpf: this.cpf,
                nomeCliente: this.nomeCliente,
                email: this.email,
                senha: this.senha,
                telefone: this.telefone,
                enderecos: this.enderecos,
                dataCadastro: this.dataCadastro,
                cartoes: this.cartoes,
                pontuacao: this.pontuacao
            });
            console.log("Cliente inserido:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir cliente:", error);
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").updateMany(filtro, {
            $set: novosDados,
            });
            console.log("Clientes atualizados:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar clientes: " + error);
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").find(filtro).toArray();
            console.log("Clientes encontrados!", result);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar clientes! " + error);
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").deleteMany(filtro);
            console.log("cliente deleta com sucesso!", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar clientes " + error);
        }
    }
}

module.exports = Cliente;