import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ToolbarComponent implements OnInit {
  pageTitle: string = 'Título da Página';
  userName: string = '';
  userIcon: string = 'path/to/default-icon.png'; // Coloque o caminho do ícone padrão
  showDropdown: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = this.getUser().name;
    this.userIcon = this.getUser().icon;
    this.updatePageTitle();
  }

  getUser() {
    // Exemplo de usuário mockado; em uma aplicação real, você obteria o usuário de um serviço de autenticação
    return JSON.parse(localStorage.getItem('currentUser') || '{"name": "Usuário", "icon": "path/to/default-icon.png"}');
  }

  updatePageTitle() {
    // Atualize o título da página conforme a rota ativa ou outra lógica necessária
    this.pageTitle = this.router.url.replace('/', '').toUpperCase();
  }

  logout() {
    // Limpar o estado de autenticação
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
