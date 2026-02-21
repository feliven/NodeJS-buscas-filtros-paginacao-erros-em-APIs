import ErroBase from "./ErroBase.js";

class ErroValidacao extends ErroBase {
  constructor(erro) {
    console.log(erro.errors);

    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Ocorreram estes erros de validação de dados: ${mensagensErro}`, 400);
  }
}

export default ErroValidacao;

// class ErroValidacao extends Error {
//   constructor(mensagem = "Ocorreram estes erros de validação de dados:", status = 400) {
//     super();
//     this.message = mensagem;
//     this.status = status;
//   }

//   enviarResposta(res) {
//     console.log(erro.errors);

//     const mensagensErro = Object.values(erro.errors)
//       .map((erro) => erro.message)
//       .join("; ");

//     res.status(this.status).send({
//       message: (this.message, mensagensErro),
//       status: this.status,
//     });
//   }
// }

// export default ErroValidacao;
