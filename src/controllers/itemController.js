import item from "../models/ItemsPresente.js";

class ItemController {
  static async listarItem(req, res) {
    const itemList = await item.find({});
    res.status(200).json(itemList);
  }
}

export default ItemController;
