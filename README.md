# PostHub Simplificado

Projeto desenvolvido em sala para praticar a criação de uma página web que consulta e manipula posts usando JavaScript e uma API.

## Sobre o projeto

A página exibe posts com o nome do usuário, título, conteúdo e identificador. Também permite cadastrar um post pela interface. O projeto utiliza a API de teste [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Funcionalidades

- Buscar e exibir posts da API.
- Mostrar um indicador enquanto os posts estão sendo carregados e informar a quantidade exibida.
- Cadastrar um post usando um formulário em janela modal.
- Exibir uma mensagem de sucesso ou erro após uma ação.
- Marcar visualmente com o selo “Novo” os posts cadastrados na página.
- Apresentar formulários e controles de interface para edição e exclusão de posts; essas ações ainda precisam ser finalizadas no JavaScript.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- JSONPlaceholder

## Arquivos principais

- `index.html`: estrutura da página, cartões e formulários modais.
- `style.css`: estilos personalizados, incluindo o selo “Novo” e o efeito dos cartões.
- `app.js`: busca de dados na API, renderização dos posts e lógica de cadastro.

## Como executar

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Inicie a página com uma extensão como **Live Server**, ou abra `index.html` no navegador.
4. Mantenha a conexão com a internet ativa para carregar Bootstrap, Font Awesome e os dados da API.

## Observação sobre a API

O JSONPlaceholder é uma API de demonstração. Ela simula operações de cadastro, edição e exclusão, mas não salva permanentemente as alterações. Por isso, um post cadastrado pode aparecer na página durante o uso, mas não será mantido após recarregar.
