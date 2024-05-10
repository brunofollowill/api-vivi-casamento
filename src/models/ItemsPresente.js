import mongoose from "mongoose";

const itemPresenteSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    item: { type: String, require: true },
    quantidade: { type: Number },
  },
  { versionKey: false }
);

const item = mongoose.model("items", itemPresenteSchema);

export default item;
