import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-aluno',
  templateUrl: './inicio-aluno.component.html',
  styleUrls: ['./inicio-aluno.component.css']
})
export class InicioAlunoComponent implements OnInit {
  ultimasAvaliacoes: any[] = [];

  materias = [
    { nome: 'Matemática' },
    { nome: 'Física' },
    { nome: 'Química' }
  ];

  cursosExtras = [
    { nome: 'Curso de Programação' },
    { nome: 'Matéria Eletiva de Robótica' },
    { nome: 'Curso de Astronomia' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadAvaliacoes();
  }

  loadAvaliacoes() {
    // Obter o aluno logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Carregar todas as avaliações do localStorage
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');

    // Filtrar as avaliações para o aluno logado
    this.ultimasAvaliacoes = avaliacoes
      .filter((avaliacao: any) => avaliacao.alunoId === currentUser.id)
      .sort((a: any, b: any) => new Date(b.dataAvaliacao).getTime() - new Date(a.dataAvaliacao).getTime())
      .slice(0, 3); // Pegar as últimas 3 avaliações

    // Obter as matérias relacionadas às últimas avaliações
    this.materias = [...new Set(this.ultimasAvaliacoes.map(avaliacao => avaliacao.materia))];
  }

  goToNotas(avaliacaoId: number) {
    this.router.navigate(['/notas'], { queryParams: { id: avaliacaoId } });
  }
}
