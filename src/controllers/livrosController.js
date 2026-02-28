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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const { editora, titulo, minPaginas, maxPaginas, precoMin, precoMax } = req.query;

      const regexTitulo = new RegExp(titulo, "i");

      const filtro = {};

      if (titulo) filtro.titulo = regexTitulo;
      if (editora) filtro.editora = { $regex: editora, $options: "i" }; // operadores do Mongoose

      if (minPaginas && maxPaginas) {
        filtro.paginas = {
          $gte: Number(minPaginas),
          $lte: Number(maxPaginas),
        };
      }
      if (minPaginas && !maxPaginas) {
        filtro.paginas = {
          $gte: Number(minPaginas),
        };
      }
      if (!minPaginas && maxPaginas) {
        filtro.paginas = {
          $lte: Number(maxPaginas),
        };
      }

      if (precoMin && precoMax) {
        filtro.preco = {
          $gte: Number(precoMin),
          $lte: Number(precoMax),
        };
      }
      if (precoMin && !precoMax) {
        filtro.preco = {
          $gte: Number(precoMin),
        };
      }
      if (!precoMin && precoMax) {
        filtro.preco = {
          $lte: Number(precoMax),
        };
      }

      const livrosResultado = await livros.find(filtro);

      if (livrosResultado !== null && livrosResultado.length > 0) {
        res.status(200).send(livrosResultado);
      } else {
        const erro404 = new NaoEncontrado("Nenhum livro foi localizado com esses parâmetros");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
