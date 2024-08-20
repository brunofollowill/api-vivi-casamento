import User from "../models/User.js";
import item from "../models/ItemsPresente.js";

class ItemController {
  // Método existente para listar itens
  static async listarItem(req, res) {
    const itemList = await item.find({});
    res.status(200).json(itemList);
  }

  // Método para selecionar um item e associá-lo a um usuário
  static async selecionarItem(req, res) {
    try {
      const { nome, itemId, quantidade } = req.body;

      // Verifica se o item existe
      const itemSelecionado = await item.findById(itemId);
      if (!itemSelecionado) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      // Verifica se a quantidade selecionada é válida
      if (quantidade <= 0 || quantidade > itemSelecionado.quantidade) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      // Cria um novo registro de usuário com o item selecionado e a quantidade escolhida
      const novoUsuario = new User({
        nome,
        itemSelecionado: itemId,
        quantidade: quantidade,
      });

      // Atualiza a quantidade disponível do item no banco de dados
      itemSelecionado.quantidade -= quantidade;

      // Verifica se o item ainda está disponível
      if (itemSelecionado.quantidade === 0) {
        itemSelecionado.status = "selecionado";
      }

      await itemSelecionado.save();
      await novoUsuario.save();

      res.status(201).json({
        message: "Item selecionado com sucesso",
        usuario: novoUsuario,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao selecionar item" });
    }
  }

  // Método para listar usuários e os itens que eles selecionaram
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await User.find({}).populate(
        "itemSelecionado",
        "item quantidade"
      );
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar usuários e itens selecionados" });
    }
  }
}

export default ItemController;
