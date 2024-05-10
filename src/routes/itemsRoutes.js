import express from "express";
import ItemController from "../controllers/itemController.js";

const routes = express.Router();

routes.get("/items", ItemController.listarItem);

export default routes;
