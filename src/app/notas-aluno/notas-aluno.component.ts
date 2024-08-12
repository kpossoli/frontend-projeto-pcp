import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas-aluno',
  templateUrl: './notas-aluno.component.html',
  styleUrls: ['./notas-aluno.component.css']
})
export class NotasAlunoComponent implements OnInit {
  historicoAvaliacoes: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isAluno()) {
      this.router.navigate(['/inicio']);
    }

    this.carregarHistoricoAvaliacoes();
  }

  isAluno(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Aluno';
  }

  carregarHistoricoAvaliacoes() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');

    this.historicoAvaliacoes = avaliacoes.filter((avaliacao: any) => avaliacao.aluno === user.nome);
    this.historicoAvaliacoes.sort((a, b) => new Date(a.dataAvaliacao).getTime() - new Date(b.dataAvaliacao).getTime());
  }
}
