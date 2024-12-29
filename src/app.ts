import express from "express";
import routes from "./routes";

const port = 9010;
const app = express();
app.use(express.json());

app.use(routes);

app.listen(port, async () => {
  console.log(`A Aplicação esta rodando na porta: ${port}`);
});
