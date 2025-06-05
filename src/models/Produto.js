// produto que a empresa possui em estoque
const { connect } = require('../database.js');
const Logger = require('../logs/logger.js');

class Produto {
    constructor( {cnpjEmpresa, nomeProduto, quantidade, valor, categoria, descricao, imagens, status} ){
        this.cnpjEmpresa = cnpjEmpresa;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;
        this.imagens = imagens;
        this.status = status;
    }

    // functions auxiliares
    validarCamposObrigatoriosProduto(){
        if(!this.cnpjEmpresa || !this.nomeProduto || !this.quantidade){
            throw new Error("Os campos cnpjEmpresa, nome do Produto e Quantidade são obrigatórios");
        }

        if(typeof this.cnpjEmpresa !== "string" || typeof this.nomeProduto !== "string" || !Number.isInteger(this.quantidade)){
            throw new Error("Revise os campos ao cadastrar: CNPJ e Nome devem ser String; Quantidade deve ser um valor inteiro")
        }
    }

    static verificarDisponibilidadeProduto(produtos) {
        return produtos.map(prod => ({
            ...prod,
            esgotado: prod.quantidade <= 0
        }));
    }

    // CRUD
    async inserir() {
        try {
            this.validarCamposObrigatoriosProduto();

            const { db, client } = await connect();
            const result = await db.collection("produto").insertOne({
                cnpjEmpresa: this.cnpjEmpresa,
                nomeProduto: this.nomeProduto,
                quantidade: this.quantidade,
                valor: this.valor,
                categoria: this.categoria,
                descricao: this.descricao,
                imagens: this.imagens,
                status: this.status
            });

            client.close();
            return result;
        } catch (error) {
            Logger.log("[PRODUTO]: Erro ao inserir produto: " + error);
            return null;
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").find(filtro).toArray();

            const produtosComStatus = this.verificarDisponibilidadeProduto(result);

            client.close();
            return produtosComStatus;
        } catch (error) {
            Logger.log("[PRODUTO]: Erro ao buscar produtos! " + error);
            return null;
        }
    }


    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").updateMany(filtro, {
            $set: novosDados,
            });

            client.close();
            return result;
        } catch (error) {
            Logger.log("[PRODUTO]: Erro ao atualizar produtos: " + error);
            return null;
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").deleteMany(filtro);

            client.close();
            return result;
        } catch (error) {
            Logger.log("[PRODUTO]: Erro ao deletar produtos: " + error);
            return null;
        }
    }
}

module.exports = Produto;