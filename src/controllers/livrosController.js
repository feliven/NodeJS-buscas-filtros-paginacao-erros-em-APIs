import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const { limite = 3, pagina = 1 } = req.query;

      const livrosResultado = await livros
        .find()
        .skip((pagina - 1) * limite)
        .limit(limite)
        .populate("autor")
        .exec();

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
      const filtro = await processarBusca(req.query);

      const filtroVazio = Object.keys(filtro).length === 0;

      if (!filtroVazio) {
        const livrosResultado = await livros.find(filtro);

        if (livrosResultado !== null && livrosResultado.length > 0) {
          res.status(200).send(livrosResultado);
        } else {
          const erro404 = new NaoEncontrado("Nenhum livro foi localizado com esses parâmetros");
          next(erro404);
        }
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processarBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, precoMin, precoMax, nomeAutor } = parametros;

  const regexTitulo = new RegExp(titulo, "i");

  const filtro = {};

  if (titulo) filtro.titulo = regexTitulo;
  if (editora) filtro.editora = { $regex: editora, $options: "i" }; // operadores do Mongoose

  if (minPaginas || maxPaginas) filtro.paginas = {};
  if (minPaginas) filtro.paginas.$gte = minPaginas;
  if (maxPaginas) filtro.paginas.$lte = maxPaginas;

  if (precoMin || precoMax) filtro.preco = {};
  if (precoMin) filtro.preco.$gte = precoMin;
  if (precoMax) filtro.preco.$lte = precoMax;

  if (nomeAutor) {
    const autor = await autores.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    });

    if (autor !== null) {
      filtro.$or = [{ autor: autor._id }, { "autor._id": autor._id }];
    } else {
      filtro.autor = "123456789012345678901234"; // generic ObjectId, a 24-character hexadecimal string value
    }
  }

  // em alguns documentos o campo autor está embutido como subdocumento ({ _id, nome, ... }), então { autor: ObjectId } não casa com esse formato — é preciso comparar "autor._id".

  return filtro;
}

export default LivroController;
