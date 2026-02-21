import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "Título é obrigatório"] },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "Autor é obrigatório"] },
  editora: { type: String, required: [true, "Nome da editora é obrigatório"] },
  numeroPaginas: { type: Number },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
