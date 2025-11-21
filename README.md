# Biblioteca
## Frontend (opcional)

O frontend é opcional e foi criado para facilitar os testes da aplicação.

**Tecnologias utilizadas (Frontend):**  
- **React**  
- **Material UI**: estilização da interface;  
- **Formik**: gerenciamento de formulários e envio de dados para o backend;  
- **Axios**: para realizar requisições HTTP;  
- **DataTable**: exibição da lista de livros salvos;  
- **Toast**: exibição de mensagens retornadas pela API;

**Funcionalidades:**  
- Formulário para buscar livro por ISBN;  
- Botão para salvar o livro no banco de dados;  
- Exibição da lista de livros salvos;  
- Deletar livros;  

## Docker

**Atenção:** a aplicação está containerizada com Docker para facilitar o debug e evitar problemas de configuração na máquina local.

Para rodar a aplicação, basta executar:

```bash
docker compose up --build
```

## Backend

> A aplicação segue uma arquitetura de API versionada com Service Objects, mantendo os controllers organizados e limpos, delegando a lógica de negócio para serviços específicos. Isso facilita manutenção, testes e escalabilidade da aplicação.

**Tecnologias utilizadas:**
- **Ruby on Rails**;
- **net-http**: para fazer requisições à API externa da Open Library;  
- **kaminari**: para paginação de listas de livros;  
- **rack-cors**: permite que o frontend faça requisições à API, liberando chamadas entre diferentes origens (CORS);  
- **I18n**: para internacionalização de mensagens e textos;

## Endpoints

- **Buscar livro na Open Library**  
`GET http://api.localhost:3000/api/v1/books/search?isbn=<ISBN>`  
Faz a chamada para a API da Open Library e retorna os dados do livro.  

- **Listar livros salvos (paginação com Kaminari)**  
`GET http://api.localhost:3000/api/v1/books?per_page=10`  
Lista todos os livros salvos localmente. Por padrão, a listagem retorna 10 livros por página devido à paginação do Kaminari. É possível passar parâmetros de página e quantidade para visualizar todos os registros.  

- **Salvar livro**  
`POST http://api.localhost:3000/api/v1/books?isbn=<ISBN>`  
Para criar um livro no banco local, é necessário enviar o ISBN.  

- **Deletar livro**  
`DELETE http://api.localhost:3000/api/v1/books/:id`  
Deleta um livro específico. Para obter o `id`, consulte o endpoint de listagem (`GET /books`).



