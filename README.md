# Backend mundo de Harry Potter

[![Capa do Projeto](https://i.imgur.com/QYJ9QUM.jpg)](https://github.com/caiquenaimi/harry-potter)

Este é o repositório de um projeto abrangente que combina o desenvolvimento de uma API e um site público dedicado aos amantes do universo de Harry Potter. O projeto, construído com tecnologias avançadas como Next.js, TypeScript, Tailwind CSS e PostgreSQL, tem como objetivo oferecer aos fãs um guia interativo e informativo que abranja todos os aspectos do mundo mágico de Harry Potter. O guia fornece detalhes abrangentes sobre os personagens da série, explorando suas origens, habilidades e impacto na trama, proporcionando uma experiência imersiva e enriquecedora para os entusiastas do bruxinho.

## Visão Geral
Este é um projeto simples de backend desenvolvido com Express.js e PostgreSQL. Ele fornece uma API para gerenciar informações de bruxos incluindo nome, idade, casa, habilidade, sangue e patrono. E varinhas incluindo material, comprimento, núcleo e data de criação.

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em seu sistema. Além disso, é necessário ter o PostgreSQL instalado e em execução em sua máquina.

## Configuração do Projeto

1. **Clonar o repositório:**
```
git clone https://github.com/caiquenaimi/back-HP.git
```
2. **Instalar dependências:**
```
npm install
```
3. **Instalar bibliotecas externas:**
```
npm install express nodemon pg
```
4. **Configurar o banco de dados:** 
- Crie um banco de dados PostgreSQL com o nome 'harrypotter':
  ```
  CREATE DATABASE harrypotter;
  ```
- Ajuste as credenciais do banco de dados no arquivo `app.js`, se necessário.

## Inicializando o Servidor

Para iniciar o servidor Express, execute o seguinte comando:
```
npm run dev
```
O servidor será iniciado na porta 3000 por padrão.

## Rotas Disponíveis

### Bruxos

<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <img src="https://assets.papelpop.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-12-at-15.40.49.jpeg" alt="Bruxos">
</div>


- **GET /bruxos:** Retorna todos os bruxos cadastrados.
- **GET /bruxos/:id:** Retorna um bruxo específico com base no ID fornecido.
- **GET /bruxos/nome/:nome:** Filtra os bruxos pelo nome fornecido.
- **GET /bruxos/casa/:casa:** Filtra os bruxos pelas quatro casas de Hogwarts.
- **POST /bruxos:** Adiciona um novo bruxo.
- **PUT /bruxos/:id:** Atualiza as informações de um bruxo existente.
- **DELETE /bruxos/:id:** Exclui um bruxo com base no ID fornecido.

### Varinhas

<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <img src="https://s2-casaejardim.glbimg.com/P_5NEXjMTL7pXlyzpZO568xpu7A=/0x0:1400x933/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/G/A/nGnoFoTXuiNWzw3NdMQQ/varinhas-harry-potter-pexels-rdne-stock-project-casaejardim.jpg" alt="Varinhas">
</div>


- **GET /varinhas:** Retorna todas as varinhas cadastradas.
- **GET /varinhas/:id:** Retorna uma varinha específica com base no ID fornecido.
- **POST /varinhas:** Adiciona uma nova varinha.
- **PUT /varinhas/:id:** Atualiza as informações de uma varinha existente.
- **DELETE /varinhas/:id:** Exclui uma varinha com base no ID fornecido.

## Testando as Rotas

Você pode usar ferramentas como Postman ou simplesmente acessar as rotas no navegador ou em qualquer cliente HTTP para testar as funcionalidades.

## Créditos

Este projeto foi desenvolvido como parte de um exercício prático para praticar o uso do Express.js e PostgreSQL.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Desenvolvido por [Caique Naimi](https://github.com/caiquenaimi)
