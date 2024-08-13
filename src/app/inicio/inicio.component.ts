  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
  })
  export class InicioComponent implements OnInit {
    searchQuery: string = '';
    studentCount: number = 0;
    teacherCount: number = 0;
    classCount: number = 0;
    students: any[] = [];
    filteredStudents = this.students;

    constructor(private router: Router) {}

    ngOnInit() {
      this.loadStudentsFromLocalStorage();
      this.fetchStats();
    }

    loadStudentsFromLocalStorage() {
      // Carregar a lista de estudantes do localStorage
      this.students = JSON.parse(localStorage.getItem('alunos') || '[]');
      this.filteredStudents = [...this.students]; // Inicializar os estudantes filtrados com todos os estudantes

      // Carregar a lista de professores do localStorage
      const teachers = JSON.parse(localStorage.getItem('docentes') || '[]');
      this.teacherCount = teachers.length;

      // Carregar a lista de turmas do localStorage
      const classes = JSON.parse(localStorage.getItem('turmas') || '[]');
      this.classCount = classes.length;
    }

    isAdmin(): boolean {
      const user = this.getUser();
      return user.role === 'Administrador';
    }

    isDocente(): boolean {
      const user = this.getUser();
      return user.role === 'Docente';
    }

    isAluno(): boolean {
      const user = this.getUser();
      return user.role === 'Aluno';
    }

    getUser() {
      // Exemplo de usuário mockado; em uma aplicação real, você obteria o usuário de um serviço de autenticação
      return JSON.parse(localStorage.getItem('currentUser') || '{"role": "Aluno"}');
    }

    fetchStats() {
      // Aqui você pode substituir por uma chamada a uma API real para buscar os dados do backend
      this.studentCount = this.students.length;
    }

    filterStudents() {
      this.filteredStudents = this.students.filter(student =>
        student.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    viewStudent(studentId: number) {
      this.router.navigate(['/cadastro-aluno'], { queryParams: { id: studentId } });
    }

    launchGrade(studentId: number) {
      this.router.navigate(['/cadastro-avaliacao'], { queryParams: { id: studentId } });
    }
  }
