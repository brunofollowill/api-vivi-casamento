import express from "express";
import items from "./itemsRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("api"));

  app.use(express.json(), items);
};

export default routes;
