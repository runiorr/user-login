import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import { Router } from "express";
const { PrismaClient } = require('@prisma/client')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const routes = new Router();

// register route
routes.post("/register", async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password && body.name)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    const salt = await bcrypt.genSalt(10);

    body.password = await bcrypt.hash(body.password, salt);

    await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            passwordHash: body.password
        }
    })
});

// login route
routes.post("/login", async (req, res) => {
    const body = req.body;

    const user = await User.findOne({ email: body.email });
    
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
        res.status(200).json({ message: "Valid password" });
        } else {
        res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
        }
});

routes.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
});

export default routes;