const { connect } = require('../database.js');

class Produto {
    constructor(idProduto, cnpjEmpresa, nomeProduto, quantidade, valor, categoria, descricao, imagens, status){
        this.idProduto = idProduto;
        this.cnpjEmpresa = cnpjEmpresa;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.valor = valor;
        this.categoria = categoria;
        this.descricao = descricao;
        this.imagens = imagens;
        this.status = status;
    }

    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").insertOne({
                idProduto: this.idProduto,
                cnpjEmpresa: this.cnpjEmpresa,
                nomeProduto: this.nomeProduto,
                quantidade: this.quantidade,
                valor: this.valor,
                categoria: this.categoria,
                descricao: this.descricao,
                imagens: this.imagens,
                status: this.status
            });
            console.log("Produto inserido:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir produto:", error);
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").updateMany(filtro, {
            $set: novosDados,
            });
            console.log("produtos atualizados:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar produtos: " + error);
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").find(filtro).toArray();
            console.log("produtos encontrados!", result);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar produtos! " + error);
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("produto").deleteMany(filtro);
            console.log("produto deleta com sucesso!", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar produtos " + error);
        }
    }

}

module.exports = Produto;