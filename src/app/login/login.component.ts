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
    { id: 1, nome: 'Administrador', email: 'admin@example.com', password: 'admin123', role: 'Administrador' },
    { id: 2, nome: 'Docente', email: 'docente@example.com', password: 'docente123', role: 'Docente' },
    { id: 3, nome: 'Aluno', email: 'aluno@example.com', password: 'aluno123', role: 'Aluno' }
  ];

  constructor(private router: Router) {}

  onSubmit() {
    const user = this.users.find(u => u.email === this.email && u.password === this.password);
    if (user) {
      alert(`Bem-vindo, ${user.role}`);
      localStorage.setItem('currentUser', JSON.stringify(user))
      if (user.role == 'Aluno') {
        this .router.navigate(['/inicio-aluno']);
      } else {
        this .router.navigate(['/inicio']);
      }

    } else {
      alert('Usuário e/ou senha incorretos');
    }
  }

  showUnderConstruction(feature: string) {
    alert(`A funcionalidade "${feature}" está em construção.`);
  }
}
