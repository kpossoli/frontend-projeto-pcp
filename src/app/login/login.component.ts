import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  users = [
    { email: 'admin@example.com', password: 'admin123', role: 'Administrador' },
    { email: 'docente@example.com', password: 'docente123', role: 'Docente' },
    { email: 'aluno@example.com', password: 'aluno123', role: 'Aluno' }
  ];

  constructor(private router: Router) {}

  onSubmit() {
    const user = this.users.find(u => u.email === this.email && u.password === this.password);
    if (user) {
      alert(`Bem-vindo, ${user.role}`);
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.router.navigate(['/inicio']);
    } else {
      alert('Usuário e/ou senha incorretos');
    }
  }

  showUnderConstruction(feature: string) {
    alert(`A funcionalidade "${feature}" está em construção.`);
  }
}
