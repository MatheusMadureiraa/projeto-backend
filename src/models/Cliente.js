const { connect } = require("../database");
const Logger = require("../logs/logger.js");

class Cliente {
    constructor({ cpf, nomeCliente, email, senha, telefone, enderecos, dataCadastro, cartoes, pontuacao }) {
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

    // functions axiliares:
    validarCamposObrigatoriosCliente(){
        if(!this.cpf || !this.nomeCliente || !this.email || !this.senha){
            throw new Error("Todos os campos obrigatórios devem ser preenchidos: CPF, Nome, Email e Senha");
        }

        if(typeof this.cpf !== "string" || typeof this.nomeCliente !== 'string' || typeof this.email !== 'string' || typeof this.senha !== 'string'){
            throw new Error("CPF, Nome, Email e Senha devem ser uma string");
        }
    }
    
    async inserir() {
        try {
            this.validarCamposObrigatoriosCliente();

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
            
            client.close();
            return result;
        } catch (error) {
            Logger.log("[CLIENTE]: Erro ao inserir Cliente: " + error);
            return null;
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").updateMany(filtro, {
            $set: novosDados,
            });

            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao atualizar clientes: " + error);
            return null;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").find(filtro).toArray();
            
            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao buscar clientes! " + error);
            return null;
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("cliente").deleteMany(filtro);

            client.close();
            return result;
        } catch (error) {
            Logger.log("Erro ao deletar clientes " + error);
            return null;
        }
    }
}

module.exports = Cliente;