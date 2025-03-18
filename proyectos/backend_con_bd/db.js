const { MongoClient } = require("mongodb");
const { MONGODB_USR, MONGODB_PWD } =  require("./config.js");

const uri =
  "mongodb+srv://" + MONGODB_USR + ":" + MONGODB_PWD + "@clusterpw3.zkbzr.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPW3";

const client = new MongoClient(uri);
const database = client.db("pw3");
const usuarios = database.collection("usuarios");

async function getAllUsers() {
  return await usuarios.find({}).toArray();
}

async function getUser(name) {
  return await usuarios.findOne({ nombre: name });
}


module.exports = { getAllUsers, getUser }