import bcrypt from "bcrypt";
import pkg from '@prisma/client';
import jwt from "jsonwebtoken";
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
        return jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '1800s' });
    }  
      
}

export default User;


