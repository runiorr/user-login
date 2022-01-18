import bcrypt from "bcrypt";
import pkg from "@prisma/client";
import jwt from "jsonwebtoken";
import validator from "email-validator";
import dotenv from "dotenv";
import Mailer from "./Email.js";

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

class User {
    constructor(email, password, name) {
		this.email = email;
        this.password = password;
        this.name = name;
        this.validate();
	}

    validate() {
        if (!this.email && !this.password) {
            throw new Error("Preencha os dados necessários. email: password:");
        }

        if(String(this.password).length < 8) {
            throw new Error("Insira uma senha válida! Mínimo 8 caracteres");
        }

        if(!validator.validate(this.email)) {
            throw new Error("Insira um email válido!");
        }

    }

    async validateRegister() {
        if(!this.name) {
            throw new Error("Insira um nome!");
        }

        if(String(this.name).length < 3) {
            throw new Error("Insira um nome com no mínimo 3 caracteres!");
        }

        const user = await this.findUser();

        if(user) {
            throw new Error("Usuário já existe!")
        };

        await this.createUser();

        //Mailer.emailRegister(this);
    }

    async validateLogin() {
        const user = await this.findUser();

        if(!user) {
            throw new Error("Usuário não existe!")
        };

        this.name = user.name;
        
        const validPassword = await this.checkPassword(this.password, user.passwordHash);

        if(!validPassword) {
            //Mailer.emailLoginFail(user);
            throw new Error("Senha incorreta!");
        }

        const token = await this.generateAccessToken({ userId: user.id });

        //Mailer.emailLoginSucess(user, token);

        return token;
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
        await this.encryptPassword();
        await prisma.user.create({
            data: {
                email: this.email,
                passwordHash: this.password,
                name: this.name,
            },
        })
    }

    async generateAccessToken(userId) {
        return jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: '300s' });
    }  
      
}

export default User;


