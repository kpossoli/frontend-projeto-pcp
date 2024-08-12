import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {
  isCollapsed: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  navigateToInicio() {
    const user = this.getUser();
    if (user.role === 'Administrador' || user.role === 'Docente') {
      this.router.navigate(['/inicio']);
    } else if (user.role === 'Aluno') {
      this.router.navigate(['/inicio']);
    }
  }

  logout() {
    // Limpar o estado de autenticação
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
