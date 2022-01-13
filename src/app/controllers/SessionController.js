import User from "../models/User.js"

class SessionController {
    async login (req, res) {
        let {name, email, password, } = req.body;

        if (!(name || email || password)) {
            return res.status(400).send({ error: "Preencha os dados necessarios.\nname:\nemail:\npassword:" });
        }

        const newUser = new User(name, email, password);
    
        const user = await newUser.findUser();
        
        if (!user) {
            return res.status(401).json({ error: "Usuario nao existe!" });
        }

        const validPassword = await newUser.checkPassword(password, user.passwordHash);
    
        if (!validPassword) {
            return res.status(400).json({ error: "Senha incorreta!" });
        }
        
        const token = await newUser.generateAccessToken({ email: req.body.email });

        return res.status(200).json({ auth: true, token: token });  
    };
}

export default new SessionController();