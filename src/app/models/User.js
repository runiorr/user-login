import bcrypt from "bcrypt";
import pkg from "@prisma/client";
import jwt from "jsonwebtoken";
import validator from "email-validator";
import dotenv from "dotenv";

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

class User {
    constructor(name, email, password) {
		this.email = email;
        this.password = password;
        this.name = name;
	}

    async validateUser() {
        if(String(this.name).length < 3) {
            return { error: "Insira um nome válido!" };
        }

        if(String(this.password).length < 8) {
            return { error: "Insira uma senha válida! Mínimo 8 caracteres" };
        }

        if(!validator.validate(this.email)) {
            return { error: "Insira um email válido!" };
        }
    }

	async findUser() {
        const user = await prisma.user.findUnique({ 
            where: {
                email:this.email,
            }
        })
        return user;
	}

    async encryptPassword() {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
    }

    async checkPassword(pass, passHash) {
        const validPassword = await bcrypt.compare(pass, passHash);
        return validPassword;
    }

    async createUser() {
        await prisma.user.create({
            data: {
                email: this.email,
                passwordHash: this.password,
                name: this.name,
            },
        })
    }

    async generateAccessToken(email) {
        return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '300s' });
    }  
      
}

export default User;


