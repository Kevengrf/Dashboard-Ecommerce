# Recimportados - Sistema de Gestão de Vendas

![Banner do Projeto](https://i.imgur.com/your-banner-image.png)

## 📝 Descrição do Projeto

O **Recimportados** é uma aplicação full-stack projetada para otimizar o gerenciamento de um negócio de importados. A plataforma oferece um dashboard administrativo completo para o gerenciamento de vendas, produtos, usuários e entregas, permitindo um controle centralizado e eficiente de todas as operações comerciais.

---

## ✨ Funcionalidades Principais

- **Dashboard Analítico:** Visualize métricas de vendas, produtos mais vendidos e outras informações relevantes em um painel de controle intuitivo.
- **Gestão de Produtos:** Adicione, edite e remova produtos do catálogo, com informações detalhadas como nome, preço, estoque e imagens.
- **Controle de Vendas:** Registre novas vendas, acompanhe o status de cada uma e visualize o histórico completo.
- **Gerenciamento de Usuários:** Administre os usuários do sistema, atribuindo permissões e controlando o acesso.
- **Rastreamento de Entregas:** Monitore o status das entregas, desde a preparação até a chegada ao cliente.
- **Autenticação Segura:** Sistema de login e registro para proteger o acesso ao dashboard.

---

## 🚀 Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o backend, responsável pela lógica de negócio e comunicação com o banco de dados, e o frontend, que oferece a interface do usuário.

### **Backend**
- **Node.js:** Ambiente de execução para o JavaScript no servidor.
- **Express:** Framework para a construção de APIs RESTful.
- **PostgreSQL:** Banco de dados relacional para o armazenamento dos dados.
- **JWT (JSON Web Tokens):** Para a implementação de autenticação segura.

### **Frontend**
- **React:** Biblioteca para a construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Vite:** Ferramenta de build para um desenvolvimento frontend mais rápido.
- **Material-UI:** Biblioteca de componentes React para um design moderno e responsivo.
- **Axios:** Cliente HTTP para a comunicação com o backend.
- **React Router DOM:** Para a implementação de rotas na aplicação.

---

## 🔧 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [PostgreSQL](https://www.postgresql.org/)

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### **1. Clonando o Repositório**
```bash
git clone https://github.com/seu-usuario/recimportados.git
cd recimportados
```

### **2. Configuração do Backend**
```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie o arquivo .env e configure as variáveis de ambiente
# (siga o exemplo do arquivo .env.example)
cp .env.example .env

# Execute as migrações do banco de dados
npm run migrate

# Inicie o servidor de desenvolvimento
npm run dev
```
O servidor do backend estará disponível em `http://localhost:3001`.

### **3. Configuração do Frontend**
```bash
# Navegue até a pasta do frontend
cd ../frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação frontend estará disponível em `http://localhost:5173`.

### **4. Configuração do Banco de Dados**
1.  **Instale o PostgreSQL** e certifique-se de que ele está em execução.
2.  **Crie um banco de dados** com o nome que você especificou na variável de ambiente `DB_DATABASE`.
3.  **Execute o script `db.sql`** localizado na pasta `backend` para criar as tabelas do banco de dados.

---

## Endpoints da API

A API do backend oferece os seguintes endpoints para a manipulação dos recursos:

### Autenticação
- `POST /api/auth/login` - (Futuro) Realiza o login de um usuário.
- `POST /api/auth/register` - (Futuro) Registra um novo usuário.

### Produtos
- `POST /api/products` - Adiciona um novo produto.
- `GET /api/products` - (Futuro) Lista todos os produtos.

### Vendas
- `POST /api/leads` - (Futuro) Endpoint para n8n.
- `POST /api/deliveries` - (Futuro) Cria um novo registro de entrega.

### Usuários
- `POST /api/users` - Adiciona um novo usuário.
- `GET /api/users` - (Futuro) Lista todos os usuários.

---

## 📂 Estrutura de Pastas

O projeto é organizado da seguinte forma:

```
recimportados/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── README.md
```

---

## 🖼️ Screenshots

Aqui você pode adicionar screenshots da sua aplicação.

| Dashboard | Gestão de Produtos |
| :---: | :---: |
| ![Dashboard](https://i.imgur.com/your-dashboard-screenshot.png) | ![Gestão de Produtos](https://i.imgur.com/your-products-screenshot.png) |

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Se você tem alguma ideia para melhorar o projeto, siga os passos abaixo:

1.  Faça um **Fork** do projeto.
2.  Crie uma nova **Branch** (`git checkout -b feature/sua-feature`).
3.  Faça o **Commit** das suas alterações (`git commit -m 'Adiciona nova feature'`).
4.  Faça o **Push** para a sua Branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.