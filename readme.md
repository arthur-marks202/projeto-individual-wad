
#  Sistema de Reservas — AdaLove
Plataforma web integrada ao site institucional do Inteli para gerenciamento de reservas de salas acadêmicas. O sistema permite que alunos, professores e administradores consultem horários disponíveis, realizem agendamentos e acompanhem suas reservas de forma simples e digital. Administradores têm acesso a um painel de controle para aprovar, cancelar ou alterar solicitações.

---

##  Funcionalidades
Login com perfil (aluno, professor, administrador)

Consulta de salas e horários disponíveis

Realização, edição e cancelamento de reservas

Painel do usuário com histórico e lembretes

Painel administrativo com controle de solicitações

Notificações de confirmação e lembrete de reservas

Testes unitários com Jest
---

##  Estrutura de Pastas

```
mvc-boilerplate/
│
├── assets/                          # Recursos visuais e documentação
│   ├── dasboard.png                 # Imagem de referência do dashboard
│   ├── diagrama.png                 # Diagrama do sistema
│   ├── favicon.ico                  # Ícone do site
│   ├── fluxo_adm.png               # Fluxo do administrador
│   ├── fluxo_usuario.png           # Fluxo do usuário
│   ├── guia-projeto.png            # Guia visual do projeto
│   ├── home.png                    # Imagem de referência da home
│   ├── login-image.png             # Imagem para tela de login
│   ├── login.png                   # Imagem de referência do login
│   ├── minhas-reservas.png         # Imagem de referência das reservas
│   ├── modelo-banco.png            # Modelo do banco de dados
│   ├── reservar.png                # Imagem de referência da reserva
│   └── usuario.png                 # Imagem de referência do usuário
│
├── config/                         # Configurações do sistema
│   └── db.js                       # Configuração da conexão com PostgreSQL
│
├── controllers/                    # Lógica das requisições HTTP (Camada Controller)
│   ├── adminController.js          # Controle das funcionalidades administrativas
│   ├── notificacaoController.js    # Controle de notificações
│   ├── reservaController.js        # Controle de reservas (CRUD)
│   ├── salaController.js           # Controle de salas
│   └── usuarioController.js        # Controle de usuários (auth, CRUD)
│
├── models/                         # Modelos de dados (Camada Model)
│   ├── administrador_acao.js       # Modelo para ações administrativas
│   ├── index.js                    # Índice dos modelos
│   ├── notificacao.js              # Modelo de notificações
│   ├── reserva.js                  # Modelo de reservas
│   └── usuario.js                  # Modelo de usuários
│
├── public/                         # Arquivos estáticos públicos
│   └── CSS/                        # Estilos CSS organizados por página
│       ├── components/             # Componentes reutilizáveis
│       │   └── layout.css          # Sidebar, topbar e layout global
│       ├── Dashboard/              # Estilos do painel administrativo
│       │   └── styles.css          # CSS do dashboard admin
│       ├── Login/                  # Estilos da página de login
│       │   └── styles.css          # CSS da tela de login
│       ├── cadastro/               # Estilos da página de cadastro
│       │   └── styles.css          # CSS da tela de cadastro
│       ├── confirmacaoReserva/     # Estilos da confirmação
│       │   └── styles.css          # CSS da confirmação de reserva
│       ├── homePage/               # Estilos da página inicial
│       │   └── styles.css          # CSS da home
│       ├── minhasReservas/         # Estilos das reservas do usuário
│       │   └── styles.css          # CSS de minhas reservas
│       ├── reservar/               # Estilos da página de reserva
│       │   └── styles.css          # CSS da tela de reservar
│       └── reservas/               # Estilos gerais de reservas
│           └── styles.css          # CSS geral de reservas
│
├── repositories/                   # Camada de acesso a dados (Repository Pattern)
│   ├── administradorAcaoRepository.js  # Repository para ações admin
│   ├── notificacaoRepository.js    # Repository para notificações
│   ├── reservaRepository.js        # Repository para reservas
│   ├── salaRepository.js           # Repository para salas
│   └── usuarioRepository.js        # Repository para usuários
│
├── routes/                         # Definição das rotas (Camada de Roteamento)
│   ├── adminRoutes.js              # Rotas administrativas
│   ├── notificacaoRoutes.js        # Rotas de notificações
│   ├── reservaRoutes.js            # Rotas de reservas
│   ├── salaRoutes.js               # Rotas de salas
│   └── usuarioRoutes.js            # Rotas de usuários
│
├── scripts/                        # Scripts de banco e utilitários
│   ├── init.sql                    # Script de inicialização do banco
│   └── runsql.js                   # Utilitário para executar SQL
│
├── services/                       # Camada de serviços (vazia no momento)
│
├── views/                          # Templates EJS (Camada View)
│   ├── pages/                      # Páginas organizadas (vazio)
│   ├── adminDashboard_new.ejs      # Dashboard administrativo
│   ├── cadastro.ejs                # Página de cadastro
│   ├── confirmarReserva.ejs        # Confirmação de reserva
│   ├── home.ejs                    # Página inicial
│   ├── login.ejs                   # Página de login
│   ├── minhasReservas.ejs          # Minhas reservas
│   └── reservar.ejs                # Página de reservar sala
│
├── node_modules/                   # Dependências do Node.js (gerado automaticamente)
│
├── PI-WAD.md                       # Documentação do projeto
├── package-lock.json               # Lock das dependências
├── package.json                    # Configurações e dependências do projeto
├── readme.md                       # Documentação principal
├── rest.http                       # Arquivo para testes de API
└── server.js                       # Arquivo principal do servidor Express      
```
##  Como Executar o Projeto Localmente

###  Pré-requisitos

- [Node.js](https://nodejs.org/)
- Banco de dados PostgreSQL ou Supabase
- Um terminal compatível com comandos `npm`

---

###  Instalação

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

###  Inicializar o Banco de Dados

Antes de rodar a aplicação, inicialize o banco com o comando:

```bash
npm run init-db
```

###  Executar o Servidor

1. Inicie a aplicação com:

```bash
npm start
```

2. O servidor estará rodando em:

```arduino
http://localhost:3000
```
