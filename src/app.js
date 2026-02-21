import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use((erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Dados fornecidos estão incorretos" });
  } else {
    res.status(500).send({ message: "Erro interno do servidor" });
  }
});

export default app;
