<h2 align="center"> 
	RENTX 
</h2>

## O que é Rentx:

Rentx é um sistema de gerenciamento feito para uma agência de aluguel de carros, o projeto foi desenvolvido para estudos seguindo a trilha de node.js do ignite da rocktseat, ele visa facilitar a vida dos funcionários e deixar a administração dos aluguéis e dos veículos mais simples e ágil.

## Quais são as funcionalidades desse sistema?

O sistema conta com as seguintes funcionalidades:
- Autenticação de usuário
- Cadastro de usuário
- Cadastro de veículo
- Cadastro de categorias
- Cadastro de especificações
- Cadastro e devolução de aluguel

Caso queira ver as funcionalidades por completo e de modo técnico acesse a documentação do projeto ([clique aqui](#docs) para ver como acessá-la).

## Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com/downloads), [Docker](https://www.docker.com/get-started/) e [Insominia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/).

## 🎲 Rodando a API

```bash
# Clone este repositório
$ git clone <https://github.com/CaioVinicius7/ignite-node-rentx.git>

# Acesse a pasta do projeto no terminal/cmd
$ ignite-node-rentx

# Faça o build dos containers
$ docker-compose build

# Execute os containers
$ docker-compose up -d

# Rode as migrations
$ npm run typeorm migration:run ou yarn typeorm migration:run

# Rode a seed de usuários administradores
$ npm run seed:admin ou yarn seed:admin

# O servidor ficara ativo na porta:3333 - acesse <http://localhost:3333>
```

<div id="docs"> </div>

## Acessando a documentação
Para ter acesso a documentação utilize a rota /api-docs, como no exemplo abaixo ou [clique aqui](http://localhost:3333/api-docs/).
```bash
http://localhost:3333/api-docs/
```

OBS: Na raiz do projeto existe um arquivo ```collection.json```, importe no insomnia ou postman para ter acesso a todas as rotas sem necesidade de adicioná-las do zero.

## Autor
---

<a href="https://www.facebook.com/caio.pereira.94695">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62827681?s=400&u=f0b18831e6690a901f956d637933b9ee2dca3104&v=4" width="100px;" alt=""/>
 <br>
 <h2><b>Caio Vinícius</b></h2></a>

<h4> Feito com muito carinho e dedicação :) </h4>

<br>

[![Linkedin Badge](https://img.shields.io/badge/-caio%20pereira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/caio-pereira-87a761200) 
[![Gmail Badge](https://img.shields.io/badge/-caio1525pereira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caio1525pereira@gmail.com)](mailto:caio1525pereira@gmail.com)