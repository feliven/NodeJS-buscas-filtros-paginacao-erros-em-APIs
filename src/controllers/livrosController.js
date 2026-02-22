import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();

      if (livrosResultado !== null) {
        res.status(200).json(livrosResultado);
      } else {
        const erro404 = new NaoEncontrado("Não foram encontrados livros");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id).populate("autor", "nome").exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        const erro404 = new NaoEncontrado("ID do livro não localizado");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        const erro404 = new NaoEncontrado("ID do livro não localizado");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        const erro404 = new NaoEncontrado("ID do livro não localizado");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({ editora: editora });

      if (livrosResultado !== null && livrosResultado.length > 0) {
        res.status(200).send(livrosResultado);
      } else {
        const erro404 = new NaoEncontrado("Editora não localizada");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
