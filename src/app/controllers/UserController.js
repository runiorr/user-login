import User from "../models/User.js"

class UserController {
    async register (req, res) {
        let { name, email, password, } = req.body;
    
        if (!(name || email || password)) {
          return res.status(400).send({ error: "Preencha os dados necessarios.\nname:\nemail:\npassword:" });
        }

        const newUser = new User(name, email, password);

        const user = await newUser.findUser()

        if (user) {
            return res.json({ error: "Usuario ja existe!" });
        }

        await newUser.encryptPassword();
    
        await newUser.createUser();
    
        return res.status(200).json({ message: "Usuario registrado!" });
    };
}

export default new UserController();