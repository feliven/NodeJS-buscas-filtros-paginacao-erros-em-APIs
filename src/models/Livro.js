import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "Título é obrigatório"] },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "Autor é obrigatório"] },
  editora: {
    type: String,
    required: [true, "Nome da editora é obrigatório"],
    enum: {
      values: ["Editora A", "Editora Z"],
      message: "Nome de editora {VALUE} não é permitido",
    },
  },
  paginas: {
    type: Number,
    min: [5, "Número de páginas informado foi {VALUE} mas deve estar entre 5 e 5000"],
    max: [5000, "Número de páginas informado foi {VALUE} mas deve estar entre 5 e 5000"],
  },
  preco: { type: Number },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
