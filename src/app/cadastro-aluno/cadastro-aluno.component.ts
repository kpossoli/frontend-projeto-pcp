import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {
  aluno: any = {
    nome: '',
    genero: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    telefone: '',
    email: '',
    senha: '',
    naturalidade: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pontoReferencia: '',
    turmas: []
  };

  turmasDisponiveis: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (!this.isAdmin()) {
      this.router.navigate(['/inicio']);
    }

    // Carregar as turmas disponíveis do localStorage
    this.loadTurmasFromLocalStorage();

    // Verificar se existe um ID passado como query param e carregar o aluno
    const alunoId = this.route.snapshot.queryParamMap.get('id');
    if (alunoId) {
      this.carregarAluno(alunoId);
    }
  }

  loadTurmasFromLocalStorage() {
    // Carregar a lista de turmas do localStorage
    this.turmasDisponiveis = JSON.parse(localStorage.getItem('turmas') || '[]');
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Administrador';
  }

  carregarAluno(id: string) {
    const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    const aluno = alunos.find((a: any) => a.id === id);

    if (aluno) {
      this.aluno = { ...aluno };
    } else {
      alert('Aluno não encontrado!');
      this.router.navigate(['/inicio']);
    }
  }

  buscarEndereco() {
    // if (this.aluno.cep) {
    //   this.http.get(`https://viacep.com.br/ws/${this.aluno.cep}/json/`)
    //     .subscribe((data: any) => {
    //       this.aluno.logradouro = data.logradouro;
    //       this.aluno.bairro = data.bairro;
    //       this.aluno.cidade = data.localidade;
    //       this.aluno.estado = data.uf;
    //     });
    // }
  }

  onSubmit() {
    if (this.validateAluno()) {
      this.aluno.id = this.generateUniqueId();

      // Recuperar a lista de alunos do localStorage
      let alunos = JSON.parse(localStorage.getItem('alunos') || '[]');

      // Adicionar o novo aluno à lista
      alunos.push(this.aluno);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('alunos', JSON.stringify(alunos));

      // Criar um novo usuário do tipo Aluno
      const novoUsuario = {
        id: this.generateUniqueId(),
        nome: this.aluno.nome,
        email: this.aluno.email,
        senha: this.aluno.senha,  // Em uma aplicação real, nunca armazenar a senha em texto claro
        role: 'Aluno'
      };

      // Recuperar a lista de usuários do localStorage
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Adicionar o novo usuário à lista
      usuarios.push(novoUsuario);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Exibir uma mensagem de sucesso
      alert('Aluno e usuário cadastrados com sucesso!');

      // Redirecionar para a página inicial ou para outra página
      this.router.navigate(['/inicio']);
    }
  }

  validateAluno() {
    // Adicione validações adicionais se necessário
    return true;
  }

  generateUniqueId() {
    return 'ALU-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
