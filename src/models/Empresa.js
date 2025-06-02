const { connect } = require('../database.js');
const Logger = require('../logs/logger.js');

class Empresa {
    // transformei em objeto
    constructor({ cnpj, nomeEmpresa, email, senha, telefone, dataCadastro, valorVendido, numVendas, numClientes, avaliacaoEstrelas }) {
        this.cnpj = cnpj;
        this.nomeEmpresa = nomeEmpresa;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.dataCadastro = dataCadastro;
        this.valorVendido = valorVendido;
        this.numVendas = numVendas;
        this.numClientes = numClientes;
        this.avaliacaoEstrelas = avaliacaoEstrelas;
    }

    validarCamposObrigatoriosEmpresa(){
        // validar se estao preenchidos
        if (!this.cnpj || !this.nomeEmpresa || !this.email || !this.senha ){
            throw new Error("Todos os campo obrigatórios devem ser preenchidos: cnpj, nomeEmpresa, email, senha");
        }

        // validar se não são nulos ou vazios
        if (typeof this.cnpj !== 'string' || typeof this.nomeEmpresa !== 'string' || typeof this.email !== 'string' || typeof this.senha !== 'string') {
            throw new Error("Os campos cnpj, nomeEmpresa, email e senha devem ser do tipo string");
        }
    }

    // CRUD
    async inserir() {
        try {
            this.validarCamposObrigatoriosEmpresa();

            const { db, client } = await connect();
            const result = await db.collection("empresa").insertOne({
                cnpj: this.cnpj,
                nomeEmpresa: this.nomeEmpresa,
                email: this.email,
                senha: this.senha,
                telefone: this.telefone,
                dataCadastro: this.dataCadastro,
                valorVendido: this.valorVendido,
                numVendas: this.numVendas,
                numClientes: this.numClientes,
                avaliacaoEstrelas: this.avaliacaoEstrelas
            });

            client.close();
            return result;
        } catch (error) {
            Logger.log("[EMPRESA]: Erro ao inserir empresa: " + error);
            return null;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("empresa").find(filtro).toArray();

            client.close();
            return result;
        } catch (error) {
            Logger.log("[EMPRESA]: Erro ao buscar empresas! " + error);
            return []; // retorna array vazio em caso de erro
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("empresa").updateMany(filtro, {
            $set: novosDados,
            });

            client.close();
            return result;
        } catch (error) {
            Logger.log("[EMPRESA]: Erro ao atualizar Empresas: " + error);
            return null;
        }
    }


    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("empresa").deleteMany(filtro);
            
            client.close();
            return result;
        } catch (error) {
            Logger.log("[EMPRESA]: Erro ao deletar empresas " + error);
            return null;
        }
    }
}

module.exports = Empresa;