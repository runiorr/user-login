import User from "../models/User.js"

class UserController {
    async register (req, res) {
        let { name, email, password, } = req.body;
    
        if (!(name && email && password)) {
            return res.status(400).json({ error: "Preencha os dados necessários. name: email: password:" });
        }

        const newUser = new User(name, email, password);

        const error = await newUser.validateUser()

        if(error != null) {
            return res.status(400).json({ error })
        };

        const user = await newUser.findUser();

        if (user) {
            return res.json({ error: "Usuário já existe!" });
        }

        await newUser.encryptPassword();
    
        await newUser.createUser();
    
        return res.status(200).json({ message: "Usuário registrado!" });
    };
}

export default new UserController();