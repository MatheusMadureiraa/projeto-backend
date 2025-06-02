const fs = require("fs");
const path = require("path");

class Logger {
    static log(error) {
        const data = new Date().toISOString();
        const mensagemErro = `[${data}] - ${error}\n\n`;

        // vai salvar dentro de logs/
        const caminho = path.join(__dirname, "logs.txt");

        try{
            // cria um txt ou adiciona o log ao q já existe
            fs.appendFileSync(caminho, mensagemErro);
            console.log("Deu algum erro, está armazenado em ./logs/logs.txt");
        } catch (erro) {
            console.error("Erro ao armazenar o log:", erro);
        }
    }
}

module.exports = Logger;