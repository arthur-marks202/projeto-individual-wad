
# 🏫 Sistema de Reservas — AdaLove
Plataforma web integrada ao site institucional do Inteli para gerenciamento de reservas de salas acadêmicas. O sistema permite que alunos, professores e administradores consultem horários disponíveis, realizem agendamentos e acompanhem suas reservas de forma simples e digital. Administradores têm acesso a um painel de controle para aprovar, cancelar ou alterar solicitações.

---

## ✅ Funcionalidades
Login com perfil (aluno, professor, administrador)

Consulta de salas e horários disponíveis

Realização, edição e cancelamento de reservas

Painel do usuário com histórico e lembretes

Painel administrativo com controle de solicitações

Notificações de confirmação e lembrete de reservas

Testes unitários com Jest
---

## 📁 Estrutura de Pastas

mvc-boilerplate/      
│      
├── config/ # Configurações, como conexão com o banco de dados     
│ └── db.js     
├── controllers/ # Lógica das requisições HTTP     
│ └── aboutController.js      
│ └── contactController.js      
│ └── homeController.js      
│ └── userController.js      
├── models/ # Definições das entidades do banco (ORM ou SQL)       
│ └── userModel.js       
├── routes/ # Arquivos de rotas do sistema       
│ └── index.js      
│ └── frontRoutes.js       
│ └── userRoutes.js       
├── services/ # Funções reutilizáveis e lógicas de negócio        
│ └── userService.js        
├── assets/ # Imagens, fontes e arquivos públicos       
├── scripts/ # Scripts JS públicos (front-end)       
├── public/      
│ └── css/       
│ └─────style.css # Estilos CSS      
├── tests/ # Testes unitários com Jest      
│ └── userController.test.js      
│ └── userModel.test.js     
│ └── userRoutes.test.js       
│ └── userService.test.js       
├── views/ # Vizualização da aplicação       
├── .gitignore # Arquivos/ pastas ignorados pelo Git       
├── .env # Variáveis de ambiente       
├── jest.config.js # Configuração do Jest para testes      
├── package-lock.json # Lockfile do npm     
├── package.json # Dependências e scripts do Node.js      
├── PI-WAD.md # Arquivo da documentação do projeto     
├── readme.md # Documentação do projeto      
├── server.js # Inicialização do servidor Express      
└── rest.http # Arquivo opcional para testes de API via VSCode      

## ▶️ Como Executar o Projeto Localmente

### 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/)
- Banco de dados PostgreSQL ou Supabase
- Um terminal compatível com comandos `npm`

---

### ⚙️ Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/arthur-marks202/mvc-boilerplate.git
cd mvc-boilerplate 
```  

2. **Instale as dependências**
```bash
npm install
npm init -y
npm install express ejs
```  

### 🗃️ Inicializar o Banco de Dados

Antes de rodar a aplicação, inicialize o banco com o comando:

```bash
npm run init-db
```

### 🚀 Executar o Servidor

1. Inicie a aplicação com:

```bash
node app.js
```

2. O servidor estará rodando em:

```arduino
http://localhost:3000
```
