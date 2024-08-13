import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-avaliacao',
  templateUrl: './cadastro-avaliacao.component.html',
  styleUrls: ['./cadastro-avaliacao.component.css']
})
export class CadastroAvaliacaoComponent implements OnInit {
  avaliacao: any = {
    turma: '',
    professor: '',
    materia: '',
    nomeAvaliacao: '',
    dataAvaliacao: '',
    aluno: '',
    notaAvaliacao: 0
  };

  turmasDisponiveis: any[] = [];
  professoresDisponiveis: any[] = [];
  materiasDisponiveis: string[] = ['Matemática', 'Física', 'Química', 'História', 'Geografia', 'Inglês'];
  alunosDisponiveis: any[] = [];
  alunosFiltrados: any[] = [];
  alunoSearch: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isAdmin() && !this.isDocente()) {
      this.router.navigate(['/inicio']);
    }

    this.initializeProfessorDropdown();
    this.initializeTurmasDropdown();
    this.initializeAlunosDropdown();
    this.getCurrentDateTime();

  }

  getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.avaliacao.dataAvaliacao = `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Administrador';
  }

  isDocente(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Docente';
  }

  initializeProfessorDropdown() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (this.isAdmin()) {
      // Exemplo de professores disponíveis; em uma aplicação real, isso viria de uma API ou do localStorage
      this.professoresDisponiveis = JSON.parse(localStorage.getItem('docentes') || '[]');
    } else if (this.isDocente()) {
      this.professoresDisponiveis = [user];
      this.avaliacao.professor = user.id; // Preenche o dropdown com o nome do professor logado
    }
  }

  initializeTurmasDropdown() {
    // Exemplo de turmas disponíveis; em uma aplicação real, isso viria de uma API ou do localStorage
    this.turmasDisponiveis = JSON.parse(localStorage.getItem('turmas') || '[]');
  }

  initializeAlunosDropdown() {
    this.alunosDisponiveis = JSON.parse(localStorage.getItem('alunos') || '[]');
    // this.alunosFiltrados = [...this.alunosDisponiveis];
  }

  filtrarAlunos() {
    const query = this.alunoSearch.toLowerCase();

    // Verifica se o usuário digitou pelo menos 3 caracteres
    if (query.length >= 3) {
      this.alunosFiltrados = this.alunosDisponiveis.filter(aluno => aluno.nome.toLowerCase().includes(query));
    } else {
      this.alunosFiltrados = []; // Limpa a lista se menos de 3 caracteres forem digitados
    }
  }

  selectAluno(aluno: any) {
    this.avaliacao.aluno = aluno.id;
    this.alunoSearch = aluno.nome;
    this.alunosFiltrados = []; // Limpa a lista de sugestões após a seleção
  }

  onSubmit() {
    if (this.validateAvaliacao()) {
      this.avaliacao.id = this.generateUniqueId();

      // Recuperar a lista de avaliações/notas do localStorage
      let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');

      // Adicionar a nova avaliação à lista
      avaliacoes.push(this.avaliacao);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

      // Exibir uma mensagem de sucesso
      alert('Avaliação/Nota cadastrada com sucesso!');

      // Redirecionar para a página inicial ou para outra página
      this.router.navigate(['/inicio']);
    }
  }

  validateAvaliacao() {
    // Adicione validações adicionais se necessário
    return true;
  }

  generateUniqueId() {
    return 'AVAL-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
