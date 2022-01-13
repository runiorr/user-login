import User from "../models/User.js"
import validator from "email-validator";

class UserController {
    async register (req, res) {
        let { name, email, password, } = req.body;
    
        if (!(name && email && password)) {
            return res.status(400).send({ error: "Preencha os dados necessários. name: email: password:" });
        }

        if(String(name).length <= 3) {
            return res.status(400).send({ error: "Insira um nome válido!" });
        }

        if(String(password).length < 8) {
            return res.status(400).send({ error: "Insira uma senha válida! Mínimo 8 caracteres" });
        }

        if(!validator.validate(email)) {
            return res.status(400).send({ error: "Insira um email válido!" });
        }

        const newUser = new User(name, email, password);

        const user = await newUser.findUser()

        if (user) {
            return res.json({ error: "Usuário já existe!" });
        }

        await newUser.encryptPassword();
    
        await newUser.createUser();
    
        return res.status(200).json({ message: "Usuário registrado!" });
    };
}

export default new UserController();