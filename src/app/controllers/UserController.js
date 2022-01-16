import User from "../models/User.js"
import Mailer from "../models/Email.js"

class UserController {
    async register (req, res) {
        try {
            let { email, password, name } = req.body;

            const user = new User(email, password, name);

            await user.validateRegister()
        
            await user.createUser();

            Mailer.emailRegister(user);
        
            return res.status(200).json({ message: "Usuário registrado! Olhe sua caixa de email :)" });

        } catch(err) {
            return res.status(400).json({ error: err.message })
        };
    };
};

export default new UserController();