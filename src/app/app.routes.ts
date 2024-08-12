import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'inicio', component: InicioComponent },
  // { path: 'cadastro-docente', component: CadastroDocenteComponent },
  // { path: 'cadastro-aluno', component: CadastroAlunoComponent },
  // { path: 'cadastro-turma', component: CadastroTurmaComponent },
  // { path: 'cadastro-avaliacao', component: CadastroAvaliacaoComponent },
  // { path: 'listagem-docentes', component: ListagemDocentesComponent },
  // { path: 'notas', component: NotasComponent },
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
    LoginComponent
  ]
})
export class AppRoutingModule { }
