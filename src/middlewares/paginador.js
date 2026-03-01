import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

async function paginador(req, res, next) {
  try {
    const queryBusca = req.queryBusca;

    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await queryBusca
        .collation({ locale: "pt", strength: 2 }) // strength 2 ignores case
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .populate("autor")
        .exec();
      // MongoDB sorts strings case-sensitively by default (uppercase letters come before lowercase), so "Novena" will sort before "morro…"

      if (resultadoPaginado !== null) {
        res.status(200).json(resultadoPaginado);
      } else {
        const erro404 = new NaoEncontrado("Nenhum livro foi localizado com esses parâmetros");
        next(erro404);
      }
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (error) {
    next(error);
  }
}

export default paginador;
