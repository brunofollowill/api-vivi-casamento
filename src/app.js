import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";

const app = express();
const connection = await databaseConnection();

connection.on("error", (erro) => {
  console.error("Erro in connection.", erro);
});

connection.once("open", () => {
  console.log("Connection made successfully!");
});

routes(app);

export default app;
