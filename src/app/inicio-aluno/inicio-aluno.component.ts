import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-aluno',
  templateUrl: './inicio-aluno.component.html',
  styleUrls: ['./inicio-aluno.component.css']
})
export class InicioAlunoComponent implements OnInit {
  ultimasAvaliacoes = [
    { id: 1, nome: 'Prova de Matemática', materia: 'Matemática', data: '10/08/2024' },
    { id: 2, nome: 'Prova de Física', materia: 'Física', data: '05/08/2024' },
    { id: 3, nome: 'Prova de Química', materia: 'Química', data: '01/08/2024' }
  ];

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

  ngOnInit(): void {}

  goToNotas(avaliacaoId: number) {
    this.router.navigate(['/notas'], { queryParams: { id: avaliacaoId } });
  }
}
