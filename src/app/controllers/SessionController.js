import User from "../models/User.js"
import Mailer from "../models/Email.js"

class SessionController {
    async login (req, res) {
        try {
            let { email, password, } = req.body;

            const user = new User(email, password);

            await user.validateLogin();
            
            const token = await user.generateAccessToken({ email: req.body.email });

            Mailer.emailLoginSucess(user, token);

            return res.status(200).json({ auth: true, message: "Usuário logado! Você também receberá o token por email.", token: token });
        } catch(err) {
            return res.status(400).json({ auth: false, error: err.message })
        };  
    };
};

export default new SessionController();