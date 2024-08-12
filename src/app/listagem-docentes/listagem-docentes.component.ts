import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-docentes',
  templateUrl: './listagem-docentes.component.html',
  styleUrls: ['./listagem-docentes.component.css']
})
export class ListagemDocentesComponent implements OnInit {
  searchQuery: string = '';
  docentes: any[] = [];
  docentesFiltrados: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isAdmin()) {
      this.router.navigate(['/inicio']);
    }

    this.carregarDocentes();
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Administrador';
  }

  carregarDocentes() {
    // Recuperar a lista de docentes do localStorage
    this.docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    this.docentesFiltrados = [...this.docentes];
  }

  filtrarDocentes() {
    this.docentesFiltrados = this.docentes.filter(docente =>
      docente.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      docente.id.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  verMais(id: string) {
    // Redirecionar para a página de cadastro de docente com o ID do docente
    this.router.navigate(['/cadastro-docente'], { queryParams: { id } });
  }
}
