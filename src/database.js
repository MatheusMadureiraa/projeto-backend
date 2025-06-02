const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017";
const DB_NAME = "loja";

async function connect(){
    const client = new MongoClient(URL);
    await client.connect();
    console.log("Conectado ao MongoDB");
    const db = client.db(DB_NAME);
    return { db, client };
}

module.exports = { connect };
