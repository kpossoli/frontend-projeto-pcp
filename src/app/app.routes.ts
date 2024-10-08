import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioAlunoComponent } from './inicio-aluno/inicio-aluno.component';
import { CadastroDocenteComponent } from './cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { CadastroAvaliacaoComponent } from './cadastro-avaliacao/cadastro-avaliacao.component';
import { ListagemDocentesComponent } from './listagem-docentes/listagem-docentes.component';
import { NotasAlunoComponent } from './notas-aluno/notas-aluno.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio-aluno', component: InicioAlunoComponent },
  { path: 'cadastro-docente', component: CadastroDocenteComponent },
  { path: 'cadastro-aluno', component: CadastroAlunoComponent },
  { path: 'cadastro-turma', component: CadastroTurmaComponent },
  { path: 'cadastro-avaliacao', component: CadastroAvaliacaoComponent },
  { path: 'listagem-docentes', component: ListagemDocentesComponent },
  { path: 'notas', component: NotasAlunoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule
  ],
  exports: [RouterModule],
  declarations: [
    LoginComponent,
    InicioComponent,
    InicioAlunoComponent,
    CadastroDocenteComponent,
    CadastroAlunoComponent,
    CadastroTurmaComponent,
    CadastroAvaliacaoComponent,
    ListagemDocentesComponent,
    NotasAlunoComponent
  ]
})
export class AppRoutingModule { }
