import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET = "secret" } = process.env;

export async function signup(req, res) {
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
}

export async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
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
}
