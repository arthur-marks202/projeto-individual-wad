# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Sistema de Reserva de Salas - Plataforma Web (AdaLove).

#### **Autor:** Arthur Marques de Almeida

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução 
# Descrição do Projeto

O projeto consiste no desenvolvimento de um **sistema de reserva de salas** acessível via **plataforma web**, integrado ao site institucional **AdaLove**, da faculdade **Inteli**. A proposta busca ampliar a autonomia e facilitar o dia a dia dos alunos e professores, oferecendo um meio simples, digital e acessível para agendar as diversas mini salas de estudo e reuniões disponíveis no campus.

Atualmente, o processo de reserva ocorre exclusivamente de forma presencial, na recepção da faculdade, o que gera baixa visibilidade da disponibilidade das salas e acaba dificultando a organização dos alunos e professores que precisam desses espaços. Muitos sequer sabem que é necessário fazer reserva.

O novo sistema terá como base uma **interface web intuitiva**, com login institucional, onde o usuário poderá:

- Visualizar a lista de salas e horários disponíveis em tempo real;
- Realizar reservas de forma rápida e prática;
- Consultar, editar ou cancelar suas próprias reservas;
- Receber notificações e lembretes (via painel do usuário);
- (Para administradores) Acompanhar e gerenciar o uso dos espaços.

Ao estar disponível diretamente no site **AdaLove**, o sistema se torna mais acessível para toda a comunidade acadêmica, sem a necessidade de baixar ou atualizar um app. Além disso, facilita a manutenção técnica e a integração com outros sistemas já existentes da faculdade.

Essa mudança fortalece o propósito do **Inteli** de promover soluções digitais acessíveis, otimizando a gestão dos espaços físicos do campus e tornando o ambiente acadêmico mais organizado, eficiente e centrado no usuário.


---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

<div align="center">
  <sub>Persona</sub><br>
  <img src="assets/usuario.png" width="80%">
</div>

### 2.2. User Stories 

**(US01)**  
Como aluno, quero visualizar a lista de salas disponíveis para reserva, para escolher uma sala livre que atenda às minhas necessidades.

**(US02)**  
Como professor, quero realizar a reserva de uma sala diretamente pelo site da Adalove, para garantir um espaço adequado para ministrar aulas extras, reuniões ou atividades acadêmicas.

**(US03)**  
Como aluna, quero receber notificações de confirmação e lembrete das minhas reservas, para não esquecer dos horários e gerenciar melhor meu tempo.

**(US04)**  
Como administrador da faculdade, quero gerenciar (aprovar, cancelar ou alterar) reservas feitas pelos alunos, para manter o controle do uso das salas e resolver conflitos de agendamento.

## Analise INVEST do US02 (professor)
**(US02)**  
Como professor, quero realizar a reserva de uma sala diretamente pelo site da Adalove, para garantir um espaço adequado para ministrar aulas extras, reuniões ou atividades acadêmicas.

**I (Independente):**
Pode ser implementada separadamente das outras funcionalidades, como visualização de salas ou envio de notificações.

**N (Negociável):**
A forma como o professor realiza a reserva (ex: escolha de tipo de sala, aprovação automática ou manual) pode ser ajustada de acordo com as necessidades da faculdade.

**V (Valiosa):**
Permite que o professor tenha autonomia para planejar atividades acadêmicas sem depender do atendimento presencial, agilizando processos e otimizando o uso dos espaços.

**E (Estimável):**
A funcionalidade é bem definida (escolher sala, data, horário, quem estará presente, confirmar reserva) e pode ser facilmente estimada em termos de esforço de desenvolvimento.

**S (Small - Pequena):**
É pequena o bastante para ser desenvolvida e entregue em uma sprint de duração padrão, principalmente se focar inicialmente em um fluxo simples de reserva.

**T (Testável):**
Pode ser testada facilmente, verificando se o professor consegue selecionar uma sala e completar uma reserva pelo site da Adalove.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

O modelo de tabelas foi projetado para suportar as funcionalidades do sistema de reservas de salas da plataforma AdaLove. Ele contempla usuários com diferentes perfis, controle de reservas e envio de notificações. A estrutura garante integridade e facilidade de gestão dos dados.

<div align="center">
  <sub>Persona</sub><br>
  <img src="assets/modelo-banco.png" width="80%">
</div>

**O sistema é composto por quatro entidades principais:**

1. Usuário  
Representa todos os usuários cadastrados na plataforma, podendo ter o tipo aluno, professor ou administrador.
2. Sala  
Define as salas disponíveis para reserva, com nome, capacidade e localização.
3. Reserva  
Representa os agendamentos feitos por usuários para uma determinada sala, data e horário.
4. Notificação  
Controla os lembretes e confirmações enviados aos usuários.

A seguir está o código SQL utilizado para criação das tabelas no Supabase/PostgreSQL:

```sql
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('aluno', 'professor', 'admin'))
);

CREATE TABLE sala (
  id_sala SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  capacidade INT NOT NULL,
  localizacao TEXT NOT NULL
);

CREATE TABLE reserva (
  id_reserva SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
  id_sala INT NOT NULL REFERENCES sala(id_sala),
  data_reserva DATE NOT NULL,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  status_reserva TEXT NOT NULL DEFAULT 'pendente' CHECK (status_reserva IN ('pendente', 'aprovada', 'cancelada'))
);

CREATE TABLE notificacao (
  id_notificacao SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
  mensagem TEXT NOT NULL,
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  visualizada BOOLEAN DEFAULT FALSE
);
```

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

<div align="center">
    <sub>Wireframe Fluxo do Usuário</sub><br>
    <img src="assets/fluxo_usuario.png" width="85%"><br>
    <a href="https://www.figma.com/design/2UVmkvQp59TqM8lI4yCnOM/Untitled?node-id=0-1&m=dev&t=2f3UpjqqJatKLPja-1" target="_blank">
      <sup>Link Figma</sup></a>
      <br>
      <sup> O wireframe apresenta o fluxo do sistema de reservas da plataforma Adalove, permitindo que alunos e professores realizem login, visualizem a lista de salas disponíveis e filtrem por critérios como data, bloco e capacidade. Através da tabela de reservas, o usuário escolhe um horário e confirma a reserva. A tela “Minhas Reservas” exibe agendamentos futuros com opções de cancelamento. Além disso, o sistema envia notificações de confirmação e lembrete, facilitando o controle dos compromissos acadêmicos.</sup>
</div>
  

<div align="center">
  <sub>Wireframe Fluxo do Administrador</sub><br>
  <img src="assets/fluxo_adm.png" width="85%"><br>
  <a href="https://www.figma.com/design/2UVmkvQp59TqM8lI4yCnOM/Untitled?node-id=0-1&m=dev&t=2f3UpjqqJatKLPja-1" target="_blank">
    <sup>Link Figma</sup>
  </a><br>
  <sup>O wireframe apresenta a interface destinada à área administrativa do sistema de reservas da faculdade. Após realizar login com nome, e-mail e senha, o administrador é direcionado para uma tela de gerenciamento das solicitações de reserva de salas. Nessa grade, são exibidas todas as reservas feitas pelos alunos, organizadas por horário e sala, com os respectivos dados dos solicitantes. A funcionalidade central dessa interface permite ao administrador aprovar, cancelar ou alterar reservas diretamente da tabela, oferecendo uma visão consolidada que facilita o controle da ocupação dos espaços e a resolução de possíveis conflitos de agendamento.</sup>
</div>

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---