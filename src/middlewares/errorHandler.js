import mongoose from "mongoose";

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
    res.status(500).send({ message: "Erro interno do servidor" });
  }
}

export default errorHandler;
