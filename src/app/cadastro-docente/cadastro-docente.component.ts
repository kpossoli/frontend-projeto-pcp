import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-docente',
  templateUrl: './cadastro-docente.component.html',
  styleUrls: ['./cadastro-docente.component.css']
})
export class CadastroDocenteComponent implements OnInit {
  docente: any = {
    id: '',
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

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.isAdmin()) {
      this.router.navigate(['/inicio']);
    }

    const docenteId = this.route.snapshot.queryParamMap.get('id');
    if (docenteId) {
      this.carregarDocente(docenteId);
    }
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'Administrador';
  }

  carregarDocente(id: string) {
    const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
    const docente = docentes.find((d: any) => d.id === id);

    if (docente) {
      this.docente = { ...docente };
    }
  }

  buscarEndereco() {
    if (this.docente.cep) {
      this.http.get(`https://viacep.com.br/ws/${this.docente.cep}/json/`)
        .subscribe((data: any) => {
          this.docente.logradouro = data.logradouro;
          this.docente.bairro = data.bairro;
          this.docente.cidade = data.localidade;
          this.docente.estado = data.uf;
        });
    }
  }

  onSubmit() {
    if (this.validateDocente()) {
      if (!this.docente.id) {
        this.docente.id = this.generateUniqueId();
      }

      // Recuperar a lista de docentes do localStorage
      let docentes = JSON.parse(localStorage.getItem('docentes') || '[]');

      // Verificar se é uma edição ou um novo cadastro
      const index = docentes.findIndex((d: any) => d.id === this.docente.id);
      if (index > -1) {
        // Editar
        docentes[index] = this.docente;
      } else {
        // Novo Cadastro
        docentes.push(this.docente);
      }

      // Salvar a lista atualizada no localStorage
      localStorage.setItem('docentes', JSON.stringify(docentes));

      // Exibir uma mensagem de sucesso
      alert('Docente salvo com sucesso!');

      // Redirecionar para a página de listagem de docentes ou outra página
      this.router.navigate(['/listagem-docentes']);
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
