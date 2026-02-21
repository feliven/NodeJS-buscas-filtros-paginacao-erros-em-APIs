import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor() {
    super("Dados fornecidos estão incorretos", 400);
  }
}

export default RequisicaoIncorreta;
