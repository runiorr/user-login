import { Router } from "express";
import SessionController from "../controllers/SessionController.js";
import UserController from "../controllers/UserController.js";
import auth from "../middleware/auth.js";

const routes = Router();

routes.post("/register", UserController.register) 

routes.post("/login", SessionController.login)

routes.get("/home", auth, (req, res) => {
    res.json("Você está logado")
})

export default routes;