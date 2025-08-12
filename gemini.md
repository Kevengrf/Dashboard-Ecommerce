# Gemini - Diretrizes do Projeto

Este arquivo contém as diretrizes para configurar e executar o projeto Recimportados.

## Visão Geral do Projeto

O projeto Recimportados é uma aplicação full-stack para gerenciamento de vendas, produtos, usuários e entregas. O backend é construído com Node.js e Express, e o frontend com React e TypeScript.

## Configuração do Backend

1.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na pasta `backend` e adicione as seguintes variáveis:
    ```
    DB_USER=seu_usuario_do_banco
    DB_HOST=localhost
    DB_DATABASE=seu_banco_de_dados
    DB_PASSWORD=sua_senha_do_banco
    DB_PORT=5432
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3001`.

## Configuração do Frontend

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## Configuração do Banco de Dados

1.  **Instale o PostgreSQL:**
    Certifique-se de ter o PostgreSQL instalado e em execução em sua máquina.

2.  **Crie o banco de dados:**
    Crie um banco de dados com o nome que você especificou na variável de ambiente `DB_DATABASE`.

3.  **Execute o script SQL:**
    Execute o script `db.sql` localizado na pasta `backend` para criar as tabelas do banco de dados.
