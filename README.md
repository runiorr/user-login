# Como funciona?
A API possui três rotas: **/register  /login  /home**

Irei explicar a funcionalidade de cada rota, logo após explico como inicar em sua máquina.

## /register
A primeira rota recebe três parâmetros pelo body da requisição. **name, email e password**



    "name": "name",
    
    "email": "email@test.com",
    
    "password": "password"


Email é um atributo único, nunca podendo ser igual a de outro usuário.

Suas informações serão armazenadas no banco de dados (Postgresql) e sua senha encriptada.

## /login
Na rota login, recebemos dois parâmeros através do body. **email e password**



    "email": "email@test.com",
    
    "password": "password"


A API verifica seu usuário com base no email e compara a senha informada com a senha encriptada no banco de dados.

No caso de sucesso, você recebe um JWT para acessar futuras requisições (atualmente só possui home para provar a funcionalidade).
Na falha, ela informa o erro ocorrido.

## /home

Após ter seu cadastro e estar logado, você passa o JWT através do Header "Authorization" e recebe acesso a rota, uma mensagem informando que está logado.

# Como inicar?
Baixe os arquivos em sua máquina. Dentro do diretório escolhido, execute:



    npm install // Caso utilize NPM
    yarn // Caso utilize Yarn


Configure sua .env (o arquivo _.env.example_ já possui a DATABASE_URL configurada, pode utilizar a mesma).

No arquivo _package.json_, terá 3 scripts prontos:

- build : Executa o Dockerfile, cria a imagem com o banco de dados e inicia o contâiner.
- prisma : Realiza as migrations, conectando o banco de dados a API.
- dev : Inicia a API.

Execute-os nessa ordem através do comando:



    npm run <script> // Caso utilize NPM
    yarn run <script> // Caso utilize Yarn


*Pronto*, só testar as rotas e/ou utilizar como quiser!
