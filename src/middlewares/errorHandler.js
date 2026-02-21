import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

function errorHandler(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
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
