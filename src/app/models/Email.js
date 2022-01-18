import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
}

const transporter = nodemailer.createTransport(config);

class Mailer {
    emailRegister(user) {
        const message = {from: "company@test.com", to: user.email, subject: "API de Runior - Registro com sucesso", text: `Obrigado ${user.name} por se cadastrar na API!\nAcesse /login para obter seu token de acesso.\n\nAcesse o repositório em github.com/runiorr/user-login`};
        transporter.sendMail(message, (error, info) => {
            if (error) {
                throw new Error("Algo não deu certo.")
            }
        });
    }

    emailLoginSucess(user, token) {
        const message = {from: "company@test.com", to: user.email, subject: "API de Runior - Login com sucesso", text: `Olá ${user.name}! Você realizou o login na API.\nAqui está seu token de acesso \n\n${token}\n\nEle durará 5 minutos!\n\nAcesse o repositório em github.com/runiorr/user-login`};
        transporter.sendMail(message, (error, info) => {
            if (error) {
                throw new Error("Algo não deu certo.")
            }
        });
    }

    emailLoginFail(user) {
        const message = {from: "company@test.com", to: user.email, subject: "API de Runior - Senha incorreta", text: `Olá ${user.name}! Verificamos uma tentativa de login na sua conta com a senha incorreta.\n\nCaso não foi você, entre em contato conosco. Se for, por favor ignore esse email.\n\nAcesse o repositório em github.com/runiorr/user-login`};
        transporter.sendMail(message, (error, info) => {
            if (error) {
                throw new Error("Algo não deu certo.")
            }
        });
    }

}

export default new Mailer();