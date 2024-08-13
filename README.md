
# Angular Student Portal

Este é um projeto Angular para um portal de estudantes que permite o cadastro, edição e visualização de informações relacionadas a alunos, docentes, turmas e avaliações. O projeto foi desenvolvido para fornecer uma interface simples e intuitiva para gerenciar informações acadêmicas.

## Funcionalidades

- **Cadastro de Aluno:** Permite o cadastro de novos alunos, com validação de campos e vinculação a turmas existentes.
- **Cadastro de Docente:** Permite o cadastro de docentes com diferentes informações e validações.
- **Cadastro de Turmas:** Permite o cadastro de turmas e a associação de docentes a essas turmas.
- **Cadastro de Avaliações:** Permite o cadastro de avaliações associadas a turmas e alunos específicos.
- **Visualização de Avaliações:** Alunos podem visualizar suas avaliações mais recentes na página inicial.

## Estrutura do Projeto

- **src/app/cadastro-aluno:** Componente para o cadastro e edição de alunos.
- **src/app/cadastro-docente:** Componente para o cadastro e edição de docentes.
- **src/app/cadastro-turma:** Componente para o cadastro e edição de turmas.
- **src/app/cadastro-avaliacao:** Componente para o cadastro de avaliações e notas.
- **src/app/inicio-aluno:** Componente para a página inicial dos alunos, exibindo as últimas avaliações e outras informações relevantes.

## Instalação

Para instalar o projeto localmente, siga as instruções abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/kpossoli/frontend-projeto-pcp
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd frontend-projeto-pcp
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

5. Abra o navegador e acesse `http://localhost:4200/`.

## Estrutura do LocalStorage

O projeto utiliza o `localStorage` para armazenar informações sobre alunos, docentes, turmas e avaliações. A estrutura de dados esperada é a seguinte:

### Alunos

```json
{
  "id": "ALU-XXXXX",
  "nome": "Nome do Aluno",
  "genero": "Masculino",
  "dataNascimento": "2000-01-01",
  "cpf": "000.000.000-00",
  "rg": "00.000.000-0",
  "telefone": "(99) 99999-9999",
  "email": "aluno@example.com",
  "senha": "senha",
  "naturalidade": "Cidade",
  "cep": "00000-000",
  "logradouro": "Rua Exemplo",
  "numero": "123",
  "complemento": "Apto 45",
  "bairro": "Bairro",
  "cidade": "Cidade",
  "estado": "Estado",
  "pontoReferencia": "Ponto de Referência",
  "turmas": ["Turma A", "Turma B"]
}
```

### Docentes

```json
{
  "id": "DOC-XXXXX",
  "nome": "Nome do Docente",
  "genero": "Feminino",
  "dataNascimento": "1980-01-01",
  "cpf": "000.000.000-00",
  "rg": "00.000.000-0",
  "telefone": "(99) 99999-9999",
  "email": "docente@example.com",
  "naturalidade": "Cidade",
  "cep": "00000-000",
  "logradouro": "Rua Exemplo",
  "numero": "123",
  "complemento": "Apto 45",
  "bairro": "Bairro",
  "cidade": "Cidade",
  "estado": "Estado",
  "pontoReferencia": "Ponto de Referência",
  "materias": ["Matemática", "Física"]
}
```

### Turmas

```json
{
  "id": "TUR-XXXXX",
  "nome": "Turma A",
  "dataInicio": "2024-01-01",
  "dataTermino": "2024-12-01",
  "horario": "08:00",
  "professor": "Nome do Docente"
}
```

### Avaliações

```json
{
  "id": "AVAL-XXXXX",
  "alunoId": "ALU-XXXXX",
  "nomeAvaliacao": "Prova de Matemática",
  "materia": "Matemática",
  "dataAvaliacao": "2024-08-10T10:00",
  "notaAvaliacao": 8.5
}
```

## Contribuindo

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga as etapas abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Faça suas alterações e commite:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório original:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Crie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.
