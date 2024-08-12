import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-docente',
  templateUrl: './cadastro-docente.component.html',
  styleUrls: ['./cadastro-docente.component.css']
})
export class CadastroDocenteComponent implements OnInit {
  docente: any = {
    nome: '',
    genero: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    estadoCivil: '',
    telefone: '',
    email: '',
    senha: '',
    naturalidade: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pontoReferencia: '',
    materias: []
  };

  materiasDisponiveis = ['Matemática', 'Física', 'Química', 'História', 'Geografia', 'Inglês'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isAdmin()) {
      this.router.navigate(['/inicio']);
    }
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Administrador';
  }

  buscarEndereco() {
    // if (this.docente.cep) {
    //   this.http.get(`https://viacep.com.br/ws/${this.docente.cep}/json/`)
    //     .subscribe((data: any) => {
    //       this.docente.logradouro = data.logradouro;
    //       this.docente.bairro = data.bairro;
    //       this.docente.cidade = data.localidade;
    //       this.docente.estado = data.uf;
    //     });
    // }
  }

  onSubmit() {
    if (this.validateDocente()) {
      this.docente.id = this.generateUniqueId();

      // Recuperar a lista de docentes do localStorage
      let docentes = JSON.parse(localStorage.getItem('docentes') || '[]');

      // Adicionar o novo docente à lista
      docentes.push(this.docente);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('docentes', JSON.stringify(docentes));

      // Criar um novo usuário do tipo Docente
      const novoUsuario = {
        id: this.generateUniqueId(),
        nome: this.docente.nome,
        email: this.docente.email,
        senha: this.docente.senha, // Em uma aplicação real, nunca armazenar a senha em texto claro
        role: 'Docente'
      };

      // Recuperar a lista de usuários do localStorage
      let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Adicionar o novo usuário à lista
      usuarios.push(novoUsuario);

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Exibir uma mensagem de sucesso
      alert('Docente e usuário cadastrados com sucesso!');

      // Redirecionar para a página inicial ou para outra página
      this.router.navigate(['/inicio']);
    }
  }

  validateDocente() {
    // Aqui você pode adicionar validações adicionais, se necessário
    return true;
  }

  generateUniqueId() {
    return 'DOC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
