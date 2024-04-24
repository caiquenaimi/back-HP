CREATE DATABASE harryPotter;

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade VARCHAR(255) NOT NULL,
    casa VARCHAR(255) NOT NULL,
    habilidade VARCHAR(255) NOT NULL,
    sangue VARCHAR(255) NOT NULL,
    patrono VARCHAR(255)
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    comprimento VARCHAR(255) NOT NULL,
    nucleo VARCHAR(255) NOT NULL,
    data_criacao DATE NOT NULL
);