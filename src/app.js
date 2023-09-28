import express from "express";
import routes from "./routes.js";
import db from "../config/db.js";
import Logger from "../config/logger.js";
import morgan from "morgan";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";

const app = express();
const port = 3002;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/", routes);

app.listen(port, async () => {
  await db();

  Logger.info("App rodando na porta 3002 🔥");
});

const routesPrint = expressListEndpoints(app);

//routes print
console.log("---------------------------------------");
console.log("Routes:");
routesPrint.forEach((route) => {
  console.log(`Path: ${route.path}, Method: ${route.methods}`);
});
console.log("---------------------------------------");
