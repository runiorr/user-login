import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: "Não tem token" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};