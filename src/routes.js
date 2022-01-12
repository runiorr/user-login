import bcrypt from "bcrypt";
import { Router } from "express";
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const routes = Router();

// register route
routes.post("/register", async (req, res) => {
    let { name, email, password, } = req.body;
    console.log(req.body);

    if (!(name && email && password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    const salt = await bcrypt.genSalt(10);

    password = await bcrypt.hash(password, salt);

    const createUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHash: password,
        },
    })
});

// login route
routes.post("/login", async (req, res) => {
    const body = req.body;

    const user = await prisma.user.findUnique({ 
        where: {
            email: body.email
        } 
    });
    
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.passwordHash);
        if (validPassword) {
        res.status(200).json({ message: "Valid password" });
        } else {
        res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
        }
});

export default routes;