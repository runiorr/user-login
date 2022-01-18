# Como funciona?
A API possui três rotas: **/register  /login  /home**

Irei explicar a funcionalidade de cada rota, logo após explico como inicar em sua máquina.


## /register
A primeira rota recebe três parâmetros pelo body da requisição. **name, email e password**



    "name": "name",
    
    "email": "email@test.com",
    
    "password": "password"


Email é um atributo único, nunca podendo ser igual a de outro usuário.

Sua senha será encriptada e suas informações armazenadas no banco de dados (Postgresql).

## /login
Na rota login, recebemos dois parâmeros através do body. **email e password**



    "email": "email@test.com",
    
    "password": "password"


A API verifica seu usuário com base no email e compara a senha informada com a senha encriptada no banco de dados.

No caso de sucesso, você recebe um JWT para acessar futuras requisições (atualmente só possui home para provar a funcionalidade).
Na falha, ela informa o erro ocorrido.

## /home

Após ter seu cadastro e estar logado, você passa o JWT através do Header "Authorization" e recebe acesso a rota. Contém somente uma mensagem informando que está logado.

# Como testar?
Clone o repositório e entre nele:



    git clone https://github.com/runiorr/user-login runiorr/ && cd runiorr/


Configurando o SMTP na .env, ela enviará um email nas três ocasiões: Cadastro com sucesso, login com sucesso e tentativa de acesso. Necessário ativar as funções dentro do User.model

Dentro de nginx.conf, escolha quantos containers deseja criar.

Após configurar a .env, execute esse comando:



    docker-compose up --scale api=x // x = quantidade de containers desejados | Altere no arquivo nginx.conf também


Ele irá criar quatro containers com a API, um com o banco de dados e outro com o Nginx como proxy reverso.
*Pronto!* O acesso as rotas se dá por meio do http://localhost:8080/. Se sinta a vontade para editar o código. 
