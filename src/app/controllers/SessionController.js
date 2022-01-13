import User from "../models/User.js"

class SessionController {
    async login (req, res) {
        try {
            let { email, password, } = req.body;

            const user = new User(email, password);

            await user.validateLogin();
            
            const token = await user.generateAccessToken({ email: req.body.email });

            return res.status(200).json({ auth: true, token: token });
        } catch(err) {
            return res.status(400).json({ error: err.message })
        };  
    };
};

export default new SessionController();