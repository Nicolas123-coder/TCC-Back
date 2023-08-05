//TODO: separar as funções desse arquivo no controller e as rotas no route.js
import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const { SECRET = "secret" } = process.env;

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // TODO: definir expiração do token
        const token = await jwt.sign({ username: user.username }, SECRET);
        return res.json({ token });
      } else {
        return res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      return res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
