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
  students = [
    { id: 1, name: 'João Silva', age: 20, contact: 'joao@example.com' },
    { id: 2, name: 'Maria Oliveira', age: 22, contact: 'maria@example.com' },
    { id: 3, name: 'Carlos Santos', age: 19, contact: '(11) 98765-4321' },
    // Adicione mais alunos conforme necessário
  ];
  filteredStudents = this.students;

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchStats();
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
    this.teacherCount = 10; // Exemplo
    this.classCount = 5; // Exemplo
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      student.contact.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  viewStudent(studentId: number) {
    this.router.navigate(['/cadastro-aluno'], { queryParams: { id: studentId } });
  }

  launchGrade(studentId: number) {
    this.router.navigate(['/cadastro-avaliacao'], { queryParams: { id: studentId } });
  }
}
