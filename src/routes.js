import { Router } from "express";
import {
  createRemedio,
  getRemedio,
  getRemedios,
  baixaRemedio,
  verifyExpiredMedicine,
} from "./controllers/remedioController.js";
import { login, signup } from "./controllers/userController.js";
import { body, validationResult } from "express-validator";
import { isLoggedIn } from "./middlewares/authMiddleware.js";

const router = Router();

export default router
  .get("/health", (req, res) => {
    res.status(200).send("API Up ✅");
  })

  .get("/getRemedios", isLoggedIn, (req, res) => {
    getRemedios(res);
  })

  .get("/getRemedio/:id", isLoggedIn, (req, res) => {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ errors: "Missing ID param !!" });
    }

    getRemedio(id, res);
  })

  .post(
    "/createRemedio",
    isLoggedIn,
    body("name").isString().withMessage("O nome é obrigatório"),
    body("expireDate")
      .isString()
      .withMessage("A data de vencimento é obrigatória"),
    body("status").isString().withMessage("O status é obrigatório"),
    body("lab").isString().withMessage("O laboratório é obrigatório"),
    body("stock").isString().withMessage("O estoque é obrigatório"),
    body("prescription").isBoolean().withMessage("A receita é obrigatória"),

    (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      createRemedio(req, res);
    }
  )

  .post(
    "/baixaRemedio",
    isLoggedIn,

    //TODO: ARRUMAR NPARAMETROS
    body("status").isString().withMessage("O status é obrigatório"),
    body("paciente").isString().withMessage("O paciente é obrigatório"),

    (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      baixaRemedio(req, res);
    }
  )

  .get("/getExpiredMedicines", isLoggedIn, (req, res) => {
    verifyExpiredMedicine(res);
  })

  .post("/signup", (req, res) => {
    signup(req, res);
  })

  .post("/login", (req, res) => {
    login(req, res);
  });
