import User from "../models/User.js";
import item from "../models/ItemsPresente.js";

class ItemController {
  // Método para listar itens
  static async listarItem(req, res) {
    try {
      const itemList = await item.find({});
      res.status(200).json(itemList);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar itens" });
    }
  }

  // Método para selecionar um item e associá-lo a um usuário
  static async selecionarItem(req, res) {
    try {
      const { nome, itemId, quantidade } = req.body;
      const quantidadeNumerica = Number(quantidade);

      if (isNaN(quantidadeNumerica)) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      console.log("Requisição recebida:", req.body);

      // Verifica se o item existe
      const itemSelecionado = await item.findById(itemId);
      if (!itemSelecionado) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      // Verifica se a quantidade selecionada é válida
      if (quantidadeNumerica <= 0 || quantidadeNumerica > itemSelecionado.quantidade) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      // Cria um novo registro de usuário com o item selecionado e a quantidade escolhida
      const novoUsuario = new User({
        nome,
        itemSelecionado: itemId,
        quantidade: quantidadeNumerica,
      });

      // Atualiza a quantidade disponível do item no banco de dados
      itemSelecionado.quantidade -= quantidadeNumerica;

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
      console.error("Erro ao selecionar item:", error);
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
