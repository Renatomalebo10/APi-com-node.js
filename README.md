# CRUD de Carros

Este projeto é um exemplo de aplicação CRUD (Create, Read, Update, Delete) para gerenciar um cadastro de carros usando Node.js, Express e MySQL. A aplicação possui um backend que expõe rotas para ler, criar, atualizar e excluir carros, além de um frontend simples que consome essa API.

## Arquivos e Pastas do Projeto

### Raiz do projeto

- `README.md`
  - Este arquivo. Contém a explicação do projeto, instruções de execução e o papel dos principais arquivos.

- `package.json`
  - Configuração do projeto principal. Define as dependências `express` e `mysql2`, além do `nodemon` como devDependency. Possui scripts:
    - `start`: executa `node app.js`
    - `dev`: executa `nodemon app.js`

- `package-lock.json`
  - Arquivo gerado automaticamente pelo npm que trava versões exatas das dependências instaladas.

- `app.js`
  - Servidor principal do projeto.
  - Configura o Express, conecta com o banco de dados via `db.js`, e serve arquivos estáticos da pasta `public`.
  - Define as rotas principais do CRUD:
    - `GET /carros`: lista todos os carros
    - `GET /carros/:id`: busca um carro específico pelo ID
    - `POST /carros`: cria um carro novo
    - `PUT /carros/:id`: atualiza um carro existente
    - `DELETE /carros/:id`: remove um carro pelo ID

- `db.js`
  - Configura e exporta a conexão MySQL usando `mysql2`.
  - Contém os dados de conexão para o banco `frota_db`.
  - É usado por `app.js` para executar consultas SQL.

- `nota.txt`
  - Arquivo de texto vazio. Atualmente não contém informações.

### Pasta `public/`

Esta pasta contém o frontend que é servido pelo backend.

- `public/index.html`
  - Página HTML da aplicação.
  - Contém o formulário para cadastrar e editar carros, além da área onde a lista de veículos é exibida.
  - Carrega `style.css` para estilo e `script.js` para comportamento.

- `public/script.js`
  - Código JavaScript do frontend.
  - Faz requisições `fetch` para a API do backend (`/carros`, `/carros/:id`).
  - Controla as ações de listar, cadastrar, editar e excluir carros.
  - Atualiza o DOM com a lista de veículos recebida do servidor.

- `public/style.css`
  - Estilos visuais da página HTML.
  - Define layout, cores, margens, e aparência do formulário e da lista de carros.

### Pasta `crud-carros/`

Esta pasta contém uma versão alternativa ou extra do projeto.

- `crud-carros/index.js`
  - Outro servidor Express separado do `app.js` da raiz.
  - Conecta diretamente ao MySQL e define rotas semelhantes:
    - `GET /`: mostra uma mensagem simples de status
    - `GET /setup`: cria a tabela `carros` se não existir
    - `GET /carros`: lista carros
    - `POST /carros`: adiciona carro
    - `DELETE /carros/:id`: exclui carro
  - Pode ser usado como uma implementação de aprendizado ou backup do CRUD.

- `crud-carros/package.json`
  - Configuração de dependências da versão dentro de `crud-carros`.
  - Contém `express`, `mysql2` e `nodemon`, mas não define scripts de execução extras além de `test`.

### Outras pastas

- `node_modules/`
  - Diretório gerado pelo npm com todas as dependências instaladas. Não edite este diretório diretamente.

- `.vscode/`
  - Configurações do Visual Studio Code para o projeto. Serve apenas ao editor e não afeta a execução da aplicação.

## Comandos principais e o que eles fazem

- `npm install`
  - Instala as dependências listadas em `package.json`.
  - Cria ou atualiza `node_modules/` e `package-lock.json`.

- `npm start`
  - Roda `node app.js`.
  - Inicia o servidor principal do projeto na porta `3000`.

- `npm run dev`
  - Roda `nodemon app.js`.
  - Reinicia automaticamente o servidor quando algum arquivo do projeto é alterado.
  - Só funciona se `nodemon` estiver instalado (geralmente via `npm install`).

- `nodemon app.js`
  - Inicia o servidor com reinício automático também.
  - Se aparecer erro `127`, significa que o comando não foi encontrado no terminal, normalmente porque `nodemon` não está instalado globalmente ou o `node_modules/.bin` não está no caminho atual.

## Conexão com o banco de dados

A conexão com o MySQL fica em `db.js`:

- `host: 'localhost'`
  - Indica que o banco está rodando no mesmo computador.

- `user: 'root'`
  - Usuário usado para acessar o MySQL.

- `password: ''`
  - Senha do MySQL. No seu projeto está vazia, então se o banco tiver senha você deve ajustar aqui.

- `database: 'frota_db'`
  - Nome do banco de dados usado pelo projeto.

O `db.js` cria a conexão e exporta esse objeto. Em `app.js`, essa conexão é usada para executar consultas SQL com `db.query(...)`.

## Como o frontend e backend se conectam

- O backend (`app.js`) oferece rotas da API:
  - `GET /carros`
  - `GET /carros/:id`
  - `POST /carros`
  - `PUT /carros/:id`
  - `DELETE /carros/:id`

- O frontend (`public/script.js`) usa `fetch()` para chamar essas rotas.
- O HTML (`public/index.html`) mostra o formulário e a lista de carros.
- O CSS (`public/style.css`) deixa a página com visual organizado.

## Isso é padrão?

- A estrutura básica de `app.js`, `db.js`, `public/` e rotas REST é muito comum em projetos Node.js.
- Sim, é um padrão de aprendizado e de muitos projetos pequenos.
- Não é único: você pode usar nomes diferentes (`server.js`, `index.js`), outro banco de dados, outro estilo de frontend, ou bibliotecas como Sequelize, TypeORM e React.

- Para aprender, comece com:
  1. JavaScript básico
  2. Node.js e `npm`
  3. Express (rotas e middleware)
  4. SQL e MySQL
  5. `fetch()` no frontend

## Como executar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o MySQL e crie o banco `frota_db`.
3. Ajuste a senha do MySQL em `db.js` se necessário.
4. Execute o servidor:
   ```bash
   npm start
   ```
5. Acesse `http://localhost:3000` no navegador.

## Nota importante

A versão principal que serve o frontend está em `app.js` usando a pasta `public/`. A pasta `crud-carros/` contém outra implementação separada que não usa o frontend de `public/`.
