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

    const passwordHash = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        },
    })
    console.log("User registered");
    res.status(200).json({ message: "User registered" });
});

// login route
routes.post("/login", async (req, res) => {
    let { name, email, password, } = req.body;
    console.log(req.body);

    const user = await prisma.user.findUnique({ 
        where: {
            email,
        } 
    });
    
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.passwordHash);
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