import mongoose from "mongoose";

const itemPresenteSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    item: { type: String, required: true },
    quantidade: { type: Number },
    status: { type: String, default: "não selecionado" } // Novo campo de status
  },
  { versionKey: false }
);

const item = mongoose.model("items", itemPresenteSchema);

export default item;
