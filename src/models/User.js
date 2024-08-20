import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    itemSelecionado: { type: mongoose.Schema.Types.ObjectId, ref: 'items', required: true },
    quantidade: { type: Number, required: true } // Novo campo para a quantidade escolhida
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
