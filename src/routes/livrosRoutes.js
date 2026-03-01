import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginador from "../middlewares/paginador.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros, paginador)
  .get("/livros/busca", LivroController.listarLivroPorFiltro)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;
