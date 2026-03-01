import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/handler404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");

  // let teste = {};
  // console.log(teste);

  // teste.propriedade = 1;
  // console.log(teste);

  // teste.query = {};
  // console.log(teste);

  // teste.query.nome = "nome da query";

  // teste.alo = "ola";

  // console.log(teste);
  // console.log(teste.query);
});

const app = express();
app.use(express.json());
routes(app);

app.use(handler404);

app.use(errorHandler);

export default app;
