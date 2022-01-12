import bcrypt from "bcrypt";
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

class SessionController {
    async login (req, res) {
        let { email, password, } = req.body;
    
        const user = await prisma.user.findUnique({ 
            where: {
                email,
            } 
        });
        
        if (!user) {
            return res.status(401).json({ error: "Usuario nao existe!" });
        }
    
        const validPassword = await bcrypt.compare(password, user.passwordHash);
    
        if (!validPassword) {
            return res.status(400).json({ error: "Senha incorreta!" });
        }
    
        return res.status(200).json({ message: "Senha correta!" });
             
    };
    
    async register (req, res) {
        let { name, email, password, } = req.body;
    
        if (!(name && email && password)) {
          return res.status(400).send({ error: "Preencha os dados\nname:\nemail:\npassword:" });
        }

        const user = await prisma.user.findUnique({ 
            where: {
                email,
            } 
        });

        if (user) {
            return res.json({ error: "Usuario ja existe!" });
        }
    
        const salt = await bcrypt.genSalt(10);
    
        const passwordHash = await bcrypt.hash(password, salt);
    
        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
        })
    
        res.status(200).json({ message: "Usuario registrado!" });
    };
}

export default new SessionController();