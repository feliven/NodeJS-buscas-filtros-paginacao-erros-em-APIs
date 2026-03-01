import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const queryBuscaAutores = autores.find();
      req.queryBusca = queryBuscaAutores;

      next();

      // const autoresResultado = await autores.find();

      // if (autoresResultado !== null) {
      //   res.status(200).json(autoresResultado);
      // } else {
      //   const erro404 = new NaoEncontrado("Não foram encontrados autores");
      //   next(erro404);
      // }
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        const erro404 = new NaoEncontrado("ID do autor não localizado");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        const erro404 = new NaoEncontrado("ID do autor não localizado");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await autores.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        const erro404 = new NaoEncontrado("ID do autor não localizado");
        next(erro404);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
