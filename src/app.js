import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(cors());
const connection = await databaseConnection();

connection.on("error", (erro) => {
  console.error("Erro in connection.", erro);
});

connection.once("open", () => {
  console.log("Connection made successfully!");
});

routes(app);

export default app;
