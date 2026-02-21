import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";

function errorHandler(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Dados fornecidos estão incorretos" });
  } else if (erro instanceof mongoose.Error.ValidationError) {
    console.log(erro.errors);

    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");

    res.status(400).send({ message: `Ocorreram estes erros de validação de dados: ${mensagensErro}` });
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default errorHandler;
