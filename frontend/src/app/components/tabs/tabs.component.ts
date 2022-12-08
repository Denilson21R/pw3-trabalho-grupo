import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from "../../model/Usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tab!: string
  usuario: Usuario = new Usuario()

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fillUsuario()
  }

  private fillUsuario() {
    if(sessionStorage.getItem("id") != null){
      this.usuario.id = Number(sessionStorage.getItem("id"))??null
      this.usuario.nome = sessionStorage.getItem("nome")
      this.usuario.login = sessionStorage.getItem("login")
    }else{
      this.router.navigate(["login"])
    }
  }

  sair() {
    sessionStorage.clear()
    this.router.navigate(["login"])
  }
}
