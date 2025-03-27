

## Descrição

[Nest](https://github.com/nestjs/nest) com framework TypeScript para fazer os endpoints.
 Criei um repositório no meu gitHub e fiz um git clone no meu Vscode para poder fazer o versionamento git para fazer os commits

## Comandos iniciais

```bash
$ npm init -y      
$ npm install @nestjs/cli   

$ ou somente nest new .
```

## Comandos para copilar

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```



## Descrição

- Estou rodando localmente nessa porta pq a 3000 está em outro projeto: http://localhost:3003/

- estou usando windows aí o teste curl seria assim abaixo:

- PRA INSERIR PRODUTO:(terminal)
```bash
iwr -Uri "http://localhost:3003/products" `
-Method POST `
-Headers @{"Content-Type"="application/json"} `
-Body '{"nome":"Produto Teste2", "descricao":"Descrição atualizada", "preco":200, "quantidade":10}'
```

- Buscar Produto por ID:(navegador)
```bash
GET http://localhost:3003/products/j4ko00h11
```