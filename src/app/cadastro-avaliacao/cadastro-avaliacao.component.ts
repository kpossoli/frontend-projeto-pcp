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

  turmasDisponiveis: string[] = [];
  professoresDisponiveis: string[] = [];
  materiasDisponiveis: string[] = ['Matemática', 'Física', 'Química', 'História', 'Geografia', 'Inglês'];
  alunosDisponiveis: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isAdmin() && !this.isDocente()) {
      this.router.navigate(['/inicio']);
    }

    this.initializeProfessorDropdown();
    this.initializeTurmasDropdown();
    this.initializeAlunosDropdown();
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
      this.professoresDisponiveis = ['Professor A', 'Professor B', 'Professor C'];
    } else if (this.isDocente()) {
      this.professoresDisponiveis = [user.nome];
      this.avaliacao.professor = user.nome; // Preenche o dropdown com o nome do professor logado
    }
  }

  initializeTurmasDropdown() {
    // Exemplo de turmas disponíveis; em uma aplicação real, isso viria de uma API ou do localStorage
    this.turmasDisponiveis = ['Turma A', 'Turma B', 'Turma C'];
  }

  initializeAlunosDropdown() {
    // Exemplo de alunos disponíveis; em uma aplicação real, isso viria de uma API ou do localStorage
    this.alunosDisponiveis = ['Aluno 1', 'Aluno 2', 'Aluno 3'];
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
