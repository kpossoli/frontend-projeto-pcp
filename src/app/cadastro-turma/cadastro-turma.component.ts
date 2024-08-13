import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {
  turma: any = {
    nome: '',
    dataInicio: '',
    dataTermino: '',
    horario: '',
    professor: ''
  };

  professoresDisponiveis: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isAdmin() && !this.isDocente()) {
      this.router.navigate(['/inicio']);
    }

    this.initializeData();
    this.initializeProfessorDropdown();
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Administrador';
  }

  isDocente(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Docente';
  }

  initializeData() {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('it-IT').slice(0, 5);

    this.turma.dataInicio = today;
    this.turma.dataTermino = today;
    this.turma.horario = currentTime;
  }

  initializeProfessorDropdown() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (this.isAdmin()) {
      // Exemplo de professores disponíveis; em uma aplicação real, isso viria de uma API ou do localStorage
      this.professoresDisponiveis = JSON.parse(localStorage.getItem('docentes') || '{}');
    } else if (this.isDocente()) {
      this.professoresDisponiveis = [user];
      this.turma.professor = user.id; // Preenche o dropdown com o nome do professor logado
      this.turma.nome = user.nome;
    }
  }

  onSubmit() {
    if (this.validateTurma()) {
      this.turma.id = this.generateUniqueId();

      // Recuperar a lista de turmas do localStorage
      let turmas = JSON.parse(localStorage.getItem('turmas') || '[]');

      // Adicionar a nova turma à lista
      turmas.push(this.turma);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('turmas', JSON.stringify(turmas));

      // Exibir uma mensagem de sucesso
      alert('Turma cadastrada com sucesso!');

      // Redirecionar para a página inicial ou para outra página
      this.router.navigate(['/inicio']);
    }
  }

  validateTurma() {
    // Adicione validações adicionais se necessário
    return true;
  }

  generateUniqueId() {
    return 'TUR-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
