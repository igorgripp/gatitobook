import { Usuario } from './usuario';
import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubjector = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodificaJWT();
    }
  }

  private decodificaJWT(){
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubjector.next(usuario);
  }

  retornaUsuario(){
    return this.usuarioSubjector.asObservable();
  }

  logout(){
    this.tokenService.excluiToken();
    this.usuarioSubjector.next({});
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }


  salvaToken(token: string){
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }


}
