function handler404(req, res, next) {
  res.status(404).send({
    mensagem: "Página não encontrada",
    status: 404,
  });
}

export default handler404;
