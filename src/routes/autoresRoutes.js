import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginador from "../middlewares/paginador.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginador)
  .get("/autores/:id", AutorController.listarAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;
