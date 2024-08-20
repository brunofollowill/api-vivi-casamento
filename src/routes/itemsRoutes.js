import express from "express";
import ItemController from "../controllers/itemController.js";

const router = express.Router();

// Rota para listar apenas os itens não selecionados
router.get("/items", ItemController.listarItem);

// Rota para selecionar um item e associá-lo a um usuário
router.post("/items/selecionar", ItemController.selecionarItem);

// Rota para listar usuários e os itens que eles selecionaram
router.get("/items/selecionados", ItemController.listarUsuarios);

export default router;
