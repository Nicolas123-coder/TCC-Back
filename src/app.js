import express from "express";
import routes from "./routes.js";
import db from "../config/db.js";
import Logger from "../config/logger.js";
import morgan from "morgan";
import expressListEndpoints from 'express-list-endpoints';
import UserRouter from "./controllers/userController.js";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/", routes);
app.use("/user", UserRouter)

app.listen(port, async () => {
  await db();

  Logger.info("App rodando na porta 3001 🔥");
});

const routesPrint = expressListEndpoints(app);

//routes print
console.log('---------------------------------------')
console.log('Routes:');
routesPrint.forEach((route) => {
  console.log(`Path: ${route.path}, Method: ${route.methods}`);
});
console.log('---------------------------------------')
