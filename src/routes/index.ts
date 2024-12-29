import { Router } from "express";
import tvSeriesRoute from "./tvSeriesRoute";

const routes = Router();
const cors = require("cors");

routes.use(cors());
routes.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Content-Type", "application/json");
  res.header("Accept", "*/*");
  next();
});

routes.use("/tvserie", tvSeriesRoute);

export default routes;
