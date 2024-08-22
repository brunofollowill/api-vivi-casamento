import express from "express";
import ItemController from "../controllers/itemController.js";

const router = express.Router();

router.get("/items", ItemController.listarItem);
router.post("/selecionar", ItemController.selecionarItem);
router.get("/selecionados", ItemController.listarUsuarios);

export default router;
