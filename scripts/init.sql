-- ==============================================
-- Script de criação do banco de dados - Checkin Room
-- ==============================================

-- Tabela: usuario
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('aluno', 'professor', 'admin'))
);

-- Tabela: sala
CREATE TABLE IF NOT EXISTS sala (
  id_sala SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  capacidade INT NOT NULL,
  localizacao TEXT NOT NULL
);

-- Tabela: reserva
CREATE TABLE IF NOT EXISTS reserva (
  id_reserva SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
  id_sala INT NOT NULL REFERENCES sala(id_sala),
  data_reserva DATE NOT NULL,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  status_reserva TEXT NOT NULL DEFAULT 'pendente' CHECK (status_reserva IN ('pendente', 'aprovada', 'cancelada')),
  CHECK (horario_inicio < horario_fim)
);

-- Tabela: notificacao
CREATE TABLE IF NOT EXISTS notificacao (
  id_notificacao SERIAL PRIMARY KEY,
  id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
  mensagem TEXT NOT NULL,
  tipo_notificacao TEXT NOT NULL,
  id_reserva INT REFERENCES reserva(id_reserva),
  data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  visualizada BOOLEAN DEFAULT FALSE
);

-- Tabela: administrador_acao
CREATE TABLE IF NOT EXISTS administrador_acao (
  id_acao SERIAL PRIMARY KEY,
  id_admin INT NOT NULL REFERENCES usuario(id_usuario),
  id_reserva INT NOT NULL REFERENCES reserva(id_reserva),
  acao TEXT NOT NULL CHECK (acao IN ('aprovou', 'cancelou')),
  data_acao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
