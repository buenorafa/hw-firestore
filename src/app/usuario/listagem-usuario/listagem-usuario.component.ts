import { Component } from '@angular/core';
import { USUARIOS } from '../../shared/model/USUARIOS';
import { Usuario } from '../../shared/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../shared/services/usuario.service';
import { UsuarioRestService } from '../../shared/services/usuario-rest.service';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrl: './listagem-usuario.component.scss',
})
export class ListagemUsuarioComponent {
  usuarios: Usuario[] = [];
  constructor(
    private roteador: Router,
    private usuarioService: UsuarioRestService
  ) {
    usuarioService.listar().subscribe({
      next: (usuariosRetornados) => (this.usuarios = usuariosRetornados),
    });
  }
  remover(usuario: Usuario) {
    this.usuarioService.remover(usuario).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((u) => u.id !== usuario.id);
      },
    });
  }

  editar(usuarioAEditar: Usuario) {
    this.roteador.navigate(['edicao-usuario', usuarioAEditar.id]);
  }
}
